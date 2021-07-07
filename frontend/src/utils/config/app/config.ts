import paths from "../../const/paths";

export default {
    appName: process.env.APP_NAME,
    backendUrl: `http://localhost:${process.env.BACKEND_PORT_EXTERNAL}`,
    nodeEnv: process.env.NODE_ENV,
    get graphqlUri() {
        return `${this.backendUrl}/${paths.GRAPHQL_ENDPOINT}`;
    }
};
