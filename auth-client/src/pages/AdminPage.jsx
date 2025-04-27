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
    } catch (e) {
      console.error(e);
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
      setRopaList(ropaList.map(r => 
        r.idRopa === updated.idRopa ? updated : r
      ));
      setSelectedRopa(null);
      setEditRopa({ nombre: '', precio: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (idRopa) => {
    try {
      await deleteRopa(idRopa);
      setRopaList(ropaList.filter(r => r.idRopa !== idRopa));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Página de Admin</h2>

      <section>
        <h3>Crear Nueva Prenda</h3>
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
        <h3>Lista de Ropa</h3>
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
          <h3>Editar Prenda (ID: {selectedRopa.idRopa})</h3>
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
