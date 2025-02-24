import React, { useState } from 'react';
import scrapIcon from '../assets/scrapIcon.svg';
import blue from '../assets/blue.svg';
import cat from '../assets/cat.svg';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';
import styles from './ProjectItem.module.scss';

const ProjectItem = ({
  item,
  handleAddScrap,
  handleRemoveScrap,
  isScrapped,
}) => {
  const [isShowModal, setShowModal] = useState(false);

  const handleModal = () => {
    if (isScrapped) {
      setShowModal(true);
    } else {
      handleAddScrap(item);
    }
  };

  const confirmClick = () => {
    handleRemoveScrap(item.id);
    setShowModal(false);
  };

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
          onClick={handleModal}
        >
          <img
            src={isScrapped ? blue : scrapIcon}
            alt="스크랩하기"
            className={styles.scrapIcon}
          />
        </button>
      </div>
      {isShowModal && (
        <ConfirmModal
          isOpen
          isScrapped={isScrapped}
          handleConfirmClick={confirmClick}
          handleCancelClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

ProjectItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleAddScrap: PropTypes.func.isRequired,
  handleRemoveScrap: PropTypes.func.isRequired,
  isScrapped: PropTypes.bool,
};

ProjectItem.defaultProps = {
  isScrapped: false,
}

export default ProjectItem;