import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("server", () => ({
    port: parseInt(env.BACKEND_PORT, 10),
}));
