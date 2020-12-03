import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  text,
  handleChange,
}) => {
  const handleCheck = e => {
    handleChange(e.target.checked);
  }

  return (
    <label
      htmlFor="scrap"
      className={styles.checkbox}
    >
      <input
        type="checkbox"
        id="scrap"
        onChange={handleCheck}
      />
      <span>{text}</span>
    </label>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  text: null,
}

export default Checkbox;
