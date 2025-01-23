import React, { Suspense, useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import { DrawerHeader } from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import Logo from "../../../../shared/Logo";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Zoom from "@mui/material/Zoom";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import homemenu from "./homemenu";
import Testmenu from "./Testmenu";
import settingmenus from "./settingmenu";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRolePermissions, selectedUserRolePermissions } from 'app/redux/actions/fetchUserRolePermissions';

const Sidebar = ({
  sidebarOptions,
  showSettingMenus
}) => {
  const [userType, setUserType] = useState("");
  const [partnerName, setPartnerName] = useState("");


  const dispatch = useDispatch();
  const { userRolePermissions, formPermissions, modulePermissions } = useSelector(selectedUserRolePermissions);

  console.log("formPermissions",formPermissions)
  useEffect(() => {
    const userData = localStorage.getItem("UserDetails");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserType(parsedData.UserType);
      setPartnerName(parsedData.Business_Unit);
    } else {
      console.log("User data not found in localStorage");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      dispatch(fetchUserRolePermissions(token));
    }
  }, [dispatch]);

  const getFilteredMenus = (menus) => {
    return menus?.map(menu => {
      console.log("Processing menu:", menu.label);

      const permissions = (menu.type === 'collapsible' && menu.label.includes("Report"))
        ? modulePermissions
        : formPermissions;

      if (menu.type === 'collapsible') {
        const filteredChildren = menu.children?.map(child => {
          if (child.type === 'nav-item' && permissions.includes(child.id)) {
            return { ...child }; // Include nav-item if it matches permissions
          } else if (child.type === 'collapsible') {
            const filteredNestedChildren = getFilteredMenus(child.children, formPermissions, modulePermissions);
            if (filteredNestedChildren.length > 0) {
              return { ...child, children: filteredNestedChildren }; // Include collapsible with filtered children
            }
          }
          return null; // Exclude the child if it doesn't match criteria
        }).filter(child => child !== null) || [];

        if (filteredChildren.length > 0) {
          return {
            ...menu,
            children: filteredChildren,
          }; // Include collapsible menu if it has filtered children
        }
      } else if (menu.type === 'nav-item' && permissions.includes(menu.id)) {
        return { ...menu }; // Include nav-item if it matches permissions
      }
      return null; // Exclude the menu if it doesn't match criteria
    }).filter(menu => menu !== null); // Remove null entries
  };

  
  const filterSettingMenus = getFilteredMenus(settingmenus);
 


  return (
    <React.Fragment>
      <SidebarHeader />
      <JumboScrollbar autoHide autoHideDuration={200} autoHideTimeout={500}>
        <Suspense fallback={<Div sx={{ display: "flex", minWidth: 0, alignItems: "center", alignContent: "center", px: 3, zIndex: 1 }}><SidebarSkeleton /></Div>}>
         
          <br />
          <JumboVerticalNavbar translate items={homemenu} style={{ display: sidebarOptions ? "block" : "none" }} />
          <JumboVerticalNavbar translate items={Testmenu} style={{ display: sidebarOptions ? "block" : "none" }} />
         <JumboVerticalNavbar translate items={filterSettingMenus} style={{ display: showSettingMenus ? "block" : "none" }} />
        
        </Suspense>
      </JumboScrollbar>
    </React.Fragment>
  );
};

const SidebarHeader = () => {
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  const { sidebarTheme } = useJumboSidebarTheme();

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.open]);

  console.log("isMiniAndClosed", isMiniAndClosed)
  return (
    <React.Fragment>
      {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <DrawerHeader>
          <Logo
            mini={isMiniAndClosed}
            mode={sidebarTheme.type}
            sx={{
              margin: "5px 0px 0px 10px",
              borderRadius: "0%",
              "&:hover,&:active": {
                // Add custom styles if needed
              },
            }}
          />
          {sidebarOptions?.view !== SIDEBAR_VIEWS.FULL_HEIGHT && (
            <Zoom in={sidebarOptions?.open}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                  ml: 0,
                  mr: -2.5,
                  fontSize: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 30px",
                  margin: "-8px 0px 0px 10px",
                  borderRadius: "0%",
                  "&:hover,&:active": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => setSidebarOptions({ open: false })}
              >
                <div className="open-close-icon-theme3">
                  <MenuOpenIcon />
                </div>
              </IconButton>
            </Zoom>
          )}
        </DrawerHeader>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
