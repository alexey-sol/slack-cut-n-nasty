import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { AppWrapper } from "./AppWrapper";
import { AppRoutes } from "./AppRoutes";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#fefefe",
        },
        secondary: purple,
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});

export const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <AppWrapper>
                <AppRoutes />
            </AppWrapper>
        </Router>
    </ThemeProvider>
);
