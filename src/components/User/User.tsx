import React from 'react';
import './User.scss';

type Props = {
  imgUrl: string,
};

export const User: React.FC<Props> = ({ imgUrl }) => {
  let url: any;

  if (imgUrl === '') {
    url = require(`../../images/icons/user.svg`).default;
  } else {
    url = imgUrl.includes('http')
      ? imgUrl
      : require(`../../${imgUrl}`);
  }

  return (
    <img src={url} alt="user" className="user" />
  );
};
