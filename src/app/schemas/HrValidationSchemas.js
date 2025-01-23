import React from "react";
import * as yup from "yup";

export const provisionalFundValidationSchema = yup.object({
  // pfNumber: yup.string().required("Provisional Fund is required"),
  // deduction: yup.string().required("Deduction Cycle is required"),
  // employeeContribEPF: yup
  //   .string()
  //   .required("Employee Contribution EPF is required"),
  //   // .test(
  //   //   "is greater than Employee Contribution EPF",
  //   //   "Employer Contribution EPF must be greater than Employee Contribution EPF",
  //   //   function (value) {
  //   //     const { employerContribEPF } = this.parent;
  //   //     return value > employerContribEPF;
  //   //   }
  //   // ),
  // employerContribEPF: yup
  //   .string()
  //   .required("Employer Contribution EPF is required"),
  // employeeContribFPF: yup
  //   .string()
  //   .required("Employee Contribution FPF is required"),
  // employerContribFPF: yup
  //   .string()
  //   .required("Employer Contribution FPF is required"),
  // employeeContribAdminCharge: yup
  //   .string()
  //   .required("Employee Contribution AdminCharge is required"),
  // employerContribAdminCharge: yup
  //   .string()
  //   .required("Employee Contribution AdminCharge is required"),
  // employeeContribEDLICharge: yup
  //   .string()
  //   .required("Employee Contribution EDLICharge is required"),
  // employerContribEDLICharge: yup
  //   .string()
  //   .required("Employee Contribution EDLICharge is required"),
});

export const ESIValidationSchema = yup.object({
  // values: yup.string().required("ESI Number is required"),
  // deduction: yup.string().required("Deduction Cycle is required"),
});

export const ProfessionalTaxValidationSchema = yup.object({
  // taxNo: yup.string().required("Tax Number is required"),
  // deduction: yup.string().required("Deduction Cycle is required"),
});

export const EmployeeEarningsValidationSchema = yup.object({
  earningName: yup.string().required("Earning Name is required"),
  earningType: yup.string().required("Earning Type is required"),
  nameOfPayslip: yup.string().required("Name of Payslip is required"),
  calculationType: yup
    .string()
    .nullable()
    .required("Calculation type is required"),
  // percentage: yup.string().required("Percentage is required"),
  // amount: yup.string().required("Amount is required"),
});

export const EmployeeDeductionValidationSchema = yup.object({
  deductionName: yup.string().required("Deduction Name is required"),
  deductionType: yup.string().required("Deduction Type is required"),
  // earningType: yup.string().required("Earning Type is required"),
  nameOfPayslip: yup.string().required("Name of Payslip is required"),
  // calculationType: yup.string().nullable().required('Calculation type is required'),
  // // percentage: yup.string().required("Percentage is required"),
  // amount: yup.string().required("Amount is required"),
});

export const CadreLevelValidationSchema = yup.object({
  cadreLevelName: yup.string().required("Cadre Level Name is required"),
  payRangeFrom: yup.string().required("Pay Range From is required"),
  payRangeTo: yup.string().required("Pay Range To is required"),
  // discription: yup
  //   .string()
  //   .required("Discription is required")
  //   .min(10, "Cadre Level Description must be at least 10 characters")
  //   .max(240, "Cadre Level Description must not exceed 240 characters"),
});

// employee validation schema
export const EmployeeValidationSchema = yup.object({
  // firstName: yup.string().required("First Name is required"),
  // employeeId: yup.string().required("Employee Id is required"),
  // gender: yup.string().required("Gender is required"),
  // dateOfJoining: yup.string().required("Date of joining is required"),
  businessUnit: yup.string().required("Business Unit is required"),
  designationName: yup.string().required("Designation is required"),
  costcentreNo: yup.string().required("Cost Center No is required"),
  payMethod: yup.string().required("Pay Method is required"),
  // departmentName: yup.string().required("Department is required"),
  // cadreName: yup.string().required("Cadre is required"),
  pfNumber: yup.string().matches(
    /^[A-Z]{2}\s?[A-Z]{3}\s?\d{7}\s?\d{3}\s?\d{5}$/,
    'Please enter a valid PF number'
  ),
  uanNo: yup
    .string()
    .matches(
      /^\d{12}$/,
      'Please enter a valid UAN number (12 digits)'
    ),
  esiNo: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Please enter a valid ESI number (10 digits)'
    ),
  // employeeAadharNo: yup
  //   .string()
  //   .matches(
  //     /^\d{12}$/,
  //     'Please enter a valid Aadhar number (12 digits)'
  //   ),
  // panNo: yup
  //   .string()
  //   .matches(
  //     /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  //     'Please enter a valid PAN number (AAAAA9999A)'
  //   ),
  // passportNo: yup
  //   .string()
  //   .matches(
  //     /^[A-Z]{1,2}[0-9]{7}$/,
  //     'Please enter a valid Passport number (1 or 2 letters followed by 7 digits)'
  //   ),
  // seatingLocation: yup.string().required("Seating Location is required"),
  // emailId: yup.string().required("Email Id is required"),
  // employeeType: yup.string().required("Employee Type is required"),
  // annualCTC: yup.string().required("Annual CTC is required"),
  // dateOfBirth: yup.string().required("Date of birth is required"),
  // aadharNo: yup.string().required("Aadhar No is required"),
  // maritalStatus: yup.string().required("Marital Status is required"),
  // country: yup.string().required("Country Name is required"),
  // state: yup.string().required("State Name is required"),
  // city: yup.string().required("City Name is required"),
  // pinCode: yup.string().required("Pincode is required"),
  // reportingTo: yup.string().required("Pincode is required"),
  // designation: yup.string().required("Pincode is required"),
  // department: yup.string().required("Pincode is required"),
  // reportingCity: yup.string().required("Pincode is required"),
  // workLocation: yup.string().required("Pincode is required"),
  // secondaryReportingTo: yup.string().required("Pincode is required"),
  // technicalLead: yup.string().required("Pincode is required"),
  // apraisalManager: yup.string().required("Pincode is required"),
  // role: yup.string().required("Pincode is required"),
  // experience: yup.string().required("Pincode is required"),
});

// leave type validation schema
export const LeaveTypeValidationSchema = yup.object({
  leaveName: yup.string().required("Leave Name is required"),
  leaveCode: yup.string().required("Leave Code is required"),
  leaveType: yup.string().required("Leave Type is required"),
  noOfDays: yup.string().required("No. of Days is required"),
  unit: yup.string().required("Unit is required").nullable("Unit is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Leave Type Description must be at least 10 characters")
    .max(240, "Leave Type Description must not exceed 240 characters"),
  validityFrom: yup.string().required("Valitity From is required"),
  validityTo: yup.string().required("Valitity To is required"),
  effectiveAfter: yup.string().required("Effective After is required"),
  accural: yup.string().required("Accural is required"),
  reset: yup.string().required("Reset is required"),
  carryForward: yup.string().required("Carry forward is required"),
  encashment: yup.string().required("Encashment is required"),
  daysForPresents: yup.string().required("Days for presents is required"),
  // applicableLevel: yup.array().of(yup.number()).min(1, 'At least one level is required').required('This field is required'),

  selectLeaveType: yup.string().required("Please select any one leave rule"),
  countAsLeave: yup.string().required("Please select count as leave"),
  countAsLeavePresents: yup
    .string()
    .required("Please select count as leave presents"),
});

// leave apply validation schema
export const LeaveApplyValidationSchema = yup.object({
  leaveType: yup.string().required("Leave Type is required"),
  fromDate: yup.string().required("Valitity From is required"),
  toDate: yup.string().required("Valitity To is required"),
  // day: yup.array().required("Day is required"),
  weekNo: yup.string().required("Week No is required"),
  leaveReason: yup
    .string()
    .required("Leave Reason is required")
    .min(10, "Leave Reason must be at least 10 characters")
    .max(240, "Leave Reason must not exceed 240 characters"),
  teamEmail: yup.string().required("Team Mail is required"),
});


// leave opening balance validation schema
export const LeaveOpeningBalanceValidationSchema = yup.object({
  leaveType: yup.string().required("Leave Type is required"),
  year: yup.string().required("Year is required"),
  leaveOpeningBalance: yup.string().required("Leave Opening Balance is required"),
});
