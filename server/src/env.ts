import { EnvType, load } from "ts-dotenv";

export type Env = EnvType<typeof schema>;

export const schema = {
  NODE_ENV: ["production" as const, "development" as const, "test" as const],
  SERVER_PORT: Number,
  SERVER_HOST: String,
  CORS_ALLOWED_ORIGINS: String,
  POSTGRES_PASSWORD: String,
  POSTGRES_USER: String,
  POSTGRES_DB: String,
  REACT_APP_CITIES_API_KEY: String,
  REACT_APP_PHOTOS_API_KEY: String,
  DB_HOST: { type: String, optional: true },
};

export let env: Env;

export function loadEnv(): void {
  env = load(schema);
}
