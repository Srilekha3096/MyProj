import axios from "axios";
import { BASE_URL } from "./auth-services";

const token = localStorage.getItem("accesstoken");
const header = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
const poCancellationServices = {};

poCancellationServices.getCancellationList = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/POCancelDetailsAdditional/?Is_Deleted=False`,
    header
  );
  return data;
};
poCancellationServices.getMyCancellationList = async (companyId, createdBy) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/POCancelDetailsMyList/?Company_Id=${companyId}&Created_By=${createdBy}&Is_Deleted=False`,
    header
  );
  return data;
};
poCancellationServices.getCancellationById = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/POCancelDetailsCRUD/?id=${id}`,
    header
  );
  return data;
};
poCancellationServices.deleteCancellationById = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/POCancelDetailsCRUD/?id=${id}`,
    header
  );
  return data;
};

poCancellationServices.updatePurchseOrderCancellation = async (
  poCancelObj,
  header
) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/POCancelDetailsCRUD/`,
    poCancelObj,
    header
  );
  return data;
};
export default poCancellationServices;
