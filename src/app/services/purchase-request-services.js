import axios from "axios";
import { BASE_URL } from "./auth-services";

const purchaseRequestServices = {};

purchaseRequestServices.getPurchaseRequestList = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/PRAdditional/`, header);
  return data;
};

purchaseRequestServices.listPurchaseRequest = async (partnerId,page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PRAdditional/?Partner_Id=${partnerId}&page=${page}`,
    header
  );
  return data;
};

// ponkumar changes
purchaseRequestServices.getMyPurchaseRequestList = async (
  companyId,
  partnerId,
  id,
  page=1,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MyPRLists/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${id}&page=${page}`,
    header
  );
  return data;
};
purchaseRequestServices.listMyPurchaseRequest = async (
  companyId,
  id,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MyPRLists/?Company_Id=${companyId}&Created_By=${id}`,
    header
  );
  return data;
};
purchaseRequestServices.deletePurchaseRequestById = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/PRlist/?id=${id}`,
    header
  );
  return data;
};
purchaseRequestServices.createPurchaseRequest = async (
  purchaseReqObject,
  header
) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/PRlist/`,
    purchaseReqObject,
    header
  );
  return data;
};
purchaseRequestServices.getPurchaseRequestById = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PRlist/?id=${id}`,
    header
  );
  return data;
};
purchaseRequestServices.updatePurchaseRequest = async (
  purchaseReqObject,
  header
) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/PRlist/`,
    purchaseReqObject,
    header
  );
  return data;
};

// ponkumar changes
purchaseRequestServices.getMyCatalogueList = async (companyId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Cataloguelist/?Company_Id=${companyId}`,
    header
  );
  return data;
};

purchaseRequestServices.getAllCatalogueList = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/Cataloguelist/`, header);
  return data;
};

purchaseRequestServices.getMyCatalogueListPagination = async (companyId,page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Cataloguelist/?Company_Id=${companyId}&page=${page}`,
    header
  );
  return data;
};

purchaseRequestServices.getAllCatalogueListPagination = async (page,header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/Cataloguelist/?page=${page}`, header);
  return data;
};

purchaseRequestServices.approvedPRLists = async (companyId, partnerId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ApprovedPRlist/?Company_Id=${companyId}&Partner_Id=${partnerId}`,
    header
  );
  return data;
};

export default purchaseRequestServices;
