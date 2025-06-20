import React from 'react'
import { useNavigate } from 'react-router-dom'

function Acceuil() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue sur E-Formation+</h1>
      <p style={styles.description}>
        Une plateforme simple, rapide et accessible pour développer vos compétences où que vous soyez.
      </p>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate('/formations')}>
          Formations Disponibles
        </button>
        <button style={styles.button} onClick={() => navigate('/mesformations')}>
          Mes formations
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '80px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    color: '#2e7d32', 
    fontSize: '28px',
    marginBottom: '20px',
  },
  description: {
    color: '#555',
    fontSize: '16px',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    backgroundColor: '#f57c00',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
}

export default Acceuil
