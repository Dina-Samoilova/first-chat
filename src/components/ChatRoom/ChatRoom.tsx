import React, { useState, useEffect } from 'react';
import './ChatRoom.scss';
import classNames from 'classnames';
import { ChatRoomHead } from '../ChatRoomHead';
import { MessageList } from '../MessageList';
import { NewMessage } from '../NewMessage';
import { useAuth } from '../../hook/useAuth';

export const ChatRoom: React.FC = () => {
  const content = useAuth();
  const chatWith = content?.chatWith;
  const [isChatWith, setIsChatWith] = useState(false);

  useEffect(() => {
    if (chatWith !== null) {
      setIsChatWith(true);
    } else {
      setIsChatWith(false);
    }

  }, [chatWith])
  

  return (
    <div
      className={classNames(
        'chatRoom chatRoom--mobile',
        {'chatRoom--show': isChatWith}
      )}
    >
      <ChatRoomHead />
      <MessageList />
      <NewMessage />
    </div>
  );
};
