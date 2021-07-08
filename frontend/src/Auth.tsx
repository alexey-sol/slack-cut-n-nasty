import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { gql } from "@apollo/client";
import names from "./utils/const/providerNames";
import { client } from "./utils/gql";

const Auth = () => {
    useEffect(() => {
        client
            .query({
                query: gql`
                    query Auth {
                        auth {
                            id
                            date {
                                create
                                update
                            }
                            email
                            details {
                                fullName
                                imageUrl
                            }
                        }
                    }
                `,
            })
            .then((user) => console.log("Here's session", user))
            .catch(console.error);
    }, []);

    const openWindowToSignUpViaGoogle = () => {
        window.open("/api/oauth/google");
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign in using:
            </Typography>

            <Box display="flex" justifyContent="center">
                <List>
                    <ListItem button>
                        <ListItemText
                            onClick={openWindowToSignUpViaGoogle}
                            primary={names.GOOGLE}
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Auth;
