import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; //This is for being able to work with redux in this component
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { name, email, username, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger', 2000);
    } else {
      register({ name, email, password, username });
    }
  };

  if (isAuthenticated) {
    return <Redirect to={'/me'} />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Registrate</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Crea tu cuenta
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nombre Completo'
            name='name'
            required
            value={name}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Nombre Completo</small>
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            required
            value={email}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Email</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nombre de Usuario'
            name='username'
            required
            value={username}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Nombre de Usuario</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Clave'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Clave</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirma tu clave'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Confirma tu Clave</small>
        </div>
        <input type='submit' className='btn btn-primary' value='Registrarse' />
      </form>
      <p className='my-1'>
        Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
