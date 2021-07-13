import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ArticleItem = ({
  addLike,
  article: {
    _id,
    title,
    text,
    name,
    avatar,
    username,
    likes,
    comments,
    date,
    pregnancyDate,
  },
  auth,
  showActions,
}) => {
  useEffect(() => {}, []);
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${username}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <h3>{title}</h3>
        <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
          {text.length > 88 ? text.substring(0, 88) + '...' : text}
        </ReactMarkdown>
        <p className='post-date'>
          Escrita a las {pregnancyDate} el{' '}
          <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <Link to={`/articles/${_id}`} className='btn btn-primary'>
              Leer Más 💬 {comments.length}
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

ArticleItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
})(ArticleItem);
