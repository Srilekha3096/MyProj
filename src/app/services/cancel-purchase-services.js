import axios from "axios";
import { BASE_URL } from "./auth-services";

const cancelPurchaseServices = {};

    cancelPurchaseServices.getPurchaseCancelList = async (partnerId, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POCancelDetailsAdditional/?Partner_Id=${partnerId}&Is_Deleted=False`,
            header
        );
        return data;
    };
    cancelPurchaseServices.getMyPurchaseCancelList = async (companyId, partnerId, createdBy, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POCancelDetailsMyList/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&Is_Deleted=False`,
            header
        );
        return data;
    };

    cancelPurchaseServices.getPurchaseCancelListPagination = async (partnerId, page, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POCancelDetailsAdditional/?Partner_Id=${partnerId}&page=${page}&Is_Deleted=False`,
            header
        );
        return data;
    };
    cancelPurchaseServices.getMyPurchaseCancelListPagination = async (companyId, partnerId, createdBy, page, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POCancelDetailsMyList/?Company_Id=${companyId}&Partner_Id=${partnerId}&Created_By=${createdBy}&page=${page}&Is_Deleted=False`,
            header
        );
        return data;
    };

    cancelPurchaseServices.deletePurchaseCancelById = async (id, header) => {
        const { data } = await axios.delete(
            `${BASE_URL}/Erpapp/POCancelDetailsCRUD/?id=${id}`,
            header
        );
        return data;
    };
    cancelPurchaseServices.cancelPurchaseOrder = async (poCancelObj, header) => {
        const { data } = await axios.post(
            `${BASE_URL}/Erpapp/POCancelDetailsCRUD/`, poCancelObj, 
            header
        );
        return data;
    };

    cancelPurchaseServices.updateCancelPurchaseOrder = async (poCancelObj, header) => {
        const { data } = await axios.put(
            `${BASE_URL}/Erpapp/POCancelDetailsCRUD/`, poCancelObj, 
            header
        );
        return data;
    };
export default cancelPurchaseServices;
