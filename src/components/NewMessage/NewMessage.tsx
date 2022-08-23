import React, { useEffect, useState } from 'react';
import './NewMessage.scss';
import { NotificationManager } from 'react-notifications';
import { useAuth } from '../../hook/useAuth';
import { getJoke } from '../../helpers/getJoke';

export const NewMessage: React.FC = () => {
  const content = useAuth();
  const messages = content?.messages;
  const user = content?.user;
  const chatWith = content?.chatWith;
  const setMessages = content?.setMessages;
  const [inputMessage, setInputMessage] = useState('');
  const [getFromId, setGetFromId] = useState(chatWith?.id || null);
  const [joke, setJoke] = useState<Joke | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const addMessage = (message: string, from: number, to: number) => {
    if (messages && user && chatWith && setMessages) {
      const newMessage = {
        id: messages.length + 1,
        userId: from,
        "to-userId": to,
        "create-at": new Date(),
        message,
      };



      setMessages((prev: Message[]) => ([
        ...prev,
        newMessage,
      ]));
    }

    setGetFromId(to);
    setInputMessage('');
    loadJoke();
  };

  const addJoke = (message: string, from: number, to: number) => {
    if (messages && user && chatWith && setMessages) {
      const newMessage = {
        id: messages.length + 1,
        userId: from,
        "to-userId": to,
        "create-at": new Date(),
        message,
      };

      setMessages((prev: Message[]) => ([
        ...prev,
        newMessage,
      ]));
    }

    setJoke(null);
  };

  useEffect(() => {
    setTimeout(() => {
      if (joke && getFromId && user) {
        addJoke(joke.value, getFromId, user.id);
        NotificationManager.warning('You have new message');
      }
    }, 2000);

  }, [addMessage]);

  const loadJoke = async () => {
    const heSay = await getJoke();

    setJoke(heSay);
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (user && chatWith && inputMessage.length > 0) {
        addMessage(inputMessage, user.id, chatWith.id);
      }
    }
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user && chatWith && inputMessage.length > 0) {
      addMessage(inputMessage, user.id, chatWith.id);
    }
  };

  return (
    <form className="chatRoom__newMessage" onSubmit={handleSendMessage}>
      <label htmlFor="newMessage" className="chatRoom__newMessage-lable">
        <input
          id="newMessage"
          type="text"
          placeholder="Type your message"
          value={inputMessage}
          autoComplete="off"
          className="chatRoom__newMessage-input"
          onChange={handleInputChange}
          onKeyDown={handleKeydown}
        />
        <button type="submit" className="chatRoom__newMessage-send">
          <div className="chatRoom__newMessage-send-img"></div>
        </button>
      </label>
    </form>
  );
};
