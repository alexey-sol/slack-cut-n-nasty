import React from "react";
import { Route, Switch } from "react-router-dom";
import { GetStartedRoute } from "@/get-started/common/GetStartedRoute";
import { CreateNew } from "@/get-started/CreateNew";
import { Landing } from "@/get-started/Landing";

function Home() {
    return <div>Hello</div>;
}

export const AppRoutes = () => (
    <Switch>
        <Route
            component={Home}
            exact
            path="/"
        />
        <GetStartedRoute
            component={CreateNew}
            path="/get-started"
        />
        <GetStartedRoute
            component={CreateNew}
            path="/get-started/create-new"
        />
        <GetStartedRoute
            component={Landing}
            path="/get-started/landing"
        />
    </Switch>
);
