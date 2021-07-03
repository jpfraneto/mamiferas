import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImages } from '../../actions/images';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ImagesDisplay = ({ image: { images, loading }, getImages }) => {
  useEffect(() => {
    getImages();
  }, [getImages]);
  return (
    <div>
      <h1>This is where all the images will be displayed!</h1>
      <Link to='/images/new'>Add new image</Link>
      {images.map((image, index) => (
        <Fragment key={index}>
          <img className='imageDisplay' src={image.url} alt={image.alt} />
          <p>{image.title}</p>
        </Fragment>
      ))}
    </div>
  );
};

ImagesDisplay.propTypes = { getImages: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getImages })(ImagesDisplay);
