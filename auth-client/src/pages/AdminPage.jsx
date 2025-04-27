// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import {
  getAllRopa,
  getRopaById,
  createRopa,
  updateRopa,
  deleteRopa
} from '../services/ropaService';

export default function AdminPage() {
  const [ropaList, setRopaList] = useState([]);
  const [newRopa, setNewRopa] = useState({ nombre: '', precio: '' });
  const [selectedRopa, setSelectedRopa] = useState(null);
  const [editRopa, setEditRopa] = useState({ nombre: '', precio: '' });

  // 1) Cargo la lista y compruebo que cada objeto tenga idRopa
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllRopa();
        console.log('Ropa recibida:', data);
        setRopaList(data);
      } catch (error) {
        console.error('Error cargando la lista de ropa:', error);
      }
    })();
  }, []);

  // 2) Crear
  const handleCreate = async () => {
    try {
      const created = await createRopa(newRopa);
      setRopaList([...ropaList, created]);
      setNewRopa({ nombre: '', precio: '' });
    } catch (error) {
      console.error('Error al crear la prenda:', error);
    }
  };

  // 3) Cargar para editar
  const handleViewDetails = async (idRopa) => {
    if (!idRopa) return console.error('ID inválido en Ver detalles');
    try {
      const ropa = await getRopaById(idRopa);
      setSelectedRopa(ropa);
      setEditRopa({ nombre: ropa.nombre, precio: ropa.precio });
    } catch (error) {
      console.error('Error al obtener detalles:', error);
    }
  };

  // 4) Confirmar edición
  const handleEdit = async () => {
    if (!selectedRopa?.idRopa) {
      return console.error('No hay prenda seleccionada o ID inválido');
    }
    try {
      const updated = await updateRopa(selectedRopa.idRopa, editRopa);
      setRopaList(ropaList.map(r => (r.idRopa === updated.idRopa ? updated : r)));
      setSelectedRopa(null);
      setEditRopa({ nombre: '', precio: '' });
    } catch (error) {
      console.error('Error al actualizar la prenda:', error);
    }
  };

  // 5) Eliminar
  const handleDelete = async (idRopa) => {
    if (!idRopa) return console.error('ID inválido para eliminar');
    try {
      await deleteRopa(idRopa);
      setRopaList(ropaList.filter(r => r.idRopa !== idRopa));
    } catch (error) {
      console.error('Error al eliminar la prenda:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Página de Admin</h2>

      {/* Crear nueva prenda */}
      <section>
        <h3>Crear Nueva Prenda</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newRopa.nombre}
          onChange={e => setNewRopa({ ...newRopa, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newRopa.precio}
          onChange={e => setNewRopa({ ...newRopa, precio: e.target.value })}
        />
        <button onClick={handleCreate}>Crear</button>
      </section>

      {/* Lista de ropa */}
      <section>
        <h3>Lista de Ropa</h3>
        <ul>
          {ropaList.map(ropa => (
            <li key={ropa.idRopa}>
              {ropa.nombre} — ${ropa.precio}
              <button onClick={() => handleViewDetails(ropa.idRopa)}>Ver detalles</button>
              <button onClick={() => handleDelete(ropa.idRopa)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulario de edición */}
      {selectedRopa && selectedRopa.idRopa && (
        <section>
          <h3>Editar Prenda (ID: {selectedRopa.idRopa})</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={editRopa.nombre}
            onChange={e => setEditRopa({ ...editRopa, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            value={editRopa.precio}
            onChange={e => setEditRopa({ ...editRopa, precio: e.target.value })}
          />
          <button onClick={handleEdit}>Actualizar</button>
        </section>
      )}
    </div>
  );
}
