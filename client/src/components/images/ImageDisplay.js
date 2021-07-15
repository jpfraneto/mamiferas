import React, { Fragment, useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getImage } from '../../actions/images';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ImageDisplay = ({ image: { image, globalImages }, match, getImage }) => {
  let history = useHistory();
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    getImage(globalImages, match.params.id);
    setLoading2(false);
  }, [getImage]);
  return (
    <Fragment>
      {image === null || image.loading || loading2 ? (
        <Spinner />
      ) : (
        <div className='image-display'>
          {image && (
            <div>
              <img
                className='image-display-individual'
                alt={image.alt}
                src={image.secure_url}
              />
              <p>
                <strong>
                  <Link to={`/profile/${image.username}`}>
                    {image.username}
                  </Link>
                </strong>{' '}
                - {image.pregnancyDate} -{' '}
                <Moment format='DD/MM/YYYY'>{image.date}</Moment>
              </p>
              <h1>{image.title}</h1>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='imageText'
              >
                {image.text}
              </ReactMarkdown>
            </div>
          )}
          <button className='btn btn-success' onClick={() => history.goBack()}>
            Volver
          </button>
        </div>
      )}
    </Fragment>
  );
};

ImageDisplay.propTypes = { getImage: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps, { getImage })(ImageDisplay);
