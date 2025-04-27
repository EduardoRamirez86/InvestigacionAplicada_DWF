import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import '../style/AuthForm.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await login(form.username, form.password);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Usuario" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
      <div className="auth-footer-text">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </div>
    </div>
  );
}
