import React from 'react';
import './WrongData.scss';

export const WrongData: React.FC = () => {
  return (
    <div className="wrongData">
      Email or Password are wrong.
      <br />
      Try again!
    </div>
  );
};
