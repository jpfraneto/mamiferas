import React, { useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImage } from '../../actions/images';
import { connect } from 'react-redux';

const ImageDisplay = ({ match, getImage, image }) => {
  useEffect(() => {
    getImage();
  }, [getImage]);
  return (
    <div>
      <button
        onClick={() => {
          console.log(image);
        }}
      >
        CONSOLE!
      </button>
      <Image
        cloudName='the-open-source-factory'
        publicId={match.params.id}
        className='displayImageHello'
      />
      <Link className='btn btn-success' to={'/images'}>
        Back to Images
      </Link>
    </div>
  );
};

ImageDisplay.propTypes = { getImage: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getImage })(ImageDisplay);
