import axios from 'axios';
import { setAlert } from './alert';
import { UPLOAD_IMAGE, GET_IMAGES, POST_ERROR, GET_USER_IMAGES } from './types';

export const getAllImages = () => async dispatch => {
  try {
    const res = await axios.get('/api/images');
    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const uploadImage = imageData => async dispatch => {
  const body = JSON.stringify({ data: imageData });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/images', body, config);

    dispatch({
      type: UPLOAD_IMAGE,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileImages = id => async dispatch => {
  try {
    const res = await axios.get(`/api/images/${id}`);
    console.log('the res is', res.data);
    dispatch({
      type: GET_USER_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
