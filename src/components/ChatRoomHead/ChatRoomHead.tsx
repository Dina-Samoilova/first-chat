import React from 'react';
import './ChatRoomHead.scss';
import { User } from '../User';
import { Online } from '../OnlineSymbol';
import { Offline } from '../OfflineSymbol';
import { useAuth } from '../../hook/useAuth';

export const ChatRoomHead: React.FC = () => {
  const content = useAuth();
  const chatWith = content?.chatWith;
  const setChatWith = content?.setChatWith;
  const imgUrl = chatWith && chatWith?.picture !== ""
    ? chatWith?.picture
    : '';

  const handleClick = () => {
    setChatWith && setChatWith(null);
  };

  return (
    <div className="chatRoom__head">
      <button
        type="button"
        className="chatRoom__head__backBtn chatRoom__head__backBtn--mobile"
        onClick={handleClick}
      >
        Back
      </button>
      <div className="chatRoom__head__user">
        <User imgUrl={imgUrl} />
        {
          chatWith && chatWith.status === "online"
            ? <Online />
            : <Offline />
        }
      </div>
      <p className="chatRoom__head__userName">{chatWith?.name}</p>
    </div>
  );
};
