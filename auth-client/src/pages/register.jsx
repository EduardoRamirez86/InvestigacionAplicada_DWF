import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import '../style/AuthForm.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await register(form.username, form.email, form.password);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Registro</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Usuario" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      <div className="auth-footer-text">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}
