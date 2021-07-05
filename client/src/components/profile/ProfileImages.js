import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { getProfileImages } from '../../actions/images';

const ProfileImages = ({ getProfileImages, profile: { _id, images } }) => {
  useEffect(() => {
    getProfileImages(_id);
  }, []);
  return (
    <div>
      <h1>Profile Images!</h1>
      <div className='imagesDisplayDiv'>
        <Link to={'/images/1asdasdasdas'}>
          {' '}
          <img src='https://images.agoramedia.com/wte3.0/gcms/how-much-sleep-do-babies-need-alt-722x406.jpg?width=574' />
        </Link>
        <Link to={'/images/2asdasdasdasdsa'}>
          {' '}
          <img src='https://images.agoramedia.com/wte3.0/gcms/Seasonal-Allergies-in-Babies-and-Toddlers-article.jpg?width=185' />
        </Link>
        <Link to={'/images/3sadasdasdas'}>
          {' '}
          <img src='https://images.agoramedia.com/wte3.0/gcms/Sunscreen-for-Babies-What-Parents-Need-to-Know-article.jpg?width=185' />
        </Link>
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
  images: state.images,
});

export default connect(mapStateToProps, { getProfileImages })(ProfileImages);
