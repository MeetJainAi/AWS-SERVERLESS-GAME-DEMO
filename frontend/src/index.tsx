import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './contexts/AuthContext';
import Game from './components/Game';
import './index.css';
import config from './aws-exports';

Amplify.configure(config);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Game />
    </AuthProvider>
  </React.StrictMode>
);