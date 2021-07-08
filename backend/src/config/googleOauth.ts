import { registerAs } from "@nestjs/config";

const { env } = process;

export default registerAs("googleOauth", () => ({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectPath: env.GOOGLE_REDIRECT_PATH,
}));
