import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import Moment from 'moment';
import './Chat.scss';
import { User } from '../User';
import { Online } from '../OnlineSymbol';
import { Offline } from '../OfflineSymbol';
import { useAuth } from '../../hook/useAuth';

type Props = {
  chat: User,
}

export const Chat: React.FC<Props> = ({ chat }) => {
  const content = useAuth();
  const user = content?.user;
  const chatWith = content?.chatWith;
  const setChatWith = content?.setChatWith;
  const messages = content?.messages;

  const handleCooseChat = () => {
    if (setChatWith) {
      setChatWith(chat);
      localStorage.setItem('chatWith', JSON.stringify(chat));
    }
  };

  const getLastMessage = useMemo(() => {
    const filteredMessage = messages?.filter(msg =>
      msg.userId === chat.id && msg['to-userId'] === user?.id);
    const sortedMessage = filteredMessage?.sort((a, b) => new Date(a['create-at']).getTime()
      - new Date(b['create-at']).getTime());

    if (sortedMessage) {
      return sortedMessage[sortedMessage.length - 1];
    }
  }, [chat.id, messages, user?.id]);
  
  const date = getLastMessage ? new Date(getLastMessage?.['create-at']) : '';

  return (
    <li className="chat" onClick={handleCooseChat}>
      <div
        className={classNames(
        'chat__item chat__item',
        {'chat__item chat__item--active': (chatWith && chatWith.id === chat.id)},
        )}
      >
        <div className="chat__item-img">
          <User imgUrl={chat.picture} />
          {
            chat.status === 'online'
              ? <Online />
              : <Offline />
          }
        </div>
        <div className="chat__item-info">
          <div className="chat__item-info__name">
            {chat.name}
          </div>
          <div className="chat__item-info__lastMessage">
            {getLastMessage && getLastMessage.message}
          </div>
        </div>
        <div className="chat__item-date">
          {date && Moment(date).format('MMM D, YYYY')}
        </div>
      </div>
    </li>
  );
};
