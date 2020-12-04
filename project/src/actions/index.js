import * as constants from '../constants';
import { fetchProjectListDemoApi } from './DemoApi';
import * as selectors from '../selectors';

// 인트로 진행 상태 변경
export function fetchProjectListSuccess({ data, page }) {
  return {
    type: constants.FETCH_PROJECT_LIST_SUCCESS,
    payload: {
      data,
      page,
    },
  };
}

export function fetchProjectListFailure(err) {
  return {
    type: constants.FETCH_PROJECT_LIST_FAILURE,
    err,
  };
}

export function fetchProjectListRequest() {
  return (dispatch, getState) => {
    const page = selectors.getPage(getState());
    dispatch({
      type: constants.FETCH_PROJECT_LIST_REQUEST,
    });
    return fetchProjectListDemoApi(page)
      .then(data => dispatch(fetchProjectListSuccess({ data, page })))
      .catch(err => dispatch(fetchProjectListFailure(err)));
  };
}
