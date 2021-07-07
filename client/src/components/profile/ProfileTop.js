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
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <Link to='/profile-image-update'>
        {imageLink ? (
          <img className='round-img' src={imageLink} alt='' />
        ) : (
          <img
            className='round-img'
            src='https://howtoapps.com/wp-content/uploads/2020/01/b9ed581c-cute-profile-pic-8-600x400.jpg'
            alt=''
          />
        )}
      </Link>
      <h1 className='large'>{name}</h1>
      <p className='lead'>{bio}</p>
      {miracle ? (
        <p>
          Mi bebé va a nacer alrededor del{' '}
          <Moment format='DD/MM/YYYY'>{miracle}</Moment>
        </p>
      ) : (
        <p>¿Cuándo va a nacer tu bebé? Edita tu perfil para contarnos</p>
      )}

      <p>
        <strong>{location && <span>{location}</span>}</strong>
      </p>
      <div className='icons my-1'>
        {website ? (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x' />
          </a>
        ) : null}
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
