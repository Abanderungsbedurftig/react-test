import React from 'react';
import PropTypes from 'prop-types';
import '../style/Start.css';

const Start = ({ onStart = f=>f }) => {
  return (
    <div className='start-window'>
      <button className='start-btn' onClick={() => onStart()}>Start test</button>
    </div>
  );
};

Start.propTypes = {
  onStart: PropTypes.func
};

export default Start;
