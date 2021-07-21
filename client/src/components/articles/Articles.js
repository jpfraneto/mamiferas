import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import { getArticles, sortArticles } from '../../actions/article';

const Article = ({
  getArticles,
  sortArticles,
  article: { articles, loading },
  user: { babyBorn },
}) => {
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    getArticles();
    setLoading2(false);
  }, [getArticles]);
  return articles === null || loading || loading2 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Crónicas de Embarazo</h1>
      <p className='lead'>Que han sido compartidas en este espacio</p>
      {!babyBorn && (
        <Link className='btn btn-primary' to={'/articles/new'}>
          Agregar Nueva Crónica
        </Link>
      )}

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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  article: state.article,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getArticles, sortArticles })(Article);
