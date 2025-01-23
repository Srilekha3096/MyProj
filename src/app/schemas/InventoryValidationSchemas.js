import React from "react";
import * as yup from "yup";


export const materialReceiptValidationSchema = yup.object({
  // receiptId: yup.string().required("Receipt Id is required"),
  supplierName: yup.string().required("Supplier Name is required"),
  poNumber: yup.string().required("PO Number is required"),
  storeName: yup.string().required("Store Name is required"),
  receivedBy: yup.string().required("Received By is required"),
});


export const materialRequestValidationSchema = yup.object({
  // requestId: yup.string().required("Request Id is required"),
  // departmentName: yup.string().required("Department Name is required"),
  storeName: yup.string().required("Store Name is required"),
  // costCentreNo: yup.string().required("Cost Centre is required"),
});

export const materialReturnValidationSchema = yup.object({
  // returnId: yup.string().required("Return Id is required"),
  requestBy: yup.string().required("Request By is required"),
  departmentName: yup.string().required("Department Name is required"),
  storeName: yup.string().required("Store Name is required"),
  costCentreNo: yup.string().required("Cost Centre is required"),
});

export const materialTransferValidationSchema = yup.object({
  // transferId: yup.string().required("Transfer Id is required"),
  issuedBy: yup.string().required("Issued by is required"),
  fromHub: yup.string().required("From Store Name is required"),
  transferHub: yup.string().required("To Store Name is required"),
});

export const approvalValidationSchema = yup.object({
  checkApproved: yup.string().required("Approval is required"),
  commentOfApprover: yup
    .string()
    .required("Description is required")
    .min(8, "Approver Description must be at least 10 characters"),
});
