import React from "react";
import CryptoDashboard from "../pages/dashboards/crypto/CryptoDashboard";
import ListingDashboard from "../pages/dashboards/listing/ListingDashboard";
import CrmDashboard from "../pages/dashboards/crm/CrmDashboard";
import IntranetDashboard from "../pages/dashboards/intranet/IntranetDashboard";
import EcommerceDashboard from "../pages/dashboards/ecommerce/EcommerceDashboard";
import NewsDashboard from "../pages/dashboards/news/NewsDashboard";
import MiscDashboard from "../pages/dashboards/misc/MiscDashboard";
import Page from "@jumbo/shared/Page";

const dashboardRoutes = [
    {
        path: "/dashboards/crypto",
        element: <Page component={CryptoDashboard} />,
    },
    {
        path: "/dashboards/listing",
        element: <Page component={ListingDashboard}/>,
    },
    {
        path: "/dashboards/crm",
        element: <Page component={CrmDashboard}/>,
    },
    {
        path: "/dashboards/intranet",
        element: <Page component={IntranetDashboard} />,
    },
    {
        path: "/dashboards/ecommerce",
        element: <Page component={EcommerceDashboard}/>,
    },
    {
        path: "/dashboards/news",
        element: <Page component={NewsDashboard}/>,
    },
    {
        path: "/dashboards/misc",
        element: <Page component={MiscDashboard}/>
    }
];

export default dashboardRoutes;
