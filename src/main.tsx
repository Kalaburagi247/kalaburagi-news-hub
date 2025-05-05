
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Force the splash screen to show
    await SplashScreen.show({
      autoHide: false,
    });
    
    // Initialize the React app
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
    
    // Hide splash screen after the app is fully loaded
    window.addEventListener('load', () => {
      // Delay to ensure the app has time to fully render
      setTimeout(() => {
        SplashScreen.hide({
          fadeOutDuration: 500
        }).catch(err => console.error('Error hiding splash screen', err));
      }, 1000);
    });
  } catch (err) {
    console.error('Error with splash screen:', err);
    
    // Initialize the app even if there's an error with the splash screen
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  }
});
