import React, { useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { ListItemButton, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import Div from "@jumbo/shared/Div";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";


const MessageItem = ({ item }) => {


  const token = localStorage.getItem("accesstoken");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };


  // update the seen the notifications
  useEffect(() => {
    const updateSeenNotifications = async () => {
      if (item?.Open_flg === false) {
        var payload = {
          id: item?.id,
          Open_flg: true,
          Notification_Msg: item?.Notification_Msg,
          User_Id: item?.User_Id?.id,
          Created_By: item?.Created_By?.id,
          Partner_Id: item?.Partner_Id?.id,
          Company_Id: item?.Company_Id?.id,
        };

        try {
          const res = await axios.put(`${BASE_URL}/Erpapp/Notificationscrudwithoutpagination/`, payload, header);
          console.log("PP", res);
        } catch (error) {
          console.log(error);
        }
      }

    };

    updateSeenNotifications();
  }, []);


  return (
    <ListItemButton component={"li"} disableRipple sx={{ pt: 0, pb: 0.5 }}>
      <ListItemAvatar sx={{ textAlign: "center" }}>
        <Avatar
          src={`${BASE_URL}/${item.User_Id?.User_Photo}`}
          style={{ width: "34px", height: "34px" }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Div sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant={item.Open_flg === false ? "h4" : "h5"}
              mb={0.25}
              fontWeight={item.Open_flg === false ? 900 : 400}
            >
              {item?.Created_By?.first_name} {item?.Created_By?.last_name}
            </Typography>
            <Typography
              variant={item.Open_flg === false ? "h4" : "h5"}
              mb={0.25}
              fontWeight={item.Open_flg === false ? 900 : 400}
            >
              {/* {item?.Created_Date} */}
              <DateFormatter date={item?.Created_Date} />
            </Typography>
          </Div>
        }
        secondary={
          <Typography color={item.Open_flg === false ? "text.primary" : "text.secondary"} variant="h6">
            {item.Notification_Msg}
          </Typography>
        }
      />
      {/* <IconButton elevation={1} edge={"end"} size={"small"}>
        <MoreHorizIcon />
      </IconButton> */}
    </ListItemButton>
  );
};

export default MessageItem;
