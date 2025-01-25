import React, { useEffect, useState } from "react";
import "./Login.css";
import Checkbox from "@mui/material/Checkbox";
import {
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { handleError } from "./AuthGuard";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from "app/redux/authSlice";


// const generateCaptcha = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let captcha = '';
//   for (let i = 0; i < 6; i++) {
//     captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return captcha;
// };


const Login = ({ disableSmLogin }) => {
  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();


  //  redux code

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => {
    console.log("isAuthenticatedState", state);
    return state.auth.isAuthenticated;
  });


  const [showPassword, setShowPassword] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [errors, setErrors] = useState();

  // const [captcha, setCaptcha] = useState(generateCaptcha());
  // const [captchaInput, setCaptchaInput] = useState('');

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: val }));
    console.log("Val", val, credentials);
  };


  // Retrieve the email and password from localStorage when the component mounts
  useEffect(() => {
    const username = Cookies.get('username');
    const password = Cookies.get('password');
    if (username && password) {
      setCredentials({
        username: username,
        password: password,
        rememberMe: true, // Set this to true as you're auto-filling from cookies
      });
    }
    console.log("Valll", username, password)
  }, [])

  const newErrors = {};
  const validateForm = () => {
   

    if (credentials?.username === undefined || credentials?.username === null || credentials?.username === "") {
      newErrors.username = "User Name is required.";
    }
    if (credentials?.password === undefined || credentials?.password === null || credentials?.password === "") {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const onSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (captcha !== captchaInput) {
    //   toast.error('CAPTCHA does not match. Please try again.');
    //   setCaptchaInput("");
    //   setCaptcha(generateCaptcha());
    //   setIsLoading(false);
    //   return;
    // }

    const { username, password, rememberMe } = credentials;
    if (!validateForm()) {
      toast.error("Enter valid username and password.");
      navigate("/");
      return;
    }
    if (credentials?.username !== "adMINtest123456@7890" || credentials?.password !== "teSTAdmin112233@5566") {
      newErrors.username = "Wrong username or password.";
      setErrors(newErrors);
      toast.error(" Wrong username or password.");
      return ;
    }

    try {
     // const userRes = await axios.get(`${BASE_URL}/Erpapp/Usersignup/?username=${username}`);
     const userRes ="Sri"
      console.log("userRes", userRes)
      const userData = "Sri";

      // const empRes = await axios.get(`${BASE_URL}/Erpapp/getemployeeeid/?email=${userData?.email}`);
      const empRes ="sri"
      console.log("empRes", empRes)
      const empData = "sri";

      // if (userData?.Is_Deleted) {
      //   toast.error("The user hasn't permitted access for this application.");
      //   navigate("/");
      //   return;
      // }

      // if (userData?.Is_Deleted || empData?.length === 0 || empData[0]?.Is_Deleted || empData[0]?.Abscand_Flg || empData[0]?.Resigned_Flg || empData[0]?.Dismissed_Flg ) {
      //   toast.error("The user hasn't permitted access for this application.");
      //   navigate("/");
      //   return;
      // }

      // if (userData?.User_Login_Status) {
      //   toast.error("You are currently signed in on another device. For security reasons, you can only be signed in on one device at a time.");
      //   navigate("/");
      //   return;
      // }

      // const loginRes = await authServices.signIn(username, password, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      //   },
      // });

      // const token = loginRes?.data?.token;
      const token = "123ase";
       localStorage.setItem("accesstoken", token);
       
      toast.success("Successful Login");
    
   
      // // Set user data in local storage
      // const userPayload = { id: userData?.id };
      // const loginFlagRes = await axios.put(`${BASE_URL}/Erpapp/UpdateUserLoginFlagTrue/`, userPayload, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // });

     const userDetails = "SRI";
       setLocalStorage();

      // for redux code is authenticated
      dispatch(loginSuccess({ username, password }));
    //  dispatch(fetchDateFormater())

      if (rememberMe) {
        setCredentialsCookies(username, password);
      } else {
        removeCredentialsCookies();
      }

     //await fetchPartnerId(userDetails?.Business_Unit, token);
     // await fetchHeadApproverName(token, userData?.email);
     // await fetchRolePermissions(userData?.Designation, token);
      //await fetchCompanyDatas(userData?.Organization_Id, token);

      navigate("/home");
    } catch (error) {
      handleError(error);
      navigate("/");
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  };

  // Additional utility functions for clarity

  const setLocalStorage = () => {
   // localStorage.setItem("UserDetails", JSON.stringify(data));
    localStorage.setItem("UserId", "Sri");
    localStorage.setItem("OrganizationId", "aca");
    // localStorage.setItem("Username", data?.first_name);
    localStorage.setItem("Username", "sri s");
    localStorage.setItem("Designation", "eng");
  };

  const setCredentialsCookies = (username, password) => {
    const expirationPeriod = 365 * 100;
    Cookies.set('username', username, { expires: expirationPeriod });
    Cookies.set('password', password, { expires: expirationPeriod });
  };

  const removeCredentialsCookies = () => {
    Cookies.remove('username');
    Cookies.remove('password');
  };

  // const fetchPartnerId = async (businessUnit, token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/Erpapp/PartnerListreportDropdown/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });

  //     const partnerLists = res?.data?.filter(opt => opt?.Partner_Name === businessUnit);
  //     localStorage.setItem("PartnerId", partnerLists[0]?.id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const fetchHeadApproverName = async (token, email) => {
  //   try {
  //     const headResponse = await itemServices.getEmployees(email, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });

  //     const head = headResponse[0]

      localStorage.setItem("EmployeeId", "456");
      localStorage.setItem("EmployeeNo", "677");

      // const hrList = await hrApiServices.listofDropdownAllEmployees({
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // });

      // const userList = await itemServices.getUsersList({
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // });

      // const reportingHead = userList?.find(opt => `${opt?.first_name} ${opt?.last_name}` === head?.Reportingto);
      // localStorage.setItem("ReportHead", reportingHead?.id);
      // localStorage.setItem("ReportHeadName", `${reportingHead?.first_name} ${reportingHead?.last_name}`);
      // localStorage.setItem("ReportHeadRole", reportingHead?.Designation);

      const reportingHead = "saran";
      localStorage.setItem("ReportHead", "123");
      localStorage.setItem("ReportHeadName", "saran k");
      localStorage.setItem("ReportHeadRole", "HR");
    // } catch (error) {
    //   console.error(error);
    // }
  //};

  // const fetchRolePermissions = async (designation, token) => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/Erpapp/RoleAdditionalCRUD/`,
  //       { name: designation, Is_Deleted: false },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     setUserPermissions(res?.data?.permissions);
  //   } catch (error) {
  //     // toast.error("You do not have permission to perform this action.");
  //     console.error(error);
  //   }
  // };

  // const fetchCompanyDatas = async (companyId, token) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const companyData = response?.data;
  //     localStorage.setItem("DateFormat", companyData?.DateFormat);
  //     localStorage.setItem("CurrencyFormat", companyData?.Currencies);

  //   } catch (error) {
  //     console.error('Error fetching company data:', error);
  //   }
  // }


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <Grid container columns={12}>
        <ToastContainer autoClose={2000} />

        <Grid item xs={12} md={12} sm={12} xl={1}></Grid>

        {/* code for left side form card */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5.5}
          xl={4}
          sx={{
            m: 0,
            p: { xs: 1, md: 7, lg: 2 },
            pt: { md: 1, lg: 2 },
          }}
        >
          <Div
            className="col-sm-12 col-md-12"
            sx={{
              p: { xs: 1.5, md: 3 },
              mt: { xs: 3, md: 7, xl: 12 },
              ml: { xs: 0, md: 0, xl: 5 },
              zIndex: 1,
            }}
          >
            <Typography
              variant={"h1"}
              fontSize={"26px"}
              color={"#00BFFF"}
              fontWeight={600}
              letterSpacing={"1px"}
              textAlign={"center"}
              pb={2}
              mt={-3}
            >
              <img
                src="./images/test.jpg"
                width={180}
                height={75}
                className="login-logo-image"
                alt="logo"
              />
            </Typography>

            {/* <Formik
              validateOnChange={true}
              initialValues={credentials}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                onSignIn(data.username, data.password);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form
                  style={{ textAlign: "left" }}
                  className="Login-form"
                  noValidate
                  autoComplete="off"
                > */}
            <form onSubmit={onSignIn}>
              <Div sx={{ mt: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  name="username"
                  label="User Name"
                  value={credentials?.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  autoComplete="off"
                  className="col-sm-12 col-md-12"
                />
                <Div style={{ color: "red", fontSize: "12px" }}>
                  {!credentials?.username && errors?.username}
                </Div>
              </Div>
              <Div sx={{ mt: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  name="password"
                  className="col-sm-12 col-md-12"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={credentials?.password}
                  onChange={handleInputChange}
                  placeholder="Enter Your Password"
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
                />
                <Div style={{ color: "red", fontSize: "12px" }}>
                  {!credentials?.password && errors?.password}
                </Div>
              </Div>

              <Div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "row", sm: "row", md: "row" },
                }}
              >
                <Div
                  sx={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <Div className="d-flex">
                    <Checkbox
                      type="checkbox"
                      size="small"
                      className="col-12 form-check-input"
                      id="rememberme"
                      name="rememberMe"
                      checked={credentials?.rememberMe}
                      onChange={handleInputChange}
                    />
                    <Typography variant="h4" sx={{ pl: 1, pt: 0 }}>
                      Remember Me
                    </Typography>
                  </Div>
                </Div>

                <Typography className="fgt-pwd-text" variant={"body1"}>
                  <Typography
                    variant="h4"
                    color="primary"
                    onClick={() => navigate("/auth-pages/forgot-password")}
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot Password?
                  </Typography>
                </Typography>
              </Div>

              <Grid container columnSpacing={1} rowSpacing={1} sx={{ mt: 1, mb: 1 }}>
                {/* <Grid item xs={12} md={12}>
                  <Box sx={{ backgroundColor: "#ECECEC", padding: 1.2, textAlign: "center", borderRadius: "3px" }}>
                    <Typography variant="h3"
                      color={"#000000"}
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        letterSpacing: 2,
                        userSelect: 'none',
                        // textDecoration: "line-through",
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: -5,
                          width: '110%',
                          height: '1.3px', // Adjust the height of the strikethrough line as needed
                          backgroundColor: 'rgb(69, 71, 75, 0.7)', // White with 50% opacity
                          transform: 'translateY(-50%)',
                          pointerEvents: 'none', // Ensure the line doesn't interfere with text interaction
                        },
                      }}
                    >{captcha}</Typography>
                  </Box>
                </Grid> */}
                {/* <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    name="captcha"
                    label="Captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter Captcha"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle refresh"
                            onClick={()=>{
                              setCaptcha(generateCaptcha());
                              setCaptchaInput("");
                            }}
                            edge="end"
                          >
                            <MdOutlineRefresh />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid> */}
              </Grid>

              <LoadingButton
                fullWidth
                type="submit"
                className="col-sm-12 col-md-12"
                size="large"
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  cursor: "pointer",
                }}
              // loading={isSubmitting}
              >
                {isLoading ? "Loading..." : "Sign In"}

              </LoadingButton>
              <br />
            </form>
            {/* </Form>
              )}
            </Formik> */}
          </Div>
        </Grid>

        <Grid item xl={1}></Grid>


        {/* code for right side image card */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={5}
          xl={5}
          sx={{
            m: { xs: 0, md: 0 },
            mt: { xl: 5 },
            display: { xs: "block", sm: "block", md: "block", xl: "block" },
          }}
        >
          <Div
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
              pt: 13,
              pl: { xs: 5, lg: 13 },
              flex: 1,
              flexDirection: "column",
              zIndex: 2,
            }}
          >
            <Div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#FFFFFF",
                marginBottom: { xs: "30px", md: "50px" },
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: { xs: "120px", md: "180px" },
                }}
              >
                <Div
                  sx={{
                    marginRight: { xs: "30px", md: "50px" },
                  }}
                >
                  <Div
                    sx={{
                      backgroundColor: "#00BFFF",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  ></Div>
                  <Div
                    sx={{
                      backgroundColor: "#00BFFF",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                      marginTop: { xs: "20px", md: "30px" },
                    }}
                  ></Div>
                </Div>
                <Div className="leftTop-circle">
                  <Div
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#00BFFF",
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  />

                  <Div className="leftTop1-line"></Div>
                  <Div className="leftBottom1-line"></Div>
                </Div>
              </Div>

              <Div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Div
                  className="rightTop-circle"
                  sx={{
                    marginRight: { xs: "30px", md: "50px" },
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#7DCEA0",
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  />

                  <Div className="rightTop1-line"></Div>
                  <Div className="rightBottom1-line"></Div>
                </Div>
                <Div>
                  <Div
                    sx={{
                      backgroundColor: "#7DCEA0",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  ></Div>
                  <Div
                    sx={{
                      backgroundColor: "#7DCEA0",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                      marginTop: { xs: "20px", md: "30px" },
                    }}
                  ></Div>
                </Div>
              </Div>
            </Div>

            <Div
              className="center-logo"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="./images/test1.jpg"
                className="rotate-img responsive-img"
                width={50}
                height={50}
                alt="logo"
              />

              <Div className="leftTop-line"></Div>
              <Div className="rightTop-line"></Div>
              <Div className="leftBottom-line"></Div>
              <Div className="rightBottom-line"></Div>
            </Div>

            <Div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#FFFFFF",
                marginTop: { xs: "30px", md: "50px" },
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: { xs: "120px", md: "180px" },
                }}
              >
                <Div
                  sx={{
                    marginRight: { xs: "30px", md: "50px" },
                  }}
                >
                  <Div
                    sx={{
                      backgroundColor: "#17A589",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  ></Div>
                  <Div
                    sx={{
                      backgroundColor: "#17A589",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                      marginTop: { xs: "20px", md: "30px" },
                    }}
                  ></Div>
                </Div>

                <Div className="leftBottom-circle">
                  <Div
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#17A589 ",
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  />

                  <Div className="leftTop2-line"></Div>
                  <Div className="leftBottom2-line"></Div>
                </Div>
              </Div>

              <Div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Div
                  className="rightBottom-circle"
                  sx={{
                    marginRight: { xs: "30px", md: "50px" },
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#2ECC71 ",
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  ></Div>

                  <Div className="rightTop2-line"></Div>
                  <Div className="rightBottom2-line"></Div>
                </Div>

                <Div>
                  <Div
                    sx={{
                      backgroundColor: "#2ECC71",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                    }}
                  ></Div>
                  <Div
                    sx={{
                      backgroundColor: "#2ECC71",
                      opacity: 0.7,
                      width: { xs: 30, md: 50 },
                      height: { xs: 30, md: 50 },
                      padding: 1,
                      borderRadius: "50%",
                      marginTop: { xs: "20px", md: "30px" },
                    }}
                  ></Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Grid>

        <Grid item xs={12} md={1} sm={12} xl={1}></Grid>
      </Grid>

      {/* code for alert messages */}
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessMessage(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorMessage}
        autoHideDuration={6000}
        onClose={() => setOpenErrorMessage(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your unable to login please give the valid username and password
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;