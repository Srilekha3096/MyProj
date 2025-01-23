import React from "react";
import Login from "../pages/auth-pages/login";
import Login from "../pages/auth-pages/login/Login";
import Signup2 from "../pages/auth-pages/signup2";
import ForgotPassword from "app/pages/auth-pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/auth-pages/reset-password";
import Page from "@jumbo/shared/Page";



const authRoutes = [
    {
        path: "/login",
        element: <Page component={Login} layout={"solo-page"} />
    },
    {
        path: "/user/login",
        element: <Page component={Login} layout={"solo-page"} />
    },
    {
        path: "/auth-pages/signup-2",
        element: <Page component={Signup2} layout={"solo-page"} />
    },
    {
        path: "/auth-pages/forgot-password",
        element: <Page component={ForgotPassword} layout={"solo-page"} />
    },
    {
        path: "/auth-pages/reset-password",
        element: <Page component={ResetPassword} layout={"solo-page"} />
    }
];

export default authRoutes;
