import ReloadPage from "app/pages/home/ReloadPage";
import axios from "axios";
import { io } from "socket.io-client";
// import debug from "debug";
// debug.enable("socket.io-client:*");

// export const BASE_URL = "https://127.0.0.1:8000";        // local

// export const BASE_URL = "http://51.20.141.90:8000";        // aws server

// export const BASE_URL = "https://3.238.104.144:8000";      // aws server new

// export const BASE_URL = "https://test.co.in:8000";      // aws server new

// export const BASE_URL = "https://65.2.52.192:8000";         // new server

export const BASE_URL = "https://admin.test.co.in";        // new live server

// socket connection
export const socket = io("ws://admin.test.co.in:8001", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});


const token = localStorage.getItem("accesstoken");

export const header = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};


export const pageReload = () => {
  setTimeout(() => {
    <ReloadPage />;
  }, 1000);
  return <></>;
};



const authServices = {};



authServices.getCurrentUser = async (username) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Usersignup/?username=${username}`
  );
  return data;
};

// loginCreds = {username: "admin", password: "admin@123"}
authServices.signIn = async (username, password) => {
  const data = await axios.post(`${BASE_URL}/auth_token`, {
    username,
    password,
  });
  return data;
};

export default authServices;
