import {
  UPLOAD_IMAGE,
  GET_IMAGE,
  GET_IMAGES,
  CLEAR_IMAGE,
  GET_USER_IMAGES,
} from '../actions/types';

const initialState = {
  images: [],
  image: null,
  loading: true,
  error: {},
};

export default function image(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_IMAGE:
      return {
        ...state,
        image: null,
        loading: false,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: payload,
        loading: false,
      };
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
        loading: false,
      };
    case GET_USER_IMAGES:
      return {
        ...state,
        images: payload,
        loading: false,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: payload,
        loading: false,
      };
    default:
      return state;
  }
}
