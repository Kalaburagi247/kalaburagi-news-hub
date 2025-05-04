
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Hide splash screen when the app is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
  
  // Hide the splash screen with a fade effect
  setTimeout(() => {
    SplashScreen.hide({
      fadeOutDuration: 500
    }).catch(err => console.error('Error hiding splash screen', err));
  }, 100); // Small delay to ensure app is rendered first
});
