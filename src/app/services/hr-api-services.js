import axios from "axios";
import { BASE_URL } from "./auth-services";


const hrApiServices = {};


hrApiServices.getTerritoryLists = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/AllTerritoryLists/?Company_Id=${id}`,
    header
  );
  return data;
};


hrApiServices.getAllTerritoryWithoutPaginationLists = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/AllTerritoryListswithoutpagination/?Company_Id=${id}`,
    header
  );
  return data;
};



hrApiServices.getHrPayCalerdarSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PaycalendarCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};



hrApiServices.getHrPFSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeProvidentfundCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

hrApiServices.getHrESISettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeESICRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

hrApiServices.getHrProfTaxSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeProfessionalTaxCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

hrApiServices.getPayrollConfigSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PayrollconfigurationCRUD/?Company_Id=${userId}`,
    header
  );
  return data;
};

hrApiServices.getEmployeeEarningSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeEarningCRUD/?Earning_Id=${userId}`,
    header
  );
  return data;
};

hrApiServices.listEmployeeEarningSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeEarningmylist/?Created_By=${userId}`,
    header
  );
  return data;
};

hrApiServices.listAllEmployeesEarningSettings = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeEarninglist/`,
    header
  );
  return data;
};


hrApiServices.listAllEmployeesEarningWithoutPagination = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeEarninglistwithoutPagination/`,
    header
  );
  return data;
};

hrApiServices.deleteEmployeeEarning = async (userId, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/EmployeeEarningCRUD/?Earning_Id=${userId}`,
    header
  );
  return data;
};

// deductions
hrApiServices.listAllEmployeesDeductionSettings = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeDeductionlist/`,
    header
  );
  return data;
};



hrApiServices.listEmployeeDeductionSettings = async (userId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeDeductionmylist/?Created_By=${userId}`,
    header
  );
  return data;
};

hrApiServices.deleteEmployeeDeduction = async (userId, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/EmployeeDeductionCRUD/?Deduction_Id=${userId}`,
    header
  );
  return data;
};


hrApiServices.listCadreLevelSettings = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Cadredropdownlist/`,
    header
  );
  return data;
};

hrApiServices.listOfEmployees = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Employeelist/?Partner_Id=${id}`,
    header
  );
  return data;
};

hrApiServices.listOfAllEmployees = async (header, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/HREmployeelist/?page=${page}`,
    header
  );
  return data;
};

hrApiServices.deleteEmployee = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/EmployeeCRUD/?Employee_Id=${id}`,
    header
  );
  return data;
};


// dropdown employee lists
hrApiServices.listofDropdownEmployees = async (partnerId, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeDropdownlist/?Partner_Id=${partnerId}`,
    header
  );
  return data;
};


hrApiServices.listofDropdownAllEmployees = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/HREmployeelistwithoutpagination/`,
    header
  );
  return data;
};


// dropdown department lists
hrApiServices.listofDropdownDepartments = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Departmentdropdownlist/`,
    header
  );
  return data;
};

hrApiServices.listofDepartmentsPagination = async (id1, page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/DepartmentAdditionalCRUD/?Company_Id=${id1}&page=${page}`,
    header
  );
  return data;
};

hrApiServices.deleteDepartment = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/DepartmentCRUD/?Department_Id=${id}`,
    header
  );
  return data;
};


// dropdown desination lists
hrApiServices.listofDropdownDesignations = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Designationropdownlist/`,
    header
  );
  return data;
};


// dropdown desination lists
hrApiServices.listofDesignationsPagination = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Designationlist/?page=${page}`,
    header
  );
  return data;
};

hrApiServices.deleteDesignation = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/DesignationCRUD/?Designation_Id=${id}`,
    header
  );
  return data;
};


// dropdown cadre/level lists
hrApiServices.listofDropdownCadreLevels = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Cadredropdownlist/`,
    header
  );
  return data;
};



// cadre/level lists
hrApiServices.listofCadreLevels = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Cadrelist/?page=${page}`,
    header
  );
  return data;
};


hrApiServices.deleteCadre = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/CadreCRUD/?Cadre_Id=${id}`,
    header
  );
  return data;
};


// list of leave types
hrApiServices.listofLeaveType = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavetypelist/?Partner_Id=${id}`,
    header
  );
  return data;
};


// list of leave type pagination
hrApiServices.listofLeaveTypePagination = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavetypelist/?page=${page}`,
    header
  );
  return data;
};

// list of dropdown leave types
hrApiServices.dropdownListofLeaveType = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavetypelistdropdown/?Partner_Id=${id}`,
    header
  );
  return data;
};

// delete Leave Type
hrApiServices.deleteLeaveType = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/LeavetypeCRUD/?Leavetype_Id=${id}`,
    header
  );
  return data;
};



// list of apply leaves
hrApiServices.listofApplyLeaves = async (payload, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/Leavelist/`, payload,
    header
  );
  return data;
};




// dropdown list of apply leaves
// hrApiServices.dropdownListofApplyLeaves = async (id, header) => {
//   const { data } = await axios.get(
//     `${BASE_URL}/Erpapp/Leavelistwithoutpagination/?Employee_Id=${id}`,
//     header
//   );
//   return data;
// };

hrApiServices.dropdownListofApplyLeaves = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavelistwithoutpagination/?Partner_Id=${id}`,
    header
  );
  return data;
};



hrApiServices.listCalendarView = async (payload, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/LeaveCalendarView/`, payload,
    header
  );
  return data;
};



// filter list of apply leaves
hrApiServices.filterofApplyLeaves = async (payload, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/Leavefilter/`, payload,
    header
  );
  return data;
};


// counts for available leaves
hrApiServices.listofLeaveTaken = async (id, emId, year, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavecalculation/?Partner_Id=${id}&Employee_Id=${emId}&Year=${year}`,
    header
  );
  return data;
};



hrApiServices.listofLeaveTakenForAll = async (id, year, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavecalculation/?Partner_Id=${id}&Year=${year}`,
    header
  );
  return data;
};



// list of leave balance
hrApiServices.listofLeaveBalance = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leaveopeningbalancelist/?Partner_Id=${id}`,
    header
  );
  return data;
};


// delete Leave Balance
hrApiServices.deleteLeaveBalance = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/LeaveopeningbalanceCRUD/?id=${id}`,
    header
  );
  return data;
};



// list of leave cancellation
hrApiServices.listofLeaveCancellation = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Leavecancellationlist/?Created_By=${id}`,
    header
  );
  return data;
};

// list of leave cancellation
hrApiServices.listofAllLeaveCancellation = async (payload, header) => {
  const { data } = await axios.post(
    `${BASE_URL}/Erpapp/Allleavecancellationlist/`, payload,
    header
  );
  return data;
};



// my list of timesheets
hrApiServices.myListofTimesheets = async (id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/BUTimesheetlist/?Partner_Id=${id}`,
    header
  );
  return data;
};

// list of all timesheets
hrApiServices.listofAllTimesheets = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Timesheetlist/`,
    header
  );
  return data;
};


hrApiServices.deleteTimesheet = async (id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/TimeSheetCRUD/?TimeSheet_Id=${id}`,
    header
  );
  return data;
};


// list of business unit
hrApiServices.listofBusinessUnit = async (header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/PartnerListreportDropdown/`,
    header
  );
  return data;
};


// payroll management
// run the employee attendance
hrApiServices.getAttandancecalculation = async (partnerId, year, month, id, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/Attandancecalculation/?Partner_Id=${partnerId}&Year=${year}&Month=${month}&Created_By=${id}`,
    header
  );
  return data;
};


hrApiServices.listofPayrollAttendance = async (partnerId, year, month, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/AttendanceList/?Partner_Id=${partnerId}&Year=${year}&Month=${month}`,
    header
  );
  return data;
};


hrApiServices.getMyTerritoryLists = async (id, id1, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/MyTerritoryLists/?Company_Id=${id}&Created_By=${id1}`,
    header
  );
  return data;
};

hrApiServices.listofResignationsPagination = async (page, header) => {
  const { data } = await axios.get(
    `${BASE_URL}/Erpapp/EmployeeResignationlist/?page=${page}`,
    header
  );
  return data;
};

// delete resignation
hrApiServices.deleteResignation = async (Resignation_Id, header) => {
  const { data } = await axios.delete(
    `${BASE_URL}/Erpapp/EmployeeResignationCRUD/?EmployeeResignation_Id=${Resignation_Id}`,
    header
  );
  return data;
};

export default hrApiServices;
