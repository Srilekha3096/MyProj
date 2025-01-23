import axios from "axios";
import { BASE_URL } from "./auth-services";

const itemServices = {};

// api for country lists
itemServices.getCountries = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/CountryLists/`, header);
  return data;
};

itemServices.getRegions = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/RegionLists/`, header);
  return data;
};

// api for state lists
itemServices.getStates = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/StateLists/`, header);
  return data;
};

// api for city lists
itemServices.getCities = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/CityLists/`, header);
  return data;
};

// api for item master
itemServices.listItemsMaster = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Itemlist/?Is_Deleted=False&page=${page}`,
    header
  );
  return data;
};

// with pagination
itemServices.listItems = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Itemlist/?Is_Deleted=False`,
    header
  );
  return data;
};

itemServices.listItemsPagination = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Itemlist/?page=${page}&Is_Deleted=False`,
    header
  );
  return data;
};

// without pagination
itemServices.dropdownListItems = async (id1, id2, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Itemlistwithoutpagination/?Company_Id=${id1}&Partner_Id=${id2}&Is_Deleted=False`,
    header
  );
  return data;
};

itemServices.createItems = async (inputs, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/ItemCRUD/`,
    { inputs },
    header
  );
  return data;
};

itemServices.getItem = async (Id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ItemCRUD/?Item_Id=${Id}`,
    header
  );
  return data;
};
itemServices.deleteItems = async (Id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/ItemCRUD/?Item_Id=${Id}`,
    header
  );
  return data;
};

// api for item overview page
itemServices.MaterialIssueTransaction = async (itemname, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialIssueDetailtransaction/?item_name=${itemname}`,
    header
  );
  return data;
};

itemServices.MaterialRequestTransaction = async (itemname, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialRequestDetailtransaction/?item_name=${itemname}`,
    header
  );
  return data;
};

itemServices.MaterialTransferTransaction = async (itemname, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialTransferDetailstransaction/?item_name=${itemname}`,
    header
  );
  return data;
};

itemServices.MaterialReceiptTransaction = async (itemname, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/GoodsTrfReceiptDetailstransaction/?item_name=${itemname}`,
    header
  );
  return data;
};

// api for item group
itemServices.viewItemGroup = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ItemGroupCRUD/?id=${id}`,
    header
  );
  return data;
};

// list of item groups
itemServices.getItemGroup = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ItemGroupAdditionalCRUD/`,
    header
  );
  return data;
};

// list of active item groups
itemServices.activeItemGroups = async (payload, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/ItemGroupisactivelist/`,
    payload,
    header
  );
  return data;
};

// delete of item group
itemServices.deleteItemGroup = async (id1, id2, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/ItemGroupCRUD/?id=${id1}&Item_Id=${id2}`, //changed 20-06-2023
    header
  );
  return data;
};

// Inactive item group
itemServices.InActiveItemGroup = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/ItemGroupisactive/?id=${id}`,
    header
  );
  return data;
};

// api for view supplier
itemServices.viewSupplier = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/SupplierCRUD/?id=${id}`,
    header
  );
  return data;
};

// api for chart of account in finance module
itemServices.viewChatofAccount = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ChartofaccountCRUD/?id=${id}`,
    header
  );
  return data;
};

itemServices.getAccountNames = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Chartofaccountmylist/?Created_By=${id}`,
    header
  );
  return data;
};

itemServices.getDropdownChartofAccount = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Partnerchartofaccount/`,
    header
  );
  return data;
};

// api for lookup table
itemServices.getLookups = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Dropdwontablelist/?page=${page}`,
    header
  );
  return data;
};
itemServices.deleteLookups = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/DropdowntableCRUD/?Dropdown_Id=${id}`,
    header
  );
  return data;
};

itemServices.getUnits = async (Lookupname, header) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/Dropdwontablesearch/`,
    Lookupname,
    header
  );
  return data;
};

// itemServices.getCostCentre = async () => {
//   const { data } = await axios.post(
//     `${BASE_URL}/Erpapp/Dropdwontablemylist/`,
//     header
//   );
//   return data;
// };

// api for stores
itemServices.getStores = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/Storelist/`, header);
  return data;
};

itemServices.filterStores = async (Store_City, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Storelistfilter/?Store_City=${Store_City}&Is_Deleted=False`,
    header
  );
  return data;
};
itemServices.deleteStores = async (Store_Id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/StoremasterCRUD/?Store_Id=${Store_Id}`,
    header
  );
  return data;
};

// api for costcentre
itemServices.getCostCentre = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Costcenterlist/`,
    header
  );
  return data;
};

itemServices.deleteCostCentre = async (CostCenter_Id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/CostcenterCRUD/?CostCenter_Id=${CostCenter_Id}`,
    header
  );
  return data;
};

itemServices.listMaterialReceipt = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/GoodsReceiptMyLists/?Company_Id=${id1}&Created_By=${id2}&page=${page}`,
    header
  );
  return data;
};

itemServices.getSupplier = async (header, partnerId) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Supplierlist/?Partner_Id=${partnerId}`,
    header
  );
  return data;
};

itemServices.getPoOrder = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PODetailsCRUD/?id=${id}`,
    header
  );
  return data;
};

itemServices.searchPoOrder = async (item, header) => {
  const { data } = await axios.put(
    `${BASE_URL}/Erpapp/PODetailsAdditional/`,
    item,
    header
  );
  return data;
};

itemServices.deleteMaterialReceipt = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/GoodsReceiptCRUD/?id=${id}`,
    header
  );
  return data;
};


itemServices.materialreceiptlistwithoutpagination = async (id1, id2, id3, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/GoodsReceiptwithoutpagination/?Company_Id=${id1}&Created_By=${id2}&Partner_Id=${id3}`,
    header
  );
  return data;
};



// services for material request
itemServices.listMaterialRequest = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialRequestMyLists/?Company_Id=${id1}&Created_By=${id2}&Is_Deleted=false&page=${page}`,
    header
  );
  return data;
};

// list all material requests
itemServices.listAllMaterialRequest = async (id, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialRequestAdditionalCRUD/?Partner_Id=${id}&page=${page}`,
    header
  );
  return data;
};

// view material request
itemServices.viewMaterialRequest = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialRequestCRUD/?id=${id}`,
    header
  );
  return data;
};

itemServices.getDepartmentList = async (id1, id2, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/DepartmentAdditionalCRUD/?Company_Id=${id1}&Created_By=${id2}&Is_Deleted=false`,
    header
  );
  return data;
};

itemServices.getUsersList = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/Userlistwithoutpagination/`, header);
  return data;
};

itemServices.deleteMaterialRequest = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/MaterialRequestCRUD/?id=${id}`,
    header
  );
  return data;
};

// partner lists
itemServices.listPartners = async (header) => {
  const { data } = await axios.get(`${BASE_URL}/Erpapp/PartnerListreportDropdown/`, header);
  return data;
};

itemServices.checkApprovalBasedOnWorkflow = async (name, partnerId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/workflowfilter/?Document_Name=${name}&Partner_Id=${partnerId}`,
    header
  );
  return data;
};

// api services for material issue items
itemServices.listIssueItems = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialIssueMyLists/?Company_Id=${id1}&Created_By=${id2}&page=${page}`,
    header
  );
  return data;
};

itemServices.listAllIssueItems = async (id, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialIssueAdditionalCRUD/?Partner_Id=${id}&page=${page}`,
    header
  );
  return data;
};

itemServices.deleteMaterialIssue = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/MaterialIssueCRUD/?id=${id}`,
    header
  );
  return data;
};

// this api's are going to be use the material returns
itemServices.listMaterialReturnDatas = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialReturnMyList/?Company_Id=${id1}&Created_By=${id2}&page=${page}&Is_Deleted=false`,
    header
  );
  return data;
};

itemServices.deleteMaterialReturns = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/MaterialReturnCRUD/?id=${id}`,
    header
  );
  return data;
};

itemServices.listAllMaterialReturnDatas = async (id, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialReturnAdditionalCRUD/?Partner_Id=${id}&page=${page}`,
    header
  );
  return data;
};

// this api's are going to be use the material transfer
itemServices.listMaterialTransferDatas = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialTransferMyList/?Company_Id=${id1}&Created_By=${id2}&page=${page}&Is_Deleted=false`,
    header
  );
  return data;
};

itemServices.listAllMaterialTransferDatas = async (id, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MaterialTransferAdditionalCRUD/?Partner_Id=${id}&page=${page}&Is_Deleted=false`,
    header
  );
  return data;
};

itemServices.deleteMaterialTransfers = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/MaterialTransferCRUD/?id=${id}`,
    header
  );
  return data;
};

// this api's are going to be use the store adjustment
itemServices.listMaterialStoreAdjustmentDatas = async (id1, id2, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/StoreAdjustmentMyList/?Company_Id=${id1}&Created_By=${id2}&Is_Deleted=False&page=${page}`,
    header
  );
  return data;
};

itemServices.listAllStoreAdjustmentDatas = async (id, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/StoreAdjustmentAdditional/?Partner_Id=${id}&Is_Deleted=False&page=${page}`,
    header
  );
  return data;
};

itemServices.deleteStoresAdjustment = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/StoreAdjustmentCRUD/?id=${id}`,
    header
  );
  return data;
};

// api for document approvals
itemServices.getEmployees = async (email, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/getemployeeeid/?email=${email}`,
    header
  );
  return data;
};

itemServices.filterDocumentApprovalUsingRequestId = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Materialrequestworkflow/?Request_Id=${id}`,
    header
  );
  return data;
};

itemServices.filterDocumentApprovalUsingRequestIdForPurchase = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Purchaserequestworkflow/?Request_Id=${id}`,
    header
  );
  return data;
};


// add prince
itemServices.getBusinessUnitList = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Businessunitlistwithoutpage/`,
    header
  );
  return data;
};

export default itemServices;
