
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.eab65df834e44eb0864a81c782fb8127',
  appName: 'kalaburagi-news-hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Reduced to 3 seconds
      launchAutoHide: true, // Set to true to ensure it auto-hides
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true, // Added spinner to show loading state
      splashFullScreen: true,
      splashImmersive: true,
      // Video configuration
      androidSplashResourceVideo: "splash", 
      iosSplashResourceVideo: "splash",
    },
  },
  android: {
    icon: "resources/android/icon/drawable-xxxhdpi-icon.png"
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
