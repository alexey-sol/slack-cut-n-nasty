import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import {
    ApolloClient,
    InMemoryCache,
    gql,
} from "@apollo/client";

import { Grid } from "@material-ui/core";
import paths from "./utils/const/paths";
import Auth from "./Auth";

const App = () => {
    useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.BACKEND_URL}/${paths.GRAPHQL_ENDPOINT}`,
            cache: new InMemoryCache(),
        });

        client
            .query({
                query: gql`
                    query GetUsers {
                        users {
                            id
                            email
                            details {
                                fullName
                            }
                        }
                    }
                `,
            })
            .then(console.log);
    }, []);

    return (
        <Grid
            alignItems="center"
            container
            direction="column"
        >
            <Auth />
        </Grid>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
