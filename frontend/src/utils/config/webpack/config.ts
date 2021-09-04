import { envSchema } from "./config.validation";

const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true,
});

if (error) {
    throw error;
}

export default {
    apiPrefix: value.API_PREFIX,
    appName: value.APP_NAME,
    backendHost: value.BACKEND_HOST,
    backendPort: parseInt(value.BACKEND_PORT, 10),
    backendPortExternal: parseInt(value.BACKEND_PORT_EXTERNAL, 10),
    backendUrl: `http://localhost:${value.BACKEND_PORT_EXTERNAL}`,
    backendUrlInner: `http://${value.BACKEND_HOST}:${value.BACKEND_PORT}`,
    frontendHost: value.FRONTEND_HOST,
    frontendPort: parseInt(value.FRONTEND_PORT, 10),
    frontendPortExternal: parseInt(value.FRONTEND_PORT_EXTERNAL, 10),
    frontendUrl: `http://localhost:${value.FRONTEND_PORT_EXTERNAL}`,
    graphqlPrefix: value.GRAPHQL_PREFIX,
    nodeEnv: value.NODE_ENV,
};
