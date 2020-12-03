import * as constants from '../constants';

const initialState = [];

function getProjectList(state, action) {
  switch (action.type) {
    case constants.FETCH_PROJECT_LIST_SUCCESS:
      const newArr = state.concat(action.payload);
      return newArr;
    default:
      return state;
  }
}

export default function projectList(state = initialState, action) {
  return getProjectList(state, action);
}
