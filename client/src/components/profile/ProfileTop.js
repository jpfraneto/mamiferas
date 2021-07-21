import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import functions from '../../utils/functions';

const ProfileTop = ({
  profile: {
    status,
    company,
    bio,
    imageLink,
    miracle,
    babyBorn,
    location,
    social,
    images,
    user: { name, avatar },
  },
  user,
  birthDate,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='profile-top bg-primary p-2'>
      <img
        onClick={() => {
          setShowModal(!showModal);
        }}
        className='round-img'
        src={imageLink}
        alt=''
      />
      <h1 className='large'>{name}</h1>
      <p>
        <strong>{location && <span>{location}</span>}</strong>
      </p>
      {!babyBorn ? (
        <Fragment>
          <p>
            Semanas de gestación: {birthDate} - Faltan{' '}
            {functions.calculateRemainingDays(miracle)} días para que nazca el
            bebé.
          </p>
          <p>
            Si es que ya nació, agrega una{' '}
            <Link type='button' className='btn' to='/birth-stories/new'>
              Historia de Parto
            </Link>
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Felicitaciones por tu bebé! Acá está tu{' '}
            <Link
              to={`/birth-stories/${images._id}`}
              className='btn btn-success'
            >
              Historia de Parto
            </Link>
          </p>
        </Fragment>
      )}

      <div className='icons'>
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
      {showModal && (
        <dialog
          className='dialog'
          style={{ position: 'absolute' }}
          open
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <p style={{ position: 'absolute', margin: '10px 10px' }}>❌ Cerrar</p>
          <img
            className='modal-image-display'
            src={imageLink}
            onClick={() => {
              setShowModal(!showModal);
            }}
            alt='no image'
          />
          <br></br>
          <p>{name}</p>
          <button>Close</button>
        </dialog>
      )}
    </div>
  );
};

ProfileTop.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileTop;
