import './App.css'

function App() {
  return (
    <section
      id="center"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f9ff, #e8f1ff)',
        padding: '30px',
      }}
    >
      <div>
        <p
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#2563eb',
            letterSpacing: '3px',
            marginBottom: '15px',
          }}
        >
          WELCOME TO
        </p>

        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 85px)',
            fontWeight: '800',
            color: '#0f172a',
            margin: '0',
          }}
        >
          TRUSTEUROHR
        </h1>

        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 45px)',
            color: '#2563eb',
            margin: '5px 0 20px',
          }}
        >
          CONSULTANCY NEPAL KTM
        </h2>

        <p style={{ fontSize: '20px', color: '#475569' }}>
          Your Trusted Partner for <strong>Foreign Education & Visa Consultancy</strong>
        </p>
      </div>
    </section>
  )
}

export default App