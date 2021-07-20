import React, { Fragment, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {
  getArticleById,
  editArticle,
  deleteArticle,
} from '../../actions/article';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ShowArticle = ({
  auth: { isAuthenticated, user },
  article: { article },
  match,
  getArticleById,
  deleteArticle,
}) => {
  let history = useHistory();
  useEffect(() => {
    getArticleById(match.params.id);
  }, [getArticleById]);
  const handleGoBack = () => {
    console.log('inside here!!');
    if (history.location.state) {
      history.push(history.location.state.returnTo);
    } else {
      history.goBack();
    }
  };
  return (
    <Fragment>
      {article === null ||
      match.params.id !== article._id ||
      article.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <button
            type='button'
            onClick={handleGoBack}
            className='btn btn-light'
          >
            Volver
          </button>
          <div className='post bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${article.username}`}>
                <img className='round-img' src={article.avatar} alt='' />
                <h4>{article.name}</h4>
              </Link>
            </div>
            <div>
              <h1>{article.title}</h1>
              <br />
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='text-body'
              >
                {article.text}
              </ReactMarkdown>
              <p className='post-date'>
                {article.updated ? 'Actualizada ' : 'Escrita '}a las{' '}
                {article.pregnancyDate} el{' '}
                <Moment format='DD/MM/YYYY'>{article.date}</Moment>
                {article.privada &&
                  ' - Esta historia es privada, sólo tú la puedes ver 🔐🤫😳'}
              </p>

              {user && user.username === article.username && (
                <Fragment>
                  <Link
                    to={`/articles/${article._id}/edit`}
                    type='button'
                    className='btn btn-primary'
                  >
                    Editar
                  </Link>
                  <button
                    type='button'
                    onClick={() =>
                      deleteArticle(history, user.username, article._id)
                    }
                    className='btn btn-danger'
                  >
                    Eliminar
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          {article.comments.length > 0 && (
            <h1 className='text-primary'>Comentarios:</h1>
          )}
          <div className='comments'>
            {article.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                articleId={article._id}
              />
            ))}
          </div>
          {isAuthenticated && <CommentForm articleId={article._id} />}
        </Fragment>
      )}
    </Fragment>
  );
};

ShowArticle.propTypes = {
  getArticleById: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getArticleById,
  editArticle,
  deleteArticle,
})(ShowArticle);
