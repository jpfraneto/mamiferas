import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import functions from '../../utils/functions';
import Moment from 'react-moment';
import { uploadImage } from '../../actions/image';
import { getCurrentProfile } from '../../actions/profile';

const AddImage = ({ auth: { user }, uploadImage }) => {
  let history = useHistory();
  const [fileInputState, setFileInputState] = useState('');
  const [imageData, setImageData] = useState({
    title: '',
    date: '072021VII',
    text: '',
    previewSource: '',
    preview: false,
    privada: false,
    uploading: false,
  });

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = file => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageData({
          ...imageData,
          previewSource: reader.result,
          preview: true,
        });
      };
    } else {
      setImageData({ ...imageData, previewSource: '' });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!imageData.previewSource && !imageData.title && !imageData.text) {
      alert(
        'Por favor agrega la información necesaria para poder subir la foto!'
      );
    }
    setImageData({ ...imageData, uploading: true });
    uploadImage(imageData, history, user.username);
  };

  const onChange = e =>
    setImageData({ ...imageData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {!imageData.uploading ? (
        <Fragment>
          <button
            type='button'
            onClick={() => history.goBack()}
            className='btn btn-light'
          >
            Volver
          </button>

          <div className='post bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${user.username}`}>
                <img className='round-img' src={user.avatar} alt='' />
                <h4>{user.name}</h4>
              </Link>
            </div>
            <div>
              {imageData.previewSource && (
                <img
                  src={imageData.previewSource}
                  alt='Image for Upload'
                  className='post-image-display'
                />
              )}
              <form onSubmit={e => handleSubmit(e)}>
                <div className='form-group'>
                  <label>Título: </label>
                  <br />
                  <input
                    type='text'
                    className='form-control'
                    name='title'
                    value={imageData.title}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <label>Texto: </label>
                  <br />
                  <textarea
                    type='text'
                    className='form-control'
                    rows='16'
                    cols='44'
                    name='text'
                    value={imageData.text}
                    onChange={e => onChange(e)}
                  />
                </div>
                <input
                  onChange={handleFileInputChange}
                  type='file'
                  name='image'
                />

                <p className='post-date'>
                  Publicada a las {functions.calculateWeekFromNow(user.miracle)}{' '}
                  el <Moment format='DD/MM/YYYY'>{new Date()}</Moment>
                  {imageData.privada &&
                    ' - Esta foto es privada, sólo tú la puedes ver 🔐🤫😳'}
                </p>

                <button type='submit' className='btn btn-primary'>
                  Subir Imagen
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};

AddImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage, getCurrentProfile })(
  AddImage
);
