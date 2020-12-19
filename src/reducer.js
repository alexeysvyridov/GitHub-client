import {FETCH_USERS, 
  DELETE_STAR, 
  UPDATE_STAR, 
  USERS_ERROR,  
  USERS_LOADED,  
  SEARCH_USERS,
  SET_STARED_USERS,
  OPEN_USER} from './actionTypes';

// import GitHubReposService from './services';
let initialState = {
  staredUsers: [],
  user: null,
  users: [],
  loading: false,
  openUser: null,
  error: null,
};
// const gitHubReposService = new GitHubReposService()
const deleteStar = (user, staredUsers) => {
  user.stargazers_count -= 1;
  let filtredElem = staredUsers.filter(person => {
  return  person.full_name !== user.full_name &&
          person.id !== user.id;
  });
  return filtredElem;
};

const updateStar = (user, stared) => {
  user.stargazers_count += 1;
  return [...stared, user]
};

const reducer = (state=initialState, action) => {
  console.log(action);
  switch(action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.users.slice(),
        loading:false
      };
    case SET_STARED_USERS:
      return {
        ...state,
        staredUsers: [...action.staredUsers] || []
      }
    case USERS_ERROR:
      return {
        ...state,
        loading:false,
        error: true
      };
    case USERS_LOADED:
      return {
        ...state,
        loading:true,
        error: false
      };
    case SEARCH_USERS:
      return {
        ...state,
        loading:false,
        users: [...action.payload]
      };
    case UPDATE_STAR:
        return {
          ...state,
          staredUsers:updateStar(action.user, state.staredUsers),
          loading:false
        };
    case DELETE_STAR:
      return {
        ...state,
        staredUsers: deleteStar(action.user, state.staredUsers),
        user:{},
        loading:false,
        openUser: false
      };
    case OPEN_USER:
      return {
        ...state,
        user: action.user,
        openUser: true
      };
    default:
      return state;
  }
};

export default reducer;   