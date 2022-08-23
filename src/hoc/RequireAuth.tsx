import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type Props = {
  children: React.ReactNode,
};

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const content = useAuth();
  const user = content?.user;

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      {children}
    </>
  );
};
