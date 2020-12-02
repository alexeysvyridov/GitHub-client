const { act } = require("react-dom/test-utils");

let initialState = [];

const reducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default reducer;   