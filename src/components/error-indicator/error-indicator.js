import React from 'react';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className="jumbotron spinner-item error-indicator">
      <img src={icon} alt="error icon" />
      <span className="boom"><h1>BOOM!</h1></span>
      <span>
        <h4>
          something has gone terribly wrong
        </h4>
      </span>
      <span>
        <h4>
          (but we already sent droids to fix it)
        </h4>
      </span>
    </div>
  );
};

export default ErrorIndicator;
