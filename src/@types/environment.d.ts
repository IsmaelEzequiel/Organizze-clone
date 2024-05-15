declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'development' | 'production';
      PORT: string;
      HOST: string;
      CORS_ORIGIN: string;
      COMMON_RATE_LIMIT_WINDOW_MS: string;
      COMMON_RATE_LIMIT_MAX_REQUESTS: string;
      DATABASE_URL: string;
      SECRET_KEY: string;
    }
  }
}

export {};
