import {SET_STARED, 
  DELETE_STAR, 
  UPDATE_STAR, 
  USERS_ERROR,  
  USERS_LOADED,  
  SEARCH_USERS} from './actionTypes';

import GitHubReposService from './services';
let initialState = {
  users: [],
  loading: null,
  error: null,
  user: [],
};
const gitHubReposService = new GitHubReposService()
const deleteStar = (user, stared) => {
  gitHubReposService.unStarring(user.owner.login, user.name)
  user.stargazers_count -= 1;
  let filtredElem = stared.filter(person => {
  return  person.full_name !== user.full_name &&
          person.id !== user.id;
  });
  return filtredElem;
};

const updateStar = (user, stared) => {
  gitHubReposService.starring(user.owner.login, user.name)
  user.stargazers_count += 1;
  return [...stared, user]
};

const reducer = (state=initialState, action) => {
  console.log(action);
  console.log(state);
  switch(action.type) {
    case SET_STARED:
      return {
        ...state,
        users:[...action.users],
        loading:false
      };
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
          users:updateStar(action.user, state.users),
          loading:false
        };
    case DELETE_STAR:
      return {
        ...state,
        users: deleteStar(action.user, state.users),
        loading:false
      };
    default:
      return state;
  }
};

export default reducer;   