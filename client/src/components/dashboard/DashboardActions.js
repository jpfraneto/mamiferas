import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Editar Perfil
      </Link>
      <Link to='/images/new' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Agregar Imagen
      </Link>
    </div>
  );
};

export default DashboardActions;
