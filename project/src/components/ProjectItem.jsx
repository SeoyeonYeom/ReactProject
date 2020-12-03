import React from 'react';
import scrapIcon from '../assets/scrapIcon.svg';
import cat from '../assets/cat.svg';
import PropTypes from 'prop-types';
import styles from './ProjectItem.module.scss';

const ProjectItem = ({
  item,
  handleClick,
}) => {
  return (
    <div className={styles.itemBox}>
      <div className={styles.itemHeader}>
        <div
          className={styles.profile}
          style={{
            backgroundImage: `url(${cat || item.profile_image_url})`,
          }}
        />
        <div>{item.nickname}</div>
      </div>
      <div
        className={styles.itemImage}
        style={{
          backgroundImage: `url(${item.image_url})`,
        }}
      >
        <button
          className={styles.scrapIconBtn}
          onClick={() => handleClick(item.id)}
        >
          <img src={scrapIcon} alt="스크랩하기" className={styles.scrapIcon}/>
        </button>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProjectItem;