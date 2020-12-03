import * as constants from '../constants';
import { fetchProjectListDemoApi } from './DemoApi';

// 인트로 진행 상태 변경
export function fetchProjectListSuccess(data) {
  return {
    type: constants.FETCH_PROJECT_LIST_SUCCESS,
    payload: data,
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
    const page = getState().page + 1;
    dispatch({
      type: constants.FETCH_PROJECT_LIST_REQUEST,
    });
    return fetchProjectListDemoApi(page)
      .then(data => dispatch(fetchProjectListSuccess(data)))
      .catch(err => dispatch(fetchProjectListFailure(err)));
  };
}
