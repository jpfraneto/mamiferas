import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/article';

const CommentItem = ({
  articleId,
  comment: { _id, text, name, avatar, username, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className='post bg-comment p-1 my-1'>
      <div>
        <Link to={`/profile/${username}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          <Moment format='HH:mm:ss'>{date}</Moment>
          {' del '}
          <Moment format='DD-MM-YYYY'>{date}</Moment>
        </p>
        {auth.user && !auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={e => deleteComment(articleId, _id)}
          >
            Eliminar Comentario
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  imageId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
