import * as constants from '../constants';

const initialState = {
  page: 1,
  fetching: false,
}
// page와 fetching 상태는 api 호출 상태에 따라 업데이트하면 되므로
// 컴포넌트 내부가 아니라 리듀서에서 컨트롤

function getPage(state, action) {
  switch (action.type) {
    case constants.FETCH_PROJECT_LIST_SUCCESS:
      const { page } = action.payload;
      return page + 1;
    default:
      return state;
  }
}

function getFetching(state, action) {
  switch (action.type) {
    case constants.FETCH_PROJECT_LIST_REQUEST:
      return true;
    case constants.FETCH_PROJECT_LIST_SUCCESS:
    case constants.FETCH_PROJECT_LIST_FAILURE:
      return false;
    default:
      return state;
  }
}

export default function fetchInfo(state = initialState, action) {
  return {
    page: getPage(state.page, action),
    fetching: getFetching(state.fetching, action),
  }
}
