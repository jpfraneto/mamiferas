import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import functions from '../../utils/functions';
import { getProfileImages } from '../../actions/image';

const ProfileImages = ({
  images,
  getProfileImages,
  loggedInUsername,
  profile: { username, _id, miracle },
}) => {
  useEffect(() => {
    getProfileImages(_id);
  }, [getProfileImages]);
  return (
    <div>
      <div className='profile-images bg-light p-2'>
        {images && images.length > 0 ? (
          <Fragment>
            <h1>
              Historias de Parto compartidas por <strong>{username}</strong>
            </h1>
            {images.map((image, index) => (
              <Link key={index} to={`/images/${image._id}`}>
                {' '}
                <img alt={image.alt} src={image.secure_url} />
              </Link>
            ))}
          </Fragment>
        ) : (
          <h1>
            Faltan {functions.calculateRemainingDays(miracle)} días para que
            nazca su bebé.
          </h1>
        )}
        <br />
        {loggedInUsername === username && (
          <Fragment>
            <p>Ya nació?</p>
            <Link to={'/birth-stories/new'}>
              <button className='btn btn-success'>
                Agregar Historia de Parto
              </button>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

ProfileImages.propTypes = {
  getProfileImages: PropTypes.func.isRequired,
  loggedInUsername: PropTypes.string.isRequired,
  images: PropTypes.array,
};

const mapStateToProps = state => ({
  images: state.image.userImages,
  loggedInUsername: state.auth.user.username,
});

export default connect(mapStateToProps, { getProfileImages })(ProfileImages);
