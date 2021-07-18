import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { editArticle, getArticleById } from '../../actions/article';
import ReactMarkdown from 'react-markdown';
import { getCurrentProfile } from '../../actions/profile';
import gfm from 'remark-gfm';

const EditArticle = ({ match, getArticleById, editArticle, history }) => {
  const [data, setData] = useState({
    _id: '',
    title: 'Título',
    text: 'Texto',
    avatar: '',
    name: '',
    pregnancyDate: '',
    username: '',
    privada: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThisArticle = async () => {
      const article = await getArticleById(match.params.id);
      const {
        _id,
        title,
        text,
        avatar,
        name,
        pregnancyDate,
        username,
        privada,
      } = article;
      setData({
        _id,
        title,
        text,
        avatar,
        name,
        pregnancyDate,
        username,
        privada,
      });
      setLoading(false);
    };
    getThisArticle();
  }, [getArticleById]);

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
    const newArticleData = {
      title: data.title,
      text: data.text,
      privada: data.privada,
    };
    editArticle(newArticleData, history, data._id);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
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
          <h1 className='text-primary'>Editar Historia:</h1>
          <div className='post-form'>
            <div className='post bg-white p-1 my-1'>
              <div>
                <Link to={`/profile/${data.username}`}>
                  <img className='round-img' src={data.avatar} alt='' />
                  <h4>{data.name}</h4>
                </Link>
              </div>
              <div>
                <h1>{data.title}</h1>
                <br />
                <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
                  {data.text}
                </ReactMarkdown>
                <p className='post-date'>
                  Escrita a las {data.pregnancyDate} el{' '}
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
                  value={data.title}
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
                  value={data.text}
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
                  checked={data.privada}
                  onChange={e => togglePrivada(e)}
                />
                <label htmlFor='privada'>
                  {' '}
                  ¿Quieres que esta historia sea privada?
                </label>
              </div>
              <input
                type='submit'
                className='btn btn-success my-1'
                value='Actualizar Historia'
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditArticle.propTypes = {
  getArticleById: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

export default connect(null, { getArticleById, editArticle })(EditArticle);
