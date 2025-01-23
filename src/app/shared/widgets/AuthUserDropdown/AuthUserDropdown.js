import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  ButtonGroup,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { MdCall, MdEdit, MdEmail, MdSave } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import Draggable from "react-draggable";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";



export function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const AuthUserDropdown = () => {
  const navigate = useNavigate();


  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };


  const { theme } = useJumboTheme();
  // const {setAuthToken} = useJumboAuth();
  const [open, setOpen] = useState(false);

  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [editMobileNo, setEditMobileNo] = useState(false);


  // state for change the user details
  let [phoneNo, setPhoneNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();


  const [showPassword, setShowPassword] = useState(false);

  const [id, setId] = useState("");
  const [mailId, setMailId] = useState("");
  const [mailId1, setMailId1] = useState("");
  const [mailPassword, setMailPassword] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [imapHost, setImapHost] = useState("");
  const [imapPort, setImapPort] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [clientId, setClientId] = useState("");


  let userDetails = localStorage.getItem("UserDetails");
  userDetails = JSON.parse(userDetails);
  let companyId = userDetails && userDetails.Organization_Id;
  let username = userDetails && userDetails?.username;



  const onLogout = async () => {
    // update user data
    var userspayload = {
      id: userDetails?.id
    }
    await axios
      .put(`${BASE_URL}/Erpapp/UpdateUserLoginFlagFalse/`, userspayload, header)
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("accesstoken");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log("ds", error);
      });

  };

  const handleOpenUserProfile = () => {
    setOpenUserProfile(true);
  };

  const handleOpenMailConfiguration = () => {
    setOpen(true);
  };


  const userId = parseInt(localStorage.getItem("UserId"));

  const urlParams = new URLSearchParams(window.location.search);

  const RefreshCode = urlParams.get("code");

  // useEffect(() => {
  //   const updateMailConfigToken = async () => {
  //     await axios.get(`${BASE_URL}/Erpapp/MicorosoftOutlookAccessToken/?User_Id=${userId}`, header).then(async (res) => {
  //       console.log("PPPPDDDDD", res);
  //       if (res?.data) {
  //         const url = res.data;

  //         // Check if the URL is external
  //         // if (url.startsWith('http://') || url.startsWith('https://')) {
  //         //   window.location.href = url; // Navigate to external URL
  //         // } else {
  //         //   navigate(url); // Navigate to internal path
  //         // }


  //         const resp = await axios.get(`${BASE_URL}/Erpapp/MicorosoftOutlooMailAccessToken/?User_Id=${userId}&code=${url}`, header);
  //         console.log("PD12", resp)

  //       }

  //     }).catch((error) => {
  //       console.log(error)
  //     })
  //   }

  //   updateMailConfigToken();

  //   // Set up the interval to call the function every 30 minutes
  //   const intervalId = setInterval(updateMailConfigToken, 1800000);

  //   // Clear the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []);


  useEffect(async () => {
    const getRequest = async () => {
      if (userId) {
        await axios
          .get(
            `${BASE_URL}/Erpapp/MailConfigurationCRUD/?Created_By=${userId}`,
            header
          )
          .then((res) => {
            console.log(res);
            if (res) {
              setId(res?.data?.id);
              setMailId(res?.data?.MailId);
              setMailId1(res?.data?.MailId);
              setMailPassword(res?.data?.MailPassword);
              setSmtpHost(res?.data?.SMTPHost);
              setSmtpPort(res?.data?.SMTPPort);
              setImapHost(res?.data?.IMAPHost);
              setImapPort(res?.data?.IMAPPort);
              setSecretKey(res?.data?.SecretKey);
              setAccessToken(res?.data?.Access_Token);
              setClientId(res?.data?.Client_Id);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }


      fetch(`${BASE_URL}${userDetails?.User_Photo}`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const base64 = btoa(
            new Uint8Array(buffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setbase64(base64);
          const urlParts = userDetails?.User_Photo.split("/");
          setProfilePhoto(urlParts[urlParts.length - 1]);
        }).catch((error) => {
          console.log(error);
        });

      setPhoneNo(userDetails?.PhoneNo);

    }

    getRequest()
  }, [open]);

  const [base64, setbase64] = useState("");

  // image upload function
  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    setProfilePhoto(file?.name)
    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    setbase64(btoa(binaryString));
  };


  // update user details
  const handleSubmitUserDetails = (e) => {
    e.preventDefault();
    var userspayload = {
      ...userDetails,
      User_Photo: base64,
      User_Photo_Name: profilePhoto,
      PhoneNo: phoneNo,
      Organization_Id: parseInt(localStorage.getItem("OrganizationId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/Usersignup/`, userspayload, header)
      .then((res) => {
        console.log(res.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("User Details Updated Successfully");
          setOpenUserProfile(false)
        }
      })
      .catch((error) => {
        console.log("ds", error);
      });

  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // update mail configuration
  const handleSubmitMailConfigure = (e) => {
    e.preventDefault();
    if (!id) {
      var payload = {
        SMTPHost: smtpHost,
        SMTPPort: smtpPort,
        IMAPHost: imapHost,
        IMAPPort: imapPort,
        MailId: mailId,
        MailPassword: mailPassword,
        SecretKey: secretKey,
        Access_Token: accessToken,
        Client_Id: clientId,
        User_Id: parseInt(localStorage.getItem("UserId")),
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };
      axios
        .post(`${BASE_URL}/Erpapp/MailConfigurationCRUD/`, payload, header)
        .then((res) => {
          console.log("res", res);

          if (res?.status === 200 && res.data?.id) {
            toast.success("Mail Configured Successfully");
            setOpen(false);
          } else if (mailId1 === mailId) {
            toast.warning("Your Mail is Already Configured");
          } else if (mailId1 != mailId) {
            toast.warning("Please Configure Your Mail Id");
          } else {
            toast.error("Check Your Mail and Password");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } else {
      var payload = {
        id: id,
        SMTPHost: smtpHost,
        SMTPPort: smtpPort,
        IMAPHost: imapHost,
        IMAPPort: imapPort,
        MailId: mailId,
        MailPassword: mailPassword,
        SecretKey: secretKey,
        Access_Token: accessToken,
        Client_Id: clientId,
        Organization_Id: parseInt(localStorage.getItem("OrganizationId")),
        User_Id: parseInt(localStorage.getItem("UserId")),
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };
      axios
        .put(`${BASE_URL}/Erpapp/MailConfigurationCRUD/`, payload, header)
        .then((res) => {
          console.log("res", res);
          if (res?.status === 200 && res.data?.id) {
            toast.success("Mail Configured Updated Successfully");
            setOpen(false);
          } else if (mailId1 === mailId) {
            toast.warning("Your Mail is Already Configured");
          } else if (mailId1 != mailId) {
            toast.warning("Please Configure Your Mail Id");
          } else {
            toast.error("Check Your Mail and Password");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };


  // useEffect(() => {
  //   const handleWindowClose = (e) => {
  //     // Perform logout action only if it's not a page refresh
  //     const isPageRefresh = e.currentTarget.performance.navigation.type === 1;
  //     alert("OK")
  //     if (!isPageRefresh) {
  //       onLogout();
  //     }
  //   };

  //   window.addEventListener('unload', handleWindowClose);

  //   return () => {
  //     window.removeEventListener('unload', handleWindowClose);
  //   };
  // }, [onLogout]);

  // const handleBeforeUnload = (event) => {
  //   const navigationType = event.currentTarget.performance?.navigation?.type;

  //   if (navigationType !== 1) {
  //     onLogout();
  //   }
  // };


  // no action auto logout 
  const inactivityTimeout = 900000; // 15 minutes in milliseconds

  useEffect(() => {
    let logoutTimer;

    const resetTimeout = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(onLogout, inactivityTimeout);
    };


    const handleUserActivity = () => {
      resetTimeout();
    };


    // const events = ['mousemove', 'keydown'];
    const events = ['mousemove', 'keydown', 'click', 'mouseenter', 'mouseleave'];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });


    resetTimeout();

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [onLogout, inactivityTimeout]);



  const handleBeforeUnload = (event) => {
    const navigationType = event.currentTarget.performance?.navigation?.type;

    if (navigationType !== 1 && event.clientY < 0) {
      onLogout();
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Call your function here
      console.log('Laptop is going to sleep or the tab is hidden');
    }
  };


  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  const handleTabClose = () => {
    onLogout();
  };

  useEffect(() => {
    window.addEventListener("unload", handleTabClose);
    return () => {
      window.removeEventListener("unload", handleTabClose);
    };
  }, []);



  // function for hide a password
  const hidePassword = (password) => {
    return '*'.repeat(password.length);
  };



  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Tooltip title="User Profile" placement="top-start">
            <Avatar
              src={`${BASE_URL}${userDetails?.User_Photo}`}
              sizes={"small"}
              sx={{ boxShadow: 25, cursor: "pointer" }}
            />
          </Tooltip>
        }
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
            width: "250px",
          }}
        >
          <Avatar
            src={`${BASE_URL}${userDetails?.User_Photo}`}
            alt={userDetails?.User_Name}
            sx={{ width: 60, height: 60, mb: 2 }}
          />
          <Typography variant={"h5"}>{userDetails?.first_name} {userDetails?.last_name}</Typography>
          <Typography variant={"body1"} color="text.secondary">
            {userDetails?.Designation}
          </Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton onClick={handleOpenUserProfile}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ my: 0 }} />
            </ListItemButton>
            <ListItemButton onClick={handleOpenMailConfiguration}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Mail Configuration" sx={{ my: 0 }} />
            </ListItemButton>
            {/* <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RepeatOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => navigate("/samples/content-layout")}
                primary="Approvals"
                sx={{ my: 0 }}
              />
            </ListItemButton> */}
            <ListItemButton onClick={onLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>

      {/* dialog box for user profile */}
      <Dialog
        open={openUserProfile}
        onClose={() => setOpenUserProfile(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="md"
        fullWidth
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <form onSubmit={handleSubmitUserDetails}>
          <Div sx={{ p: 3, minHeight: "400px" }} id="draggable-dialog-title">
            <Typography variant="h3">User Profile</Typography>
            <DialogContent sx={{ minHeight: "300px", padding: { xs: "4px !important" } }}>
              <Grid container xs={12}>
                <Grid item xs={12} md={6}>
                  <Div className="row">
                    <IconButton className="col-2">
                      <FaUserCircle color="black" />
                    </IconButton>
                    <Typography className="input-label col-7">
                      {userDetails?.first_name} {userDetails?.last_name}
                    </Typography>
                  </Div>
                  <Div className="row">
                    <IconButton className="col-2">
                      <MdEmail color="black" />
                    </IconButton>
                    <Typography className="input-label col-7">
                      {userDetails?.email}
                    </Typography>
                  </Div>
                  <Div className="row">
                    <IconButton className="col-2">
                      <MdCall color="black" />
                    </IconButton>
                    <Typography className="input-label col-8">
                      {editMobileNo === false ? (
                        <span>{userDetails?.PhoneNo || ""}</span>
                      ) : (
                        <span>
                          <TextField
                            className="input-box col-8"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => {
                              const data = e.target.value;
                              setPhoneNo(data);
                            }}
                            placeholder="Enter Your Mobile No"
                          />
                        </span>
                      )}

                      {/* <IconButton
                        className="ms-1"
                        onClick={() => setEditMobileNo(true)}
                      >
                        <MdEdit color="black" />
                      </IconButton> */}
                    </Typography>
                  </Div>
                  <br />
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Profile Image
                    </Typography>

                    <Div className="col-12">
                      <Card sx={{ minHeight: "180px", width: "180px", p: 2 }}>
                        <img
                          alt="Profile Image"
                          src={`data:image/png;base64,${base64}`}
                          width={150}
                          height={150}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      </Card>
                      <br />
                      <Button
                        component="label"
                        onChange={handleChangeImage}
                        sx={{
                          mt: { sm: 4 },
                          marginTop: { md: "10px" },
                          ml: { xs: 0, md: 4 },
                          color: "#00BFFF",
                          textTransform: "capitalize",
                        }}
                      >
                        Upload Image
                        <TextField
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          style={{
                            backgroundColor: "transparent",
                          }}
                          name="companyLogo"
                        />
                      </Button>
                    </Div>
                  </Div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Div className="row">
                    <Typography className="input-label col-sm-11 col-md-4" sx={{ width: { xs: "33%", md: "35%" } }}>Role</Typography>
                    <Typography className="input-label col-1">:</Typography>
                    <Typography className="input-label col-sm-12 col-md-7" sx={{ width: { xs: "55% ", md: "55%" } }}>
                      {userDetails?.Designation}
                    </Typography>
                  </Div>
                  <Div className="row">
                    <Typography className="input-label col-sm-11 col-md-4" sx={{ width: { xs: "33% ", md: "35%" } }}>
                      User Id
                    </Typography>
                    <Typography className="input-label col-1">:</Typography>
                    <Typography className="input-label col-sm-12 col-md-7" sx={{ width: { xs: "55% ", md: "55%" } }}>{userDetails?.User_Id}</Typography>
                  </Div>
                  <Div className="row">
                    <Typography className="input-label col-sm-11 col-md-4" sx={{ width: { xs: "33% ", md: "35%" } }}>
                      Password
                    </Typography>
                    <Typography className="input-label col-1">:</Typography>
                    <Typography className="input-label col-sm-12 col-md-7" sx={{ width: { xs: "55% ", md: "55%" } }}>
                      {hidePassword(mailPassword) || mailPassword}
                    </Typography>
                  </Div>
                  {/* <Div className="row">
                    <Typography className="input-label col-sm-11 col-md-4" sx={{width: {xs: "33% ", md: "35%"}}}>
                      Password Expiry
                    </Typography>
                    <Typography className="input-label col-1">:</Typography>
                    <Typography className="input-label col-sm-12 col-md-7" sx={{width: {xs: "55% ", md: "55%"}}}>
                      33 days left
                    </Typography>
                  </Div> */}
                  <Div className="row">
                    <Typography className="input-label col-sm-11 col-md-4" sx={{ width: { xs: "33% ", md: "35%" } }}>
                      Last Login
                    </Typography>
                    <Typography className="input-label col-1">:</Typography>
                    <Typography className="input-label col-sm-12 col-md-7" sx={{ width: { xs: "55% ", md: "55%" } }}>
                      {/* {userDetails?.last_login?.slice(0, 16)} */}
                      <DateFormatter date={userDetails?.last_login} /> {" "}
                      {userDetails?.last_login?.slice(11, 16)}{parseInt(userDetails?.last_login?.slice(11, 16), 10) >= 12 ? " PM" : " AM"}
                    </Typography>
                  </Div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="buttons" sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonGroup type="submit" aria-label="split button"
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  mr: { xs: 0, md: 1 },
                  width: { xs: "200px", md: "auto" }
                }}
              >
                <Button
                  type="submit"
                  className="create-button "
                >
                  Update Profile
                </Button>
                <Button variant="contained" className="icon-button">
                  <MdSave size={18} />
                </Button>
              </ButtonGroup>
              <ButtonGroup aria-label="split button" onClick={() => setOpenUserProfile(false)}
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  mr: { xs: 1, md: 0 },
                  width: { xs: "200px", md: "auto" }
                }}
              >
                <Button className="plus-button">Cancel</Button>
                <Button variant="contained" className="icon-button">
                  <TiCancel size={24} />
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Div>
        </form>
      </Dialog>

      {/* dialog box for mail configuration */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmitMailConfigure}>
          <Div sx={{ p: 3, width: "500px" }}>
            <Typography variant="h3">Mail Configuration</Typography>
            <DialogContent>
              <Grid container>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Mail Id <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="mailId"
                      value={mailId}
                      onChange={(e) => setMailId(e.target.value)}
                      placeholder="Enter Your Mail Id"
                      sx={{ minWidth: "350px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Mail Password <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      type={showPassword ? "text" : "password"}
                      name="mailPassword"
                      value={mailPassword}
                      onChange={(e) => setMailPassword(e.target.value)}
                      placeholder="Enter Your Mail Password"
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ minWidth: "300px" }}
                    />
                  </Div>
                </Grid>
                {/* <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      SMTP Host <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="smtpHost"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="Enter SMTP Host"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      SMTP Port <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="smtpPort"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      placeholder="Enter SMTP Port"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      IMAP Host <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="imapHost"
                      value={imapHost}
                      onChange={(e) => setImapHost(e.target.value)}
                      placeholder="Enter IMAP Host"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      IMAP Port <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="imapPort"
                      value={imapPort}
                      onChange={(e) => setImapPort(e.target.value)}
                      placeholder="Enter IMAP Port"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid> */}
                {/* <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Secret Key <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="secretKey"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="Enter Secret Key"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Access Token <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="accessToken"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Enter Access Token"
                      sx={{ minWidth: "320px" }}
                    />
                  </Div>
                </Grid>
                <Grid item>
                  <Div className="row">
                    <Typography className="input-label col-12">
                      Client Id <span className="required">*</span>
                    </Typography>
                    <TextField
                      className="input-box col-12 ps-2"
                      name="clientId"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      placeholder="Enter Client Id"
                      sx={{ minWidth: "340px" }}
                    />
                  </Div>
                </Grid> */}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <ErpSaveUpdateButton name={id ? "Update" : "Submit"} type={"submit"} />
              <ErpCancelButton handleClick={() => setOpen(false)} />
            </DialogActions>
          </Div>
        </form>
      </Dialog>

    </ThemeProvider>

  );
};

export default AuthUserDropdown;



