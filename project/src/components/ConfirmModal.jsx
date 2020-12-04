import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({
  handleCancelClick,
  handleConfirmClick,
  isScrapped,
  isOpen,
}) => {
  return (
    <Fragment>
      <ReactModal
        overlayClassName={styles.overlay}
        className={styles.modal}
        appElement={window.document && window.document.body}
        isOpen={isOpen}
      >
        <h4 className={styles.title}>
          {isScrapped ? '스크랩을 취소할까요?' : '내 스크랩 리스트에 추가할까요?'}
        </h4>
        <div className={styles.buttonWrapper}>
          <button onClick={handleConfirmClick}>네</button>
          <button onClick={handleCancelClick}>아니요</button>
        </div>
      </ReactModal>
    </Fragment>
  )
}

ConfirmModal.propTypes = {
  handleConfirmClick: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
  isScrapped: PropTypes.bool,
  isOpen: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  isScrapped: false,
  isOpen: false,
}

export default ConfirmModal;
