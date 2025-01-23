import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain';
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import Div from '@jumbo/shared/Div';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from "yup";
import { useState } from 'react';


const uservalidationSchema = yup.object({
    password: yup
      .string("Enter your new password")
      .required("password is required"),
    confirmPassword: yup
      .string("ReEnter the password")
      .required("confirm password is required")
  });
  

const ForgotPasswordForm = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleChangePassword = () =>{

    }


    return (
        <>
            <Div sx={{
                flex: 1,
                flexWrap: "wrap", display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <Card
                    sx={{
                        maxWidth: "100%",
                        width: 360,
                        mb: 4,
                        borderRadius: "10px",
                        boxShadow: "0px 0px 5px 0px #95A5A6",
                    }}
                >
                    <CardContent>
                        <Formik validateOnChange={true} initialValues={{ password: "", confirmPassword: "" }} validationSchema={uservalidationSchema} onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            handleChangePassword(data.password, data.confirmPassword);
                            setSubmitting(false);
                        }}>
                            <Form>
                            <Div>
                                <Typography variant='h3' sx={{ textAlign: "center" }}>Reset your password</Typography>
                                <Typography variant='h5' sx={{ textAlign: "center" }}>Enter your new password and login again</Typography>
                            </Div>
                            <Div className="label-change" sx={{ mb: 3, mt: 4 }}>
                                <JumboTextField
                                    fullWidth
                                    id="email"
                                    className="input-box"
                                    label="New Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    focused
                                    // required
                                />
                                <br /><br />
                                <JumboTextField
                                    fullWidth
                                    id="email"
                                    className="input-box"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    focused
                                    // required
                                />
                            </Div>
                            <Button fullWidth type="submit" className="save-button" sx={{ mb: 3 }}>
                                Reset Password
                            </Button>
                            </Form>
                        </Formik>
                    </CardContent>
                </Card>
            </Div>
        </>
    )
}

export default ForgotPasswordForm;
