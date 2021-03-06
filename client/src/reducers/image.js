import {
  UPLOAD_IMAGE,
  GET_IMAGE,
  GET_GLOBAL_IMAGES,
  CLEAR_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
  IMAGE_ERROR,
  ADD_IMAGE_COMMENT,
  REMOVE_IMAGE_COMMENT,
  GET_PROFILE_IMAGES,
  CLEAR_PROFILE_IMAGES,
} from '../actions/types';

const initialState = {
  userImage: [],
  globalImages: [],
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
        loading: true,
      };
    case CLEAR_PROFILE_IMAGES:
      return {
        ...state,
        userImage: [],
        loading: true,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: payload,
        loading: false,
      };
    case GET_GLOBAL_IMAGES:
      return {
        ...state,
        globalImages: [...state.globalImages, ...payload],
        loading: false,
      };
    case GET_PROFILE_IMAGES:
      return {
        ...state,
        userImage: payload,
        loading: false,
      };
    case ADD_IMAGE_COMMENT:
      return {
        ...state,
        image: { ...state.image, comments: payload.comments },
        //Todo: add the comment to the image in the global images
        globalImages: state.globalImages.map(image => {
          if (payload._id === image._id) return payload;
          return image;
        }),
        loading: false,
      };

    case REMOVE_IMAGE_COMMENT:
      return {
        ...state,
        image: {
          ...state.image,
          comments: state.image.comments.filter(
            comment => comment._id !== payload.commentId
          ),
          loading: false,
        },
        globalImages: state.globalImages.map(image => {
          if (image._id === payload.imageId) {
            image.comments = image.comments.filter(
              comment => comment._id !== payload.commentId
            );
          }
          return image;
        }),
      };
    case DELETE_IMAGE:
      return {
        ...state,
        image: null,
        globalImages: state.globalImages.filter(
          image => image._id !== payload.imageId
        ),
        loading: false,
      };

    case UPLOAD_IMAGE:
    case UPDATE_IMAGE:
      return {
        ...state,
        image: payload,
        globalImages: [payload, ...state.globalImages],
        loading: false,
      };
    case IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
