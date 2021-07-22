import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      {/* <NavItem
        name={'Recursos'}
        linkRoute={'resources'}
        elements={[
          'Parto',
          'Puerperio',
          'Embarazo',
          'Lactancia',
          'Crianza',
          'Relaciones',
        ]}
      /> */}
      <NavItem name={'Recursos'} linkRoute={'resources'} />
      <NavItem name={'Historias de Parto'} linkRoute={'birth-stories'} />
      <NavItem name={'Crónicas de Embarazo'} linkRoute={'articles'} />
      <NavItem name={'Perfiles'} linkRoute={'profiles'} />

      <li>
        <Link to={isAuthenticated ? `/profile/${user.username}` : '/'}>
          <FontAwesomeIcon icon={faUser} />{' '}
          <span className='hide-sm'>Mi Perfil</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to=''>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Cerrar Sesión</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <NavItem
        name={'Recursos'}
        linkRoute={'resources'}
        elements={[
          'Parto',
          'Puerperio',
          'Embarazo',
          'Lactancia',
          'Crianza',
          'Relaciones',
        ]}
      /> */}
      <NavItem name={'Recursos'} linkRoute={'resources'} />
      <NavItem name={'Historias de Parto'} linkRoute={'birth-stories'} />
      <NavItem name={'Registrarse'} linkRoute={'register'} />
      <NavItem name={'Iniciar Sesión'} linkRoute={'login'} />
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
