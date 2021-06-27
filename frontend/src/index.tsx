import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import {
    ApolloClient,
    InMemoryCache,
    gql,
} from "@apollo/client";

import paths from "./utils/const/paths";

const message = `Hello ${process.env.APP_NAME}`;

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
        <h1>{message}</h1>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
