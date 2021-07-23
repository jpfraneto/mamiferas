import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

const CommentItem = ({
  resourceId,
  comment: { _id, text, name, avatar, username, user, date },
  auth,
  setLoading,
  setResource,
}) => {
  const deleteComment = async (resourceId, commentId) => {
    setLoading(true);
    const data = { commentId };
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify(data);
    const res = await axios.post(
      `/api/resources/resource/${resourceId}/delete-comment`,
      body,
      config
    );
    setResource(res.data);
    setLoading(false);
  };
  return (
    <div className='post bg-comment p-1 my-1'>
      <div>
        {user ? (
          <Link to={`/profile/${username}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        ) : (
          <Fragment>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
            <small>Invitad@</small>
          </Fragment>
        )}
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          <Moment format='HH:mm'>{date}</Moment>
          {' del '}
          <Moment format='DD-MM-YYYY'>{date}</Moment>
        </p>
        {auth.user && !auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={e => deleteComment(resourceId, _id)}
          >
            Eliminar Comentario
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CommentItem);
