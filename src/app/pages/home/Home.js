import React, { useEffect, useState } from "react";
import "./Home.css";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";



const Home = () => {
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
  const [showDashboard1, setShowDashboard1] = useState(false);
  const [showDashboard2, setShowDashboard2] = useState(true);

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
  }, [setShowDashboard2]);

  if (reload) {
    return null;
  }

  const SecondDashboard = () => {
    setShowDashboard2(true);
    setShowDashboard1(false);
  };


  return (
    <JumboContentLayoutMain>
      <div>
        <Grid container spacing={3.75}>
          <Grid item xs={12} lg={5} sx={{ display: "flex", flexDirection: "column", justifyContent: "top" }}>
            <h2 style={{ cursor: "pointer" }}>
              {t("Welcome to")} <span style={{ color: "#00bfff !important" }}> {t("test")}</span>
            </h2>
            <br />
            {/* <Box>
              <Typography variant="h2">
                Revolutionize the way you clean your car.
                Go waterless.
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "500 !important", color: "gray" }}>
                Our high quality electrically charged nano solution
                <br />
                encapsulates and emulsifies the dirt
                <br />
                particles and lifts them off the surface of
                <br />
                your vehicle without scratching the surface.
                <br />
                Go waterless.
              </Typography>
            </Box> */}
          </Grid>
          <Grid item xs={12} lg={7} className="grid">
            {/* <div style={{
              // backgroundColor: "#00bfff",
              backgroundImage: `url(${require('../../../assets/images/brandname.JPG')})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
              borderRadius: "10px",
              minHeight: "68vh",
            }}
            ></div> */}
          </Grid>
        </Grid>
        <br />

        {/* code for dashboard 1 */}
        {/* {showDashboard1 && (
        <div className="sub-div1">
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={6} lg={3}>
              <BitcoinPrice className="grid"></BitcoinPrice>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <RipplePrice className="grid"></RipplePrice>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <EthereumPrice className="grid"></EthereumPrice>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <LitecoinPrice className="grid"></LitecoinPrice>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={8} lg={8}>
              <StackedBarChart></StackedBarChart>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <RipplePrice className="grid"></RipplePrice>
            </Grid>
          </Grid>
        </div>
      )} */}


        {/* code for dashboard 2 */}
        {/* {showDashboard2 && (
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
      )} */}
      </div>
    </JumboContentLayoutMain>
  );
};
export default Home;
