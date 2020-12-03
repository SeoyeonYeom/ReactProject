import React, { Component } from 'react';
import ProjectItem from '../components/ProjectItem';
import Checkbox from '../components/Checkbox';
import * as actions from '../actions';
import { connect } from 'react-redux';
import styles from './ProjectListContainer.module.scss';

class ProjectListContainer extends Component {
  state = {
    isOnlyScrapped: true,
    page: 1,
  }

  componentDidMount() {
    this.props.fetchProjectListRequest();
  }
  
  handleCheck = checked => {
    console.log(checked);
  }

  render() {
    const { projectList } = this.props;
    return (
      <div className={styles.container}>
        <Checkbox
          id="scrap"
          text="스크랩한 것만 보기"
          handleChange={this.handleCheck}
        />
        {projectList.map((item, i) => (
          <ProjectItem key={i} item={item} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.projectList,
});

const mapDispatchToProps = dispatch => ({
  fetchProjectListRequest: () => dispatch(actions.fetchProjectListRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);