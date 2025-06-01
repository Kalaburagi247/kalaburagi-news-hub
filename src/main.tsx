
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SplashScreen } from '@capacitor/splash-screen'

// Create and show splash screen immediately
const splashDiv = document.createElement('div');
splashDiv.id = 'custom-splash';
splashDiv.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const logoImg = document.createElement('img');
logoImg.src = '/lovable-uploads/57fd9bb0-1e1a-40a4-9fdd-5e6717aac1db.png';
logoImg.style.cssText = `
  width: 120px;
  height: 120px;
  object-fit: contain;
`;
logoImg.alt = 'Kalaburagi 24/7 Logo';

splashDiv.appendChild(logoImg);
document.body.appendChild(splashDiv);

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Starting app initialization with splash screen');
    
    // Initialize the React app
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
    
    // Show the root div and remove custom splash after 3 seconds
    setTimeout(() => {
      const rootElement = document.getElementById("root");
      const splash = document.getElementById('custom-splash');
      
      if (rootElement) {
        rootElement.style.display = 'block';
      }
      if (splash) {
        splash.remove();
      }
    }, 3000);
    
    console.log('App initialized, splash screen will auto-hide after 3 seconds');
  } catch (err) {
    console.error('Error initializing app:', err);
    
    // Force hide splash screen in case of error
    SplashScreen.hide().catch(err => 
      console.error('Error hiding splash screen:', err)
    );
    
    // Remove custom splash in case of error
    const splash = document.getElementById('custom-splash');
    const rootElement = document.getElementById("root");
    
    if (splash) {
      splash.remove();
    }
    if (rootElement) {
      rootElement.style.display = 'block';
    }
    
    // Still render the app even if there's an error
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  }
});
