import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileImages from './ProfileImages';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Volver a papás
          </Link>
          {auth.isAuthenticated && auth.loading === false && (
            <Link to='/images/new' className='btn btn-success'>
              Agregar Imagen
            </Link>
          )}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Editar Perfil
              </Link>
            )}

          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            {profile.images && <ProfileImages profile={profile} />}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
