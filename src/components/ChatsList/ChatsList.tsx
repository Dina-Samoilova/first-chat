import React, { useMemo } from 'react';
import './ChatsList.scss';
import { Chat } from '../Chat';
import { useAuth } from '../../hook/useAuth';

export const ChatsList: React.FC = () => {
  const content = useAuth();
  const users = content?.users;
  const user = content?.user;
  const messages = content?.messages;
  const appliedQuery = content?.appliedQuery;

  function sortUsers(arr1: User[], arr2: Message[]) {
    for (const el of arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id === el.userId) {
          if (i !== 0) {
            const temp1 = arr1[i];
            arr1.splice(i, 1);
            arr1.unshift(temp1);
          }
        }
      }
    }

    return arr1;
  }

  const filterMessage = messages?.filter(msg => msg['to-userId'] === user?.id)
        .sort((a, b) => new Date(a['create-at']).getTime()
          - new Date(b['create-at']).getTime());
  
  const sortedUsers = useMemo(() => {
    if (users && filterMessage && user) {
      const sorted = sortUsers(users, filterMessage);

      return sorted.filter(usr => usr.id !== user.id);
    }

    if (!user && users) {
      return users;
    }

    return [];
  }, [filterMessage, user, users]);

  const visibleUsers = useMemo(() => {
    if (appliedQuery && sortedUsers && messages && appliedQuery !== '') {
      const searchMessage = messages.filter(msg => 
        msg.message.toLowerCase().includes(appliedQuery));

      return sortedUsers.filter(usr =>
        usr.name.toLowerCase().includes(appliedQuery)
        || searchMessage.some(msg => msg.userId === usr.id
          || msg['to-userId'] === usr.id)
      );
    }
    return sortedUsers;
  }, [appliedQuery]);

  return (
    <div className="chats__list">
      <h2 className="chats__list__title">Chats</h2>

      <ul className="chats__list__menu">
        {
          visibleUsers.map(usr => (
            <Chat key={usr.id} chat={usr} />
          ))
        }
      </ul>
    </div>
  );
};
