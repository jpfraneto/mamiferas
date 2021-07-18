import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../../actions/image';

const CommentForm = ({ imageId, addComment }) => {
  let history = useHistory();
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Comentar</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(imageId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Escribe acá...'
          value={text}
          onChange={e => setText(e.target.value)}
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
