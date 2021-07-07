import { envSchema } from "./config.validation";
import paths from "../../const/paths";

const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true
});

if (error) {
    throw error;
}

export default {
    apiPrefix: value.API_PREFIX,
    appName: value.APP_NAME,
    backendPort: parseInt(value.BACKEND_PORT, 10),
    backendPortExternal: parseInt(value.BACKEND_PORT_EXTERNAL, 10),
    backendServiceName: value.BACKEND_SERVICE_NAME,
    backendUrl: `http://localhost:${value.BACKEND_PORT_EXTERNAL}`,
    backendUrlInner: `http://${value.BACKEND_SERVICE_NAME}:${value.BACKEND_PORT}`,
    frontendPort: parseInt(value.FRONTEND_PORT, 10),
    frontendPortExternal: parseInt(value.FRONTEND_PORT_EXTERNAL, 10),
    frontendServiceName: value.FRONTEND_SERVICE_NAME,
    frontendUrl: `http://localhost:${value.FRONTEND_PORT_EXTERNAL}`,
    nodeEnv: value.NODE_ENV,
    get graphqlUri() {
        return `${this.backendUrl}/${paths.GRAPHQL_ENDPOINT}`;
    }
};
