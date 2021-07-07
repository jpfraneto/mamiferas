import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage } from '../../actions/images';
import { getCurrentProfile } from '../../actions/profile';

const AddImage = ({
  profile: { profile },
  uploadImage,
  history,
  getCurrentProfile,
}) => {
  const [fileInputState, setFileInputState] = useState('');
  const [imageData, setImageData] = useState({
    title: '',
    date: '072021VII',
    text: '',
    previewSource: '',
    preview: false,
  });

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
    uploadImage(imageData, history);
  };

  const onChange = e =>
    setImageData({ ...imageData, [e.target.name]: e.target.value });

  const togglePreview = preview => {
    if (imageData.title && imageData.text)
      setImageData({ ...imageData, preview: preview });
    else alert('Por favor agrega un título y un texto para la imagen!');
  };

  return (
    <div>
      <h1>Agregar una nueva imagen</h1>
      <div className='image-display'>
        {imageData.previewSource && (
          <img
            src={imageData.previewSource}
            alt='chosen'
            style={{ height: '300px', width: 'auto' }}
          />
        )}
        {imageData.preview && (
          <Fragment>
            <p>
              <strong>
                <Link to={`/profile/${profile.username}`}>
                  {profile.username}
                </Link>
              </strong>{' '}
              - {imageData.date}
            </p>
            <h1>{imageData.title}</h1>
            <p>{imageData.text}</p>
          </Fragment>
        )}

        <hr />
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleFileInputChange}
            type='file'
            placeholder='Image File'
            name='image'
            className='form-input'
            value={fileInputState}
          />
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
            <label>¿Cómo te sientes?: </label>
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
          <button
            className='btn btn-warning'
            type='button'
            onClick={() => {
              togglePreview(!imageData.preview);
            }}
          >
            {!imageData.preview ? 'Previsualizar' : 'Editar'}
          </button>
          <button className='btn btn-success' type='submit'>
            Subir!
          </button>
        </form>

        <Link to='/images'>Back to Images</Link>
      </div>
    </div>
  );
};

AddImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { uploadImage, getCurrentProfile })(
  AddImage
);
