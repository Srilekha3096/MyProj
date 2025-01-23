import axios from "axios";
import { BASE_URL } from "./auth-services";


const userServices = async () => {
  const data = await axios.post(
    `${BASE_URL}/Erpapp/Usersignup/?username=${username}`
  );
  return data;
};

export default userServices;
