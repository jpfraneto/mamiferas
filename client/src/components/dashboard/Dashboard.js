import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Mi Perfil</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Bienvenid@ {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />

          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              Eliminar mi cuenta
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Si es que todavía no creas tu perfil, por favor agrega información
            para que otros papás conecten contigo
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Crear Perfil
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
