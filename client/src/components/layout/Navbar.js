import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/images'>Imagenes</Link>
      </li>
      <li>
        <Link to='/posts'>Escribir</Link>
      </li>
      <li>
        <Link to='/me'>
          <FontAwesomeIcon icon={faUser} />{' '}
          <span className='hide-sm'>Mi Perfil</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='#!'>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Cerrar Sesión</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/posts'>Testimonios</Link>
      </li>
      <li>
        <Link to='/resources'>Recursos</Link>
      </li>
      <li>
        <Link to='/register'>Registrarse</Link>
      </li>
      <li>
        <Link to='/login'>Iniciar Sesión</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'> 🌏🤰🏾 Mamíferas</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
