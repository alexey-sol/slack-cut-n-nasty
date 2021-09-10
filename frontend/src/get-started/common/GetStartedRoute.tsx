import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isExpectedPathLength } from "@helpers/location/isExpectedPathLength";
import { RootState } from "@/app/store";
import { useAppSelector } from "@/app/hooks";

export interface Props<T> extends RouteProps {
    component: React.ComponentType<T>;
}

export const GetStartedRoute = ({
    children, component: Component, location, ...rest
}: Props<any>) => {
    const currentUser = useAppSelector(({ session }: RootState) => session.currentUser);
    const isWaitingForSession = useAppSelector(
        ({ session }: RootState) => session.isWaitingForSession,
    );

    if (isWaitingForSession) {
        return null;
    }

    const isAtGetStartedRoot = isExpectedPathLength(location?.pathname, 1);

    const renderComponent = (props: unknown) => ((!isAtGetStartedRoot && currentUser)
        ? <Component {...props} />
        : <Redirect to="/get-started/create-new" />);

    return (
        <Route
            {...rest}
            render={renderComponent}
        />
    );
};
