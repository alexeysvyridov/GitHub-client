import {SET_STARED, DELETE_STAR, UPDATE_STAR} from './actionTypes';
import GitHubReposService from './services';
let initialState = {
  counter: 0,
  stared: [],
  user: []
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
  switch(action.type) {
    case SET_STARED:
      return {
        ...state,
        stared:[...action.stared]
      };
    case UPDATE_STAR:
        return {
          ...state,
          stared:updateStar(action.user, state.stared)
        }
    case DELETE_STAR:
      return {
        ...state,
        stared: deleteStar(action.user, state.stared)
      }
    default:
      return state;
  }
};

export default reducer;   