import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import Setting from "../Setting";
import settingServices from "app/services/setting-api-services";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import "../Setting.css";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdPlayArrow } from "react-icons/md";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { ERPCustomLoader } from "app/shared/ReuseComponents/StyledComponents";




const seriesType = ["Automatic", "Manual"];


const TransactionSeries = () => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const { userRolePermissions, formPermissions, modulePermissions } = useSelector(selectedUserRolePermissions);


  const [showCreatePage, setShowCreatePage] = useState(true);
  const [showUpdatePage, setShowUpdatePage] = useState(false);
  const [id, setId] = useState(0);
  const [transactionSeriesName, setTransactionSeriesName] = useState();
  const [creditNotePre, setCreditNotePre] = useState();
  const [journalVoucherPre, setJournalVoucherPre] = useState();
  const [cashVoucherPre, setCashVoucherPre] = useState();
  const [bankVoucherPre, setBankVoucherPre] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openBox, setOpenBox] = useState(false);


  const [purchasePre, setPurchasePre] = useState([
    {
      Form_Name: "Purchase Request",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Purchase Order",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "RFQ",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Supplier Quotation",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Purchase Catalogue",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Supplier",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "PO Amendment",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "PO Cancellation",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [inventoryPre, setInventoryPre] = useState([
    {
      Form_Name: "Material Request",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Material Receipt",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Material Issue",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Material Return",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Material Transfer",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Store Adjustment",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Store",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [budgetPre, setBudgetPre] = useState([
    {
      Form_Name: "BU Budget",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Consolidated Budget",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Central Budget",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Costcenter Budget",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Expense Budget",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [salesPre, setSalesPre] = useState([
    {
      Form_Name: "Service Person",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Refund",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [hrPre, setHrPre] = useState([
    {
      Form_Name: "Employee",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Department",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Designation",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Cadre Level",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Territory",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Leave Type",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Timesheet",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [servicePre, setServicePre] = useState([
    {
      Form_Name: "Service Category",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Service",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Service Catelogue",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Roaster",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [crmPre, setCrmPre] = useState([
    {
      Form_Name: "Lead Contact",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Ticket",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Promotion",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Plan",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);

  const [financePre, setFinancePre] = useState([
    {
      Form_Name: "Chart of Account",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Voucher",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Contra Voucher",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
    {
      Form_Name: "Journal",
      Type: "",
      Prefix: "",
      Start_Number: "",
      Suffix: ""
    },
  ]);


  const partnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = async () => {
    try {
      setIsLoading(true);

      const response = await settingServices.getTransactionSeriesSettings(companyId, header);
      const res = response;

      var Id = res?.Created_By;
      if (Id === 0) {
        setShowCreatePage(true);
        setShowUpdatePage(false);
      } else {
        setShowCreatePage(false);
        setShowUpdatePage(true);


        setId(res?.Transactionalseries_Id);
        setTransactionSeriesName(res?.Transaction_Name);
        setBankVoucherPre(res?.Bank_Vouchar);
        setCashVoucherPre(res?.Cash_Vouchar);
        setCreditNotePre(res?.Credit_Note);
        setJournalVoucherPre(res?.Journal_vouchar);

        setPurchasePre([
          res?.Purchase_Request,
          res?.Purchase_Order,
          res?.RFQ,
          res?.Supplier_Quotation,
          res?.Purchase_Catalouge,
          res?.Supplier,
          res?.PO_Amendment,
          res?.PO_Cancelation
        ]);

        setInventoryPre([
          res?.Material_Request,
          res?.Material_Receipt,
          res?.Material_Issue,
          res?.Material_Returns,
          res?.Material_Transfer,
          res?.Store_Adjustment,
          res?.Stores
        ]);

        setBudgetPre([
          res?.BU_Budget,
          res?.Consolidated_Budget,
          res?.Central_Budget,
          res?.Costcenter_Budget,
          res?.Expense_Budget
        ]);

        setSalesPre([
          res?.Sales_Persion,
          res?.Refund
        ]);

        setHrPre([
          res?.Employee,
          res?.Department,
          res?.Designation,
          res?.Cadre_Level,
          res?.Teritory,
          res?.Leave_Type,
          res?.TimeSheet
        ]);

        setServicePre([
          res?.Service_Category,
          res?.Service,
          res?.Service_Catelouge,
          res?.Roaster
        ]);

        setCrmPre([
          res?.Lead_Contact,
          res?.Ticket,
          res?.Promo,
          res?.Plan
        ]);

        setFinancePre([
          res?.Chartof_Account,
          res?.Cash_Vouchar,
          res?.Contra_Vouchar,
          res?.Journal_vouchar
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Call getUser when the component mounts
  useEffect(() => {
    getUser();
  }, []);


  const handleSubmitTransactionSeries = (e) => {
    e.preventDefault();
    if (!id) {
      var payload = {
        Transaction_Name: transactionSeriesName,
        Credit_Note: creditNotePre,
        Journal_vouchar: financePre[3],
        Cash_Vouchar: financePre[1],
        Bank_Vouchar: bankVoucherPre,
        Purchase_Request: purchasePre[0],
        Purchase_Order: purchasePre[1],
        RFQ: purchasePre[2],
        Supplier_Quotation: purchasePre[3],
        Purchase_Catalouge: purchasePre[4],
        Supplier: purchasePre[5],
        PO_Amendment: purchasePre[6],
        PO_Cancelation: purchasePre[7],
        Material_Request: inventoryPre[0],
        Material_Receipt: inventoryPre[1],
        Material_Issue: inventoryPre[2],
        Material_Returns: inventoryPre[3],
        Material_Transfer: inventoryPre[4],
        Store_Adjustment: inventoryPre[5],
        Stores: inventoryPre[6],
        BU_Budget: budgetPre[0],
        Consolidated_Budget: budgetPre[1],
        Central_Budget: budgetPre[2],
        Costcenter_Budget: budgetPre[3],
        Expense_Budget: budgetPre[4],
        Sales_Persion: salesPre[0],
        Refund: salesPre[1],
        Employee: hrPre[0],
        Department: hrPre[1],
        Designation: hrPre[2],
        Cadre_Level: hrPre[3],
        Teritory: hrPre[4],
        Leave_Type: hrPre[5],
        TimeSheet: hrPre[6],
        Service_Category: servicePre[0],
        Service: servicePre[1],
        Service_Catelouge: servicePre[2],
        Roaster: servicePre[4],
        Lead_Contact: crmPre[0],
        Ticket: crmPre[1],
        Promo: crmPre[2],
        Plan: crmPre[3],
        Chartof_Account: financePre[0],
        Contra_Vouchar: financePre[2],
        Partner_Id: parseInt(localStorage.getItem("PartnerId")),
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };
      axios
        .post(`${BASE_URL}/Erpapp/TransactionalseriesCRUD/`, payload, header)
        .then((res) => {
          if (res?.data?.id && res?.status === 201) {
            toast.success("Created Successfully");
            setId(res?.data?.Transactionalseries_Id)
          } else {
            toast.error("Enter valid Transaction Series details");
          }

        }).catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } else {
      var payload = {
        Transactionalseries_Id: id,
        Transaction_Name: transactionSeriesName,
        Credit_Note: creditNotePre,
        Journal_vouchar: financePre[3],
        Cash_Vouchar: financePre[1],
        Bank_Vouchar: bankVoucherPre,
        Purchase_Request: purchasePre[0],
        Purchase_Order: purchasePre[1],
        RFQ: purchasePre[2],
        Supplier_Quotation: purchasePre[3],
        Purchase_Catalouge: purchasePre[4],
        Supplier: purchasePre[5],
        PO_Amendment: purchasePre[6],
        PO_Cancelation: purchasePre[7],
        Material_Request: inventoryPre[0],
        Material_Receipt: inventoryPre[1],
        Material_Issue: inventoryPre[2],
        Material_Returns: inventoryPre[3],
        Material_Transfer: inventoryPre[4],
        Store_Adjustment: inventoryPre[5],
        Stores: inventoryPre[6],
        BU_Budget: budgetPre[0],
        Consolidated_Budget: budgetPre[1],
        Central_Budget: budgetPre[2],
        Costcenter_Budget: budgetPre[3],
        Expense_Budget: budgetPre[4],
        Sales_Persion: salesPre[0],
        Refund: salesPre[1],
        Employee: hrPre[0],
        Department: hrPre[1],
        Designation: hrPre[2],
        Cadre_Level: hrPre[3],
        Teritory: hrPre[4],
        Leave_Type: hrPre[5],
        TimeSheet: hrPre[6],
        Service_Category: servicePre[0],
        Service: servicePre[1],
        Service_Catelouge: servicePre[2],
        Roaster: servicePre[3],
        Lead_Contact: crmPre[0],
        Ticket: crmPre[1],
        Promo: crmPre[2],
        Plan: crmPre[3],
        Chartof_Account: financePre[0],
        Contra_Vouchar: financePre[2],
        Partner_Id: parseInt(localStorage.getItem("PartnerId")),
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };
      axios
        .put(`${BASE_URL}/Erpapp/TransactionalseriesCRUD/`, payload, header)
        .then((res) => {
          if (res?.status === 200 && res?.data?.id) {
            toast.success("Updated Successfully");
          } else {
            toast.error("Enter valid Transaction Series details");
          }
        }).catch((error) => {
          console.log(error);
          toast.error(error.message)
        });
    }
  };


  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const [expanded6, setExpanded6] = useState(false);
  const [expanded7, setExpanded7] = useState(false);
  const [expanded8, setExpanded8] = useState(false);


  const handleExpand1 = () => {
    setExpanded1(!expanded1)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand2 = () => {
    setExpanded1(false)
    setExpanded2(!expanded2)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand3 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(!expanded3)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand4 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(!expanded4)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand5 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(!expanded5)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand6 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(!expanded6)
    setExpanded7(false)
    setExpanded8(false)
  }
  const handleExpand7 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(!expanded7)
    setExpanded8(false)
  }
  const handleExpand8 = () => {
    setExpanded1(false)
    setExpanded2(false)
    setExpanded3(false)
    setExpanded4(false)
    setExpanded5(false)
    setExpanded6(false)
    setExpanded7(false)
    setExpanded8(!expanded8)
  }

  const handleChangePurchase = (e, index, fieldName, newValue) => {

    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)

    const updatedPurchase = purchasePre?.map((purchase, i) => {
      if (i !== index) {
        return purchase;
      }

      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...purchase, [e.target.name]: "" };
      }


      if (fieldName === "Type") {
        if (newValue === "Automatic") {
          return { ...purchase, [fieldName]: newValue };
        } else {
          return { ...purchase, [fieldName]: newValue, ["Prefix"]: "", ["Start_Number"]: "", ["Suffix"]: "" };
        }
      }

      return { ...purchase, [e.target.name]: e.target.value };
    });

    setPurchasePre(updatedPurchase);
    console.log("updatedPurchase", updatedPurchase);
  };

  const handleChangeInventory = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedInventory = inventoryPre?.map((inventory, i) => {
      if (i !== index) {
        return inventory;
      }
      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...inventory, [e.target.name]: "" };
      }

      if (fieldName === "Type") {
        return { ...inventory, [fieldName]: newValue };
      }

      return { ...inventory, [e.target.name]: e.target.value };
    });

    setInventoryPre(updatedInventory);
    console.log("updatedInventory", updatedInventory);
  }

  const handleChangeBudget = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)

    const updatedBudget = budgetPre?.map((budget, i) => {
      if (i !== index) {
        return budget;
      }
      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...budget, [e.target.name]: "" };
      }

      if (fieldName === "Type") {
        return { ...budget, [fieldName]: newValue };
      }

      return { ...budget, [e.target.name]: e.target.value };
    });

    setBudgetPre(updatedBudget);
    console.log("updatedBudget", updatedBudget);
  }

  const handleChangeSales = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedSales = salesPre?.map((sale, i) => {
      if (i !== index) {
        return sale;
      }

      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...sale, [e.target.name]: "" };
      }

      if (fieldName === "Type") {
        return { ...sale, [fieldName]: newValue };
      }

      return { ...sale, [e.target.name]: e.target.value };
    });

    setSalesPre(updatedSales);
    console.log("updatedSales", updatedSales);
  }

  const handleChangeHR = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedHR = hrPre?.map((hr, i) => {
      if (i !== index) {
        return hr;
      }
      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...hr, [e.target.name]: "" };
      }

      if (fieldName === "Type") {
        return { ...hr, [fieldName]: newValue };
      }

      return { ...hr, [e.target.name]: e.target.value };
    });

    setHrPre(updatedHR);
    console.log("updatedHR", updatedHR);
  }

  const handleChangeService = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedService = servicePre?.map((service, i) => {
      if (i !== index) {
        return service;
      }

      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...service, [e.target.name]: "" };
      }
      if (fieldName === "Type") {
        return { ...service, [fieldName]: newValue };
      }

      return { ...service, [e.target.name]: e.target.value };
    });

    setServicePre(updatedService);
    console.log("updatedService", updatedService);
  }

  const handleChangeCRM = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedCRM = crmPre?.map((crm, i) => {
      if (i !== index) {
        return crm;
      }
      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...crm, [e.target.name]: "" };
      }
      if (fieldName === "Type") {
        return { ...crm, [fieldName]: newValue };
      }

      return { ...crm, [e.target.name]: e.target.value };
    });

    setCrmPre(updatedCRM);
    console.log("updatedCRM", updatedCRM);
  }

  const handleChangeFinance = (e, index, fieldName, newValue) => {
    const newArray = [
      ...purchasePre,
      ...inventoryPre,
      ...budgetPre,
      ...salesPre,
      ...hrPre,
      ...servicePre,
      ...crmPre,
      ...financePre.flat(item => item.Prefix)
    ];
    console.log("newArray", newArray)
    const updatedFinance = financePre?.map((finance, i) => {
      if (i !== index) {
        return finance;
      }
      const prefixExists = newArray?.some((item, i) => i !== index && item.Prefix === e.target.value);

      if (prefixExists) {
        toast.error(`Prefix "${e.target.value}" is already Used.`)
        return { ...finance, [e.target.name]: "" };
      }

      if (fieldName === "Type") {
        return { ...finance, [fieldName]: newValue };
      }

      return { ...finance, [e.target.name]: e.target.value };
    });

    setFinancePre(updatedFinance);
    console.log("updatedFinance", updatedFinance);
  }


  const handleClick = () => {
    setOpenBox(false);
    setIsLoading(false);
    getUser()
  }

  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);


  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Preferences
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Transaction Series
        </Typography>

        {isLoading ? (
          <ERPCustomLoader />
        ) : (
          <form onSubmit={handleSubmitTransactionSeries}>
            <Div sx={{ mt: 1, mb: 1, textAlign: "right" }}>
              <ButtonGroup
                aria-label="split button"
                disabled={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(id ? 242 : 241) ? false : true}
                sx={{ mr: 2 }}
              >
                <Button className="plus-button" type="submit">
                  {id ? "Update" : "Save"}
                </Button>
                <Button variant="contained" className="icon-button" sx={{ p: 1 }}>
                  <FaSave size={18} />
                </Button>
              </ButtonGroup>

              <ButtonGroup
                aria-label="split button"
                onClick={() => {
                  setOpenBox(true)
                }}
              >
                <Button className="plus-button">Cancel</Button>
                <Button variant="contained" className="icon-button" sx={{ p: 1 }}>
                  <TiCancel size={24} />
                </Button>
              </ButtonGroup>
            </Div>

            {/* Purchase */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded1}>
                <AccordionSummary
                  expandIcon={
                    expanded1 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand1()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded1 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Purchase
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>
                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Purchase */}
                    {purchasePre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangePurchase(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangePurchase(e, index)}
                              inputProps={{
                                maxLength: 2,
                                title: 'Please enter a maximum of 2 digits',
                                style: { textTransform: "uppercase" }
                              }}

                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangePurchase(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',

                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangePurchase(e, index)}
                              inputProps={{
                                maxLength: 5,
                                title: 'Please enter a maximum of 5 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })
                    }
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* Inventory */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded2}>
                <AccordionSummary
                  expandIcon={
                    expanded2 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand2()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded2 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Inventory
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>

                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* inventory */}
                    {inventoryPre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeInventory(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeInventory(e, index)}
                              inputProps={{
                                maxLength: 2,
                                title: 'Please enter a maximum of 2 digits',
                                style: { textTransform: "uppercase" }
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeInventory(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeInventory(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}

                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* Budget */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded3}>
                <AccordionSummary
                  expandIcon={
                    expanded3 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand3()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded3 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Budget
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>

                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* Budget */}
                    {budgetPre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeBudget(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeBudget(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeBudget(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeBudget(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* Sales */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded4}>
                <AccordionSummary
                  expandIcon={
                    expanded4 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand4()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded4 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Sales
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>

                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* Sales */}
                    {salesPre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeSales(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeSales(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeSales(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeSales(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* HR */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded5}>
                <AccordionSummary
                  expandIcon={
                    expanded5 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand5()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded5 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      HR
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>

                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>


                    {/* HR */}
                    {hrPre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeHR(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField  {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeHR(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeHR(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeHR(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* Service */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded6}>
                <AccordionSummary
                  expandIcon={
                    expanded6 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand6()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded6 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Service
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>
                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Service */}
                    {servicePre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeService(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField name="type" {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeService(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeService(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeService(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* CRM */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded7}>
                <AccordionSummary
                  expandIcon={
                    expanded7 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand7()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded7 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      CRM
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>
                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* CRM */}
                    {crmPre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeCRM(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField name="type" {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeCRM(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeCRM(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeCRM(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>

            {/* Finance */}
            <Card
              sx={{
                mt: 1,
                borderRadius: "5px",
                boxShadow: "0px 0px 10px 0px #d6dedf"
              }}
            >
              <Accordion expanded={expanded8}>
                <AccordionSummary
                  expandIcon={
                    expanded8 ? (
                      <RiArrowDownSFill size={24} />
                    ) : (
                      <MdPlayArrow />
                    )
                  }
                  onClick={() => handleExpand8()}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    px: 3,
                    flexDirection: "row",

                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",

                      "&.Mui-expanded": {
                        margin: "12px 0",
                      },
                    },
                    ".MuiAccordionSummary-expandIconWrapper": {
                      borderRadius: 1,
                      border: 1,
                      color: "text.secondary",
                      borderColor: "divider",
                      transform: "none",
                      height: 28,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,

                      "&.Mui-expanded": {
                        transform: "none",
                        color: "primary.main",
                        borderColor: "primary.main",
                      },

                      "& svg": {
                        fontSize: "1rem",
                      },
                    },
                  }}
                >
                  <Div
                    sx={{
                      width: { xs: "auto", lg: "26%" },
                      flexShrink: 0,
                      px: 1,
                      flex: { xs: "1", lg: "0 1 auto" },
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      mt={0.5}
                      sx={{ color: expanded8 ? "black" : "#00bfff", fontWeight: 600 }}
                    >
                      Finance
                    </Typography>
                  </Div>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    p: (theme) => theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Grid container columns={12} rowGap={1} sx={{ p: 2 }}>
                    {/* Title */}
                    <Grid container columnSpacing={2} sx={{ mb: 2 }}
                      style={{
                        color: "#00bfff",
                        backgroundColor: "#FFF",
                        padding: "10px 0px",
                        boxShadow: "0px 1px 1px 0px #EBE6EC",
                        position: "sticky",
                        top: -10,
                        zIndex: 100,
                      }}
                    >
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Transaction Name
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Automatic / Manual
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Prefix
                        </Typography>
                      </Grid>
                      <Grid item xl={3}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Start Number
                        </Typography>
                      </Grid>
                      <Grid item xl={2}>
                        <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                          Suffix
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Finance */}
                    {financePre?.map((item, index) => {
                      return (
                        <Grid container columnSpacing={2}>
                          <Grid item xl={3}>
                            <Typography variant="h4">
                              {item?.Form_Name}
                            </Typography>
                          </Grid>
                          <Grid item xl={2}>
                            <Autocomplete
                              className="col-12 search-select"
                              name="Type"
                              options={seriesType}
                              getOptionLabel={(option) => option || ""}
                              value={item?.Type || null}
                              onChange={(e, newValue) => handleChangeFinance(e, index, "Type", newValue)}
                              isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                              }
                              renderInput={(params) => <TextField name="type" {...params} placeholder="Choose (A / M)" />}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Prefix"
                              placeholder="Prefix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Prefix}
                              onChange={(e) => handleChangeFinance(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={3}>
                            <TextField
                              className="input-box col-12"
                              name="Start_Number"
                              placeholder="Start Number"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Start_Number}
                              onChange={(e) => handleChangeFinance(e, index)}
                              inputProps={{
                                maxLength: 3,
                                title: 'Please enter a maximum of 3 digits',
                              }}
                            />
                          </Grid>
                          <Grid item xl={2}>
                            <TextField
                              className="input-box col-12"
                              name="Suffix"
                              placeholder="Suffix"
                              disabled={item?.Type === "Automatic" ? false : true}
                              value={item?.Suffix}
                              onChange={(e) => handleChangeFinance(e, index)}
                              inputProps={{
                                maxLength: 4,
                                title: 'Please enter a maximum of 4 digits',
                              }}
                            />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>
          </form>
        )}


        <ErpConfirmDialogBox flag={openBox} setFlag={setOpenBox} handleClick={handleClick} content={"You have done some changes. Onclicking the cancel button changed data will not be saved."} />

      </JumboContentLayoutMain>

    </>
  );
};

export default TransactionSeries;
