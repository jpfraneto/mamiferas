import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import { getArticles, sortArticles } from '../../actions/article';
import { set } from 'mongoose';

const Article = ({
  getArticles,
  sortArticles,
  article: { articles, loading },
}) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return articles === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Historias</h1>
      <p className='lead'>
        Acá hay una lista de historias que futur@s mamás y papás han
        compartido...
      </p>
      <Link className='btn btn-primary' to={'/articles/new'}>
        Escribir Historia
      </Link>

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
  sortArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ article: state.article });

export default connect(mapStateToProps, { getArticles, sortArticles })(Article);
