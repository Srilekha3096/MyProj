import axios from "axios";
import { BASE_URL } from "./auth-services";

const token = localStorage.getItem("accesstoken");

const header = {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};


const commonServices = {};


commonServices.deletePreviousHistory = async (payload, header) => {
    const { data } = await axios.post(
        `${BASE_URL}/Erpapp/updaterecorddelete/`, payload,
        header
    );
    return data;
};

export default commonServices;