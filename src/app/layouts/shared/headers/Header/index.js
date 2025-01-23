import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Header.css";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import AuthUserDropdown from "../../../../shared/widgets/AuthUserDropdown";
import NotificationsDropdown from "../../../../shared/NotificationsDropdown";
import MessagesDropdown from "../../../../shared/MessagesDropdown";
import { IconButton, Link, Tooltip, useMediaQuery } from "@mui/material";
import Div from "@jumbo/shared/Div";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../../shared/Logo";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import { DrawerHeader } from "@jumbo/components/JumboLayout/style";
import { useNavigate } from "react-router-dom";
import { MoreVertRounded } from "@mui/icons-material";
import { FcApproval } from "react-icons/fc";
import useApp from "app/hooks/useApp";
import { ASSET_IMAGES } from "app/utils/constants/paths";


const Header = () => {
  const navigate = useNavigate();


  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
 
  const [isActive, setIsActive] = useState(false);

  const { headerTheme } = useJumboHeaderTheme();

  const showDropdownSearch = useMediaQuery("(max-width:575px)");

  const showHeaderMenu = useMediaQuery("(min-width:575px)");

  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (isActive && ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isActive]);



  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("UserDetails");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserType(parsedData.UserType);
    } else {
      console.log("User data not found in localStorage");
    }
  }, []);


  const { customizerVisibility, setCustomizerVisibility } = useApp();

  const toggleCustomizerVisibility = useCallback(() => {
    setCustomizerVisibility(!customizerVisibility);
  }, [setCustomizerVisibility, customizerVisibility]);



  return (
    <Div
      sx={{
        width: "100vw !important",
        position: "sticky",
        top: 0,
        zIndex: "9999 !important",
        display: "flex !important",
        justifyContent: "space-between !important",
        pl: sidebarOptions.open ? { xl: "4%", lg: "6%", md: "5%", xs: "0%" } : { xll: "6%", xl: "1%", lg: "3%", md: "4%", xs: "0%" },
        pr: sidebarOptions.open ? { xl: "8%", lg: "7%", md: "6%", xs: "0%" } : { xll: "8%", xl: "8%", lg: "7%", md: "6%", xs: "0%" },
      }}
    >
      {(sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ||
        sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY ||
        (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT &&
          !sidebarOptions.open)) && (
          <>
            <DrawerHeader>
              <Div className="menubar-logo">
                <Logo mini={sidebarOptions.open ? showHeaderMenu : showDropdownSearch} mode={headerTheme.type ?? "light"} />
              </Div>

              {showDropdownSearch && !sidebarOptions.open && (
                <Div sx={{ display: "inline-flex", marginLeft: "-30px", zIndex: 999 }}>
                  <Link href="/home">
                    <img
                      src={`${ASSET_IMAGES}/test1.jpg`}
                      width={37}
                      height={37}
                      alt="ABC logo"
                    />
                  </Link>
                </Div>
              )}
              <IconButton
                className="toggle-sidebar"
                edge="start"
                color="inherit"
                mode={headerTheme.type ?? "light"}
                aria-label="open drawer"
                sx={{
                  
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  fontSize: "0.5rem",
                  borderRadius: "1px",
                  padding: "6px 26px 18px 10px",
                  height: "70px",
                  color: "black",
                  backgroundColor: "white",
                  "&:hover,&:active": {
                    backgroundColor: "white",
                    color: "#00bfff",
                  },
                }}
                onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
              >
                <>
                  {sidebarOptions?.open ? (
                    <div className="open-close-icon-theme2">
                      <MenuOpenIcon />
                    </div>
                  ) : (
                    <div className="open-close-icon-theme2">
                      <MenuIcon />
                    </div>
                  )}
                </>
              </IconButton>
              {/* Company Logo */}
              {/* <Div className="menubar-logo">
                <Logo />
              </Div> */}
            </DrawerHeader>
          </>
        )}

      {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && <></>}


      {/* Edited by vijay 11-30-2023 */}
      <Div
        className="container"
        sx={{ display: 'flex !important', justifyContent: "flex-end !important", marginRight: { xs: "-35px !important", md: "-50px !important" } }}
      >
        <Div sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
          <Div sx={{ cursor: "pointer", backgroundColor: "white", padding: 0.5 }}>
            <Tooltip title="Approvals" placement="top-start">
              <IconButton onClick={() => navigate("/samples/content-layout")} >
                <FcApproval size={22} />
              </IconButton>
            </Tooltip>
          </Div>

          <Div className="">
            <MessagesDropdown />
          </Div>

          <Div>
            <NotificationsDropdown />
          </Div>

          <Div className="ms-1" >
            <AuthUserDropdown />
          </Div>

          <Div onClick={toggleCustomizerVisibility} sx={{ cursor: "pointer", color: "#000000", backgroundColor: "white", padding: 0 }}>
            <IconButton>
              <MoreVertRounded />
            </IconButton>
          </Div>
        </Div>
    


      </Div>
    </Div>
  );
};

export default Header;
