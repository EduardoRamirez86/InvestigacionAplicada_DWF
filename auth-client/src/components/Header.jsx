import { Link } from 'react-router-dom';
import '../style/Header.css';

export default function Header() {
  const token = localStorage.getItem('token');

  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          MiApp
        </Link>
      </div>
      <nav className="header__nav">
        {token
          ? <>
              <Link to="/dashboard">Dashboard</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  cursor: 'pointer',
                  marginLeft: '1rem'
                }}
              >
                Logout
              </button>
            </>
          : <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
        }
      </nav>
    </header>
  );
}
