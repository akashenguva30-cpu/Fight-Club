
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './services/AuthContext';
import { ReportsProvider } from './services/ReportsContext';
import { VitalsProvider } from './services/VitalsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ReportsProvider>
        <VitalsProvider>
          <App />
        </VitalsProvider>
      </ReportsProvider>
    </AuthProvider>
  </React.StrictMode>
);
