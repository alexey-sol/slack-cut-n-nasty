import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("jwt", () => ({
    expiresIn: env.JWT_EXPIRES_IN,
    secret: env.JWT_SECRET,
}));
