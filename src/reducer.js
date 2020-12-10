import {INCREASE, DECREASE} from './actionTypes';
let initialState = {
  counter: 0
};

const reducer = (state=initialState, action) => {
  console.log(state)
  console.log(action)
  switch(action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.payload++
      }
    case DECREASE:
      return {
        ...state,
        counter: state.payload--
      }
    default:
      return state;
  }
};

export default reducer;   