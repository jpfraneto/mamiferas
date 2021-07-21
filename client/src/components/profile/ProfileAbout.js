import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import functions from '../../utils/functions';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    miracle,
    user: { name },
  },
}) => (
  <div className='profile-about bg-light p-2'>
    <Fragment>
      {' '}
      <h2 className='text-primary'>Acerca de Mi</h2>
      <p>
        {bio ? (
          bio
        ) : (
          <Fragment>
            <p>No hay biografía disponible aún</p>
            <Link to='/edit-profile' className='btn btn-dark'>
              Agregar biografía
            </Link>
          </Fragment>
        )}
      </p>
    </Fragment>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
