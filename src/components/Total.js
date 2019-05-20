import React from 'react';
import PropTypes from 'prop-types';

const Total = ({ difficulty, data }) => {
  return (
    <div className={`total total-${difficulty}`}>
      <div className='left-block'>{difficulty}</div>
      <div className='total-true'>{data.true}</div>
      <div className='total-false'>
        {data.false}
        <div className='false-numbers'>
          <span>{data.incorrectAnswer.length ? 'answers:' : ''}</span>
          <span>{data.incorrectAnswer.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

Total.propTypes = {
  data: PropTypes.object,
  difficulty: PropTypes.string
};

export default Total;
