import axios from 'axios';
import { setAlert } from './alert';
import { UPLOAD_IMAGE, GET_IMAGES, POST_ERROR } from './types';

export const getImages = () => async dispatch => {
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
  const body = JSON.stringify(imageData);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log('acaaaaa');
    console.log(body);
    const res = await axios.post('/api/images', body, config);

    dispatch({
      type: UPLOAD_IMAGE,
      payload: res.data,
    });

    dispatch(setAlert('Image Added to the DB', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
