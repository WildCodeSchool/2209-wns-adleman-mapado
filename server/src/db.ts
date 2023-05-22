import { DataSource } from 'typeorm';
import {env, loadEnv} from "./env";
import City from './entity/City';
import User from './entity/User';
import Poi from './entity/Poi';
import Category from "./entity/Category";

loadEnv();
export default new DataSource({
  type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [City, User, Poi, Category],
  logging: ["error"],
});