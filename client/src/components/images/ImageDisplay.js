import React from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const ImageDisplay = ({ match }) => {
  return (
    <div>
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

export default ImageDisplay;
