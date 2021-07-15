import React, { useState } from 'react';
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
      {miracle ? (
        <p>Semanas de gestación: {birthDate}</p>
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
      {showModal && (
        <dialog
          className='dialog'
          style={{ position: 'absolute' }}
          open
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
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
