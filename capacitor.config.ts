
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
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: true,
      
      // Video splash configuration with proper paths
      androidSplashResourceVideo: "splash.mp4", // Include extension
      iosSplashResourceVideo: "splash.mp4", // Include extension
      spinnerColor: "#999999", // Add spinner color
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
