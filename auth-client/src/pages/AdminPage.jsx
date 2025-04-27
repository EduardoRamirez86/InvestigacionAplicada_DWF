import React, { useState } from 'react';

import RopaCrud from '../components/RopaCrud';

export default function AdminPage() {
  const [selectedMenu, setSelectedMenu] = useState('ropa');

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Página de Admin</h2>
      <nav>
        <button onClick={() => setSelectedMenu('ropa')}>Ropa</button>
        {/* Add more menu items here if needed */}
      </nav>
      <div style={{ marginTop: '2rem' }}>
        {selectedMenu === 'ropa' && <RopaCrud />}
        {/* Render other components based on selectedMenu */}
      </div>
    </div>
  );
}
