import React, { useMemo, useEffect, useRef } from 'react';
import './MessageList.scss';
import { Message } from '../Message';
import { useAuth } from '../../hook/useAuth';

export const MessageList: React.FC = () => {
  const content = useAuth();
  const user = content?.user;
  const chatWith = content?.chatWith;
  const messages = content?.messages;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const messageList = useMemo(() => {
    const filtered = messages?.filter(msg => (msg.userId === chatWith?.id
      && msg['to-userId'] === user?.id)
      || (msg.userId === user?.id
        && msg['to-userId'] === chatWith?.id));

    const sortByDate = filtered?.sort((a, b) => new Date(a['create-at']).getTime()
      - new Date(b['create-at']).getTime());

    return sortByDate;
  }, [chatWith?.id, messages, user?.id]);

  return (
    <div className="chatRoom__messageList">
      <ul className="chatRoom__messageList__list">
        {
          messageList?.map(message => (
            <Message key={message.id} message={message} />
          ))
        }
        <div ref={messagesEndRef}/>
      </ul>
    </div>
  );
};
