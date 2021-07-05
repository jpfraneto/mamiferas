import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllImages } from '../../actions/images';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';

const ImagesDisplay = ({ image: { images, loading }, getAllImages }) => {
  useEffect(() => {
    getAllImages();
  }, [getAllImages]);
  return (
    <div>
      <h1>Estas son todas las imágenes que se han subido a este lugar</h1>
      {images.length > 0 ? (
        images.map((imageId, index) => (
          <Link to={`/images/${imageId}`}>
            <Image
              key={index}
              cloudName='the-open-source-factory'
              publicId={imageId}
              width='300'
              className='displayImageHello'
            />
          </Link>
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

ImagesDisplay.propTypes = { getAllImages: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getAllImages })(ImagesDisplay);
