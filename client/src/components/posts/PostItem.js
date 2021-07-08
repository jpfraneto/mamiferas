import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, avatar, username, user, likes, comments, date },
  auth,
  showActions,
}) => {
  useEffect(() => {
    console.log();
  }, []);
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${username}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
          {text}
        </ReactMarkdown>
        <p className='post-date'>
          Posteado el <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Leer Más{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={e => {
                  deletePost(_id);
                }}
                type='button'
                className='btn btn-danger'
              >
                ❌
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
