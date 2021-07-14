import React, { Fragment, useEffect } from 'react';
import { article } from 'cloudinary-react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getArticleById } from '../../actions/article';
import functions from '../../utils/functions';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ShowArticle = ({
  auth: { isAuthenticated },
  article: { article },
  match,
  getArticleById,
}) => {
  let history = useHistory();
  useEffect(() => {
    getArticleById(match.params.id);
  }, [getArticleById]);
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
            onClick={() => history.goBack()}
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
              <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
                {article.text}
              </ReactMarkdown>
              <p className='post-date'>
                Escrita a las {article.pregnancyDate} el{' '}
                <Moment format='DD/MM/YYYY'>{article.date}</Moment>
              </p>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth,
});

export default connect(mapStateToProps, { getArticleById })(ShowArticle);
