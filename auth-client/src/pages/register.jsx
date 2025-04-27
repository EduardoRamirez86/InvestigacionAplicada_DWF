import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { register as registerService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../style/AuthForm.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await registerService(form.username, form.email, form.password);
      login(token);  // actualiza estado y localStorage
      const { roles } = jwtDecode(token);
      navigate(roles === 'ROLE_ADMIN' ? '/admin' : '/user');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="auth-title">Registro</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <div className="auth-footer-text">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </motion.div>
  );
}
