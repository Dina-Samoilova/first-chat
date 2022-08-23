import React from 'react';
import './Chats.scss';
import { ChatsHead } from '../ChatsHead';
import { ChatsList } from '../ChatsList';

export const Chats: React.FC = () => {
  return (
    <div className="chats chats--mobile">
      <ChatsHead />
      <ChatsList />
    </div>
  );
};
