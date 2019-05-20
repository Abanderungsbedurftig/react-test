import React from 'react';
import PropTypes from 'prop-types';

const Check = ({ text, number, checked, onSelectAnswer = f=>f, onDeleteAnswer = f=>f }) => {
  const selectAnswer = e => {
    if (e.target.checked) onSelectAnswer(text);
    else onDeleteAnswer(text);
  };

  return (
    <li>
      <input type='checkbox' className='check-btn'
        name={number.toString()} value={text}
        onChange={e => selectAnswer(e)} checked={checked.has(text)}/>
      <label>{text}</label>
    </li>
  );
};

Check.propTypes = {
  checked: PropTypes.object,
  number: PropTypes.number,
  onDeleteAnswer: PropTypes.func,
  onSelectAnswer: PropTypes.func,
  text: PropTypes.string
};

export default Check;
