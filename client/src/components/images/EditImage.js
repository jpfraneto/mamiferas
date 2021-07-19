import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteImage } from '../../actions/image';
import { updateImage } from '../../actions/image';

const EditImage = ({ updateImage, image, auth: { user, isAuthenticated } }) => {
  let history = useHistory();
  const [data, setData] = useState({
    title: image.title,
    text: image.text,
    id: image._id,
    privada: image.privada,
  });
  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    updateImage(history, data);
  };

  const togglePrivada = e => {
    e.target.checked
      ? setData({ ...data, privada: true })
      : setData({ ...data, privada: false });
  };

  return (
    <Fragment>
      {image && image.username === user.username ? (
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
              <Link to={`/profile/${image.username}`}>
                <img className='round-img' src={image.avatar} alt='' />
                <h4>{image.name}</h4>
              </Link>
            </div>
            <div>
              {image.secure_url.length > 0 && (
                <img
                  className='post-image-display'
                  src={image.secure_url}
                  alt={image.alt}
                />
              )}
              <form onSubmit={e => handleSubmit(e)}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='title'
                    value={data.title}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    type='text'
                    className='form-control'
                    rows='16'
                    cols='44'
                    name='text'
                    value={data.text}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='checkbox'
                    name='privada'
                    checked={data.privada}
                    onChange={e => togglePrivada(e)}
                  />
                  <label htmlFor='privada'>
                    {' '}
                    Quiero que esté disponible solo para mí.
                  </label>
                </div>
                <p className='post-date'>
                  Publicada a las {image.pregnancyDate} el{' '}
                  <Moment format='DD/MM/YYYY'>{image.date}</Moment>
                  {data.privada &&
                    ' - Esta crónica es privada, sólo tú la puedes ver 🔐🤫😳'}
                </p>
                <button type='submit' className='btn btn-primary'>
                  Actualizar
                </button>
                <button
                  type='button'
                  onClick={() => deleteImage(history, user.username, image._id)}
                  className='btn btn-danger'
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      ) : (
        <p>Lo lamentamos, pero no puedes editar esta imagen!</p>
      )}
    </Fragment>
  );
};

EditImage.propTypes = {
  image: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  image: state.image.image,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateImage })(EditImage);
