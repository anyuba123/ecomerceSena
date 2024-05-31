// src/helpers/api.js

export async function fetchProtectedRoute() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('https://tu-api.render.com/protected-route', {
      method: 'GET', // o el método que necesites
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // o el formato que uses
      },
      credentials: 'include' // Asegura que las cookies se envíen con la solicitud
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
