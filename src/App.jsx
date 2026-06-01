import HeroCanvas from './components/HeroCanvas'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', margin: 0, padding: 0 }}>
      {/* Background 3D Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <HeroCanvas />
      </div>

      {/* Foreground UI Overlay */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        zIndex: 1, pointerEvents: 'none', display: 'flex', flexDirection: 'column', 
        justifyContent: 'space-between', padding: '40px', boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, sans-serif', color: '#ffffff'
      }}>
        
        {/* Header - Branding & Project Name */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Project Name
            </h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Your Branding Tagline
            </p>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '1px' }}>
            F&H Brothers
          </div>
        </header>

        {/* Footer - Links & Name */}
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', opacity: 0.8, borderBottom: '1px solid transparent', transition: '0.2s' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Twitter</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', opacity: 0.8, borderBottom: '1px solid transparent', transition: '0.2s' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>GitHub</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', opacity: 0.8, borderBottom: '1px solid transparent', transition: '0.2s' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>Instagram</a>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.4, letterSpacing: '1px' }}>
            © 2026 Your Name
          </div>
        </footer>

      </div>
    </div>
  )
}

export default App
