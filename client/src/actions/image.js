import axios from 'axios';
import { setAlert } from './alert';
import {
  UPLOAD_IMAGE,
  GET_IMAGE,
  GET_GLOBAL_IMAGES,
  POST_ERROR,
  CLEAR_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
  GET_PROFILE_IMAGES,
  ADD_IMAGE_COMMENT,
  REMOVE_IMAGE_COMMENT,
  IMAGE_ERROR,
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

export const uploadImage = (imageData, history) => async dispatch => {
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
      payload: res.data.newImage,
    });

    dispatch(setAlert(res.data.msg, 'success'));

    history.push(`/images/${res.data.newImage._id}`, {
      returnTo: '/images',
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateImage = (history, imageData) => async dispatch => {
  const body = JSON.stringify({ data: imageData });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/images/${imageData.id}`, body, config);
    dispatch({
      type: UPDATE_IMAGE,
      payload: res.data.updatedImage,
    });

    dispatch(setAlert(res.data.msg, 'success'));

    history.push(`/images/${imageData.id}`, {
      returnTo: '/images',
    });
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

export const deleteImage = (history, username, id) => async dispatch => {
  if (window.confirm('¿Estás segur@ que quieres borrar esta crónica?')) {
    try {
      const res = await axios.delete(`/api/images/${id}`);
      dispatch({
        type: DELETE_IMAGE,
        payload: res.data,
      });
      dispatch(setAlert('Se eliminó tu crónica', 'success'));
      history.push(`/images`);
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
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
      history.push(`/profile/${username}`, {
        returnTo: `/profile/${username}`,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add comment
export const addComment = (imageId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/images/comment/${imageId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_IMAGE_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Se agregó tu comentario a la imagen', 'success'));
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (imageId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/images/comment/${imageId}/${commentId}`);
    dispatch({
      type: REMOVE_IMAGE_COMMENT,
      payload: { commentId: commentId, msg: 'Comment removed!' },
    });
    dispatch(setAlert('Se eliminó tu comentario de la imagen', 'success'));
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
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