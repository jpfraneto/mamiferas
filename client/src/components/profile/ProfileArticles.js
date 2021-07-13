import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProfileArticles } from '../../actions/article';
import functions from '../../utils/functions';

const ProfileArticles = ({
  articles,
  getProfileArticles,
  loggedInUsername,
  profile: { miracle, username, _id },
}) => {
  useEffect(() => {
    getProfileArticles(username);
  }, [getProfileArticles]);
  return (
    <div>
      <div className='images-display-div'>
        <div className='profile-about bg-light p-2'>
          {articles && articles.length > 0 ? (
            <Fragment>
              <h2>Historias</h2>
              {articles.map(article => (
                <Link key={article._id} to={`/articles/${article._id}`}>
                  <p>
                    <strong>{article.title}</strong> - {article.pregnancyDate}{' '}
                  </p>
                </Link>
              ))}
            </Fragment>
          ) : (
            <h1>{username} todavía no escribe ninguna historia.</h1>
          )}
          <br />
          {loggedInUsername === username && (
            <Link to={'/articles/new'}>
              <button className='btn btn-success'>Escribir Historia</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileArticles.propTypes = {
  getProfileArticles: PropTypes.func.isRequired,
  loggedInUsername: PropTypes.string.isRequired,
  articles: PropTypes.array,
};

const mapStateToProps = state => ({
  loggedInUsername: state.auth.user.username,
  articles: state.article.articles,
});

export default connect(mapStateToProps, { getProfileArticles })(
  ProfileArticles
);
