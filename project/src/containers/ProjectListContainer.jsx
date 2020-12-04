import React, { Component } from 'react';
import ProjectItem from '../components/ProjectItem';
import Checkbox from '../components/Checkbox';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils';
import {
  getFetching,
  getProjectList,
} from '../selectors';
import styles from './ProjectListContainer.module.scss';

class ProjectListContainer extends Component {
  state = {
    isOnlyScrapped: false,
    scrappedList: [],
  }

  componentDidMount() {
    const { fetchProjectListRequest } = this.props;
    window.addEventListener('scroll', this.handleScroll);
    fetchProjectListRequest();
    this.getNewList();
  }

  handleScroll = () => {
    const {
      fetchProjectListRequest,
      fetching,
    } = this.props;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !fetching) {
      fetchProjectListRequest();
    }
  };

  getNewList = () => {
    if (!storageAvailable('localStorage')) {
      return;
    }
    const scrappedList = JSON.parse(localStorage.getItem('scrappedList'));
    this.setState({
      scrappedList: scrappedList || [],
    });
  }
  
  handleCheck = checked => {
    if (checked) {
      this.getNewList();
    }
    this.setState({
      isOnlyScrapped: checked,
    });
  }

  addScrapped = item => {
    const { scrappedList } = this.state;
    const newArr = scrappedList.slice();
    newArr.push(item);
    localStorage.setItem('scrappedList', JSON.stringify(newArr));
    this.setState({
      scrappedList: newArr,
    });
  }

  removeScrapped = id => {
    const { scrappedList } = this.state;
    const newArr = scrappedList.slice().filter(item => item.id !== id);
    localStorage.setItem('scrappedList', JSON.stringify(newArr));
    this.setState({
      scrappedList: newArr,
    });
  }

  render() {
    const { projectList } = this.props;
    const {
      isOnlyScrapped,
      scrappedList,
    } = this.state;
    const showList = isOnlyScrapped ? scrappedList : projectList;
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <Checkbox
            text="스크랩한 것만 보기"
            handleChange={this.handleCheck}
          />
          {showList.length > 0 ? (
            <div className={styles.itemContainer}>
              {showList.map((item, i) => (
                <ProjectItem
                  key={i}
                  item={item}
                  isScrapped={scrappedList.findIndex(o => o.id === item.id) > -1}
                  handleAddScrap={this.addScrapped}
                  handleRemoveScrap={this.removeScrapped}
                />
              ))}
            </div>
          ) : (
            <div className={styles.none}>아이템이 없어요!</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectList: getProjectList(state),
  fetching: getFetching(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProjectListRequest: () => dispatch(actions.fetchProjectListRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);