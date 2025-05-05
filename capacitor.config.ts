
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
      launchShowDuration: 5000, // 5 seconds
      launchAutoHide: false,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      // Update the video splash configuration
      androidSplashResourceVideo: "splash", // The name of your video file without extension
      iosSplashResourceVideo: "splash", // The name of your video file without extension
    },
  },
  android: {
    // Using the correct property for Android icon configuration
    icon: "resources/android/icon/drawable-xxxhdpi-icon.png"
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
