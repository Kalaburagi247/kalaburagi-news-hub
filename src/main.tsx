
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize the React app immediately
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
    
    // Let the Capacitor splash screen handle itself based on configuration
    console.log('App initialized, splash screen should auto-hide');
  } catch (err) {
    console.error('Error initializing app:', err);
    
    // Force hide splash screen in case of error
    SplashScreen.hide().catch(err => 
      console.error('Error hiding splash screen:', err)
    );
  }
});
