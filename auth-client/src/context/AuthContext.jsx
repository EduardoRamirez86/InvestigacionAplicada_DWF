import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

// Cuando cambie `token`, lo guardamos/eliminamos de localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Derivamos el rol del token
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (token) {
      try { setRole(jwtDecode(token).roles); }
      catch { setRole(null); }
    } else {
      setRole(null);
    }
  }, [token]);

  const login = newToken => setToken(newToken);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
