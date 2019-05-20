import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ text, number, checked, onSelectAnswer = f=>f }) => {
  const selectAnswer = () => {
    onSelectAnswer(text);
  };

  return (
    <li>
      <input type='radio' className='radio-btn'
        name={`question_${number.toString()}`} value={text}
        onChange={e => selectAnswer(e)} checked={checked === text}/>
      <label>{text}</label>
    </li>
  );
};

Radio.propTypes = {
  checked: PropTypes.string,
  number: PropTypes.number,
  onSelectAnswer: PropTypes.func,
  text: PropTypes.string
};

export default Radio;
