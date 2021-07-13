import { ADD_ARTICLE, GET_ARTICLE, GET_ARTICLES } from '../actions/types';

const initialSate = {
  articles: [],
  article: null,
  loading: true,
  error: {},
};

export default function article(state = initialSate, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ARTICLE:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, payload],
      };
    case GET_ARTICLE:
      return {
        ...state,
        loading: false,
        article: payload,
      };

    case GET_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: payload,
      };

    default:
      return state;
  }
}
