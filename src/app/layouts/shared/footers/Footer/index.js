import React from "react";
import { Grid } from "@mui/material";

const Footer = ({ sidebarOptions }) => {

  return (
    <Grid container
      sx={{
        py: 2,
        px: { lg: 6, xs: 4 },
        borderTop: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "sticky",
        bottom: 0,
        zIndex: "9999 !important",
        pl: sidebarOptions.open ? { xl: "4%", lg: "7%", md: "6%", xs: "3%" } : { xll: "8%", xl: "8.4%", lg: "10%", md: "17%", xs: "3%" },
        pr: sidebarOptions.open ? { xl: "10%", lg: "7.3%", md: "6%", xs: "3%" } : { xll: "8%", xl: "8.4%", lg: "10%", md: "16%", xs: "3%" },
      }}
    >

      <Grid
        item
        className="filter"
        xs={12}
        md={5}
        sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start", md: "flex-start" }, alignItems: "center" }}
      >
        Copyright  <span style={{ color: "#00BFFF", padding: "0 8px" }}> test  </span>   © 2022
      </Grid>

      <Grid item xs={0} md={2}>

      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, alignItems: "center" }}
      >
        Developed by <span style={{ color: "#00BFFF", padding: "0 8px" }}>  @ABC Technology </span>
      </Grid>
    </Grid>
  );
};

export default Footer;
