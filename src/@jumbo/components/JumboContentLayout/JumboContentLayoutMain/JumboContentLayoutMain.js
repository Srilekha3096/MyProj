import React, { useEffect, useRef, useState } from "react";
import useJumboContentLayout from "@jumbo/hooks/useJumboContentLayout";
import { ToastContainer } from "react-toastify";
import ReloadPage from "app/pages/home/ReloadPage";
import { Grid } from "@mui/material";
import { useJumboLayoutSidebar } from "@jumbo/hooks";

const JumboContentLayoutMain = ({ children, backgroundColor="#FFFFFF" }) => {

  let [showFluid, setshowFluid] = useState();
  let [styles, setStyles] = useState("");

  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();

  const mainDivRef = useRef(null); // Create a ref for the main div

  useEffect(() => {
    const width = mainDivRef.current?.clientWidth;
    setshowFluid(width);
    console.log("Width of the main div:", width);

  }, [showFluid]);


  const contentLayout = useJumboContentLayout();

  setTimeout(() => {
    return <ReloadPage />;
  }, 800);


  // responsive main layout
  useEffect(() => {
    if (sidebarOptions.open && (sidebarOptions.view === "full")) {
      setStyles({
        sm: "16%",
        md: "13%",
        lg: "11vh"
      })
    }
    else if ((sidebarOptions.view === "mini")) {
      if (!sidebarOptions.open)
        setStyles({
          sm: "16%",
          md: "15%",
          lg: "12vh"
        })
    }
    else {
      setStyles("")
    }
  }, [sidebarOptions]);



  return (
    <Grid
      sx={{
        display: "flex",
        flex: 1,
        mt: "-30px",
        mb: "-50px",
        ml: { xs: "-30px", md: "-47px" },
        mr: { xs: "-32px", md: "-46px" },
        // overflow: "hidden",
        // position: "relative",
        pt: 6,
        pb: 2,
        pl: sidebarOptions.open ? { xl: "4%", lg: "7%", md: "6%", xs: "3%" } : { xll: "8%", xl: "8.4%", lg: "10%", md: "17%", xs: "3%" },
        pr: sidebarOptions.open ? { xl: "10%", lg: "7.3%", md: "6%", xs: "3%" } : { xll: "8%", xl: "8.4%", lg: "10%", md: "16%", xs: "3%" },
        minWidth: 0,
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: backgroundColor,
        ...contentLayout?.main?.sx,
      }}
      className="CmtLayout-main"
    >
      <ToastContainer autoClose={2500} />
      {children}
    </Grid>
  );
};

export default JumboContentLayoutMain;
