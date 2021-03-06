import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const EditProfile = ({
  profile: { profile, loading },
  updateProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    username: '',
    miracle: '',
    location: '',
    bio: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      username: loading || !profile.username ? '' : profile.username,
      miracle: loading || !profile.miracle ? '' : profile.miracle,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const {
    username,
    miracle,
    bio,
    location,
    youtube,
    facebook,
    twitter,
    instagram,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formData, history, username);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edita tu perfil</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Agrega información para poder conectar
        mejor con otras personas
      </p>
      <Link to='/profile-image-update'>
        <img className='round-img-for-update' src={profile.imageLink} alt='' />
        <br />
        Actualizar Foto de Perfil
      </Link>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Ubicación'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            ¿Dónde pasas la mayor parte de tu tiempo?
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='Corta biografía de ti'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Cuéntanos lo que quieras acerca de ti.
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Agregar redes sociales.
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <p>
              Agrega la dirección de tu cuenta en las siguientes Redes Sociales:
            </p>
            <div className='form-group '>
              <FontAwesomeIcon icon={faTwitter} />
              <input
                type='text'
                placeholder='Twitter'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <FontAwesomeIcon icon={faFacebook} />
              <input
                type='text'
                placeholder='Facebook'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group '>
              <FontAwesomeIcon icon={faYoutube} />
              <input
                type='text'
                placeholder='YouTube'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <FontAwesomeIcon icon={faInstagram} />
              <input
                type='text'
                placeholder='Instagram'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link
          className='btn btn-light my-1'
          to={`/profile/${profile.username}`}
        >
          Atrás
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
