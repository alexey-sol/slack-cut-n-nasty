import * as Joi from "joi";
import nodeEnvConst from "@utils/const/nodeEnv";

const { DEVELOPMENT, PRODUCTION, TEST } = nodeEnvConst;

export const envSchema = Joi.object({
    APP_NAME: Joi.string().required(),
    BACKEND_PORT: Joi.number().default(3000),
    FRONTEND_URL: Joi.string().required(),
    NODE_ENV: Joi.string()
        .valid(DEVELOPMENT, PRODUCTION, TEST)
        .default(DEVELOPMENT),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().default(5432),
    POSTGRES_USER: Joi.string().required(),
});
