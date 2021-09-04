export default {
    appName: process.env.APP_NAME,
    backendUrl: `http://localhost:${process.env.BACKEND_PORT_EXTERNAL}`,
    graphqlPrefix: process.env.GRAPHQL_PREFIX,
    nodeEnv: process.env.NODE_ENV,
    get graphqlUri() {
        return `${this.backendUrl}/${this.graphqlPrefix}`;
    },
};
