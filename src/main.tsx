
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Capacitor } from '@capacitor/core';

// Log environment information
console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("Running on Capacitor:", Capacitor.isNativePlatform());
console.log("Platform:", Capacitor.getPlatform());

// Mount the React application
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
