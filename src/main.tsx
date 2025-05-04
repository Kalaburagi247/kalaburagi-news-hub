
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Initialize the splash screen as early as possible
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Make sure the splash screen is visible while the app loads
    await SplashScreen.show({
      showDuration: 5000,
      autoHide: false
    });
    
    // Initialize the app
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
    
    // Hide the splash screen with a fade effect after the app is loaded
    setTimeout(() => {
      SplashScreen.hide({
        fadeOutDuration: 500
      }).catch(err => console.error('Error hiding splash screen', err));
    }, 100); // Small delay to ensure app is rendered first
  } catch (err) {
    console.error('Error with splash screen:', err);
    
    // Initialize the app even if there's an error with the splash screen
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  }
});
