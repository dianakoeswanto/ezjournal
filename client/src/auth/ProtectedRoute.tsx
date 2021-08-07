import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// @ts-ignore
const ProtectedRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component)}
        {...args}
    />
);

export default ProtectedRoute;
