import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isExpectedPathLength } from "@helpers/location/isExpectedPathLength";

export interface Props<T> extends RouteProps {
    component: React.ComponentType<T>;
}

export const GetStartedRoute = ({
    children, component: Component, location, ...rest
}: Props<any>) => {
    const isAtGetStartedRoot = isExpectedPathLength(location?.pathname, 1);
    const userHasCreds = true;

    const renderComponent = (props: unknown) => ((!isAtGetStartedRoot && userHasCreds)
        ? <Component {...props} />
        : <Redirect to="/get-started/create-new" />);

    return (
        <Route
            {...rest}
            render={renderComponent}
        />
    );
};
