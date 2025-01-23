import React, { useEffect, useState } from "react";
import NotificationBirthday from "./NotificationBirthday";
import NotificationInvitation from "./NotificationInvitation";
import NotificationSharedPost from "./NotificationSharedPost";
import NotificationPost from "./NotificationPost";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import MessagesTriggerButton from "../MessagesDropdown/MessagesTriggerButton";
import { DateFormatter } from "../ReuseComponents/DateFormatter";

const NotificationComponents = {
  POSTING: NotificationPost,
  SHARED_POST: NotificationSharedPost,
  INVITATION: NotificationInvitation,
  BIRTHDAY: NotificationBirthday,
};

const NotificationsDropdown = () => {
  const { theme } = useJumboTheme();
  const { headerTheme } = useJumboHeaderTheme();

  let userDetails = localStorage.getItem("UserDetails");
  userDetails = JSON.parse(userDetails);
  let companyId = userDetails && userDetails.Organization_Id;
  let id = userDetails && userDetails.id;
  const token = localStorage.getItem("accesstoken");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  var userName = localStorage.getItem("Username");

  const [notifications, setNotifications] = useState([]);
  const [length, setLength] = useState(1);

  const partnerId = parseInt(localStorage.getItem("PartnerId"));
  const userId = parseInt(localStorage.getItem("UserId"));

  const fetchNotifications = () => {
    axios
      .get(
        `${BASE_URL}/Erpapp/Reminderlist/?Partner_Id=${partnerId}&User_Id=${userId}`,
        header
      )
      .then((res) => {
        console.log("PP", res.data);
        const lists = res.data.slice(0, 10);
        setNotifications(lists);
        setLength(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };


  useEffect(() => {
    fetchNotifications(); // Initial call when component mounts

    // Schedule the weekly call
    const interval = setInterval(fetchNotifications, 1 * 24 * 60 * 60 * 1000); // 1 day in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [partnerId]);



  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <MessagesTriggerButton notifications={notifications} />
        }
        disableInsideClick
      >
        <Div id="openFilter" sx={{ width: 360, marginTop: "7px", maxWidth: "100%" }}>
          <CardHeader
            title={"Reminder"}
            length={length}
          // action={
          //   <IconButton sx={{ my: -1 }}>
          //     <MoreHorizIcon />
          //   </IconButton>
          // }
          />
          <List disablePadding>
            {notifications && notifications?.map((item, index) => {
              console.log("item", item);
              const timestamp = item.Reminder_Time;
              const dateObject = new Date(timestamp);
              const hours = dateObject.getHours();
              const minutes = dateObject.getMinutes();
              const time = hours >= 12 ? "PM" : "AM";
              console.log(`Time: ${hours}:${minutes}`);
              return (
                // <Div key={index} sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                //     <Div>
                //         <Avatar>P</Avatar>
                //     </Div>
                //   <Typography variant="h5">{item.Reminder_Msg}</Typography>
                // </Div>
                <ListItemButton component={"li"} disableRipple>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: generateRandomColor(),
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant={"h6"} mb={0.25}>
                        {item.Reminder_Msg}
                      </Typography>
                    }
                    secondary={
                      <Typography noWrap color={"text.secondary"}>
                        <DateFormatter date={dateObject} /> - {`${hours} : ${minutes} ${time}`}
                      </Typography>
                    }
                  />
                  {/* <IconButton elevation={1} edge={"end"} size={"small"}>
                    <MoreHorizIcon />
                  </IconButton> */}
                </ListItemButton>
              );
            })}
          </List>
          <Divider />
          {/* <CardActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "normal",
                "&:hover": { bgcolor: "transparent" },
              }}
              size={"small"}
              variant="text"
              endIcon={<ArrowForwardIcon />}
              disableRipple
            >
              View All
            </Button>
          </CardActions> */}
        </Div>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default NotificationsDropdown;
