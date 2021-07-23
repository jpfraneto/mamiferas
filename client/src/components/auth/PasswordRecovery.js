import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; //This is for being able to work with redux in this component
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const PasswordRecovery = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email });
    const res = await axios.post('api/users/password-recovery', body, config);
    setLoading(false);
    setMessage(res.data.msg);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {message ? (
            <Fragment>
              <h1 className='large text-primary'>Listo</h1>
              <p>{message}</p>
              <Link to='/'>Volver al Inicio</Link>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className='large text-primary'>Recupera tu Clave</h1>
              <p>
                Si no te acuerdas de tu contraseña, ingresa tu correo acá y te
                enviaremos la información necesaria para recuperarla.
              </p>

              <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='hola@human-music.com'
                    name='email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <small className='form-text'>
                    Ingresa tu correo electrónico para recuperar tu clave
                  </small>
                </div>

                <input
                  type='submit'
                  className='btn btn-primary'
                  value='Enviar'
                />
              </form>
              <p className='my-1'>
                ¿Te acordaste de tu clave?{' '}
                <Link to='/login'>Iniciar Sesión</Link>
              </p>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PasswordRecovery;
