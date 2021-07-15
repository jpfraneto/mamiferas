import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='landingTitle'>Mamíferas</h1>
          <p className='lead'>
            Recordando lo que se ha olvidado / Honrando el ser madre.
          </p>
          <p className='lead'>
            Este proyecto está en construcción. Cualquier comentario que pueda
            aportar a su desarrollo es absolutamente bienvenido, porque como
            desarrollador necesito entender qué es lo que tiene que pasar en
            este lugar para que pueda transformarse en un espacio que es capaz
            de alegrarte todos los días. Mi nombre es jp, mi correo es
            jpfraneto@gmail.com, y está siempre abierto para quien quiera
            ayudarme. Muchas gracias!!
          </p>
          {!isAuthenticated ? (
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Registrarse
              </Link>
              <Link to='/login' className='btn btn-light'>
                Iniciar Sesión
              </Link>
            </div>
          ) : (
            <div className='buttons'>
              <Link to='/articles' className='btn btn-light'>
                Historias
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
