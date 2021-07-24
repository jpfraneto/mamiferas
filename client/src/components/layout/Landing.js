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
            Recordando lo que se ha olvidado / Honrando lo que significa traer
            un nuevo ser humano al mundo.
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
              <Link to='/birth-stories' className='btn btn-light'>
                Historias de Parto
              </Link>
              <Link to='/articles' className='btn btn-primary'>
                Crónicas de Embarazo
              </Link>
            </div>
          )}
          <p style={{ position: 'absolute', bottom: 0 }}>
            Para ver la presentación de este proyecto, haz click{' '}
            <Link
              to={{ pathname: 'https://www.youtube.com/watch?v=3aJ8LIR4yjw' }}
              target='_blank'
            >
              acá
            </Link>
          </p>
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
