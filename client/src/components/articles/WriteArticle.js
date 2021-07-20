import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import { getCurrentProfile } from '../../actions/profile';
import functions from '../../utils/functions';
import gfm from 'remark-gfm';

const WriteArticle = ({ addArticle, user }) => {
  let history = useHistory();
  const [data, setData] = useState({
    title: 'Título',
    text: 'Texto',
    pregnancyDate: '',
    privada: false,
  });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePrivada = e => {
    e.target.checked
      ? setData({ ...data, privada: true })
      : setData({ ...data, privada: false });
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
    <Fragment>
      <button
        type='button'
        onClick={() => {
          history.goBack();
        }}
        className='btn btn-light'
      >
        Volver
      </button>
      <h1 className='text-primary'>Escribir Crónica:</h1>
      <div className='post-form'>
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${user.username}`}>
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
              Escrita a las {functions.calculateWeekFromNow(user.miracle)} el{' '}
              <Moment format='DD/MM/YYYY'>{new Date()}</Moment>
              {data.privada &&
                ' - Esta historia es privada, sólo tú la puedes ver 🔐🤫😳'}
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
            <small className='form-text'>Título</small>
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
            <input
              type='checkbox'
              name='privada'
              onChange={e => togglePrivada(e)}
            />
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
    </Fragment>
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
