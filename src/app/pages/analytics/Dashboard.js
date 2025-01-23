

import React, { useEffect, useState } from "react";
import "../home/Home.css";
import { Grid } from "@mui/material";
import BitcoinPrice from "../dashboards/crypto/components/BitcoinPrice";
import RipplePrice from "../dashboards/crypto/components/RipplePrice";
import EthereumPrice from "../dashboards/crypto/components/EthereumPrice";
import SalesReport from "app/shared/metrics/SalesReport";
import NewArticles from "app/shared/metrics/NewArticles";
import ActiveUsers from "app/shared/metrics/ActiveUsers";
import CreditScore from "app/shared/metrics/CreditScore";
import TrafficAnalysis from "app/shared/metrics/TrafficAnalysis";
import TicketsStatus from "app/shared/metrics/TicketsStatus";
import { useTranslation } from "react-i18next";
import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";


const Dashboard = () => {
    const { t } = useTranslation();

    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    const [reload, setReload] = useState(false);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        console.log("Reload");
        const handleTick = () => {
            setReload(true);
            setTimeout(() => setReload(false), 0);
        };

        const newTimerId = setTimeout(handleTick, 800);
        setTimerId(newTimerId);

        // Cancel the timer when the component is unmounted
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    if (reload) {
        return null;
    }


    return (
        <JumboContentLayoutMain backgroundColor="#fffeff">
            <div className="main-div">
                <Grid container spacing={3.75}>
                    <Grid item xs={12} sm={6} lg={6}>
                        <h2 className="dashboard-title">
                            {t("Dashboard")}
                        </h2>
                    </Grid>
                </Grid>
                <br />

                {/* code for dashboard */}
                <div className="sub-div2">
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <SalesReport className="grid"></SalesReport>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <NewArticles className="grid"></NewArticles>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <ActiveUsers className="grid"></ActiveUsers>
                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <BitcoinPrice
                                className="grid"
                                style={{ backgroundColor: "white", color: "black" }}
                            ></BitcoinPrice>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <RipplePrice className="grid"></RipplePrice>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <EthereumPrice className="grid"></EthereumPrice>
                        </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TrafficAnalysis className="grid"></TrafficAnalysis>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <CreditScore className="grid grid3-2"></CreditScore>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TicketsStatus className="grid grid3-3"></TicketsStatus>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </JumboContentLayoutMain>
    );
};



export default Dashboard;