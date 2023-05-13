declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'development' | 'staging' | 'production' | 'development-docker';
      NODE_ENV: 'development' | 'staging' | 'production';
      PORT?: number;
      PWD: string;
    }
  }
}

export {};
