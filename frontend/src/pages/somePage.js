// src/pages/SomePage.js

import React, { useEffect, useState } from 'react';
import { fetchProtectedRoute } from '../helpers/api';

const SomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchProtectedRoute();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          <h1>Datos Protegidos</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default SomePage;
