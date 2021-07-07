import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ProfileTop = ({
  profile: {
    status,
    company,
    bio,
    imageLink,
    miracle,
    location,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <Link to='/profile-image-update'>
        <img className='round-img' src={imageLink} alt='' />
      </Link>
      <h1 className='large'>{name}</h1>
      {miracle ? (
        <p>
          Mi bebé va a nacer alrededor del{' '}
          <Moment format='DD/MM/YYYY'>{miracle}</Moment>
        </p>
      ) : (
        <p>Todavía no sabemos cuándo va a nacer tu bebé!</p>
      )}

      <p>
        <strong>{location && <span>{location}</span>}</strong>
      </p>
      <div className='icons my-1'>
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {value}
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileTop;
