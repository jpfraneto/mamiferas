import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { getProfileImages } from '../../actions/images';

const ProfileImages = ({ images, getProfileImages, profile: { _id } }) => {
  useEffect(() => {
    getProfileImages(_id);
  }, [getProfileImages]);
  return (
    <div>
      <h1>Profile Images!</h1>
      <button
        onClick={() => {
          console.log(images);
        }}
      >
        Log Images!
      </button>
      <div className='imagesDisplayDiv'>
        {images &&
          images.map((image, index) => (
            <Link to={`/images/${image.username}`}>
              {' '}
              <img key={image._id} alt={image.alt} src={image.secure_url} />
            </Link>
          ))}

        <Link to={'/images/new'}>
          <button>Add Image</button>
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
