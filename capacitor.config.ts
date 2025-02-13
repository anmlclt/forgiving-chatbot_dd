
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.forgivingchatbot',
  appName: 'forgiving-chatbot',
  webDir: 'dist',
  server: {
    url: 'https://10853e98-fcff-44b2-8e33-597a33c8e3de.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
