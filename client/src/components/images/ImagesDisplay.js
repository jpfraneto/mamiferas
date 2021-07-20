import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllImages } from '../../actions/image';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ImageItem from './ImageItem';
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
        <div>
          {globalImages.length > 0 ? (
            <Fragment>
              <h1 className='large text-primary'>Historias de Parto</h1>
              <p className='lead'>
                Escritas y compartidas para honrar este increíble momento, y
                para empoderar a futuros papás y mamás en su proceso.
              </p>
              <Link to='/images/new' className='btn'>
                Escribir Historia de Parto
              </Link>
              <div className='posts'>
                {globalImages.map((image, index) => (
                  <ImageItem key={image._id} image={image} />
                ))}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>Aún no hay Historias de Parto :(</p>
              <Link to='/images/new' className='btn'>
                Escribir Historia de Parto
              </Link>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

ImagesDisplay.propTypes = { getAllImages: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth.user,
});

export default connect(mapStateToProps, { getAllImages })(ImagesDisplay);
