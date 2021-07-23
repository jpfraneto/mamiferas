import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const NewPassword = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [data, setData] = useState({ password: '', password2: '' });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const emailValidation = async () => {
    setLoading(true);
    const body = {
      token: match.params.token,
      email,
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(
      `/api/users/password-recovery/verify-email`,
      body,
      config
    );
    setLoading(false);
    if (res.data.correctEmail) return setEmailVerified(true);
    setServerMessage(res.data.msg);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (data.password !== data.password2)
      return alert('Ambas claves no coinciden, por favor revisalas');
    else {
      const body = {
        token: match.params.token,
        email,
        password: data.password,
      };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.post(
        `/api/users/password-recovery/new-password`,
        body,
        config
      );
      setLoading(false);
      if (res.data.success) return setSuccess(true);
      setSuccess(false);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Recupera tu Clave</h1>

          {emailVerified ? (
            success ? (
              <Fragment>
                <p>
                  Se actualizó tu clave, ahora puedes ingresar nuevamente{' '}
                  <Link to='/login'>acá</Link>
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <p>Agregar nueva clave para el correo {email}</p>
                <form
                  className='form'
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className='form-group'>
                    <input
                      type='password'
                      placeholder='Nueva Clave'
                      name='password'
                      value={data.password}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Clave</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      placeholder='Confirma tu nueva clave'
                      name='password2'
                      value={data.password2}
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
              </Fragment>
            )
          ) : (
            <Fragment>
              <p>
                Por favor ingresa tu correo electrónico para cambiar tu clave:
              </p>
              <form
                className='form'
                onSubmit={e => {
                  emailValidation(e);
                }}
              >
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='hola@human-music.com'
                    name='email'
                    required
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                  <small className='form-text'>Correo Electrónico</small>
                  {serverMessage && (
                    <p style={{ color: 'red' }}>
                      {serverMessage} <Link to='/password-recovery'>acá</Link>
                    </p>
                  )}
                </div>
                <input
                  type='submit'
                  className='btn btn-primary'
                  value='Verificar Correo'
                />
              </form>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewPassword;
