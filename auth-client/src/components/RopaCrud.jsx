// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import MySwal from '../utils/swal';
import {
  getAllRopa,
  getRopaById,
  createRopa,
  updateRopa,
  deleteRopa
} from '../services/ropaService';

export default function RopaCrud() {
  const [ropaList, setRopaList] = useState([]);
  const [newRopa, setNewRopa] = useState({ nombre: '', precio: '' });
  const [selectedRopa, setSelectedRopa] = useState(null);
  const [editRopa, setEditRopa] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllRopa();
        setRopaList(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleCreate = async () => {
    try {
      const created = await createRopa(newRopa);
      setRopaList([...ropaList, created]);
      setNewRopa({ nombre: '', precio: '' });
      await MySwal.fire({
        icon: 'success',
        title: '¡Prenda creada!',
        text: `La prenda "${created.nombre}" se agregó correctamente.`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (e) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la prenda.'
      });
    }
  };

  const handleViewDetails = async (idRopa) => {
    try {
      const ropa = await getRopaById(idRopa);
      setSelectedRopa(ropa);
      setEditRopa({ nombre: ropa.nombre, precio: ropa.precio });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async () => {
    if (!selectedRopa?.idRopa) return;
    try {
      const updated = await updateRopa(selectedRopa.idRopa, editRopa);
      setRopaList(ropaList.map(r => (r.idRopa === updated.idRopa ? updated : r)));
      setSelectedRopa(null);
      setEditRopa({ nombre: '', precio: '' });
      await MySwal.fire({
        icon: 'success',
        title: '¡Prenda actualizada!',
        text: `La prenda "${updated.nombre}" se actualizó correctamente.`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (e) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la prenda.'
      });
    }
  };

  const handleDelete = async (idRopa) => {
    try {
      await deleteRopa(idRopa);
      setRopaList(ropaList.filter(r => r.idRopa !== idRopa));
      await MySwal.fire({
        icon: 'success',
        title: '¡Prenda eliminada!',
        text: `La prenda ha sido eliminada.`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (e) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la prenda.'
      });
    }
  };

  return (
    <div className="admin-container">
      <section>
        <h4>Crear Nueva Prenda</h4>
        <input
          placeholder="Nombre"
          value={newRopa.nombre}
          onChange={e => setNewRopa({ ...newRopa, nombre: e.target.value })}
        />
        <input
          placeholder="Precio"
          type="number"
          value={newRopa.precio}
          onChange={e => setNewRopa({ ...newRopa, precio: e.target.value })}
        />
        <button onClick={handleCreate}>Crear</button>
      </section>

      <section>
        <h4>Lista de Ropa</h4>
        <ul>
          {ropaList.map(ropa => (
            <li key={ropa.idRopa}>
              {ropa.nombre} — ${ropa.precio}
              <button onClick={() => handleViewDetails(ropa.idRopa)}>
                Ver detalles
              </button>
              <button onClick={() => handleDelete(ropa.idRopa)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>

      {selectedRopa && (
        <section>
          <h4>Editar Prenda (ID: {selectedRopa.idRopa})</h4>
          <input
            placeholder="Nombre"
            value={editRopa.nombre}
            onChange={e => setEditRopa({ ...editRopa, nombre: e.target.value })}
          />
          <input
            placeholder="Precio"
            type="number"
            value={editRopa.precio}
            onChange={e => setEditRopa({ ...editRopa, precio: e.target.value })}
          />
          <button onClick={handleEdit}>Actualizar</button>
        </section>
      )}
    </div>
  );
}
