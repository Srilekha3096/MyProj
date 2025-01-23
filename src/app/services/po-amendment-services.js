import axios from "axios";
import { BASE_URL } from "./auth-services";

const poAmendmentServices = {};

    poAmendmentServices.getAmendmentList = async (header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POAmendDetailsAdditional/?Is_Deleted=False`,
            header
        );
        return data;
    };
    poAmendmentServices.getMyAmendmentList = async (companyId, createdBy, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POAmendMyListAdditional/?Company_Id=${companyId}&Created_By=${createdBy}&Is_Deleted=False`,
            header
        );
        return data;
    };

    poAmendmentServices.getAmendmentListPagination = async (partnerId,page, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POAmendDetailsAdditional/?Partner_Id=${partnerId}&page=${page}&Is_Deleted=False`,
            header
        );
        return data;
    };

    poAmendmentServices.getAmendmentListWithoutPagination = async (companyId, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/Poamendmentlistwithoutpagination/?Company_Id=${companyId}`,
            header
        );
        return data;
    };


    poAmendmentServices.getMyAmendmentListPagination = async (companyId, createdBy,page, header) => {
        const { data } = await axios.get(
            `${BASE_URL}/Erpapp/POAmendMyListAdditional/?Company_Id=${companyId}&Created_By=${createdBy}&page=${page}&Is_Deleted=False`,
            header
        );
        return data;
    };

    poAmendmentServices.deleteAmendmentById = async (id, header) => {
        const { data } = await axios.delete(
            `${BASE_URL}/Erpapp/POAmendDetailsCRUD/?id=${id}`,
            header
        );
        return data;
    };
    poAmendmentServices.createPurchseOrderAmendment = async (poAmendmentObj, header) => {
        const { data } = await axios.post(
            `${BASE_URL}/Erpapp/POAmendDetailsCRUD/`, poAmendmentObj,
            header
        );
        return data;
    };

    poAmendmentServices.updatePurchseOrderAmendment = async (poAmendmentObj, header) => {
        const { data } = await axios.put(
            `${BASE_URL}/Erpapp/POAmendDetailsCRUD/`, poAmendmentObj,
            header
        );
        return data;
    };
export default poAmendmentServices;
