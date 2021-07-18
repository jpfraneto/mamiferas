import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllImages } from '../../actions/image';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const ImagesDisplay = ({ image: { globalImages, loading }, getAllImages }) => {
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    getAllImages(globalImages);
    setLoading2(false);
  }, [getAllImages]);
  return (
    <Fragment>
      {loading || loading2 ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h1>Fotos</h1>
          {globalImages.length > 0 ? (
            <Fragment>
              <p>Estas son fotos que han sido compartidas en este lugar</p>
              <Link to='/images/new' className='btn'>
                Agregar Nueva Foto
              </Link>
              <br />
              {globalImages.map((image, index) => (
                <Link key={index} to={`/images/${image._id}`}>
                  <img
                    className='profile-image-display'
                    src={image.secure_url}
                  />
                </Link>
              ))}
            </Fragment>
          ) : (
            <p>Aún no hay fotos :(</p>
          )}
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
