import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import names from "@const/providerNames";
import { fetchSession } from "@/session/redux/actions";
import { useAppDispatch, useAppSelector } from "@hooks";
import { RootState } from "@/app/store";
import { Layout } from "../common/Layout";

export const CreateNew = () => {
    const dispatch = useAppDispatch();

    const loading = useAppSelector((state: RootState) => state.session.loading);
    const currentUser = useAppSelector((state: RootState) => state.session.currentUser);
    console.log("session state", loading, currentUser);

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

    const openWindowToSignUpViaGoogle = () => {
        window.open("/api/oauth/google");
    };

    return (
        <Layout>
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
        </Layout>
    );
};
