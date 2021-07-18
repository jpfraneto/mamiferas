import React, { Fragment, useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getImage, deleteImage } from '../../actions/image';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ImageDisplay = ({
  auth: { user, isAuthenticated },
  image: { image, globalImages },
  match,
  getImage,
  deleteImage,
}) => {
  let history = useHistory();
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    getImage(globalImages, match.params.id);
    setLoading2(false);
    console.log('la imagen es: ', image);
  }, [getImage]);
  const handleGoBack = () => {
    console.log('inside here!!');
    if (history.location.state) {
      history.push(history.location.state.returnTo);
    } else {
      history.goBack();
    }
  };
  return (
    <Fragment>
      {image === null || image.loading || loading2 ? (
        <Spinner />
      ) : (
        <Fragment>
          <button
            type='button'
            onClick={handleGoBack}
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
              <img
                className='post-image-display'
                src={image.secure_url}
                alt={image.alt}
              />
              <h1>{image.title}</h1>
              <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
                {image.text}
              </ReactMarkdown>
              <p className='post-date'>
                Publicada a las {image.pregnancyDate} el{' '}
                <Moment format='DD/MM/YYYY'>{image.date}</Moment>
                {image.privada &&
                  ' - Esta foto es privada, sólo tú la puedes ver 🔐🤫😳'}
              </p>

              {user && user.username === image.username && (
                <Fragment>
                  <Link
                    to={`/images/${image._id}/edit`}
                    type='button'
                    className='btn btn-primary'
                  >
                    Editar Imagen
                  </Link>
                  <button
                    type='button'
                    onClick={() =>
                      deleteImage(history, user.username, image._id)
                    }
                    className='btn btn-danger'
                  >
                    Eliminar Imagen
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          {image.comments.length > 0 && (
            <h1 className='text-primary'>Comentarios:</h1>
          )}
          <div className='comments'>
            {image.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                imageId={image._id}
              />
            ))}
          </div>
          {isAuthenticated && <CommentForm imageId={image._id} />}
        </Fragment>
      )}
    </Fragment>
  );
};

ImageDisplay.propTypes = {
  getImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth,
});

export default connect(mapStateToProps, { getImage })(ImageDisplay);
