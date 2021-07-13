import { ADD_ARTICLE, GET_ARTICLE, GET_ARTICLES, POST_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const addArticle = (articleData, history) => async dispatch => {
  const body = JSON.stringify(articleData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/articles', body, config);
    console.log(res.data);
    history.push(`/articles/${res.data.newArticle._id}`);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileArticles = username => async dispatch => {
  try {
    const res = await axios.get(`/api/articles/user/${username}`);
    dispatch({
      type: GET_ARTICLES,
      payload: res.data.articles,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getArticleById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/articles/${id}`);
    dispatch({
      type: GET_ARTICLE,
      payload: res.data.article,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getArticles = () => async dispatch => {
  try {
    const res = await axios.get('/api/articles');
    dispatch({
      type: GET_ARTICLES,
      payload: res.data.articles,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = () => async dispatch => {
  console.log('this is the action for adding a like!');
};
