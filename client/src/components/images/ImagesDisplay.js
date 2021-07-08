import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllImages } from '../../actions/images';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';

const ImagesDisplay = ({ image: { images, loading }, getAllImages }) => {
  useEffect(() => {
    getAllImages();
  }, [getAllImages]);
  return (
    <Fragment>
      {images === null || loading ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h1>Fotos</h1>
          <p>Conecta con el proceso de otras mamás y sus vivencias</p>
          {images.data && images.data.length > 0 ? (
            images.data.map((image, index) => (
              <Link key={index} to={`/images/${image._id}`}>
                <img className='profile-image-display' src={image.secure_url} />
              </Link>
            ))
          ) : (
            <p>No hay fotos :(</p>
          )}
          <br />
          <Link to='/images/new' className='btn'>
            Agregar Nueva
          </Link>
        </div>
      )}
    </Fragment>
  );
};

ImagesDisplay.propTypes = { getAllImages: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getAllImages })(ImagesDisplay);
