import React from 'react';
import './App.scss';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { ChatPage } from './components/ChatPage';
import { PageNotFound } from './components/PageNotFound';
import { WrongData } from './components/WrongData';

import { RequireAuth } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/wrong" element={<WrongData />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <NotificationContainer />
    </AuthProvider>
  );
};

export default App;
