namespace NodeJS {
  interface ProcessEnv {
    MINIO_ENDPOINT: string;
    MINIO_PORT: string;
    MINIO_USE_SSL: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    MINIO_BUCKET_NAME: string;

    GOOGLE_PRIVATE_KEY: string;
    GOOGLE_CLIENT_EMAIL: string;
    GOOGLE_PROJECT_ID: string;
    GOOGLE_BUCKET_NAME: string;

    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_GOOGLE_REDIRECT_URL: string;
  }
}
