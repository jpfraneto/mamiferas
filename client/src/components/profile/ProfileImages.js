import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileImages } from '../../actions/images';

const ProfileImages = ({ getProfileImages, match, images }) => {
  useEffect(async () => {
    getProfileImages(match.params.id);
  }, [getProfileImages]);
  return (
    <div>
      <button
        onClick={() => {
          console.log('inside here!');
          console.log(images);
        }}
      ></button>
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
