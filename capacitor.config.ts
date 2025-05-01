
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.eab65df834e44eb0864a81c782fb8127',
  appName: 'kalaburagi-news-hub',
  webDir: 'dist',
  server: {
    url: 'https://eab65df8-34e4-4eb0-864a-81c782fb8127.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#0F3460",
    },
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
