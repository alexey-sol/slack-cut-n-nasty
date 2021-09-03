import React from "react";
import { Grid } from "@material-ui/core";

export interface Props {
    children: React.ReactNode;
}

export const AppWrapper = ({ children }: Props) => (
    <Grid
        alignItems="center"
        container
        direction="column"
    >
        {children}
    </Grid>
);

AppWrapper.defaultProps = {
    children: null,
} as Partial<Props>;
