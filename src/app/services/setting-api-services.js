import axios from "axios";
import { BASE_URL } from "./auth-services";
import ReloadPage from "app/pages/home/ReloadPage";



setTimeout(() => {
  <ReloadPage />;
}, 1000);

const settingServices = {};



// company list without pagination
settingServices.CompanyListsWithoutPAgination = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Companygetwithouttoken/?Company_Id=${id}`,
    header
  );
  return data;
};


settingServices.settingItem = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/AdditionalItempreferenceList/`,
    header
  );
  return data;
};

settingServices.transactionApproval = async (userId, header) => { // 7
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/TransactionapprovalCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

settingServices.getItemSettings = async (userId, header) => { // 8
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/ItempreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};


settingServices.getHolidayLists = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Holidaylistlist/?Partner_Id=${userId}`,
    header
  );
  return data;
};


settingServices.deleteHoliday = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/HolidaylistCRUD/?Holidaylist_Id=${id}`,
    header
  );
  return data;
};




settingServices.getSalesOrderSettings = async (userId, header) => { // 1
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/SalesorderpreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

settingServices.getPurchaseOrderSettings = async (userId, header) => { // 4
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PurchasepreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};


settingServices.getInvoiceSettings = async (userId, header) => { // 2
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/InvoicepreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};


settingServices.getBudgetSettings = async (userId, header) => { // 6
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/BudgetpreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};


settingServices.getInventorySettings = async (userId, header) => { // 3
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/InventorypreferenceCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

settingServices.getSlotTimeSettings = async (userId, header) => { // 5
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/SlotCRUD/?id=${userId}`,
    header
  );
  return data;
};


settingServices.getSlotListSettings = async (header) => { // 5
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Slotlist/`,
    header
  );
  return data;
};

settingServices.deleteSlots = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/SlotCRUD/?Slot_Id=${id}`,
    header
  );
  return data;
};


settingServices.getTransactionSeriesSettings = async (Id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/TransactionalseriesCRUD/?Company_Id=${Id}`,
    header
  );
  return data;
};


settingServices.getTemplateSettings = async (Id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/TemplatesCRUD/?Template_Id=${Id}`,
    header
  );
  return data;
};


settingServices.getWorkflow = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkflowCRUD/?Workflow_Id=${id}`,
    header
  );
  return data;
};


settingServices.deleteWorkflow = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/WorkflowCRUD/?Workflow_Id=${id}`,
    header
  );
  return data;
};


settingServices.listWorkflows = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Workflowlist/?page=${page}`,
    header
  );
  return data;
};


// workflow name
settingServices.getWorkflowName = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkflowNameCRUD/?WorkflowName_Id=${id}`,
    header
  );
  return data;
};


settingServices.deleteWorkflowName = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/WorkflowNameCRUD/?WorkflowName_Id=${id}`,
    header
  );
  return data;
};


settingServices.listWorkflowNames = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkflowNamelist/?page=${page}`,
    header
  );
  return data;
};



// workflow rules

settingServices.deleteWorkflowRule = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/WorkflowRuleCRUD/?WorkflowRule_Id=${id}`,
    header
  );
  return data;
};

settingServices.listWorkflowRules = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkflowRulelist/`,
    header
  );
  return data;
};

// filter workflow rules based on rule name
settingServices.filterWorkflowRules = async (rule, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Rulefilter/?Rule_Name=${rule}`,
    header
  );
  return data;
};

settingServices.getWorkflowRules = async (ruleId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkflowRuleCRUD/?WorkflowRule_Id=${ruleId}`,
    header
  );
  return data;
};


settingServices.AssignWorkflowLists = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Assignworkflowlist/?page=${page}`,
    header
  );
  return data;
};

settingServices.deleteAssignWorkflow = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/AssignworkflowCRUD/?Assignworkflow_Id=${id}`,
    header
  );
  return data;
};



settingServices.filterFormNames = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Formmasterlist/`,
    header
  );
  return data;
};

settingServices.listFormNames = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Formpermisionlists/`,
    header
  );
  return data;
};

// from form master
settingServices.filterlistFieldNames = async (name, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Formmasterfilter/?FormName=${name}`,
    header
  );
  return data;
};


settingServices.filterFieldNames = async (name, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/workflowfilter/?Document_Name=${name}`,
    header
  );
  return data;
};

settingServices.filterFieldNamesFromWorkflowOrigin = async (name, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Workfloworiginfilter/?Form_Name=${name}`,
    header
  );
  return data;
};


settingServices.filterFieldsUsingFormPermission = async (name, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/Formpermissionfilter/`, name,
    header
  );
  return data;
};


settingServices.filterWorkflowOriginFieldNames = async (name, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/WorkfloworiginCRUD/?Form_Name=${name}`,
    header
  );
  return data;
};


settingServices.listWorkflowOrigin = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Workfloworiginlist/`,
    header
  );
  return data;
};


settingServices.checkWorkFlow = async (name, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/workflowfilter/?Document_Name=${name}`,
    header
  );
  return data;
};

export default settingServices;;