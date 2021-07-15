import axios from 'axios';
import { setAlert } from './alert';
import {
  UPLOAD_IMAGE,
  GET_IMAGE,
  GET_GLOBAL_IMAGES,
  POST_ERROR,
  CLEAR_IMAGE,
  GET_PROFILE_IMAGES,
  UPDATE_PROFILE_PICTURE,
} from './types';

export const getAllImages = globalImages => async dispatch => {
  try {
    const res = await axios.get('/api/images');
    const returnedDataFromServer = res.data;
    const newImages = compareImages(globalImages, returnedDataFromServer);

    dispatch({
      type: GET_GLOBAL_IMAGES,
      payload: newImages,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearImage = () => dispatch => {
  dispatch({ type: CLEAR_IMAGE });
};

export const getImage = (globalImages, id) => async dispatch => {
  try {
    dispatch({ type: CLEAR_IMAGE });
    const ids = globalImages.map(image => image._id);
    const index = ids.indexOf(id);
    var res = {};
    if (!(index >= 0)) {
      res = await axios.get(`/api/images/${id}`);
    } else {
      res.data = globalImages[index];
    }
    dispatch({
      type: GET_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const uploadImage = (imageData, history, username) => async dispatch => {
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

    history.push(`/profile/${username}`);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileImages = id => async dispatch => {
  try {
    const res = await axios.get(`/api/images/user/${id}`);
    dispatch({
      type: GET_PROFILE_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateProfilePicture =
  (history, imageData, username) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        '/api/images/update-profile-picture',
        imageData,
        config
      );
      dispatch(setAlert(res.data.msg, 'success'));
      dispatch({
        type: UPDATE_PROFILE_PICTURE,
        payload: res.data.user,
      });
      history.push(`/profile/${username}`);
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

const compareImages = (imagesAlreadyLoaded, dataFromServer) => {
  const ids1 = imagesAlreadyLoaded.map(x => x._id);
  const ids2 = dataFromServer.globalImages.map(x => x._id);
  const differenceInArrays = compareArrays(ids1, ids2);
  const newImages = [];
  dataFromServer.globalImages.forEach(image => {
    if (differenceInArrays.includes(image._id)) {
      newImages.push(image);
    }
  });
  return newImages;
};

const compareArrays = (arr1, arr2) => {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x)));
};
