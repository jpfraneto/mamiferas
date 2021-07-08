import React, { Fragment, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getImage } from '../../actions/images';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ImageDisplay = ({ match, getImage, image }) => {
  let history = useHistory();
  useEffect(() => {
    getImage(match.params.id);
  }, [getImage]);
  return (
    <Fragment>
      {image === null || image.loading ? (
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
                - <Moment format='DD/MM/YYYY'>{image.date}</Moment>
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
  image: state.image.image,
});

export default connect(mapStateToProps, { getImage })(ImageDisplay);
