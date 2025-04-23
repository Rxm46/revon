
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.06de8de2bf5f4ebbbc7cc1f55b9856fa',
  appName: 'revon',
  webDir: 'dist',
  server: {
    url: 'https://06de8de2-bf5f-4ebb-bc7c-c1f55b9856fa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#4F46E5",
    }
  }
};

export default config;
