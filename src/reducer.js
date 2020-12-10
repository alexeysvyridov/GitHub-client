import {SET_STARED} from './actionTypes';
let initialState = {
  counter: 0,
  stared: []
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_STARED:
      return {
        ...state,
        stared:[...action.stared]
      }
    default:
      return state;
  }
};

export default reducer;   