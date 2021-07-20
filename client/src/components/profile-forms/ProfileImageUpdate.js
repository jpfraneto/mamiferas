import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddImage from '../images/AddImage';
import { getCurrentProfile } from '../../actions/profile';
import { updateProfilePicture } from '../../actions/image';

const ProfileImageUpdate = ({
  profile: { profile, loading },
  getCurrentProfile,
  history,
  updateProfilePicture,
}) => {
  const [loading2, setLoading2] = useState(false);
  const [imageData, setImageData] = useState({ previewSource: '' });
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData({ ...imageData, previewSource: reader.result });
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!imageData.previewSource) return;
    setLoading2(true);
    updateProfilePicture(history, imageData, profile.username);
  };
  return (
    <Fragment>
      {profile === null || loading || loading2 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h4>Elegir una nueva foto de perfil</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='file'
              name='profile-image'
              onChange={handleFileInputChange}
            />
            <img
              src={
                imageData.previewSource
                  ? imageData.previewSource
                  : profile.imageLink
              }
              className='profile-image-display round-img my-1'
              alt='chosen'
              style={{ height: '300px', width: 'auto' }}
            />
            <br />
            <button
              className='form-input btn btn-success'
              type='submit'
              value='Actualizar'
            >
              Actualizar
            </button>
            <Link className='btn' to='/me'>
              Volver a tu Perfil
            </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileImageUpdate.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfilePicture,
})(ProfileImageUpdate);
