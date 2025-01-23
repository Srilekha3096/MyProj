import React, { useCallback, useEffect, useState } from "react";
import MessagesHeader from "./MessagesList/MessagesHeader";
import SettingHeader from "./MessagesSetting/SettingHeader";
import SettingsList from "./MessagesSetting/SettingsList";
import MessagesList from "./MessagesList";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import { Dialog, DialogActions, DialogContent, ThemeProvider } from "@mui/material";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { Transition } from "../widgets/AuthUserDropdown/AuthUserDropdown";
import RemainderTriggerButton from "../NotificationsDropdown/RemainderTriggerButton";

const MessagesDropdown = () => {

  const { theme } = useJumboTheme();

  const token = localStorage.getItem("accesstoken");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const partnerId = parseInt(localStorage.getItem("PartnerId"));
  const userId = parseInt(localStorage.getItem("UserId"));
  const employeeId = parseInt(localStorage.getItem("EmployeeId"));

  const [showSettings, setShowSettings] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [length, setLength] = useState(0);


  const toggleSettingWindow = useCallback(() => {
    setShowSettings((showSettings) => !showSettings);
    fetchNotifications()
  }, [setShowSettings]);


  const fetchNotifications = () => {
    axios
      .get(
        `${BASE_URL}/Erpapp/Notificationslist/?Partner_Id=${partnerId}&User_Id=${employeeId}`,
        header
      )
      .then((res) => {
        console.log("PP", res?.data);
        setNotifications(res?.data);
        setLength(res?.data?.filter((opt) => opt?.Open_flg === false).length);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    const div = document.getElementById("openFilter");
    if (div && !div.contains(event.target)) {
      setShowSettings(false);

      setTimeout(() => {
        // fetchNotifications();
      }, 500);
    }
  };


  useEffect(() => {
    fetchNotifications(); // Initial call when component mounts

    const interval = setInterval(fetchNotifications, 0.5 * 60 * 60 * 1000); // 1 hour in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [partnerId]);



  // code for mail configuration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Erpapp/MailConfigurationCRUD/?Created_By=${userId}`,
          header
        );

        if (response.data) {
          setOpenMessage(false);
        } else {
          setOpenMessage(true);
        }
      } catch (error) {
        console.error(error);
        setOpenMessage(true);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [userId, setOpenMessage]);



  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={<RemainderTriggerButton notifications={notifications} />}
        disableInsideClick

      >
        {showSettings ? (
          <Div sx={{ width: 380, maxWidth: "100%" }}>
            <SettingHeader backClickCallback={toggleSettingWindow} />
            <SettingsList />
          </Div>
        ) : (
          <Div id="openFilter" sx={{ width: 380, maxWidth: "100%" }}>
            <MessagesHeader
              settingMenuCallback={toggleSettingWindow}
              length={length}
            />
            <MessagesList notifications={notifications} />
            <Divider />
          </Div>
        )}
      </JumboDdPopover>

      {/* dialog box for mail configuration message */}
      <Dialog
        open={openMessage}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenMessage(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          Please Configured Your Mail First
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessage(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MessagesDropdown;
