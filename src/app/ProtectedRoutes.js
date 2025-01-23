import { useJumboApp } from '@jumbo/hooks';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { config } from './config/main';



const ProtectedRoutes = ({ component, layout, ...restProps }) => {
    const isAuthenticated = localStorage.getItem('accesstoken');
    const isValidUser = true;
    console.log("isValidUser",isValidUser)
    const { activeLayout, setActiveLayout } = useJumboApp();

    React.useEffect(() => {
        if (layout !== activeLayout) {
            setActiveLayout(layout);
        }
    }, [layout]);


    const PageComponent = component;


    if (isAuthenticated && isValidUser === true) {
        // return <Route {...restProps} component={component} />;
        return <PageComponent {...restProps} />;
    } else {
        return <Navigate to="/" />;
        // return <PageComponent {...restProps} />;
    }
}

ProtectedRoutes.defaultProps = {
    layout: config.defaultLayout
};

export default ProtectedRoutes;