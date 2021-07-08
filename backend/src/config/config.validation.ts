import * as Joi from "joi";
import nodeEnvConst from "@utils/const/nodeEnv";

const { DEVELOPMENT, PRODUCTION, TEST } = nodeEnvConst;

export const envSchema = Joi.object({
    API_PREFIX: Joi.string().default("api"),
    APP_NAME: Joi.string().required(),
    BACKEND_PORT: Joi.number().default(3000),
    FRONTEND_PORT_EXTERNAL: Joi.number().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_REDIRECT_PATH: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default("7d"),
    JWT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string()
        .valid(DEVELOPMENT, PRODUCTION, TEST)
        .default(DEVELOPMENT),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_USER: Joi.string().required(),
});
