import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import functions from '../../utils/functions';
import Moment from 'react-moment';
import { uploadImage } from '../../actions/image';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { getCurrentProfile } from '../../actions/profile';

const AddImage = ({ auth: { user }, uploadImage }) => {
  let history = useHistory();
  const [fileInputState, setFileInputState] = useState('');
  const [imageData, setImageData] = useState({
    title: '',
    username: '',
    text: '',
    name: '',
    previewSource: '',
    preview: false,
    privada: false,
    uploading: false,
    fileName: '',
    imageType: 'birth-history',
  });

  useEffect(() => {
    if (user)
      setImageData({ ...imageData, username: user.username, name: user.name });
  }, []);

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
          fileName: file.name,
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
    if (!imageData.title && !imageData.text) {
      alert(
        'Por favor agrega la información necesaria para poder subir la foto!'
      );
    }
    setImageData({ ...imageData, uploading: true });
    uploadImage(imageData, history);
  };

  const togglePreview = e => {
    setImageData({ ...imageData, preview: !imageData.preview });
  };

  const togglePrivada = e => {
    e.target.checked
      ? setImageData({ ...imageData, privada: true })
      : setImageData({ ...imageData, privada: false });
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

          <Fragment>
            {!imageData.preview && (
              <Fragment>
                <h1 className=' text-primary'>
                  Agregar Nueva Historia de Parto
                </h1>
                <div className='post bg-white p-1 my-1'>
                  <div>
                    <Link
                      to={
                        user && user.username ? `/profile/${user.username}` : ''
                      }
                    >
                      <img
                        className='round-img'
                        src={
                          user && user.avatar
                            ? user.avatar
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1600px-Baby_Face.JPG'
                        }
                        alt=''
                      />
                      <h4>{imageData.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <form onSubmit={e => handleSubmit(e)}>
                      {!user && (
                        <div className='form-group'>
                          <label>Tu Nombre: </label>
                          <br />
                          <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={imageData.name}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      )}

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
                        <label>Escribe acá: </label>
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
                      <div className='form-group'>
                        <label>¿Quiéres agregar una imagen? </label>
                        <br />
                        <input
                          onChange={handleFileInputChange}
                          type='file'
                          name='image'
                        />
                      </div>

                      <p className='post-date'>
                        Publicada{' '}
                        {user &&
                          user.miracle &&
                          `a las ${functions.calculateWeekFromNow(
                            user.miracle
                          )}`}{' '}
                        el <Moment format='DD/MM/YYYY'>{new Date()}</Moment>
                        {imageData.privada &&
                          ' - Es privada, sólo tú la puedes ver 🔐🤫😳'}
                      </p>

                      <button
                        onClick={() => togglePreview()}
                        className='btn btn-primary'
                      >
                        Previsualizar
                      </button>

                      <button
                        onClick={handleSubmit}
                        className='btn btn-primary'
                      >
                        Subir
                      </button>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
            {imageData.preview && (
              <Fragment>
                <h1 className=' text-primary'>
                  Así se va a ver tu historia publicada
                </h1>
                <div className='post bg-white p-1 my-1'>
                  <div>
                    <Link
                      to={
                        user && user.username ? `/profile/${user.username}` : ''
                      }
                    >
                      <img
                        className='round-img'
                        src={
                          user && user.avatar
                            ? user.avatar
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1600px-Baby_Face.JPG'
                        }
                        alt=''
                      />
                      <h4>{imageData.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <img
                      className='post-image-display'
                      src={imageData.previewSource}
                      alt='Preview Image'
                    />
                    <h1>{imageData.title}</h1>
                    <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
                      {imageData.text}
                    </ReactMarkdown>
                    <p className='post-date'>
                      Publicada{' '}
                      {user &&
                        user.miracle &&
                        `a las ${functions.calculateWeekFromNow(
                          user.miracle
                        )}`}{' '}
                      el <Moment format='DD/MM/YYYY'>{new Date()}</Moment>
                      {imageData.privada &&
                        ' - Es privada, sólo tú la puedes ver 🔐🤫😳'}
                    </p>
                    <button
                      onClick={() => togglePreview()}
                      className='btn btn-primary'
                    >
                      Editar
                    </button>
                    <button onClick={handleSubmit} className='btn btn-success'>
                      Subir Imagen
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
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
