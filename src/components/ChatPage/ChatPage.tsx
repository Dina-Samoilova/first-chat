import React from 'react';
import './ChatPage.scss';
import { ChatRoom } from '../ChatRoom';
import { Chats } from '../Chats';
import { useAuth } from '../../hook/useAuth';

export const ChatPage: React.FC = () => {
  const content = useAuth();
  const chatWith = content?.chatWith;

  return (
    <div className="chatPage chatPage--mobile">
      <Chats />
      {chatWith === null
        ? <div className="chatPage__noChat chatPage__noChat--mobile">
            Choose Chat to start conversation
          </div>
        : <ChatRoom />
      }
    </div>
  );
};
