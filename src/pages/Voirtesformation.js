import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MesFormations() {
  const [telephone, setTelephone] = useState('')
  const [formations, setFormations] = useState([])
  const [filteredFormations, setFilteredFormations] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8080/api/getformation')
      .then(res => {
        setFormations(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setMessage("Erreur lors du chargement des formations.")
        setLoading(false)
      })
  }, [])

  const handleRecherche = () => {
    if (!telephone.trim()) {
      setMessage("Veuillez saisir un numéro de téléphone.")
      setFilteredFormations([])
      return
    }


    const result = formations.filter(f => 
      f.apprenant &&
      f.apprenant.userSystem &&
      f.apprenant.userSystem.telephone === telephone.trim()
    )

    if (result.length === 0) {
      setMessage("Aucune formation trouvée pour ce numéro.")
    } else {
      setMessage("")
    }

    setFilteredFormations(result)
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Mes Formations</h2>

      <div style={styles.searchBox}>
        <input
          type="tel"
          placeholder="Entrez votre numéro de téléphone"
          value={telephone}
          onChange={e => setTelephone(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRecherche} style={styles.button}>
          Rechercher
        </button>
      </div>

      {loading && <p>Chargement des formations...</p>}
      {message && <p style={{color: 'red'}}>{message}</p>}

      <div style={styles.list}>
        {filteredFormations.map(f => (
          <div key={f.id} style={styles.card}>
            <h3 style={styles.nom}>{f.nom_formation}</h3>
            <p><strong>Type :</strong> {f.type}</p>
            <p><strong>Formateur :</strong> {f.nom_formateur}</p>
            <p><strong>Avis :</strong> {f.avis}</p>
            <p><strong>Email formateur :</strong> {f.userSystem?.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 800,
    margin: 'auto',
    padding: 20,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 20,
  },
  searchBox: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#f57c00',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: '6px solid #f57c00',
  },
  nom: {
    marginTop: 0,
    color: '#2e7d32',
  },
}

export default MesFormations
