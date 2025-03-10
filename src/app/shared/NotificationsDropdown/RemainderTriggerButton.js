import React from "react";
import JumboIconButton from "@jumbo/components/JumboIconButton";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import { Badge, ThemeProvider, Tooltip } from "@mui/material";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";



const RemainderTriggerButton = ({ notifications }) => {
    const { headerTheme } = useJumboHeaderTheme();

    const unreadNotifications = notifications?.filter(
        (opt) => opt?.Open_flg === false
    )?.length || 0;

    const filterItems = unreadNotifications > 0
        ? (unreadNotifications > 9 ? "9+" : unreadNotifications)
        : 0;


    console.log("filterItems", filterItems);
    return (
        <ThemeProvider theme={headerTheme}>
            <JumboIconButton badge={{ variant: "standard" }} elevation={25} filterItems={filterItems}>
                <Tooltip title="Notifications" placement="top-start">
                    <NotificationImportantOutlinedIcon sx={{ fontSize: "1rem" }} />
                </Tooltip>
            </JumboIconButton>
        </ThemeProvider>
    );
};

export default RemainderTriggerButton