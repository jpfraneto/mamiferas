import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import { getCurrentProfile } from '../../actions/profile';
import gfm from 'remark-gfm';

const WriteArticle = ({ addArticle, history, user }) => {
  const [data, setData] = useState({
    title: 'Título',
    text: 'Texto',
    privada: false,
  });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const articleData = {
      title: data.title,
      text: data.text,
      privada: data.privada,
    };
    addArticle(articleData, history);
  };
  return (
    <div className='post-form'>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/jpfraneto`}>
            <img className='round-img' src={user.avatar} alt='' />
            <h4>{user.name}</h4>
          </Link>
        </div>
        <div>
          <h1>{data.title}</h1>
          <br />
          <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
            {data.text}
          </ReactMarkdown>
          <p className='post-date'>
            Escrita a las 28+4 el{' '}
            <Moment format='DD/MM/YYYY'>{new Date()}</Moment>
          </p>
        </div>
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
        <div className='form-group'>
          <input type='checkbox' name='privada' onChange={e => onChange(e)} />
          <label htmlFor='privada'>
            {' '}
            ¿Quieres que esta historia sea privada?
          </label>
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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addArticle })(WriteArticle);
