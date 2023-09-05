import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {ssl: {required: true, rejectUnauthorized: false}}
});

export default db;
