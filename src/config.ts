require("dotenv").config();

export const port = process.env.PORT || 3000;
export const postgresPort = process.env.POSTGRES_PORT || 5432;
export const postgresUrl = process.env.POSTGRES_URL;
export const postgresUser = process.env.POSTGRES_USER;
export const postgresPassword = process.env.POSTGRES_PASSWORD;
export const postgresDatabase = process.env.POSTGRES_DATABASE;
