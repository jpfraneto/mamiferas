import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; //This is for being able to work with redux in this component
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [pregnancyMessage, setPregnancyMessage] = useState('');
  const [exists, setExists] = useState({
    username: false,
    email: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    miracle: '',
    password: '',
    password2: '',
  });

  const { name, email, username, miracle, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger', 2000);
    } else {
      const now = new Date().getTime();
      const miracleTimestamp = new Date(miracle).getTime();
      if (miracleTimestamp < now) {
        setPregnancyMessage(
          'Tu bebé ya nació, felicitaciones! Puedes aprovechar esta plataforma compartiéndonos tu historia de parto'
        );
        return;
      }
      if (miracleTimestamp - now > 40 * 7 * 24 * 60 * 60 * 1000) {
        setPregnancyMessage(
          'Todavía no estás embarazad@, que te vaya muy bien en la campaña!'
        );
        return;
      }
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ email, username });
      const validation = await axios.post(
        'api/users/register-check',
        body,
        config
      );
      if (validation.data.username || validation.data.email) {
        setExists({
          email: validation.data.email,
          username: validation.data.username,
        });
        return;
      }

      // register({ name, email, password, miracle, username });
      // setLoading(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to={'/'} />;
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Registrate</h1>
          <p>
            Bienvenid@ a este lugar, que fue creado para apoyar a papás y mamás
            en su proceso de traer un nuevo ser humano al mundo.{' '}
          </p>
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
                onChange={e => {
                  onChange(e);
                  setExists({ ...exists, email: false });
                }}
              />
              <small className='form-text'>
                Email{' '}
                {exists.email && (
                  <span style={{ color: 'red' }}>
                    Ya existe una cuenta asociada a ese correo electrónico
                  </span>
                )}
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Nombre de Usuario'
                name='username'
                required
                value={username}
                onChange={e => {
                  onChange(e);
                  setExists({ ...exists, username: false });
                }}
              />
              <small className='form-text'>
                Nombre de Usuario{' '}
                {exists.username && (
                  <span style={{ color: 'red' }}>
                    Ya existe una cuenta asociada a ese nombre de usuario
                  </span>
                )}
              </small>
            </div>
            <div className='form-group'>
              <input
                type='date'
                placeholder='Fecha estimada para el parto'
                name='miracle'
                required
                value={miracle}
                onChange={e => {
                  onChange(e);
                  setPregnancyMessage('');
                }}
              />
              <small className='form-text'>
                ¿Cuándo nace tu bebé aproximadamente?{' '}
                {pregnancyMessage && (
                  <span style={{ color: 'red' }}>{pregnancyMessage}</span>
                )}
              </small>
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
            <input
              type='submit'
              className='btn btn-primary'
              value='Registrarse'
            />
          </form>
          <p className='my-1'>
            Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link>
          </p>
        </Fragment>
      )}
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
