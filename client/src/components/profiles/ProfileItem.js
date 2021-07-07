import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    username,
    imageLink,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={imageLink} alt='' />
      <div>
        <h2>{name}</h2>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${username}`} className='btn btn-primary'>
          Ver Perfil
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
