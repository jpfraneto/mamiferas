import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt='Cargando...'
    />
    <p style={{ textAlign: 'center' }}>Cargando...</p>
  </Fragment>
);

export default Spinner;
