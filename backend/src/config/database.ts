import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("database", () => ({
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    password: env.POSTGRES_PASSWORD,
    port: parseInt(env.POSTGRES_PORT, 10),
    username: env.POSTGRES_USER,
}));
