import axios from "axios";
import { BASE_URL, header } from "./auth-services";

const quotationRequestServices = {};

quotationRequestServices.getQuotationRequestList = async (partnerId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/RFQAdditional/?Partner_Id=${partnerId}&Is_Deleted=False`,
        header
    );
    return data;
};
quotationRequestServices.getMyQuotationRequestList = async (companyId, partnerId, createdBy, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/RFQMyAdditional/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&Is_Deleted=False`,
        header
    );
    return data;
};

quotationRequestServices.getQuotationRequestListPagination = async (partnerId,page, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/RFQAdditional/?Partner_Id=${partnerId}&page=${page}&Is_Deleted=False`,
        header
    );
    return data;
};
quotationRequestServices.getMyQuotationRequestListPagination = async (companyId, createdBy, page, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/RFQMyAdditional/?Company_Id=${companyId}&Created_By=${createdBy}&page=${page}&Is_Deleted=False`,
        header
    );
    return data;
};

quotationRequestServices.deleteQuotationRequestById = async (RFQ_Id, header) => {
    const { data } = await axios.delete(
        `${BASE_URL}/Erpapp/RFQCRUD/?RFQ_Id=${RFQ_Id}`,
        header
    );
    return data;
};
quotationRequestServices.createQuotationRequest = async (quotationObject, header) => {
    const { data } = await axios.post(
        `${BASE_URL}/Erpapp/RFQCRUD/`, quotationObject,
        header
    );
    return data;
};
quotationRequestServices.getQuotationRequestById = async (RFQ_Id, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/RFQCRUD/?RFQ_Id=${RFQ_Id}`,
        header
    );
    return data;
};
quotationRequestServices.updateQuotationRequest = async (quotationObject, header) => {
    const { data } = await axios.put(
        `${BASE_URL}/Erpapp/RFQCRUD/`, quotationObject,
        header
    );
    return data;
};
export default quotationRequestServices;
