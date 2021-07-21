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
  const [toggleComment, setToggleComment] = useState(true);
  useEffect(() => {
    console.log('inside here! the image is: ', image);
    console.log('the match.params.id is', match.params.id);
    getImage(globalImages, match.params.id);
    setLoading2(false);
  }, [getImage]);
  const handleGoBack = () => {
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
          <Link to='/birth-stories' className='btn btn-light'>
            Volver a Historias de Parto
          </Link>
          <div className='post bg-white p-1 my-1'>
            <div>
              {image.systemUser ? (
                <Link to={`/profile/${image.username}`}>
                  <img className='round-img' src={image.avatar} alt='' />
                  <h4>{image.name}</h4>
                </Link>
              ) : (
                <Fragment>
                  <img className='round-img' src={image.avatar} alt='' />
                  <h4>{image.name}</h4>
                  <small>Invitad@</small>
                </Fragment>
              )}
            </div>
            <div>
              {image.secure_url.length > 0 && (
                <img
                  className='post-image-display'
                  src={image.secure_url}
                  alt={image.alt}
                />
              )}

              <h1>{image.title}</h1>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='text-body'
              >
                {image.text}
              </ReactMarkdown>
              <p className='post-date'>
                Publicada el <Moment format='DD/MM/YYYY'>{image.date}</Moment>
                {image.privada &&
                  ' - Esta historia es privada, sólo tú la puedes ver 🔐🤫😳'}
              </p>

              {user && user.username === image.username && (
                <Fragment>
                  <Link
                    to={`/birth-stories/${image._id}/edit`}
                    type='button'
                    className='btn btn-primary'
                  >
                    Editar
                  </Link>
                  <button
                    type='button'
                    onClick={() =>
                      deleteImage(history, user.username, image._id)
                    }
                    className='btn btn-danger'
                  >
                    Eliminar
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
          {toggleComment && (
            <CommentForm
              imageId={image._id}
              username={user ? user.username : ''}
              setLoading2={setLoading2}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ImageDisplay.propTypes = {
  getImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth,
});

export default connect(mapStateToProps, { getImage, deleteImage })(
  ImageDisplay
);
