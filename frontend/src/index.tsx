// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import { Amplify } from 'aws-amplify';
// import { AuthProvider } from './contexts/AuthContext';
// import Game from './components/Game';
// import './index.css';
// // import amplifyConfig from './amplifyconfiguration';

// import amplifyConfig from './amplify-config.js';
// import { Amplify } from 'aws-amplify';



import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';  // Import Amplify correctly
import amplifyConfig from './amplifyconfiguration';  // Ensure this file has a default export
import { AuthProvider } from './contexts/AuthContext';
import Game from './components/Game';
import './index.css';


// Configure Amplify
Amplify.configure(amplifyConfig);

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