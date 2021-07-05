import { UPLOAD_IMAGE, GET_IMAGES, GET_USER_IMAGES } from '../actions/types';

const initialState = {
  images: [],
  image: null,
  loading: true,
  error: {},
};

export default function image(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    //OJO CON ESTO; NO ESTÁ BIEN!
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
      };
    case GET_USER_IMAGES:
      return {
        ...state,
        images: payload,
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
