import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../actions/article';

const Article = ({ getArticles, article: { articles, loading } }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Historias</h1>
      <p className='lead'>
        Acá hay una lista de historias que futuras mamás han compartido...
      </p>
      <Link className='btn btn-primary' to={'/articles/new'}>
        Escribir Historia
      </Link>
      <button
        className='btn btn-success'
        onClick={() => alert('todavía no funciona!')}
      >
        Ordenar por Tiempo de Embarazo
      </button>{' '}
      <button
        className='btn btn-success'
        onClick={() => alert('todavía no funciona!')}
      >
        Ordenar por Fecha
      </button>
      <div className='posts'>
        {articles.map(article => (
          <ArticleItem key={article._id} article={article} />
        ))}
      </div>
    </Fragment>
  );
};

Article.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ article: state.article });

export default connect(mapStateToProps, { getArticles })(Article);
