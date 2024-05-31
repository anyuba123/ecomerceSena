// En UserProfile.js

import React, { useEffect, useState } from 'react';
import { fetchProtectedRoute } from '../helpers/api';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProtectedRoute()
      .then(data => {
        setUserDetails(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {userDetails ? (
        <div>
          <h1>User Details</h1>
          <p>ID: {userDetails.data._id}</p>
          <p>Name: {userDetails.data.name}</p>
          <p>Email: {userDetails.data.email}</p>
          {/* Mostrar más detalles según sea necesario */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
