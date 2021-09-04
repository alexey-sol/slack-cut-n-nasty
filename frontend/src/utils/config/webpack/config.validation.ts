import * as Joi from "joi";
import nodeEnvConst from "../../const/nodeEnv";

const { DEVELOPMENT, PRODUCTION, TEST } = nodeEnvConst;

export const envSchema = Joi.object({
    API_PREFIX: Joi.string().default("api"),
    APP_NAME: Joi.string().required(),
    BACKEND_HOST: Joi.string().required(),
    BACKEND_PORT: Joi.number().default(3000),
    BACKEND_PORT_EXTERNAL: Joi.number().required(),
    FRONTEND_HOST: Joi.string().required(),
    FRONTEND_PORT: Joi.number().required(),
    FRONTEND_PORT_EXTERNAL: Joi.number().required(),
    GRAPHQL_PREFIX: Joi.string().default("graphql"),
    NODE_ENV: Joi.string()
        .valid(DEVELOPMENT, PRODUCTION, TEST)
        .default(DEVELOPMENT),
});
