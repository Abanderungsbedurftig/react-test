import React from 'react';
import PropTypes from 'prop-types';
import '../style/Error.css';

const ErrorWindow = ({ message, onClick = f=>f }) => {
  return (
    <div className='error-window'>
      <span>{message}</span>
      <input type='button' className='error-btn'
        value='OK' onClick={() => onClick()}/>
    </div>
  );
};

ErrorWindow.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};

export default ErrorWindow;
