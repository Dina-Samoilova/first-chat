import { createContext, useState, useEffect, useMemo } from 'react';
import usersList from '../staticInfo/users.json';
import messageList from '../staticInfo/messages.json';

type Context = {
  user: User | null,
  singin: (newUser: User, callback: () => void) => void,
  singout: (callback: () => void) => void,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  chatWith: User | null,
  setChatWith: React.Dispatch<React.SetStateAction<User | null>>,
  appliedQuery: string,
  setAppliedQuery: React.Dispatch<React.SetStateAction<string>>
};

export const AuthContext = createContext<Context | null>(null);

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    const initialValue = saved && JSON.parse(saved);

    return initialValue || null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    const initialValue = saved && JSON.parse(saved);

    return initialValue || usersList;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('messages');
    const initialValue = saved && JSON.parse(saved);

    return initialValue || messageList;
  });

  const [chatWith, setChatWith] = useState<User | null>(() => {
    const saved = localStorage.getItem('chatWith');
    const initialValue = saved && JSON.parse(saved);

    return initialValue || null;
  });

  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
      localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

  const singin = (newUser: User, callback: () => void) => {
    const updatedUsers = [...users, newUser];

    setUser(newUser);
    setUsers(updatedUsers);
    setMessages(messageList);

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('messages', JSON.stringify(messageList));
    callback();
  };

  const singout = (callback: () => void) => {
    setUser(null);
    setChatWith(null);
    setUsers(usersList);
    setMessages(messageList);

    localStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('chatWith', JSON.stringify(null));
    localStorage.setItem('messages', JSON.stringify(null));
    localStorage.setItem('users', JSON.stringify(null));
    callback();
  };

  const value = useMemo (() => ({
    user,
    singin,
    singout,
    users,
    setUsers,
    messages,
    setMessages,
    chatWith,
    setChatWith,
    appliedQuery,
    setAppliedQuery,
  }), [chatWith, messages, user, users, appliedQuery]);

  return (
    <AuthContext.Provider value = {value}>
      {children}
    </AuthContext.Provider>
  );
};
