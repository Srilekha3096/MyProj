import React from "react";
import * as yup from "yup";
import * as Yup from "yup";

export const entityValidationSchema = yup.object({
  entityName: yup
    .string("Enter your entity name")
    .required("Entity name is required"),
  entityDescription: yup
    .string("Enter your entity description")
    .required("Entity Description is required")
    .min(10, "Entity Description must be at least 10 characters")
    .max(240, "Entity Description must not exceed 240 characters"),
});

export const countryValidationSchema = Yup.object({
  // entityName: Yup.string().required("Entity name is required"),
  countryName: Yup.string().required("Country name is required"),
  countryDescription: Yup.string()
    .required("Country Description is required")
    .min(10, "Country Description must be at least 10 characters")
    .max(240, "Country Description must not exceed 240 characters"),
});

export const regionValidationSchema = yup.object({
  // entityName: yup.string().required("Entity name is required"),
  // countryName: yup.string().required("Country name is required"),
  regionName: yup.string().required("Region name is required"),
  regionDescription: yup
    .string()
    .required("Region Description is required")
    .min(10, "Region Description must be at least 10 characters")
    .max(240, "Region Description must not exceed 240 characters"),
});

export const stateValidationSchema = yup.object({
  // entityName: yup.string().required("Entity name is required"),
  // countryName: yup.string().required("Country name is required"),
  // regionName: yup.string().required("Region name is required"),
  stateName: yup.string().required("State name is required"),
  stateDescription: yup
    .string()
    .required("State Description is required")
    .min(10, "State Description must be at least 10 characters")
    .max(240, "State Description must not exceed 240 characters"),
});

export const cityValidationSchema = yup.object({
  // entityName: yup.string().required("Entity name is required"),
  // countryName: yup.string().required("Country name is required"),
  // regionName: yup.string().required("Region name is required"),
  // stateName: yup.string().required("State name is required"),
  cityName: yup.string().required("City name is required"),
  cityDescription: yup
    .string()
    .required("City Description is required")
    .min(10, "City Description must be at least 10 characters")
    .max(240, "City Description must not exceed 240 characters"),
});

export const zoneValidationSchema = yup.object({
  // cityName: yup
  //   .string("Enter your city name")
  //   .required("City name is required"),
  pincode: yup.string("Enter the pincode").required("Enter valid pincode"),
  zoneName: yup.string("Enter the zone name").required("Zone name is required"),
});

export const itemMasterValidationSchema = yup.object({
  itemName: yup.string().required("Item name is required"),
  uom: yup.string().required("Uom is required"),
  // imageName: yup.string().required("Item Image is required"),
  purchaseDescription: yup.string(),
  inventoryDescription: yup.string(),
  purchaseAccount: yup.string().required("Purchase account is required"),
  inventoryAccount: yup.string().required("Inventory account is required"),
});


export const lookupValidationSchema = yup.object({
  itemName: yup.string().required("Lookup name is required"),
  // Lookupname: yup.string().required("Lookup Name is required"),
  // value: yup.string().required("Value is required"),

});

export const EditlookupValidationSchema = yup.object({
  // Lookupname: yup.string().required("Lookup Name is required"),
  // value: yup.string().required("Value is required"),
});


export const storesValidationSchema = yup.object({
  // storeId: yup.string().required("Store Id is required"),
  // partnerName: yup.string().required("Business Unit is required"),
  storeName: yup.string().required("Store Name is required"),
  // storeIncharge: yup.string().required("Store Incharge is required"),
  // buildingName: yup.string().required("Building Name is required"),
  // location: yup.string().required("Location is required"),
  // countryName: yup.string().required("Country is required"),
  // stateName: yup.string().required("State is required"),
  // cityName: yup.string().required("City is required"),
})

export const costcentreValidationSchema = yup.object({
  // buName: yup.string().required("Business Unit is required"),
  costCentreName: yup.string().required("Cost Centre Name is required"),
})

export const mailConfigureValidationSchema = yup.object({
  mailId: yup
    .string()
    .required("Mail Id is required"),
  mailPassword: yup
    .string()
    .required("Mail Password is required")
    .min(8, "Mail Password must be at least 8 characters"),
});


export const workflowAssignValidationSchema = yup.object({
  partnerName: yup
    .string()
    .required("Partner Name is required"),
  workflowName: yup
    .string()
    .required("Workflow Name is required"),
  basedOnWorkflow: yup
    .string()
    .required("Workflow Based On is required"),
  documentName: yup
    .string()
    .required("Document Name is required"),
  fieldName: yup
    .string()
    .required("Field Name is required"),
  noOfLevels: yup
    .string()
    .required("No of Level is required"),
});



export const workflowRuleValidationSchema = yup.object({
  // partnerName: yup
  //   .string()
  //   .required("Partner Name is required"),
  ruleName1: yup
    .string()
    .required("Rule Name is required"),
  action: yup
    .string()
    .required("Action is required"),
});



export const workflowValidationSchema = yup.object({
  partnerName: yup
    .string()
    .required("Partner Name is required"),
  workflowName: yup
    .string()
    .required("Workflow Name is required"),
  basedOnWorkflow: yup
    .string()
    .required("Workflow Based On is required"),
  ruleName: yup
    .string()
    .required("Rule Name is required"),
  noOfLevels: yup
    .string()
    .required("No of Level is required"),
});