
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Starting app initialization with splash screen');
    
    // Let the native splash screen handle video playback based on config
    // No need to explicitly call SplashScreen.show() here as it's handled by the native layer
    
    // Initialize the React app
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
    
    console.log('App initialized, splash screen should play video and auto-hide');
  } catch (err) {
    console.error('Error initializing app:', err);
    
    // Force hide splash screen in case of error
    SplashScreen.hide().catch(err => 
      console.error('Error hiding splash screen:', err)
    );
    
    // Still render the app even if there's an error
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  }
});
