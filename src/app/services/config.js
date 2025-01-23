import baseAxios from "axios";


const token = localStorage.getItem("accesstoken");

const axios = baseAxios.create({
    
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default axios;