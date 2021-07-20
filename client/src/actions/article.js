import {
  ADD_ARTICLE,
  GET_ARTICLE,
  GET_ARTICLES,
  UPDATE_ARTICLE,
  SORT_ARTICLES_DATE,
  SORT_ARTICLES_BIRTHDATE,
  GET_PROFILE_ARTICLES,
  ARTICLE_ERROR,
  ADD_COMMENT,
  REMOVE_COMMENT,
  REMOVE_ARTICLE,
} from './types';
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
    dispatch({
      type: ADD_ARTICLE,
      payload: res.data.newArticle,
    });
    history.push(`/articles/${res.data.newArticle._id}`, {
      returnTo: '/articles',
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileArticles = username => async dispatch => {
  try {
    const res = await axios.get(`/api/articles/user/${username}`);
    dispatch({
      type: GET_PROFILE_ARTICLES,
      payload: res.data.articles,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
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
    return res.data.article;
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getArticles = () => async dispatch => {
  try {
    console.log('getting the articles!');
    const res = await axios.get('/api/articles');
    console.log('The response from the server is: ', res.data);
    dispatch({
      type: GET_ARTICLES,
      payload: res.data.articles,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editArticle =
  (newArticleData, history, articleId) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(
        `/api/articles/${articleId}`,
        newArticleData,
        config
      );
      console.log('the response from the server is:', res.data);
      dispatch({
        type: UPDATE_ARTICLE,
        payload: res.data.updatedArticle,
      });
      dispatch(setAlert('Se editó tu historia', 'success'));
      history.push(`/articles/${articleId}`, {
        returnTo: '/articles',
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const deleteArticle =
  (history, username, articleId) => async dispatch => {
    if (window.confirm('¿Estás segur@ que quieres borrar esta historia?')) {
      try {
        const res = await axios.delete(`/api/articles/${articleId}`);
        console.log(
          'the res after eliminating the article is: ',
          res.data,
          articleId
        );
        dispatch({
          type: REMOVE_ARTICLE,
          payload: articleId,
        });
        dispatch(setAlert('Se eliminó tu historia', 'success'));
        history.push(`/profile/${username}`);
      } catch (err) {
        dispatch({
          type: ARTICLE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };

export const addLike = () => async dispatch => {
  console.log('this is the action for adding a like!');
};

// Add comment
export const addComment = (articleId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/articles/comment/${articleId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Se agregó tu comentario a la historia', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (articleId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/articles/comment/${articleId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Se eliminó tu comentario de la historia', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const sortArticles = sortFormat => async dispatch => {
  try {
    if (sortFormat === 'birthDate') {
      dispatch({ type: SORT_ARTICLES_BIRTHDATE });
    } else if (sortFormat === 'date') {
      dispatch({ type: SORT_ARTICLES_DATE });
    }
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
