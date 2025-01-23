import Div from "@jumbo/shared/Div";
import {
    Autocomplete,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import dropdownApiServices from "app/services/dropdownapi-services";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { handleCreateHistory } from "app/shared/ReuseComponents/UpdatedHistoryRecords";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { fetchTransactionSeries, todayDate } from "app/shared/ReuseComponents/DateFormatter";
import { NumericTextField } from "app/shared/ReuseComponents/StyledComponents";


const CreateMaterialIssueConversion = ({ setListDesignation, setCreateDesignation, listOfDesignations, responsedata }) => {
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
        Matcon_Issue_Id: "",
        Matcon_Req_Id: "",
        Matcon_Req_No: "",
        Issue_Date: "",
        Requester_Id: "",
        Requested_By: "",
        Requested_Item: "",
        UOM: "",
        Issued_Value: "",
        Stock_QTY: "",
        WAR: "",
        Closing_Stock: "",
        Requested_QTY: "",
        Issued_QTY: "",
        Convertion_Ratio: "",
        Purpose: "",
        Approved_By: "",
        Store_Id: "",
        Store_Name: "",
        Partner_Id: "",
    });
    const [materialConversionInputs1, setMaterialConversionInputs1] = useState({
        Matcon_Issue_Id: "",
        Matcon_Req_Id: "",
        Matcon_Req_No: "",
        Issue_Date: "",
        Requester_Id: "",
        Requested_By: "",
        Requested_Item: "",
        UOM: "",
        Issued_Value: "",
        Stock_QTY: "",
        WAR: "",
        Closing_Stock: "",
        Requested_QTY: "",
        Issued_QTY: "",
        Convertion_Ratio: "",
        Purpose: "",
        Approved_By: "",
        Store_Id: "",
        Store_Name: "",
        Partner_Id: "",
    });

    const [employeeDetails, setEmployeeDetails] = useState({});
    const [stores, setStores] = useState([]);
    const [requestLists, setRequestLists] = useState([]);
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
                setStores([]);
            });
    };


    const getRequestData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionRequestlist/`, header);
            if (response) {
                let listItems = response && response?.data
                setRequestLists(listItems)
            }
        } catch (error) {
            console.log(error);
            setRequestLists([]);
        }
    }

    const getMaterialConversionData = async () => {
        if (responsedata?.id) {
            try {
                const response = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionIssueCRUD/?Matcon_Issue_Id=${responsedata?.Matcon_Issue_Id}`, header);
                console.log("response", response)
                if (response) {
                    setMaterialConversionInputs({
                        ...response?.data,
                        Matcon_Req_Id: response?.data?.Matcon_Req_Id?.id,
                        Matcon_Req_No: response?.data?.Matcon_Req_Id?.Matcon_Req_Id,
                        Store_Id: response?.data?.Store_Id?.id,
                        Store_Name: response?.data?.Store_Id?.Store_Name,
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
                Issue_Date: "",
                Requester_Id: "",
                Original_Item: "",
                UOM: "",
                Requested_Item: "",
                Issued_Value: "",
                Requested_QTY: "",
                Issued_QTY: "",
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
        getRequestData();
    }, []);



    const handleClickBack = () => {
        setListDesignation(true);
        setCreateDesignation(false);
        if (!responsedata?.id) {
            setMaterialConversionInputs({
                Matcon_Issue_Id: "",
                Matcon_Req_Id: "",
                Issue_Date: "",
                Requester_Id: "",
                Requested_By: "",
                Requested_Item: "",
                UOM: "",
                Issued_Value: "",
                Stock_QTY: "",
                WAR: "",
                Closing_Stock: "",
                Requested_QTY: "",
                Issued_QTY: "",
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
        else if (name === "Issued_QTY") {
            if (
                (/^[+]?\d*\.?\d{0,2}$/.test(value) && Number(value) <= Number(materialConversionInputs?.Stock_QTY)) ||
                value === ""
            ) {
                setMaterialConversionInputs({
                    ...materialConversionInputs,
                    ["Issued_QTY"]: Number(value),
                    ["Issued_Value"]: Number(Number(materialConversionInputs?.WAR) * Number(value)),
                    ["Closing_Stock"]: Number(materialConversionInputs?.Stock_QTY - value)
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

        if (materialConversionInputs?.Matcon_Req_Id === "" || materialConversionInputs?.Matcon_Req_Id === null || materialConversionInputs?.Matcon_Req_Id === undefined) {
            newErrors.Matcon_Req_Id = "Request No is required"
        }
        if (employeeDetails?.Employee_FirstName === "" || employeeDetails?.Employee_FirstName === null || employeeDetails?.Employee_FirstName === undefined) {
            newErrors.Employee_FirstName = "Requested By is required"
        }
        if (materialConversionInputs?.UOM === "" || materialConversionInputs?.UOM === null || materialConversionInputs?.UOM === undefined) {
            newErrors.UOM = "UOM is required"
        }
        if (materialConversionInputs?.Requested_Item === "" || materialConversionInputs?.Requested_Item === null || materialConversionInputs?.Requested_Item === undefined) {
            newErrors.Requested_Item = "Reqested Item is required"
        }
        if (materialConversionInputs?.Issued_Value === "" || materialConversionInputs?.Issued_Value === null || materialConversionInputs?.Issued_Value === undefined) {
            newErrors.Issued_Value = "Issued Value is required"
        }
        if (materialConversionInputs?.Requested_QTY === "" || materialConversionInputs?.Requested_QTY === null || materialConversionInputs?.Requested_QTY === undefined) {
            newErrors.Requested_QTY = "Requested QTY is required"
        }
        if (materialConversionInputs?.Issued_QTY === "" || materialConversionInputs?.Issued_QTY === null || materialConversionInputs?.Issued_QTY === undefined) {
            newErrors.Issued_QTY = "Issued QTY is required"
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
        if (materialConversionInputs?.Stock_QTY === "" || materialConversionInputs?.Stock_QTY === null || materialConversionInputs?.Stock_QTY === undefined) {
            newErrors.Stock_QTY = "Stock Qty is required"
        }
        if (materialConversionInputs?.WAR === "" || materialConversionInputs?.WAR === null || materialConversionInputs?.WAR === undefined) {
            newErrors.WAR = "WAR Value is required"
        }
        if (materialConversionInputs?.Closing_Stock === "" || materialConversionInputs?.Closing_Stock === null || materialConversionInputs?.Closing_Stock === undefined) {
            newErrors.Closing_Stock = "Closing Stock is required"
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
                    Matcon_Req_Id: materialConversionInputs?.Matcon_Req_Id,
                    Issue_Date: new Date().toJSON().slice(0, 10),
                    Requested_By: `${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`,
                    Requester_Id: employeeId,
                    Requested_Item: materialConversionInputs?.Requested_Item,
                    UOM: materialConversionInputs?.UOM,
                    Issued_Value: Number(materialConversionInputs?.Issued_Value),
                    Stock_QTY: Number(materialConversionInputs?.Stock_QTY),
                    WAR: Number(materialConversionInputs?.WAR),
                    Closing_Stock: Number(materialConversionInputs?.Closing_Stock),
                    Requested_QTY: Number(materialConversionInputs?.Requested_QTY),
                    Issued_QTY: Number(materialConversionInputs?.Issued_QTY),
                    Convertion_Ratio: (materialConversionInputs?.Convertion_Ratio),
                    Purpose: materialConversionInputs?.Purpose,
                    Approved_By: materialConversionInputs?.Approved_By?.id || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .post(`${BASE_URL}/Erpapp/MaterialconvertionIssueCRUD/`, payload, header)
                    .then((respon) => {
                        console.log("gkjvjhjv", respon);
                        if (respon?.status === 201 && respon?.data?.id) {
                            toast.success("The Material Issue is Created Successfully ");
                            listOfDesignations();
                            setListDesignation(true);
                            setCreateDesignation(false);
                            setMaterialConversionInputs({
                                Matcon_Issue_Id: "",
                                Matcon_Req_Id: "",
                                Issue_Date: "",
                                Requester_Id: "",
                                Requested_By: "",
                                Requested_Item: "",
                                UOM: "",
                                Issued_Value: "",
                                Stock_QTY: "",
                                WAR: "",
                                Closing_Stock: "",
                                Requested_QTY: "",
                                Issued_QTY: "",
                                Convertion_Ratio: "",
                                Purpose: "",
                                Approved_By: "",
                                Store_Id: "",
                                Partner_Id: "",
                            });

                            // create a history
                            handleCreateHistory(respon?.data?.Matcon_Issue_Id, id3, "material conversion Issue", header)


                        } else {
                            toast.error("Material Conversion Issue Matching Query Doesn't Exist.")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        handleError(error)
                    });
            } else {
                var payload = {
                    ...materialConversionInputs,
                    Matcon_Issue_Id: materialConversionInputs?.Matcon_Issue_Id,
                    Matcon_Req_Id: materialConversionInputs?.Matcon_Req_Id,
                    Issue_Date: new Date().toJSON().slice(0, 10),
                    Requested_By: `${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`,
                    Requester_Id: employeeId,
                    Requested_Item: materialConversionInputs?.Requested_Item,
                    UOM: materialConversionInputs?.UOM,
                    Issued_Value: Number(materialConversionInputs?.Issued_Value),
                    Stock_QTY: Number(materialConversionInputs?.Stock_QTY),
                    WAR: Number(materialConversionInputs?.WAR),
                    Closing_Stock: Number(materialConversionInputs?.Closing_Stock),
                    Requested_QTY: Number(materialConversionInputs?.Requested_QTY),
                    Issued_QTY: Number(materialConversionInputs?.Issued_QTY),
                    Convertion_Ratio: (materialConversionInputs?.Convertion_Ratio),
                    Purpose: materialConversionInputs?.Purpose,
                    Approved_By: materialConversionInputs?.Approved_By?.id || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .put(`${BASE_URL}/Erpapp/MaterialconvertionIssueCRUD/`, payload, header)
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
                            if (materialConversionInputs?.Matcon_Req_Id !== materialConversionInputs1?.Matcon_Req_Id) {
                                EditedArr.push("Material Conversion Request");
                            }
                            if (materialConversionInputs?.Convertion_Ratio !== materialConversionInputs1?.Convertion_Ratio) {
                                EditedArr.push("Convertion Ratio");
                            }
                            if (materialConversionInputs?.Issued_QTY !== materialConversionInputs1?.Issued_QTY) {
                                EditedArr.push("Issued Quantity");
                            }


                            let editUser = localStorage.getItem("Username");
                            if (EditedArr?.length > 0 || changedValueKey?.length > 0) {
                                axios
                                    .post(
                                        `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                                        {
                                            Document_Id: respon?.data?.Matcon_Issue_Id,
                                            Updated_Person: `${editUser} edited this material conversion issue.`,
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
                            }
                        } else {
                            toast.error("Material Conversion Issue Matching Query Doesn't Exist.")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        handleError(error)
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
                {`${responsedata?.id ? "Edit" : "Create"}`} Material Convertion Issue
            </Typography>
            <form onSubmit={handleSubmitRequest}>
                <Div className="row" sx={{ minHeight: "400px" }}>

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container >
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    MC Issue No <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Matcon_Issue_Id"
                                        value={materialConversionInputs?.Matcon_Issue_Id}
                                        onChange={handleChange}
                                        placeholder={transactionSeriesType === "Automatic" ? "Auto Generated" : "MC Issue No"}
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
                                    Requested By <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Employee_FirstName"
                                        value={`${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`}
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
                                    MC Request No <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Matcon_Req_No"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Matcon_Req_Id) {
                                                return option?.Matcon_Req_Id;
                                            }
                                            return "";
                                        }}
                                        options={requestLists || []}
                                        value={responsedata?.id === undefined ? requestLists?.find((opt) => opt?.Matcon_Req_Id === materialConversionInputs?.Matcon_Req_No) || null : materialConversionInputs?.Matcon_Req_No}
                                        onChange={(e, newValue) => {
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Matcon_Req_Id: newValue?.id,
                                                Matcon_Req_No: newValue?.Matcon_Req_Id,
                                                Requested_Item: newValue?.Original_Item,
                                                UOM: newValue?.Original_UOM,
                                                Requested_QTY: newValue?.Requested_QTY,
                                                Purpose: newValue?.Purpose,
                                                Convertion_Ratio: newValue?.Convertion_Ratio,
                                            })
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            option?.Matcon_Req_Id === value || value === ""
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="MC Request No"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Matcon_Req_Id && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Matcon_Req_Id}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Requested Item <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Requested_Item"
                                        value={materialConversionInputs?.Requested_Item}
                                        onChange={handleChange}
                                        placeholder="Requested Item"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Requested_Item && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Requested_Item}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    UOM <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="UOM"
                                        value={materialConversionInputs?.UOM}
                                        onChange={handleChange}
                                        placeholder="UOM"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.UOM && <span style={{ color: "red", fontSize: "13px" }}>{errors?.UOM}</span>}
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
                                        disabled
                                    />
                                    {!materialConversionInputs?.Requested_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Requested_QTY}</span>}
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
                                        disabled
                                    />
                                    {!materialConversionInputs?.Purpose && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Purpose}</span>}
                                </Div>
                            </Grid>
                        </Grid>
                    </Div>

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container>
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Convertion Ratio <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Convertion_Ratio"
                                        value={materialConversionInputs?.Convertion_Ratio}
                                        onChange={handleChange}
                                        placeholder="Convertion Ratio"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Convertion_Ratio && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Convertion_Ratio}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Store Name <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Store_Name"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Store_Name) {
                                                return option?.Store_Name;
                                            }
                                            return "";
                                        }}
                                        options={stores || []}
                                        value={responsedata?.id === undefined ? stores?.find((opt) => opt?.Store_Name === materialConversionInputs?.Store_Name) || null : materialConversionInputs?.Store_Name}
                                        onChange={(e, newValue) => {
                                            let listItems = newValue?.Items?.find((opt) => opt?.Item_Name === materialConversionInputs?.Requested_Item)

                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Store_Id: newValue?.id,
                                                Store_Name: newValue?.Store_Name,
                                                WAR: listItems?.id,
                                                Stock_QTY: listItems?.Opening_Stock,
                                            });
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            option?.Store_Name === value || value === ""
                                        }
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
                                    WAR <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="WAR"
                                        value={materialConversionInputs?.WAR || 0}
                                        onChange={handleChange}
                                        placeholder="WAR"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.WAR && <span style={{ color: "red", fontSize: "13px" }}>{errors?.WAR}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Stock Qty <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Stock_QTY"
                                        value={materialConversionInputs?.Stock_QTY}
                                        onChange={handleChange}
                                        placeholder="Stock Qty"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Stock_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Stock_QTY}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Issued Qty <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Issued_QTY"
                                        value={materialConversionInputs?.Issued_QTY}
                                        onChange={(e) => {
                                            let value = Number(e.target.value)
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Issued_QTY: value,
                                                Issued_Value: materialConversionInputs?.WAR * value,
                                                Closing_Stock: materialConversionInputs?.Stock_QTY - value,
                                            });
                                        }}
                                        placeholder="Issued Qty"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    {!materialConversionInputs?.Issued_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Issued_QTY}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Issued Value <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Issued_Value"
                                        value={materialConversionInputs?.Issued_Value}
                                        onChange={handleChange}
                                        placeholder="Issued Value"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Issued_Value && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Issued_Value}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Closing Stock <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Closing_Stock"
                                        value={materialConversionInputs?.Closing_Stock}
                                        onChange={handleChange}
                                        placeholder="Closing Stock"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Closing_Stock && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Closing_Stock}</span>}
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

export default CreateMaterialIssueConversion
