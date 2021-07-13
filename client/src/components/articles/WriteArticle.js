import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import { getCurrentProfile } from '../../actions/profile';
import gfm from 'remark-gfm';

const WriteArticle = ({ addArticle, history }) => {
  const [data, setData] = useState({
    title: 'Título',
    text: 'Texto',
  });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const articleData = {
      title: data.title,
      text: data.text,
    };
    addArticle(articleData, history);
  };

  return (
    <div className='post-form'>
      <div className='image-display'>
        <h3>{data.title}</h3>
        <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
          {data.text}
        </ReactMarkdown>
      </div>

      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Título'
            name='title'
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Título de la Historia</small>
        </div>
        <div className='form-group'>
          <textarea
            type='text'
            rows='11'
            placeholder='Escribe acá...'
            name='text'
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Escribe acá lo que sea importante para ti
          </small>
        </div>
        <input
          type='submit'
          className='btn btn-dark my-1'
          value='Publicar Historia'
        />
      </form>
    </div>
  );
};

WriteArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default connect(null, { addArticle })(WriteArticle);
