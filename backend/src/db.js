import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const rawHost = process.env.POSTGRES_HOST || "db";
const POSTGRES_HOST =
  rawHost === "db" && process.env.RUNNING_IN_DOCKER !== "true"
    ? "localhost"
    : rawHost;

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "ideasdb",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "postgres",
  {
    host: POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT || 5432),
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
