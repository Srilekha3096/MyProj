import axios from "axios";
import { BASE_URL } from "./auth-services";

const purchaseOrderServices = {};

purchaseOrderServices.getPurchaseOrderList = async (partnerId,header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsAdditional/?Partner_Id=${partnerId}&Is_Deleted=False`,
    header
  );
  return data;
};
purchaseOrderServices.getMyPurchaseOrderList = async (
  companyId,
  partnerId,
  createdBy,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsMyListAdditional/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&Is_Deleted=False`,
    header
  );
  return data;
};
purchaseOrderServices.getPurchaseOrderListWithPagination = async (
  partnerId,
  page,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsAdditional/?Is_Deleted=False&Partner_Id=${partnerId}&page=${page}`,
    header
  );
  return data;
};
purchaseOrderServices.getMyPurchaseOrderListWithPagination = async (
  companyId,
  partnerId,
  createdBy,
  page,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsMyListAdditional/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&Is_Deleted=False&page=${page}`,
    header
  );
  return data;
};
purchaseOrderServices.deletePurchaseOrderById = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/PODetailsCRUD/?id=${id}`,
    header
  );
  return data;
};
purchaseOrderServices.getPurchaseOrderById = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsCRUD/?id=${id}`,
    header
  );
  return data;
};
purchaseOrderServices.createPurchaseOrder = async (
  purchaseOrderObject,
  header
) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/PODetailsCRUD/`,
    purchaseOrderObject,
    header
  );
  return data;
};
// add new by ponkumar
purchaseOrderServices.updatePurchaseOrder = async (
  purchaseOrderObject,
  header
) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/PODetailsCRUD/`,
    purchaseOrderObject,
    header
  );
  return data;
};

// po my list without pagination
purchaseOrderServices.getMyPurchaseOrderListWithoutPagination = async (
  companyId,
  partnerId,
  createdBy,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsMyListwithoutpagination/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&Is_Deleted=False`,
    header
  );
  return data;
};


// po all list without pagination
purchaseOrderServices.getAllPurchaseOrderListWithoutPagination = async (
  companyId,
  partnerId,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsallListwithoutpagination/?Company_Id=${companyId}&Partner_Id=${partnerId}&Is_Deleted=False`,
    header
  );
  return data;
};


export default purchaseOrderServices;
