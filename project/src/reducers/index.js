import { combineReducers } from 'redux';
import projectList from './projectList';
import fetchInfo from './fetchInfo';

export default combineReducers({
  projectList,
  fetchInfo,
});