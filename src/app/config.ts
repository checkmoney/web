import { createConfig } from '@samokat/abstract-env';

// In dev mode, we have access to process.env.BACK_URL
// In prod mode, config will be fetched from separate file
export const config = createConfig({
  BACK_URL: process.env.BACK_URL,
  STATS_URL: process.env.STATS_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
});
