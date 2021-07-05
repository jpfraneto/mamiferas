import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className='profile-about bg-light p-2'>
    {bio ? (
      <Fragment>
        {' '}
        <h2 className='text-primary'>Biografía</h2>
        <p>{bio}</p>
        <div className='line'></div>
      </Fragment>
    ) : (
      <p>No hay Biografía disponible</p>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
