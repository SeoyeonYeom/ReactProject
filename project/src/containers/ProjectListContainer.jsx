import React, { Component } from 'react';
import ProjectItem from '../components/ProjectItem';
import Checkbox from '../components/Checkbox';
import * as actions from '../actions';
import { connect } from 'react-redux';
import ConfirmModal from '../components/ConfirmModal';
import styles from './ProjectListContainer.module.scss';

class ProjectListContainer extends Component {
  state = {
    isOnlyScrapped: true,
    page: 0,
    isShowModal: false,
    fetching: false,
  }

  componentDidMount() {
    const { fetchProjectListRequest } = this.props;
    window.addEventListener('scroll', this.handleScroll);
    fetchProjectListRequest();
  }

  handleScroll = () => {
    const { fetchProjectListRequest } = this.props;
    const { page, fetching } = this.state;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      console.log('pa');
      fetchProjectListRequest(page);
    }
  };
  
  handleCheck = checked => {
    console.log(checked);
    this.setState({
      isOnlyScrapped: true,
    });
  }

  showModal = id => {
    this.setState({
      isShowModal: true,
    });
    console.log(id);
  }

  addScrapped = id => {
    console.log(id);
    // 로컬 스토리지에 저장
    this.setState({
      isShowModal: false,
    });
  }

  render() {
    const { projectList } = this.props;
    const {
      isShowModal,
      isOnlyScrapped,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <Checkbox
            text="스크랩한 것만 보기"
            handleChange={this.handleCheck}
          />
          <div className={styles.itemContainer}>
            {projectList.map((item, i) => (
              <ProjectItem
                key={i}
                item={item}
                handleClick={this.showModal}
              />
            ))}
          </div>
        </div>
        <ConfirmModal
          isOpen={isShowModal}
          isScrapped={false}
          handleCancelClick={() => this.setState({ isShowModal: false })}
          handleConfirmClick={this.addScrapped}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.projectList,
});

const mapDispatchToProps = dispatch => ({
  fetchProjectListRequest: page => dispatch(actions.fetchProjectListRequest(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);