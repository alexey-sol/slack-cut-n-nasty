import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("server", () => ({
    frontendUrl: env.FRONTEND_URL,
    port: parseInt(env.BACKEND_PORT, 10),
}));
