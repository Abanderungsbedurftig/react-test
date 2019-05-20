import React from 'react';
import Total from './Total';
import PropTypes from 'prop-types';
import '../style/Finish.css';

const Finish = ({ easy, medium, hard, trueCount, onRepeat = f=>f }) => {
  const getText = () => {
    let text = '';
    if (parseInt(trueCount, 10) > 8) text = 'Excellent result bro!';
    else if (parseInt(trueCount, 10) > 5) text = 'Not bad, not bad. But it can be better...';
    else text = 'Oops! Someone screwed up.';
    return text;
  };

  return (
    <div className='finish-container'>
      <div className='finish-body'>
        <div className='table-th'>
          <span>true</span>
          <span>false</span>
        </div>
        <Total key='total_hard' difficulty='hard'
          data={hard}/>
        <Total key='total_medium' difficulty='medium'
          data={medium}/>
        <Total key='total_easy' difficulty='easy'
          data={easy}/>
        <div className='total-sum'>Сorrect answers <span>{trueCount}</span> of 10.&nbsp;
          { getText() }
        </div>
        <div className='repeat-buttons'>
          <button className='repeat-btn' onClick={() => onRepeat()}>Repeat</button>
          <button className='repeat-btn' onClick={() => window.location.reload(true)}>New test</button>
        </div>
      </div>
    </div>
  );
};

Finish.propTypes = {
  easy: PropTypes.object,
  hard: PropTypes.object,
  medium: PropTypes.object,
  onRepeat: PropTypes.func,
  trueCount: PropTypes.number
};

export default Finish;
