import React from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Div from "@jumbo/shared/Div";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import { Form, Formik } from "formik";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { BASE_URL } from "app/services/auth-services";
import "react-toastify/dist/ReactToastify.css";


const uservalidationSchema = yup.object({
  email: yup
    .string("Enter your Email Id")
    .required("Email is required")
    .email("Invalid email format"),
});

// function generateOTP() {
//   var digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < 6; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }

const ForgotPassword = () => {
  const navigate = useNavigate();

  // const { id, token } = useParams();

  const [openSupport, setOpenSupport] = useState(false);
  const [data, setData] = useState({
    Organization_Id: "",
    User_Id: "",
    username: "",
    email: "",
    UserType: "",
    Url: "",
    groups: [],
    user_permissions: [],
    mailhtml: "",
    mailsubject: "",
    Created_By: "",
    MailPassword: "",
  });

  const mailid = data?.MailId;

  const [email, setEmail] = useState(mailid);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [OTPNumber, setOTPNumber] = useState("");
  const [showOTPBox, setShowOTPBox] = useState(false);
  const [progress, setProgress] = useState(120);

  const [openPopup, setOpenPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const id = parseInt( localStorage.getItem("id"));

  const generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const getdata = generateOTP();

  const onSendMail = async (email) => {
    const responseData = await axios.get(`${BASE_URL}/Erpapp/Getmailbyusingmail/?MailId=${email}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      const data = res?.data;
      setData(res?.data);
      console.log(res?.data);
      return data;
    }).catch((error) => {
      console.log("ds", error);
    });

    // const totp = require("totp-generator");

    // const otpdata = totp("JBSWY3DPEHPK3PXP", {
    //   digits: 6,
    //   algorithm: "SHA-256",
    //   period: 60,
    //   timestamp: Math.floor(Date.now() / 1000),
    // });
    // console.log(otpdata);
    // console.log(Math.floor(Date.now() / 1000))

    if(responseData?.id){
    var forgotpasswordpayload = {
      Organization_Id: parseInt(responseData?.Company_Id),
      username: responseData?.username,
      email: email,
      UserType: "",
      Url: "",
      groups: [],
      user_permissions: [],
      mailhtml: `<div className="card">
      <div className="card-body">
        <h4 className="card-title">Dear User,</h4>
        <p className="card-text">
        It seems that you have forgot the password and wanted to reset the password. To reset the password you need to confirm your identity by entering the below 6 digit one time pass code. This code will be valid only for 10 minutes.         
        </p>
        <br/>
        <p>${getdata}</p>

        <br/>
        <div> Team test </div>
      </div>
    </div>`,
      // Created_by: parseInt(localStorage.getItem("UserId")),
      Created_By: parseInt(responseData?.Created_By),
      mailsubject: "Mail for Reset your password",
      MailPassword: responseData?.MailPassword,
    };
    await axios
      .post(`${BASE_URL}/Erpapp/ForgotPassword/`, forgotpasswordpayload, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp?.data);
        if (resp?.data?.Message === "Password Reset Successfully") {
          toast.success("An OTP has been sent to your registered email.");
          setShowOTPBox(true);
          setOTPNumber(getdata);
          console.log("OTP", getdata);
          localStorage.setItem("username", responseData?.username)
          localStorage.setItem("email", email)
          setProgress(120);

          // // Simulate progress
          // const progressInterval = setInterval(() => {
          //   setProgress((prevProgress) => {
          //     if (!otp) {
          //       const newProgress = prevProgress - 1;
          //       if (newProgress === 0) {
          //         setShowOTPBox(false);
          //         clearInterval(progressInterval);
          //       }
          //       return newProgress;
          //     } else {
          //       clearInterval(progressInterval);
          //       return prevProgress;
          //     }
          //   });
          // }, 500);
          localStorage.setItem("OTP", resp?.data?.getdata);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please enter a registered email.")
      });
    }else{
      toast.error("Please enter a registered email.");
    }
  };

  const [progressInterval, setProgressInterval] = useState(null);

  const startProgressInterval = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 1;
        if (newProgress === 0) {
          setShowOTPBox(false);
          clearInterval(interval);
          setOtp(["", "", "", "", "", ""]);
        }
        return newProgress;
      });
    }, 500);
    setProgressInterval(interval);
  };

  const stopProgressInterval = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  };

  useEffect(() => {
    if (showOTPBox) {
      startProgressInterval();
    }
  }, [showOTPBox]);

  // Clear the progress interval when component unmounts
  useEffect(() => {
    return () => {
      stopProgressInterval();
    };
  }, []);


  const handleOtpChange = (index, e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
    if (sanitizedValue.length <= 1) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = sanitizedValue;
        return updatedOtp;
      });
      stopProgressInterval();

      if (sanitizedValue.length === 0 && index > 0) {
        const prevInput = document.getElementById(`otpInput-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      } else if (sanitizedValue.length === 1) {
        // Focus on the next input if current input has a value
        const nextInput = document.getElementById(`otpInput-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const pasteOtp = (e) => {
    const pasteData = e.clipboardData.getData("text/plain");
    const sanitizedData = pasteData.replace(/\D/g, ""); // Remove non-digit characters
    if (sanitizedData.length === 6) {
      setOtp(sanitizedData.split(""));
      // stopProgressInterval();
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(otp);
    const sanitizedValue = OTPNumber.replace(/\D/g, "").split(""); // Remove non-digit characters and convert to array
    const otpArray = otp.join("").split(""); // Convert otp value to array

    console.log(sanitizedValue);
    console.log(otpArray);

    if (JSON.stringify(otpArray) === JSON.stringify(sanitizedValue)) {
      console.log("success");
      setOpenPopup(true);
      toast.success("OTP is Verified");
      stopProgressInterval();
    } else {
      toast.error("Please enter valid OTP");
    }
  };

  const [key, setKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      var userspayload = {
        email: localStorage.getItem("email"),
        // username: localStorage.getItem("username"),
        password: newPassword,
        ReTypePassword: confirmPassword,
      };
      axios
        .patch(`${BASE_URL}/Erpapp/ForgotPassword/`, userspayload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then((res) => {
          if (res?.data?.id) {
            setOpenPopup(false);
            setOtp(["", "", "", "", "", ""]);
            setSuccess(false);
            toast.success("Password updated successfully", {
              position: "top-right",
            });
            setShowOTPBox(false);
            navigate("/");
            window.location.reload();
            setInterval(() => {
              // setKey(prevKey => prevKey + 1);
            }, 2000);
          } else {
            toast.error("Password is not updated. Please check it.");
          }
        }).catch((error) => {
          console.log("ds", error);
          toast.error("Password is not updated. Please check it.");
        });
    } else {
      toast.error("Password Mismatched");
    }
  };

  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ml: { xs: 0 },
        p: (theme) => theme.spacing(4),
      }}
    >
      <Div sx={{ mb: 3, display: "inline-flex" }}>
        <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
          {/* <img
            src="../images/ING-LOGO-CMYK.jpg"
            width={160}
            height={55}
            alt="Jumbo React"
          /> */}
          <img
            src="../images/test.jpg"
            width={180}
            height={70}
            className="login-logo-image"
          />
        </Link>
      </Div>

      <Div sx={{ display: "inline-flex" }}>
        <Card
          sx={{
            maxWidth: "100%",
            // width: 360,
            mb: 4,
            borderRadius: "10px",
            boxShadow: "0px 0px 5px 0px #95A5A6",
          }}
        >
          <Div sx={{ position: "relative", height: "100px" }}>
            <Div
              sx={{
                flex: 1,
                inset: 0,
                position: "absolute",
                alignItems: "center",
                backgroundColor: (theme) => alpha(theme.palette.common.white),
                p: (theme) => theme.spacing(3),
              }}
            >
              <Typography
                variant={"h2"}
                sx={{
                  color: "common.black",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  mb: 0,
                }}
              >
                Forgot Password!
              </Typography>
              {/* <Typography
                variant={"h4"}
                sx={{
                  color: "common.black",
                  opacity: 0.7,
                  mt: 2,
                  fontSize: "0.8rem",
                  mb: 1,
                }}
              >
                If you have forgot your password you can reset it here.
              </Typography> */}
              <Typography
                variant={"h4"}
                sx={{
                  color: "common.black",
                  opacity: 0.7,
                  mt: 2,
                  fontSize: "0.8rem",
                  mb: 1,
                }}
              >
                Please enter your email address and we'll send you a link to
                reset your password.
              </Typography>
            </Div>
          </Div>
          <CardContent>
            <Formik
              validateOnChange={true}
              initialValues={{ email: "" }}
              validationSchema={uservalidationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                onSendMail(data.email);
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <Div className="label-change" sx={{ mb: 3, mt: 2 }}>
                    <JumboTextField
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Id"
                      focused
                      required
                    />
                  </Div>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                    className="save-button"
                    sx={{ mb: 3 }}
                  >
                    {progress === 0 ? "Resend OTP" : "Send OTP"}
                  </LoadingButton>
                </Form>
              )}
            </Formik>

            <Typography
              variant="h5"
              color="red"
              textAlign={"center"}
              sx={{ mb: 2 }}
            >
              {showOTPBox === true
                ? `OTP will expire within ${progress} sec`
                : ""}
            </Typography>
            {showOTPBox && (
              <Div>
                <form onSubmit={handleResetPassword}>
                  {/* <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    className="otpInput"
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    secure
                    required
                  /> */}
                  <Div sx={{ maxWidth: "400px" }}>
                    {otp?.map((digit, index) => (
                      <TextField
                        className="input-box otpInput col-1 me-1"
                        key={index}
                        type="text"
                        id={`otpInput-${index}`}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e)}
                        onPaste={pasteOtp}
                        // className="otpInput"
                        maxLength={1}
                        pattern="[0-9]*" // Only allow numeric input
                        inputMode="numeric" // Show numeric keypad on mobile devices
                        // autoFocus={index === 0} // Set autoFocus on the first input
                        required
                        sx={{ minWidth: "62px" }}
                      />
                    ))}
                  </Div>
                  <br />
                  {/* {showOTPBox &&
                    (success ? (
                      <Typography
                        variant="h4"
                        color="green"
                        textAlign={"center"}
                      >
                        OTP is verified
                      </Typography>
                    ) : (
                      <></>
                    ))} */}
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!otp.some((opt) => opt !== "")}
                    sx={{ mt: 1, mb: 3, height: "40px" }}
                  >
                    Reset Password
                  </LoadingButton>
                </form>
              </Div>
            )}

            <Typography textAlign={"center"} variant={"body1"} mb={1}>
              Don't remember your email?{" "}
              <span
                style={{ color: "#00bfff", cursor: "pointer" }}
                onClick={() => setOpenSupport(true)}
              >
                Contact Support
              </span>
            </Typography>

            {/* message for contact support */}
            <Dialog open={openSupport} onClose={() => setOpenSupport(false)}>
              <Typography variant="h4" padding={4}>
                If any queries for login system please contact your admin.
              </Typography>
              <DialogActions
                sx={{ display: "flex", justifyContent: "center", mt: -2 }}
              >
                <Button
                  className="save-button"
                  onClick={() => setOpenSupport(false)}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Typography
              variant="h4"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                float: "right",
                textDecoration: "underline",
                mb: 2,
              }}
            >
              Cancel
            </Typography>
          </CardContent>
        </Card>
      </Div>

      {/* popup for create new password */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        {/* <Formik> */}
        <form onSubmit={handleSubmit}>
          <br />
          <Typography variant="h2" textAlign="center">
            Reset Password
          </Typography>
          <Div sx={{ p: 3, pt: 2, minWidth: "400px" }}>
            <TextField
              label="New Password"
              className="col-12"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            // focused
            />
            <br />
            <br />
            <TextField
              label="Confirm Password"
              className="col-12"
              placeholder="Retype new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            // focused
            />
          </Div>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", mt: -2 }}
          >
            <Div>
              <Button type="submit" className="save-button me-3">
                Save
              </Button>
              <Button
                className="cancel-button"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </Button>
            </Div>
          </DialogActions>
        </form>
        {/* </Formik> */}
      </Dialog>

      {/* {key && (
        <Login key={key} />
      )} */}

      <ToastContainer/>
    </Div>
  );
};

export default ForgotPassword;
