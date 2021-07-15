import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { getProfileImages } from '../../actions/images';

const ProfileImages = ({
  images,
  getProfileImages,
  loggedInUsername,
  profile: { username, _id },
}) => {
  useEffect(() => {
    getProfileImages(_id);
  }, [getProfileImages]);
  return (
    <div>
      <div className='images-display-div'>
        <div className='profile-about bg-light p-2'>
          {images && images.length > 0 ? (
            <Fragment>
              <h1>
                Fotos compartidas por <strong>{username}</strong>
              </h1>
              {images.map((image, index) => (
                <Link key={index} to={`/images/${image._id}`}>
                  {' '}
                  <img alt={image.alt} src={image.secure_url} />
                </Link>
              ))}
            </Fragment>
          ) : (
            <h1>{username} todavía no comparte ninguna foto.</h1>
          )}
          <br />
          {loggedInUsername === username && (
            <Link to={'/images/new'}>
              <button className='btn btn-success'>Agregar Foto</button>
            </Link>
          )}
        </div>
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
