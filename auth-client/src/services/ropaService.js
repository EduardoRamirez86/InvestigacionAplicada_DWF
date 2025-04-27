// src/services/ropaService.js
const API_URL = "http://localhost:8080/auth/ropa";

const getToken = () => localStorage.getItem('token');

// Obtener todas las prendas (pública)
export const getAllRopa = async () => {
  const resp = await fetch(API_URL);
  if (!resp.ok) throw new Error('No se pudo obtener la lista');
  return resp.json();
};

// Crear una nueva prenda (ADMIN)
export const createRopa = async (ropa) => {
  const token = getToken();
  if (!token) throw new Error('Token no encontrado');
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`   // ← Incluimos el token :contentReference[oaicite:3]{index=3}
    },
    body: JSON.stringify(ropa),
  });
  if (!resp.ok) throw new Error('Error al crear prenda');
  return resp.json();
};

// Actualizar una prenda (ADMIN)
export const updateRopa = async (idRopa, ropa) => {
  const token = getToken();
  if (!token) throw new Error('Token no encontrado');
  const resp = await fetch(`${API_URL}/${idRopa}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`   // ← Incluimos el token :contentReference[oaicite:4]{index=4}
    },
    body: JSON.stringify(ropa),
  });
  if (!resp.ok) throw new Error(`Error al actualizar ${idRopa}`);
  return resp.json();
};

// Eliminar una prenda (ADMIN)
export const deleteRopa = async (idRopa) => {
  const token = getToken();
  if (!token) throw new Error('Token no encontrado');
  const resp = await fetch(`${API_URL}/${idRopa}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`   // ← Ya lo tenías aquí
    }
  });
  if (!resp.ok) throw new Error(`Error al eliminar ${idRopa}`);
  return { success: true };
};

export const getRopaById = async (idRopa) => {
    if (!idRopa) throw new Error('ID no proporcionado para getRopaById');
    const resp = await fetch(`${API_URL}/${idRopa}`);
    if (!resp.ok) throw new Error(`Prenda ${idRopa} no encontrada`);
    return resp.json();
  };