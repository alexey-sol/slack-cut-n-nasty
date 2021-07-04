import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Auth = () => (
    <Box>
        <Typography variant="h4" component="h1" gutterBottom>
            Sign in using:
        </Typography>

        <Box display="flex" justifyContent="center">
            <List>
                <ListItem button>
                    <ListItemText primary="Google" />
                </ListItem>
            </List>
        </Box>

    </Box>
);

export default Auth;
