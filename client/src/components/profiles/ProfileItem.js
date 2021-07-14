import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import functions from '../../utils/functions';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    articles,
    location,
    username,
    miracle,
    imageLink,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={imageLink} alt='' />
      <div>
        <h2>{name}</h2>
        <p className='my-1'>
          {miracle ? (
            <span>
              Semanas de Gestación: {functions.calculateWeekFromNow(miracle)} 🍼
            </span>
          ) : (
            <span>Aún no sabemos cuándo nace su bebé</span>
          )}
        </p>
        <p>Ha escrito {articles.length} historias</p>
        <p className='my-1'>{location && <span>🌏🗺 {location}</span>}</p>
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
