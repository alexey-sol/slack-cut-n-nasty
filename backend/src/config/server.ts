import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("server", () => ({
    apiPrefix: env.API_PREFIX,
    apiVersion: parseInt(env.API_VERSION, 10),
    backendUrl: `http://localhost:${env.BACKEND_PORT_EXTERNAL}`,
    frontendUrl: `http://localhost:${env.FRONTEND_PORT_EXTERNAL}`,
    port: parseInt(env.BACKEND_PORT, 10),
}));
