import Div from "@jumbo/shared/Div/Div";
import { createBrowserHistory } from "history";
import React from "react";
import { toast } from "react-toastify";

const AuthGuard = (Component) => {
  const history = createBrowserHistory();
  const isAuthenticated = true;

  return (props) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      history.push("/");
      return null;
    }
  };
};

export default AuthGuard;




export const handleError = (error) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data;
    Object.keys(errorData).forEach(key => {
      const errorMessage = errorData[key];
      console.log("errorMessage",errorMessage)
      // toast.error(`${errorMessage}`);
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach(message => {
          toast.error(message);
        });
      } else {
        toast.error(`${errorMessage}`);
      }
    });
  } else {
    toast.error('An unexpected error occurred. Please try again later.');
  }
};

