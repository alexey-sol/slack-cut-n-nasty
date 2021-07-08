import React from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";
import Auth from "./Auth";

const App = () => (
    <Grid
        alignItems="center"
        container
        direction="column"
    >
        <Auth />
    </Grid>
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);
