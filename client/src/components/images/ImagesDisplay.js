import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImages } from '../../actions/images';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';

const ImagesDisplay = ({ image: { images, loading }, getImages }) => {
  useEffect(() => {
    getImages();
  }, [getImages]);
  return (
    <div>
      <h1>This is where all the images will be displayed!</h1>
      {images.length > 0 ? (
        images.map((imageId, index) => (
          <Image
            key={index}
            cloudName='the-open-source-factory'
            publicId={imageId}
            width='300'
            className='displayImageHello'
          />
        ))
      ) : (
        <p>There are no images in the database :(</p>
      )}
      <Link to='/images/new' className='btn'>
        Add new image
      </Link>
    </div>
  );
};

ImagesDisplay.propTypes = { getImages: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getImages })(ImagesDisplay);
