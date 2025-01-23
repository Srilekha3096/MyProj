import axios from "axios";
import { BASE_URL } from "./auth-services";

const supplierQuotationServices = {};

supplierQuotationServices.getSupplierQuotationList = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsAdditional/`,
    header
  );
  return data;
};

supplierQuotationServices.getMySupplierQuotationList = async (
  companyId,
  createdBy,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsMyListAdditional/?Company_Id=${companyId}&Created_By=${createdBy}&Is_Deleted=False`,
    header
  );
  return data;
};

supplierQuotationServices.getSupplierQuotationPaginationList = async (
  page,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsAdditional/?page=${page}&Is_Deleted=False`,
    header
  );
  return data;
};

supplierQuotationServices.getMySupplierQuotationPaginationList = async (
  companyId,
  createdBy,
  page,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsMyListAdditional/?Company_Id=${companyId}&Created_By=${createdBy}&page=${page}&Is_Deleted=False`,
    header
  );
  return data;
};

supplierQuotationServices.getDraftSupplierQuotationPaginationList = async (
  companyId,
  createdBy,
  page,
  header
) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsdraftlist/?Company_Id=${companyId}&Created_By=${createdBy}&page=${page}&Is_Deleted=False`,
    header
  );
  return data;
};

supplierQuotationServices.deleteSupplierQuotationById = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/QuoteDetailsCRUD/?id=${id}`,
    header
  );
  return data;
};

supplierQuotationServices.createSupplierQuotation = async (
  quotationObject,
  header
) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/QuoteDetailsCRUD/`,
    quotationObject,
    header
  );
  return data;
};

supplierQuotationServices.getSupplierQuotationById = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/QuoteDetailsCRUD/?id=${id}`,
    header
  );
  return data;
};

supplierQuotationServices.updateSupplierQuotation = async (
  quotationObject,
  header
) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/QuoteDetailsCRUD/`,
    quotationObject,
    header
  );
  return data;
};


export default supplierQuotationServices;
