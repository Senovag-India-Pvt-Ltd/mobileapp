import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.senovag.sericulture.bidding',
  appName: 'Sericulture Bidding App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
