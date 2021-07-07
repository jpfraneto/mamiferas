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
  profile: { username, _id },
}) => {
  useEffect(() => {
    getProfileImages(_id);
  }, [getProfileImages]);
  return (
    <div>
      <div className='images-display-div'>
        {images.length > 0 ? (
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
        <Link to={'/images/new'}>
          <button className='btn btn-success'>Agregar Foto</button>
        </Link>
      </div>
    </div>
  );
};

ProfileImages.propTypes = {
  getProfileImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  images: state.image.images,
});

export default connect(mapStateToProps, { getProfileImages })(ProfileImages);
