import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const CommentForm = ({ setLoading2, resourceId, username, addComment }) => {
  let history = useHistory();
  const [data, setData] = useState({
    text: '',
    username,
  });
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Comentar</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          if (username) {
            setData({ ...data, username });
          }
          addComment(data);
          setLoading2(true);
          setTimeout(() => {
            setLoading2(false);
          }, 1618);
          setData({ ...data, text: '' });
        }}
      >
        {username.length > 0 ? (
          ''
        ) : (
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='name'
              onChange={e => setData({ ...data, username: e.target.value })}
            />
            <small>Tu nombre</small>
          </div>
        )}
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Escribe acá...'
          value={data.text}
          onChange={e => setData({ ...data, text: e.target.value })}
          required
        ></textarea>
        <input
          type='submit'
          className='btn btn-dark my-1'
          value='Agregar Comentario'
        />
      </form>
    </div>
  );
};

export default CommentForm;
