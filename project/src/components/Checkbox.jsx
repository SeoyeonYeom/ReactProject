import React from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  id,
  name,
  text,
  handleChange,
}) => {
  const handleCheck = e => {
    handleChange(e.target.checked);
  }

  return (
    <label
      htmlFor={id}
      className={styles.checkbox}
    >
      <input
        name={name}
        type="checkbox"
        id={id}
        onChange={handleCheck}
      />
      <span>{text}</span>
    </label>
  );
};

export default Checkbox;
