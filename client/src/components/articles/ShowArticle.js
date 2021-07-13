import React, { Fragment, useEffect } from 'react';
import { article } from 'cloudinary-react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getArticleById } from '../../actions/article';
import functions from '../../utils/functions';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ShowArticle = ({ article: { article }, match, getArticleById }) => {
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
        <div className='image-display'>
          {article && (
            <div>
              <h1>{article.title}</h1>
              <p className='post-date'>
                Escrita a las {article.pregnancyDate} el{' '}
                <Moment format='DD/MM/YYYY'>{article.date}</Moment>
              </p>
              <hr />
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='articleText'
              >
                {article.text}
              </ReactMarkdown>
            </div>
          )}
          <button className='btn btn-success' onClick={() => history.goBack()}>
            Volver
          </button>
        </div>
      )}
    </Fragment>
  );
};

ShowArticle.propTypes = { getArticleById: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticleById })(ShowArticle);
