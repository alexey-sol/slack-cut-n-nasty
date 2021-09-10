import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@hooks";
import { checkIfLoading } from "@/ui/redux/selectors";
import { fetchSession } from "@/session/redux/actions";
import { RootState } from "@/app/store";
import { Loader } from "@/ui/Loader";

export interface Props {
    children: React.ReactNode;
}

export const AppWrapper = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

    const isLoading = useAppSelector(
        (state: RootState) => checkIfLoading(state, "session/fetchSession"),
    );

    return (
        <Grid
            alignItems="center"
            container
            direction="column"
        >
            {children}
            {isLoading && <Loader />}
        </Grid>
    );
};

AppWrapper.defaultProps = {
    children: null,
} as Partial<Props>;
