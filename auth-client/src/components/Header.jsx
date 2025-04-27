import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../style/Header.css';

export default function Header() {
  const { token, role, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <motion.header
      className="header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header__brand">
        <Link to="/">MiApp</Link>
      </div>
      <nav className="header__nav">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {token && (
          <>
            {role === 'ROLE_ADMIN' && <Link to="/admin">Admin</Link>}
            {role === 'ROLE_USER'  && <Link to="/user">User</Link>}
            <button
              className="header__logout-btn"
              onClick={() => {
                logout();           // quita token del estado y del localStorage
                navigate('/login'); // redirige a login
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </motion.header>
  );
}
