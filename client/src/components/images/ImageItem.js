import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ImageItem = ({
  addLike,
  image: {
    _id,
    title,
    text,
    name,
    avatar,
    username,
    comments,
    privada,
    date,
    pregnancyDate,
  },
  auth,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        {username ? (
          <Link to={`/profile/${username}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        ) : (
          <Fragment>
            <img
              className='round-img'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1600px-Baby_Face.JPG'
              alt=''
            />
            <h4>{name}</h4>
            <small>Invitad@</small>
          </Fragment>
        )}
      </div>
      <div>
        <h3>{title}</h3>
        {!privada && (
          <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
            {text.length > 88 ? text.substring(0, 88) + '...' : text}
          </ReactMarkdown>
        )}

        <p className='post-date'>
          Compartida el <Moment format='DD/MM/YYYY'>{date}</Moment>
          {privada &&
            username === auth.user.username &&
            ' - Esta historia es privada, sólo tú la puedes ver 🔐🤫😳'}
        </p>
        <Fragment>
          {privada && auth.user.username !== username ? (
            <p className='btn btn-primary'>🔐🤫😳 Esta historia es privada</p>
          ) : (
            <Link to={`/images/${_id}`} className='btn btn-primary'>
              Leer Más 💬 {comments.length}
            </Link>
          )}
        </Fragment>
      </div>
    </div>
  );
};

ImageItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
})(ImageItem);
