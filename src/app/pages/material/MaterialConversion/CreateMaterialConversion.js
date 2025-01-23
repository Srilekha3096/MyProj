import Div from "@jumbo/shared/Div";
import {
    Autocomplete,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import itemServices from "app/services/item-master-services";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import settingServices from "app/services/setting-api-services";
import dropdownApiServices from "app/services/dropdownapi-services";
import { ErpCancelButton, ErpDateField, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { handleCreateDocumentApproval, handleCreateHistory } from "app/shared/ReuseComponents/UpdatedHistoryRecords";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { fetchTransactionSeries, todayDate } from "app/shared/ReuseComponents/DateFormatter";
import { NumericTextField } from "app/shared/ReuseComponents/StyledComponents";



const CreateMaterialConversion = ({ setListDesignation, setCreateDesignation, listOfDesignations, responsedata }) => {
    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    let userDetails = localStorage.getItem("UserDetails");
    userDetails = JSON.parse(userDetails);
    const id1 = localStorage.getItem("OrganizationId");
    const id2 = localStorage.getItem("UserId");
    const id3 = parseInt(localStorage.getItem("PartnerId"));
    const userId = localStorage.getItem("UserId");
    const employeeId = parseInt(localStorage.getItem("EmployeeId"));

    const [materialConversionInputs, setMaterialConversionInputs] = useState({
        Matcon_Req_Id: "",
        Request_Date: "",
        Requester_Id: "",
        Original_Item: "",
        Original_UOM: "",
        Converted_Item: "",
        Converted_UOM: "",
        Requested_QTY: "",
        Converted_QTY: "",
        Convertion_Ratio: "",
        Purpose: "",
        Approved_By: "",
        Store_Id: "",
        Partner_Id: "",
    });

    const [materialConversionInputs1, setMaterialConversionInputs1] = useState({
        Matcon_Req_Id: "",
        Request_Date: "",
        Requester_Id: "",
        Original_Item: "",
        Original_UOM: "",
        Converted_Item: "",
        Converted_UOM: "",
        Requested_QTY: "",
        Converted_QTY: "",
        Convertion_Ratio: "",
        Purpose: "",
        Approved_By: "",
        Store_Id: "",
        Partner_Id: "",
    });
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [stores, setStores] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [conversionRatios, setConversionRatios] = useState([]);
    const [errors, setErrors] = useState({});


    const [transactionSeriesType, setTransactionSeriesType] = useState("");

    useEffect(() => {
        const transactionSeries = fetchTransactionSeries("Material_Request")

        if (transactionSeries) {
            transactionSeries
                .then((result) => {
                    console.log("result", result);
                    setTransactionSeriesType(result)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [transactionSeriesType]);


    const getEmployeeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/EmployeeDropdownlist/?Partner_Id=${id3}`, header);
            console.log("response", response)
            const filterdata = response?.data?.find((opt) => opt?.id === employeeId)
            setEmployeeDetails(filterdata)
        } catch (error) {
            console.log(error)
        }
    }

    const listStores = () => {
        dropdownApiServices
            .getStoreDropdownList(id3, header)
            .then((res) => {
                let list = res?.filter((opt) => opt?.Partner_Id === parseInt(id3));
                setStores(list);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getItemNames = async (storeId) => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/Storelistwithoutpagination/?Partner_Id=${id3}`, header);
            if (response) {
                let listItems = response && response?.data?.filter((opt) => opt?.id === Number(storeId))[0]?.Items;
                setItemNames(listItems)
            } else {
                setItemNames([]);
            }
        } catch (error) {
            console.log(error);
            setItemNames([]);
        }
    }

    const getConversionRation = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/Erpapp/Dropdwontablesearch/`, {
                Search: "Conversion Ratio",
            }, header);

            setConversionRatios(response?.data[0]?.value)
        } catch (error) {
            console.log(error);
            setConversionRatios([])
        }
    }


    const getMaterialConversionData = async () => {
        if (responsedata?.id) {
            try {
                const response = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/?Matcon_Req_Id=${responsedata?.Matcon_Req_Id}`, header);
                if (response) {
                    setMaterialConversionInputs({
                        ...response?.data,
                        Store_Name: response?.data?.Store_Id?.Store_Name,
                        Store_Id: response?.data?.Store_Id?.id
                    });


                    setMaterialConversionInputs1({
                        ...response?.data,
                        Store_Name: response?.data?.Store_Id?.Store_Name,
                        Store_Id: response?.data?.Store_Id?.id
                    });
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setMaterialConversionInputs({});
        }
    }


    useEffect(() => {
        if (responsedata?.id === undefined) {
            setMaterialConversionInputs({
                Matcon_Req_Id: "",
                Request_Date: "",
                Requester_Id: "",
                Original_Item: "",
                Original_UOM: "",
                Converted_Item: "",
                Converted_UOM: "",
                Requested_QTY: "",
                Converted_QTY: "",
                Convertion_Ratio: "",
                Purpose: "",
                Approved_By: "",
                Store_Id: "",
                Partner_Id: "",
            });
        } else {
            getMaterialConversionData();
        }
    }, [responsedata?.id])


    useEffect(() => {
        listStores();
        getEmployeeData();
        getConversionRation();
    }, []);

    useEffect(() => {
        getItemNames(materialConversionInputs?.Store_Id);
    }, [materialConversionInputs]);



    const handleClickBack = () => {
        setListDesignation(true);
        setCreateDesignation(false);
        if (!responsedata?.id) {
            setMaterialConversionInputs({
                Matcon_Req_Id: "",
                Request_Date: "",
                Requester_Id: "",
                Original_Item: "",
                Original_UOM: "",
                Converted_Item: "",
                Converted_UOM: "",
                Requested_QTY: "",
                Converted_QTY: "",
                Convertion_Ratio: "",
                Purpose: "",
                Approved_By: "",
                Store_Id: "",
                Partner_Id: "",
            });
        } else {
            setMaterialConversionInputs(responsedata);
        }
        setErrors({});
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "Requested_QTY") {
            if (
                (/^[+]?\d*\.?\d{0,2}$/.test(value) && Number(value)) ||
                value === ""
            ) {
                setMaterialConversionInputs({
                    ...materialConversionInputs,
                    ["Requested_QTY"]: Number(value),
                })
            } else {
                toast.error(
                    `Please enter a valid quantity less than or equal to Stock Quantity`
                );
            }

        }
        else if (name === "Converted_QTY") {
            if (
                (/^[+]?\d*\.?\d{0,2}$/.test(value) && Number(value)) ||
                value === ""
            ) {
                setMaterialConversionInputs({
                    ...materialConversionInputs,
                    ["Converted_QTY"]: Number(value),

                })
            } else {
                toast.error(
                    `Please enter a valid quantity less than or equal to Stock Quantity`
                );
            }

        } else {
            setMaterialConversionInputs({
                ...materialConversionInputs,
                [name]: value
            })
        }

    }

    const validateForm = () => {
        const newErrors = {};

        if (materialConversionInputs?.Request_Date === "" || materialConversionInputs?.Request_Date === null || materialConversionInputs?.Request_Date === undefined) {
            newErrors.Request_Date = "Request Date is required"
        }
        if (employeeDetails?.Employee_FirstName === "" || employeeDetails?.Employee_FirstName === null || employeeDetails?.Employee_FirstName === undefined) {
            newErrors.Employee_FirstName = "Requested By is required"
        }
        if (materialConversionInputs?.Original_Item === "" || materialConversionInputs?.Original_Item === null || materialConversionInputs?.Original_Item === undefined) {
            newErrors.Original_Item = "Original Item is required"
        }
        if (materialConversionInputs?.Original_UOM === "" || materialConversionInputs?.Original_UOM === null || materialConversionInputs?.Original_UOM === undefined) {
            newErrors.Original_UOM = "Original UOM is required"
        }
        if (materialConversionInputs?.Converted_Item === "" || materialConversionInputs?.Converted_Item === null || materialConversionInputs?.Converted_Item === undefined) {
            newErrors.Converted_Item = "Converted Item is required"
        }
        if (materialConversionInputs?.Converted_UOM === "" || materialConversionInputs?.Converted_UOM === null || materialConversionInputs?.Converted_UOM === undefined) {
            newErrors.Converted_UOM = "Converted UOM is required"
        }
        if (materialConversionInputs?.Requested_QTY === "" || materialConversionInputs?.Requested_QTY === null || materialConversionInputs?.Requested_QTY === undefined) {
            newErrors.Requested_QTY = "Requested QTY is required"
        }
        if (materialConversionInputs?.Converted_QTY === "" || materialConversionInputs?.Converted_QTY === null || materialConversionInputs?.Converted_QTY === undefined) {
            newErrors.Converted_QTY = "Converted QTY is required"
        }
        if (materialConversionInputs?.Convertion_Ratio === "" || materialConversionInputs?.Convertion_Ratio === null || materialConversionInputs?.Convertion_Ratio === undefined) {
            newErrors.Convertion_Ratio = "Convertion Ratio is required"
        }
        if (materialConversionInputs?.Purpose === "" || materialConversionInputs?.Purpose === null || materialConversionInputs?.Purpose === undefined) {
            newErrors.Purpose = "Purpose is required"
        }
        if (materialConversionInputs?.Store_Id === "" || materialConversionInputs?.Store_Id === null || materialConversionInputs?.Store_Id === undefined) {
            newErrors.Store_Id = "Store is required"
        }

        return newErrors;
    };


    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        let validForm = validateForm();
        setErrors(validForm);
        console.log("validForm", validForm);

        if (Object.keys(validForm).length === 0) {
            if (!responsedata?.id) {
                var payload = {
                    Request_Date: materialConversionInputs?.Request_Date,
                    Requester_Id: employeeId,
                    Original_Item: materialConversionInputs?.Original_Item,
                    Original_UOM: materialConversionInputs?.Original_UOM,
                    Converted_Item: materialConversionInputs?.Converted_Item,
                    Converted_UOM: materialConversionInputs?.Converted_UOM,
                    Requested_QTY: Number(materialConversionInputs?.Requested_QTY),
                    Converted_QTY: Number(materialConversionInputs?.Converted_QTY),
                    Convertion_Ratio: materialConversionInputs?.Convertion_Ratio,
                    Purpose: materialConversionInputs?.Purpose,
                    Approved_By: materialConversionInputs?.Approved_By || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .post(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/`, payload, header)
                    .then((respon) => {
                        console.log("gkjvjhjv", respon);
                        if (respon?.status === 201 && respon?.data?.id) {
                            toast.success("The MC Request is Created Successfully ");
                            listOfDesignations();
                            setListDesignation(true);
                            setCreateDesignation(false);

                            // create a history
                            handleCreateHistory(respon?.data?.Matcon_Req_Id, id3, "material conversion Request", header)

                            // check workflow is there or not
                            itemServices
                                .checkApprovalBasedOnWorkflow("Material Conversion Request", parseInt(id3), header)
                                .then((res) => {
                                    console.log("eee", res)
                                    const filteredOptions = res?.filter((opt) => opt?.Partner_Id?.id === parseInt(id3));
                                    console.log("filteredOptions", filteredOptions)
                                    if (filteredOptions && filteredOptions[0]?.Partner_Id?.id === parseInt(id3)) {
                                        console.log("Approval", filteredOptions);
                                        // if (res && res[0]?.Partner_Id?.id === parseInt(id3)) {
                                        // check is there any actions in workflow rules table
                                        settingServices
                                            .filterWorkflowRules(filteredOptions[0].Assignworkflow_Id?.Rule_Name, header)
                                            .then(async (resp) => {
                                                console.log("Rule Actions", resp);
                                                if (resp[0]?.Action === "Create" || "Create/Edit") {
                                                    console.log("Approved");
                                                    toast.success("Your Request is gone for Approval");

                                                    // create Approval Record
                                                    const documentResponse = await handleCreateDocumentApproval(respon?.data?.id, respon?.data?.Matcon_Req_Id, respon?.data?.Created_By, filteredOptions, "Material Conversion Request", header)


                                                    var payload = {
                                                        mailhtml: `<div style="width: 100%; font-family: Arial, sans-serif;">
                                                        <div className="card-body"> 
                                                        <h4 className="card-subtitle mb-2 text-muted">Dear Approver,</h4>
                                                        
                                                        <div className="card-text">
                                                        <div>Please review the below document before approving.</div>
                                                        <br/>
                                                        <div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Request</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Matcon_Req_Id}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Request Date</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Request_Date}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Requested By</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Requester_Id?.Employee_FirstName} ${respon?.data?.Requester_Id?.Employee_LasttName}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Store Name</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Store_Id?.Store_Name}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Conversion Ratio</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Conversion_Ratio}</div>
                                                            </div>
                                                        
                                                        </div>
                                                        <br/>
                                                        <p>
                                                        Click the link to go to the approval page. <a href="{{url}}">Click Here</a>.
                                                        </p>
                                                        <br />
                                                        <p>
                                                            If you have any issues during the request approval or require
                                                            any assistance, please do not hesitate to contact us at
                                                            'it-support@test.com''.
                                                        </p>
                                                        
                                                            <br />
                                                            <p>Best Regards,</p>
                                                            <p>${userDetails?.first_name}</p>
                                                            <p>${userDetails?.Designation}</p>
                                                            <p>${userDetails?.Business_Unit}</p>
                                                        </div>
                                                        <br />
                                                        </div>
                                                        </div>`,
                                                        Created_By: parseInt(localStorage.getItem("UserId")),
                                                        mailsubject: "Mail for Request Approval",
                                                        Approverid: documentResponse?.data?.Approve[0]?.id,
                                                        approver_name: documentResponse?.data?.Approve[0]?.Approvername,
                                                        Document_Type: "Material Conversion Request",
                                                        id: respon?.data?.Matcon_Req_Id,
                                                        Comments: "0",
                                                        documentapprovalid: documentResponse?.data?.Documentapproval_Id,
                                                        Request_Id: 1,
                                                        index: 1,
                                                        Initiated_By: materialConversionInputs?.requestBy,
                                                        Employee_Id: "",
                                                        Designation: documentResponse?.data?.Approve[0]?.ApproverRole,
                                                        Headname: localStorage.getItem("ReportHeadName"),
                                                        Url: ``,
                                                    };
                                                    axios
                                                        .post(
                                                            `${BASE_URL}/Erpapp/Approvalsystem/`,
                                                            payload,
                                                            header
                                                        )
                                                        .then((ress) => {
                                                            if (
                                                                ress?.data?.Message === "Mail sent Successfully"
                                                            ) {
                                                                toast(ress?.data?.Message);
                                                                setMaterialConversionInputs({
                                                                    Matcon_Req_Id: "",
                                                                    Request_Date: "",
                                                                    Requester_Id: "",
                                                                    Original_Item: "",
                                                                    Original_UOM: "",
                                                                    Converted_Item: "",
                                                                    Converted_UOM: "",
                                                                    Requested_QTY: "",
                                                                    Converted_QTY: "",
                                                                    Convertion_Ratio: "",
                                                                    Purpose: "",
                                                                    Approved_By: "",
                                                                    Store_Id: "",
                                                                    Partner_Id: "",
                                                                });

                                                            } else {
                                                                const errorToast = toast.error(
                                                                    "Email was not sent to the approver due to network issues. Click the 'SUBMIT' button to resend the email."
                                                                );

                                                                setMaterialConversionInputs({
                                                                    Matcon_Req_Id: "",
                                                                    Request_Date: "",
                                                                    Requester_Id: "",
                                                                    Original_Item: "",
                                                                    Original_UOM: "",
                                                                    Converted_Item: "",
                                                                    Converted_UOM: "",
                                                                    Requested_QTY: "",
                                                                    Converted_QTY: "",
                                                                    Convertion_Ratio: "",
                                                                    Purpose: "",
                                                                    Approved_By: "",
                                                                    Store_Id: "",
                                                                    Partner_Id: "",
                                                                });


                                                                const dismissTimeout = setTimeout(() => {
                                                                    toast.dismiss(errorToast);
                                                                }, 10000);

                                                                toast.update(errorToast, {
                                                                    onClick: () => {
                                                                        clearTimeout(dismissTimeout);
                                                                        toast.dismiss(errorToast);
                                                                    },
                                                                });
                                                            }


                                                        }).catch((error) => {
                                                            console.log(error)
                                                        });
                                                } else {

                                                    toast.error("You Don't have the access to approve this action")
                                                }
                                            }).catch((error) => {
                                                console.log(error)
                                            });


                                        // notification message
                                        var payload = {
                                            Notification_Msg: `Your Request No ${respon?.data?.Matcon_Req_Id} is submitted to ${filteredOptions[0].Amountjosn[0]?.approver_name} for approval`,
                                            User_Id: parseInt(
                                                localStorage.getItem("UserId")
                                            ),
                                            Created_By: parseInt(
                                                localStorage.getItem("UserId")
                                            ),
                                            Partner_Id: parseInt(
                                                localStorage.getItem("PartnerId")
                                            ),
                                            Company_Id: parseInt(
                                                localStorage.getItem("OrganizationId")
                                            ),
                                        };

                                        axios
                                            .post(
                                                `${BASE_URL}/Erpapp/Notificationscrud/`,
                                                payload,
                                                header
                                            )
                                            .then((res) => {
                                                console.log("PP", res);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    } else {
                                        var payload = {
                                            Matcon_Req_Id: materialConversionInputs?.Matcon_Req_Id,
                                            Request_Date: materialConversionInputs?.Request_Date,
                                            Requester_Id: materialConversionInputs?.Requester_Id,
                                            Original_Item: materialConversionInputs?.Original_Item,
                                            Original_UOM: materialConversionInputs?.Original_UOM,
                                            Converted_Item: materialConversionInputs?.Converted_Item,
                                            Converted_UOM: materialConversionInputs?.Converted_UOM,
                                            Requested_QTY: materialConversionInputs?.Requested_QTY,
                                            Converted_QTY: materialConversionInputs?.Converted_QTY,
                                            Convertion_Ratio: materialConversionInputs?.Convertion_Ratio,
                                            Purpose: materialConversionInputs?.Purpose,
                                            Approved_By: materialConversionInputs?.Approved_By,
                                            Store_Id: parseInt(materialConversionInputs?.Store_Id),
                                            Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                                            Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                                            Created_By: parseInt(localStorage.getItem("Employee_Id")),
                                            Updated_By: parseInt(localStorage.getItem("Employee_Id")),
                                        };
                                        axios.post(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/`,
                                            payload,
                                            header
                                        ).then((respon) => {
                                            console.log("gkjvjhjv", respon);
                                            if (respon?.status === 201) {
                                                toast.success(
                                                    "Your Request has been approved without approval"
                                                );

                                                setMaterialConversionInputs({
                                                    Matcon_Req_Id: "",
                                                    Request_Date: "",
                                                    Requester_Id: "",
                                                    Original_Item: "",
                                                    Original_UOM: "",
                                                    Converted_Item: "",
                                                    Converted_UOM: "",
                                                    Requested_QTY: "",
                                                    Converted_QTY: "",
                                                    Convertion_Ratio: "",
                                                    Purpose: "",
                                                    Approved_By: "",
                                                    Store_Id: "",
                                                    Partner_Id: "",
                                                });

                                            }
                                        }).catch((error) => {
                                            console.log(error)
                                        });
                                    }
                                });

                        } else {
                            toast.error("Material Conversion Request Matching Query Doesn't Exist.")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        handleError(error)
                    });
            } else {
                var payload = {
                    ...materialConversionInputs,
                    Matcon_Req_Id: materialConversionInputs?.Matcon_Req_Id,
                    Request_Date: materialConversionInputs?.Request_Date,
                    Requester_Id: employeeId,
                    Original_Item: materialConversionInputs?.Original_Item,
                    Original_UOM: materialConversionInputs?.Original_UOM,
                    Converted_Item: materialConversionInputs?.Converted_Item,
                    Converted_UOM: materialConversionInputs?.Converted_UOM,
                    Requested_QTY: Number(materialConversionInputs?.Requested_QTY),
                    Converted_QTY: Number(materialConversionInputs?.Converted_QTY),
                    Convertion_Ratio: (materialConversionInputs?.Convertion_Ratio),
                    Purpose: materialConversionInputs?.Purpose,
                    Approved_By: materialConversionInputs?.Approved_By?.id || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Partner_Id: parseInt(materialConversionInputs?.Partner_Id?.id || localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(materialConversionInputs?.Company_Id?.id || localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(materialConversionInputs?.Created_By?.id || localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .put(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/`, payload, header)
                    .then((respon) => {
                        console.log("gkjvjhjv", respon);
                        if (respon?.status === 200 && respon?.data?.id) {
                            toast.success("Updated Successfully ");
                            listOfDesignations();
                            setListDesignation(true);
                            setCreateDesignation(false);

                            // update a history
                            let EditedArr = [];
                            let changedValueKey;

                            if (parseInt(materialConversionInputs?.Store_Id) !== parseInt(materialConversionInputs1?.Store_Id)) {
                                EditedArr.push("Store Name");
                            }
                            if (materialConversionInputs?.Converted_Item !== materialConversionInputs1?.Converted_Item) {
                                EditedArr.push("Converted Item");
                            }
                            if (materialConversionInputs?.Convertion_Ratio !== materialConversionInputs1?.Convertion_Ratio) {
                                EditedArr.push("Convertion Ratio");
                            }
                            if (materialConversionInputs?.Original_Item !== materialConversionInputs1?.Original_Item) {
                                EditedArr.push("Original Item");
                            }
                            if (materialConversionInputs?.Requested_QTY !== materialConversionInputs1?.Requested_QTY) {
                                EditedArr.push("Requested QTY");
                            }
                            if (materialConversionInputs?.Converted_QTY !== materialConversionInputs1?.Converted_QTY) {
                                EditedArr.push("Converted QTY");
                            }

                            let editUser = localStorage.getItem("Username");
                            if (EditedArr?.length > 0) {
                                axios
                                    .post(
                                        `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                                        {
                                            Document_Id: respon?.data?.Matcon_Req_Id,
                                            Updated_Person: `${editUser} edited this material conversion request.`,
                                            Updated_Time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                                            Is_Deleted: false,
                                            Updated_Field: EditedArr.join(","),
                                            Updated_Date: todayDate,
                                            Histroy: changedValueKey?.length > 0 ? changedValueKey : [],
                                            Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                                            Updated_By: parseInt(localStorage.getItem("UserId")),
                                        },
                                        header
                                    )
                                    .then((res) => {
                                        console.log("Result", res.data);
                                    })
                                    .catch((res) => {
                                        console.log(res.message);
                                    });

                                // check workflow is there or not
                                itemServices
                                    .checkApprovalBasedOnWorkflow("Material Conversion Request", parseInt(id3), header)
                                    .then((res) => {
                                        console.log("eee", res)
                                        const filteredOptions = res?.filter((opt) => opt?.Partner_Id?.id === parseInt(id3));
                                        console.log("filteredOptions", filteredOptions)
                                        if (filteredOptions && filteredOptions[0]?.Partner_Id?.id === parseInt(id3)) {
                                            console.log("Approval", filteredOptions);
                                            // if (res && res[0]?.Partner_Id?.id === parseInt(id3)) {
                                            // check is there any actions in workflow rules table
                                            settingServices
                                                .filterWorkflowRules(filteredOptions[0].Assignworkflow_Id?.Rule_Name, header)
                                                .then(async (resp) => {
                                                    console.log("Rule Actions", resp);
                                                    if (resp[0]?.Action === "Create" || "Create/Edit") {
                                                        console.log("Approved");
                                                        toast.success("Your Request is gone for Approval");

                                                        // create Approval Record
                                                        const documentResponse = await handleCreateDocumentApproval(respon?.data?.id, respon?.data?.Matcon_Req_Id, respon?.data?.Created_By, filteredOptions, "Material Conversion Request", header)


                                                        var payload = {
                                                            mailhtml: `<div style="width: 100%; font-family: Arial, sans-serif;">
                                                        <div className="card-body"> 
                                                        <h4 className="card-subtitle mb-2 text-muted">Dear Approver,</h4>
                                                        
                                                        <div className="card-text">
                                                        <div>Please review the below document before approving.</div>
                                                        <br/>
                                                        <div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Request</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Matcon_Req_Id}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Request Date</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Request_Date}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Requested By</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Requester_Id?.Employee_FirstName} ${respon?.data?.Requester_Id?.Employee_LasttName}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Store Name</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Store_Id?.Store_Name}</div>
                                                            </div>
                                                            <div style="display: flex;">
                                                            <div style="flex: 0 0 25.33%;">Conversion Ratio</div>
                                                            <div style="flex: 0 0 5%;">:</div>
                                                            <div style="flex: 0 0 69.67%;">${respon?.data?.Conversion_Ratio}</div>
                                                            </div>
                                                        
                                                        </div>
                                                        <br/>
                                                        <p>
                                                        Click the link to go to the approval page. <a href="{{url}}">Click Here</a>.
                                                        </p>
                                                        <br />
                                                        <p>
                                                            If you have any issues during the request approval or require
                                                            any assistance, please do not hesitate to contact us at
                                                            'it-support@test.com''.
                                                        </p>
                                                        
                                                            <br />
                                                            <p>Best Regards,</p>
                                                            <p>${`${userDetails?.first_name} ${userDetails?.last_name}`}</p>
                                                            <p>${userDetails?.Designation}</p>
                                                            <p>${userDetails?.Business_Unit}</p>
                                                        </div>
                                                        <br />
                                                        </div>
                                                        </div>`,
                                                            Created_By: parseInt(localStorage.getItem("UserId")),
                                                            mailsubject: "Mail for Request Approval",
                                                            Approverid: documentResponse?.data?.Approve[0]?.id,
                                                            approver_name: documentResponse?.data?.Approve[0]?.Approvername,
                                                            Document_Type: "Material Conversion Request",
                                                            id: respon?.data?.Matcon_Req_Id,
                                                            Comments: "0",
                                                            documentapprovalid: documentResponse?.data?.Documentapproval_Id,
                                                            Request_Id: 1,
                                                            index: 1,
                                                            Initiated_By: materialConversionInputs?.requestBy,
                                                            Employee_Id: "",
                                                            Designation: documentResponse?.data?.Approve[0]?.role,
                                                            Headname: localStorage.getItem("ReportHeadName"),
                                                            Url: ``,
                                                        };
                                                        axios
                                                            .post(
                                                                `${BASE_URL}/Erpapp/Approvalsystem/`,
                                                                payload,
                                                                header
                                                            )
                                                            .then((ress) => {
                                                                if (
                                                                    ress?.data?.Message === "Mail sent Successfully"
                                                                ) {
                                                                    toast(ress?.data?.Message);

                                                                } else {
                                                                    const errorToast = toast.error(
                                                                        "Email was not sent to the approver due to network issues. Click the 'SUBMIT' button to resend the email."
                                                                    );



                                                                    const dismissTimeout = setTimeout(() => {
                                                                        toast.dismiss(errorToast);
                                                                    }, 10000);

                                                                    toast.update(errorToast, {
                                                                        onClick: () => {
                                                                            clearTimeout(dismissTimeout);
                                                                            toast.dismiss(errorToast);
                                                                        },
                                                                    });
                                                                }


                                                            }).catch((error) => {
                                                                console.log(error)
                                                            });
                                                    } else {
                                                        toast.error("You Don't have the access to approve this action")
                                                    }
                                                }).catch((error) => {
                                                    console.log(error)
                                                });


                                            // notification message
                                            var payload = {
                                                Notification_Msg: `Your Request No ${respon?.data?.Matcon_Req_Id} is submitted to ${filteredOptions[0].Amountjosn[0]?.approver_name} for approval`,
                                                User_Id: parseInt(
                                                    localStorage.getItem("UserId")
                                                ),
                                                Created_By: parseInt(
                                                    localStorage.getItem("UserId")
                                                ),
                                                Partner_Id: parseInt(
                                                    localStorage.getItem("PartnerId")
                                                ),
                                                Company_Id: parseInt(
                                                    localStorage.getItem("OrganizationId")
                                                ),
                                            };

                                            axios.post(`${BASE_URL}/Erpapp/Notificationscrud/`, payload, header)
                                                .then((res) => {
                                                    console.log("PP", res);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        } else {
                                            var payload = {
                                                ...materialConversionInputs,
                                                Matcon_Req_Id: materialConversionInputs?.Matcon_Req_Id,
                                                Request_Date: materialConversionInputs?.Request_Date,
                                                Requester_Id: materialConversionInputs?.Requester_Id,
                                                Original_Item: materialConversionInputs?.Original_Item,
                                                Original_UOM: materialConversionInputs?.Original_UOM,
                                                Converted_Item: materialConversionInputs?.Converted_Item,
                                                Converted_UOM: materialConversionInputs?.Converted_UOM,
                                                Requested_QTY: materialConversionInputs?.Requested_QTY,
                                                Converted_QTY: materialConversionInputs?.Converted_QTY,
                                                Convertion_Ratio: materialConversionInputs?.Convertion_Ratio,
                                                Purpose: materialConversionInputs?.Purpose,
                                                Approved_By: materialConversionInputs?.Approved_By?.id || employeeId,
                                                Store_Id: parseInt(materialConversionInputs?.Store_Id),
                                                Partner_Id: parseInt(materialConversionInputs?.Partner_Id?.id || localStorage.getItem("PartnerId")),
                                                Company_Id: parseInt(materialConversionInputs?.Company_Id?.id || localStorage.getItem("OrganizationId")),
                                                Created_Date: new Date().toJSON().slice(0, 10),
                                                Created_By: parseInt(materialConversionInputs?.Created_By?.id || localStorage.getItem("EmployeeId")),
                                                Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                                            };
                                            axios.put(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/`,
                                                payload,
                                                header
                                            ).then((respon) => {
                                                if (respon?.status === 200) {
                                                    toast.success("Your Request has been approved without approval");
                                                }
                                            }).catch((error) => {
                                                handleError(error)
                                            });
                                        }
                                    }).catch((error) => {
                                        console.log(error)
                                    });
                            }

                        } else {
                            toast.error("Material Conversion Request Matching Query Doesn't Exist.");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        handleError(error);
                    });
            }
        }
        else {
            toast.error("Please review your inputs and make sure all fields are filled out correctly")
        }

    }


    return (
        <div>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {`${responsedata?.id ? "Edit" : "Create"}`} Material Conversion Request
            </Typography>
            <form onSubmit={handleSubmitRequest}>
                <Div className="row" sx={{ minHeight: "400px" }}>

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container >
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    MC Request No <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Matcon_Req_Id"
                                        value={materialConversionInputs?.Matcon_Req_Id}
                                        onChange={handleChange}
                                        placeholder={transactionSeriesType === "Automatic" ? "Auto Generated" : "MC Request No"}
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled={transactionSeriesType === "Automatic" ? true : false}
                                        inputProps={{
                                            maxLength: 11,
                                            title: 'Please enter a maximum of 11 digits',
                                        }}
                                    />
                                </Div>
                            </Grid>
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Requested By <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Employee_FirstName"
                                        value={employeeDetails?.Employee_FirstName}
                                        onChange={handleChange}
                                        placeholder="Requested By"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!employeeDetails?.Employee_FirstName && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Employee_FirstName}</span>}
                                </Div>
                            </Grid>
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Business Unit <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Partner_Id"
                                        value={employeeDetails?.Partner_Id?.Partner_Name}
                                        onChange={handleChange}
                                        placeholder="Business Unit"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!employeeDetails?.Partner_Id?.Partner_Name && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Partner_Id}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Store Name <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Store_Id"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Store_Name) {
                                                return option?.Store_Name;
                                            }
                                            return "";
                                        }}
                                        options={stores}
                                        value={responsedata?.id === undefined ? stores?.find((opt) => opt?.Store_Name === materialConversionInputs?.Store_Name) || null : materialConversionInputs?.Store_Name}
                                        onChange={(e, newValue) => {
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Store_Id: newValue?.id,
                                                Store_Name: newValue?.Store_Name,
                                            });

                                            getItemNames(newValue?.id);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Store Name"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Store_Id && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Store_Id}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Original Item <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Original_Item"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Item_Name) {
                                                return option?.Item_Name;
                                            }
                                            return "";
                                        }}
                                        options={itemNames || []}
                                        value={responsedata?.id === undefined ? itemNames?.find((opt) => opt?.Item_Name === materialConversionInputs?.Original_Item) || null : materialConversionInputs?.Original_Item}
                                        onChange={(e, newValue) => {
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Original_Item: newValue?.Item_Name,
                                                Original_UOM: newValue?.UOM,
                                            })
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Original Item"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Original_Item && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Original_Item}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Original UOM <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Original_UOM"
                                        value={materialConversionInputs?.Original_UOM}
                                        onChange={handleChange}
                                        placeholder="Original UOM"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Original_UOM && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Original_UOM}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Requested Qty <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <NumericTextField
                                        className="col-12 input-box"
                                        name="Requested_QTY"
                                        value={materialConversionInputs?.Requested_QTY}
                                        onChange={handleChange}
                                        placeholder="Requested Qty"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    {!materialConversionInputs?.Requested_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Requested_QTY}</span>}
                                </Div>
                            </Grid>

                        </Grid>
                    </Div>

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container >
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Date <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <ErpDateField
                                        id="Request_Date"
                                        name="Request_Date"
                                        inputValue={materialConversionInputs?.Request_Date}
                                        handleInputChange={handleChange}
                                        placeholder="Request Date"
                                        variant="outlined"
                                    />
                                    {!materialConversionInputs?.Request_Date && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Request_Date}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Purpose <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Purpose"
                                        value={materialConversionInputs?.Purpose}
                                        onChange={handleChange}
                                        placeholder="Purpose"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    {!materialConversionInputs?.Purpose && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Purpose}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Converted Item <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Converted_Item"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Item_Name) {
                                                return option?.Item_Name;
                                            }
                                            return "";
                                        }}
                                        options={itemNames || []}
                                        value={responsedata?.id === undefined ? itemNames?.find((opt) => opt?.Item_Name === materialConversionInputs?.Converted_Item) || null : materialConversionInputs?.Converted_Item}
                                        onChange={(e, newValue) => {
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Converted_Item: newValue?.Item_Name,
                                                Converted_UOM: newValue?.UOM,
                                            })
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Converted Item"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Converted_Item && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Converted_Item}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Converted UOM <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Converted_UOM"
                                        value={materialConversionInputs?.Converted_UOM}
                                        onChange={handleChange}
                                        placeholder="Converted UOM"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Converted_UOM && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Converted_UOM}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Convertion Ratio <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Convertion_Ratio"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.value) {
                                                return option?.value;
                                            }
                                            return "";
                                        }}
                                        options={conversionRatios || []}
                                        value={responsedata?.id === undefined ? conversionRatios?.find((opt) => opt?.value === materialConversionInputs?.Convertion_Ratio) || null : materialConversionInputs?.Convertion_Ratio}
                                        onChange={(e, newValue) => {
                                            const [numerator, denominator] = newValue?.value.split(':').map(Number);
                                            const ratioDecimal = numerator * denominator;
                                            const multipliedValue = ratioDecimal * Number(materialConversionInputs?.Requested_QTY);

                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Convertion_Ratio: newValue?.value,
                                                Converted_QTY: (multipliedValue)
                                            })
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Convertion Ratio"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Convertion_Ratio && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Convertion_Ratio}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Converted Qty <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Converted_QTY"
                                        value={materialConversionInputs?.Converted_QTY}
                                        onChange={handleChange}
                                        placeholder="Converted Qty"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Converted_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Converted_QTY}</span>}
                                </Div>
                            </Grid>

                        </Grid>
                    </Div>

                </Div>

                {/* code for save and back buttons */}
                <Div className="buttons" sx={{ mt: 5 }}>
                    <ErpSaveUpdateButton name={responsedata?.id ? "Update" : "Save"} type={"submit"} />
                    <ErpCancelButton handleClick={handleClickBack} />
                </Div>

            </form>
        </div>
    )
}

export default CreateMaterialConversion
