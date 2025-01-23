import axios from "axios";
import { BASE_URL } from "./auth-services";

const dropdownApiServices = {};


dropdownApiServices.getItemDropdownList = async (id1, id2, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Itemlistwithoutpagination/?Company_Id=${id1}&Partner_Id=${id2}&Is_Deleted=False`,
        header
    );
    return data;
};

dropdownApiServices.getCostcenterDropdownList = async (id, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Costcenterlistwithoutpagination/?Partner_Id=${id}`,
        header
    );
    return data;
};

dropdownApiServices.getSupplierDropdownList = async (partnerId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/supplierlistwithoutpagination/?Partner_Id=${partnerId}`,
        header
    );
    return data;
};

dropdownApiServices.getStoreDropdownList = async (partnerId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Storelistwithoutpagination/?Partner_Id=${partnerId}`,
        header
    );
    return data;
};

dropdownApiServices.getAllStoreDropdownList = async (header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Storelistwithoutpaginationforfront/`,
        header
    );
    return data;
};

dropdownApiServices.getServiceDropdownList = async (header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/ServiceListWithoutPagination/`,
        header
    );
    return data;
};

dropdownApiServices.getMaterialReceiptDropdownList = async (id1, id3, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/GoodsReceiptwithoutpagination/?Company_Id=${id1}&Partner_Id=${id3}`,
        header
    );
    return data;
};

dropdownApiServices.getMaterialRequestDropdownList = async (companyId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Materialrequestwithoutpagination/?Company_Id=${companyId}`,
        header
    );
    return data;
};


dropdownApiServices.getMaterialIssueDropdownList = async (companyId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/MaterialIssueWithoutPaginationAllList/?Company_Id=${companyId}`,
        header
    );
    return data;
};

dropdownApiServices.getCatalogueDropdownList = async (companyId, header) => {
    const { data } = await axios.get(
        `${BASE_URL}/Erpapp/Cataloguewithoutpaginationlist/?Company_Id=${companyId}`,
        header
    );
    return data;
};


export default dropdownApiServices;
