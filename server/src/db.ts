import { DataSource } from "typeorm";
import { loadEnv } from "./env";
import { City } from "./entity/City";

loadEnv();

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [City],
  logging: ["error"],
});