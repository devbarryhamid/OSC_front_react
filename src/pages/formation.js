import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Formations() {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showInscriptionModal, setShowInscriptionModal] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState(null)
  const [telephone, setTelephone] = useState('')
  const [message, setMessage] = useState('')


  const [inscriptionData, setInscriptionData] = useState({
    nom_complet: '',
    telephone: '',
    email: '',
    adresse: '',
    statut: ''
  })
  const [inscriptionMessage, setInscriptionMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/api/getformation')
      .then(response => {
        setFormations(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors du chargement des formations :", error)
        setLoading(false)
      })
  }, [])

  const handleSuivre = (formation) => {
    setSelectedFormation(formation)
    setShowModal(true)
    setTelephone('')
    setMessage('')
  }

  const handleValiderTelephone = () => {
    if (!telephone) {
      setMessage("Veuillez saisir un numéro de téléphone.")
      return
    }
    axios.post('http://localhost:8080/api/suivrecours', {
      telephone,
      coursId: selectedFormation.id
    })
      .then(res => {
        setMessage(res.data.message || "Réponse reçue")
      })
      .catch(() => {
        setMessage(" Erreur lors de la demande pour suivre la formation.")
      })
  }

  const handleOuvrirInscription = () => {
    setShowModal(false)
    setShowInscriptionModal(true)
    setInscriptionData({
      nom_complet: '',
      telephone: '',
      email: '',
      adresse: '',
      statut: ''
    })
    setInscriptionMessage('')
  }


  const handleChangeInscription = (e) => {
    setInscriptionData({
      ...inscriptionData,
      [e.target.name]: e.target.value
    })
  }


  const handleInscriptionSubmit = () => {
    const { nom_complet, telephone, email, adresse, statut } = inscriptionData
    if (!nom_complet || !telephone || !email || !adresse || !statut) {
      setInscriptionMessage("Tous les champs sont obligatoires.")
      return
    }
    axios.post('http://localhost:8080/api/apprenant', inscriptionData)
      .then(res => {
        setInscriptionMessage("Inscription réussie ! Vous pouvez maintenant suivre la formation.")
      })
      .catch(() => {
        setInscriptionMessage("Erreur lors de l'inscription.")
      })
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Nos Formations Disponibles</h2>

      {loading ? (
        <p>Chargement des formations...</p>
      ) : (
        <div style={styles.scrollContainer}>
          {formations.map((formation) => (
            <div key={formation.id} style={styles.card}>
              <h3 style={styles.nom}>{formation.nom_formation}</h3>
              <p><strong>Type :</strong> {formation.type}</p>
              <p><strong>Formateur :</strong> {formation.nom_formateur}</p>
              <p><strong>Avis :</strong> {formation.avis}</p>
              <p><strong>Email :</strong> {formation.userSystem?.email}</p>
              <button style={styles.button} onClick={() => handleSuivre(formation)}>
                Suivre la formation
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ color: '#2e7d32' }}>Suivre : {selectedFormation?.nom_formation}</h3>
            <input
              type="tel"
              placeholder="Entrez votre téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button} onClick={handleValiderTelephone}>
              Valider
            </button>
            {message && <p>{message}</p>}
            <button style={styles.secondaryButton} onClick={handleOuvrirInscription}>
              S’inscrire d’abord
            </button>
            <button style={styles.closeButton} onClick={() => setShowModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}


      {showInscriptionModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ color: '#2e7d32' }}>Inscription</h3>
            <input
              type="text"
              name="nom_complet"
              placeholder="Nom complet"
              value={inscriptionData.nom_complet}
              onChange={handleChangeInscription}
              style={styles.input}
            />
            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              value={inscriptionData.telephone}
              onChange={handleChangeInscription}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inscriptionData.email}
              onChange={handleChangeInscription}
              style={styles.input}
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={inscriptionData.adresse}
              onChange={handleChangeInscription}
              style={styles.input}
            />
            <input
              type="text"
              name="statut"
              placeholder="Statut (ex: Etudiant)"
              value={inscriptionData.statut}
              onChange={handleChangeInscription}
              style={styles.input}
            />
            <button style={styles.button} onClick={handleInscriptionSubmit}>
              S'inscrire
            </button>
            {inscriptionMessage && <p>{inscriptionMessage}</p>}
            <button style={styles.closeButton} onClick={() => setShowInscriptionModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: '30px',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: '6px solid #f57c00',
  },
  nom: {
    marginTop: 0,
    color: '#2e7d32',
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#f57c00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    marginTop: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
}

export default Formations
