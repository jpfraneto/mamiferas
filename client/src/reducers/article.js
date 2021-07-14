import {
  ADD_ARTICLE,
  GET_ARTICLE,
  GET_ARTICLES,
  GET_PROFILE_ARTICLES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  SORT_ARTICLES_BIRTHDATE,
  SORT_ARTICLES_DATE,
  ARTICLE_ERROR,
} from '../actions/types';

const sortByKey = key => (a, b) => a[key] > b[key] ? 1 : -1;

const initialSate = {
  articles: [],
  profileArticles: [],
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
        articles: [payload, ...state.articles],
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

    case GET_PROFILE_ARTICLES:
      return {
        ...state,
        loading: false,
        profileArticles: payload,
      };

    case ADD_COMMENT:
      return {
        ...state,
        article: { ...state.article, comments: payload },
        loading: false,
      };

    case REMOVE_COMMENT:
      console.log('inside the remove comment reducer');
      console.log('the payload is:', payload);
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.article.comments.filter(
            comment => comment._id !== payload
          ),
          loading: false,
        },
      };

    case SORT_ARTICLES_BIRTHDATE:
      console.log('The articles should be sorted by birth date');
      return {
        ...state,
        articles: state.articles.sort(sortByKey('pregnancyDate')),
      };

    case SORT_ARTICLES_DATE:
      console.log('The articles should be sorted by date');
      return {
        ...state,
        articles: state.articles.sort(sortByKey('date')),
      };

    case ARTICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
