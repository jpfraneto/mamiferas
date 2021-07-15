import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { uploadImage } from '../../actions/images';
import { getCurrentProfile } from '../../actions/profile';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const AddImage = ({ auth: { user }, uploadImage, history }) => {
  let historyLog = useHistory();
  const [fileInputState, setFileInputState] = useState('');
  const [imageData, setImageData] = useState({
    title: '',
    date: '072021VII',
    text: '',
    previewSource: '',
    preview: false,
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
        setImageData({ ...imageData, previewSource: reader.result });
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

  const togglePreview = preview => {
    if (imageData.title && imageData.text)
      setImageData({ ...imageData, preview: preview });
    else alert('Por favor agrega un título y un texto para la imagen!');
  };

  return (
    <Fragment>
      {!imageData.uploading ? (
        <div>
          <h1 style={{ textAlign: 'center' }}>Agregar una nueva foto</h1>
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
                    <Link to={`/profile/${user.username}`}>
                      {user.username}
                    </Link>
                  </strong>{' '}
                  - {imageData.date}
                </p>
                <h1>{imageData.title}</h1>
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  children={'string'}
                  className='imageText'
                >
                  {imageData.text}
                </ReactMarkdown>
              </Fragment>
            )}

            <hr />
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleFileInputChange}
                type='file'
                name='image'
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
                <label>¿Qué te gustaría decir?: </label>
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

            <a onClick={() => historyLog.goBack()}>Volver</a>
          </div>
        </div>
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
