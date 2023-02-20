import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, ...props }) => {
    return loggedIn ? <Route {...props} /> : <Redirect to = "/" />;
}
