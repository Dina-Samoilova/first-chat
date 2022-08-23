import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './ChatsHead.scss';
import { Search } from '../Search';
import { User } from '../User';
import { Online } from '../OnlineSymbol';
import { Offline } from '../OfflineSymbol';
import { useAuth } from '../../hook/useAuth';

export const ChatsHead: React.FC = () => {
  const navigate = useNavigate();
  const content = useAuth();
  const user = content?.user;
  const singout = content?.singout;
  const [showLogout, setShowLogout] = useState(false);

  const imgUrl = user && user?.picture !== ""
    ? user?.picture
    : '';

  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    if (singout) {
      singout(() => navigate('/login', { replace: true }));
    }
  };

  return (
    <div className="chats__head">
      <div
        className="chats__head__user"
        onClick={toggleShowLogout}
      >
        <User imgUrl={imgUrl} />
        {
          user && user.status === 'online'
            ? <Online />
            : <Offline />
        }

        <button
          type="button"
          className="chats__head__user-logout"
          style={{ visibility: showLogout ? 'visible' : 'hidden' }}
          onClick={handleLogout}
        >
        Log Out
      </button>
      </div>
      <Search />
    </div>
  );
};
