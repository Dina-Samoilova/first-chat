import React from 'react';
import classNames from 'classnames';
import Moment from 'moment';
import './Message.scss';
import { User } from '../User';
import { useAuth } from '../../hook/useAuth';

type Props = {
  message: Message,
}

export const Message: React.FC<Props> = ({ message }) => {
  const content = useAuth();
  const user = content?.user;
  const chatWith = content?.chatWith;
  const date = new Date(message?.['create-at']);

  const imgUrl = chatWith && chatWith?.picture !== ""
    ? chatWith?.picture
    : '';

  return (
    <li className="message">
      <div className={classNames(
        'message__item',
        {'message__item--me': user?.id === message.userId}
        )}
      >
        {chatWith?.id === message.userId &&
          <User imgUrl={imgUrl} />
        }
        <div className={classNames(
          'message__item-block',
          {'message__item-block--me': user?.id === message.userId}
          )}
        >
          <div className={classNames(
              'message__item-text',
              { 'message__item-text--notMe': chatWith?.id === message.userId },
              { 'message__item-text--me': user?.id === message.userId },
            )}
          >
            {message.message}
          </div>
          <div className="message__item-time">
            {Moment(date).format('MM/DD/YY, LT')}
          </div>
        </div>
      </div>
    </li>
  );
};
