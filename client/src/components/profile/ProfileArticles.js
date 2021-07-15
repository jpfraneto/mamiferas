import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProfileArticles } from '../../actions/article';
import functions from '../../utils/functions';

const ProfileArticles = ({
  loggedInUsername,
  profile: { articles, miracle, username, _id },
}) => {
  return (
    <div>
      <div className='profile-about bg-light p-2'>
        {articles && articles.length > 0 ? (
          <Fragment>
            <h2>Historias</h2>
            {articles.map(article => (
              <Fragment key={article._id}>
                {article.privada && loggedInUsername !== username ? (
                  <p>
                    🔐🤫😳 <strong>{article.title}</strong> -{' '}
                    {article.pregnancyDate}{' '}
                  </p>
                ) : (
                  <Link to={`/articles/${article._id}`}>
                    <p>
                      {article.privada &&
                        loggedInUsername === username &&
                        '🔐🤫😳 '}
                      <strong>{article.title}</strong> - {article.pregnancyDate}{' '}
                    </p>
                  </Link>
                )}
              </Fragment>
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
  );
};

ProfileArticles.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loggedInUsername: state.auth.user.username,
});

export default connect(mapStateToProps, { getProfileArticles })(
  ProfileArticles
);
