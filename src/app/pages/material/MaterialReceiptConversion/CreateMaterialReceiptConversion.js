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
import { ErpCancelButton, ErpDateField, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { handleCreateHistory } from "app/shared/ReuseComponents/UpdatedHistoryRecords";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { fetchTransactionSeries, todayDate } from "app/shared/ReuseComponents/DateFormatter";
import { NumericTextField } from "app/shared/ReuseComponents/StyledComponents";


const CreateMaterialReceiptConversion = ({ setListDesignation, setCreateDesignation, listOfDesignations, responsedata }) => {
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
        Matcon_Receipt_Id: "",
        Material_Issue_No: "",
        Receipt_Date: "",
        Requester_Id: "",
        Received_By: "",
        Original_Item: "",
        UOM: "",
        Received_Item: "",
        Issued_Value: "",
        Received_QTY: "",
        Issued_QTY: "",
        Receipt_Type: "",
        Approved_By: "",
        Store_Id: "",
        Store_Name: "",
        Stock_QTY: "",
        WAR: "",
        Partner_Id: "",
    });

    const [materialConversionInputs1, setMaterialConversionInputs1] = useState({
        Matcon_Receipt_Id: "",
        Material_Issue_No: "",
        Receipt_Date: "",
        Requester_Id: "",
        Received_By: "",
        Original_Item: "",
        UOM: "",
        Received_Item: "",
        Issued_Value: "",
        Received_QTY: "",
        Issued_QTY: "",
        Receipt_Type: "",
        Approved_By: "",
        Store_Id: "",
        Store_Name: "",
        Stock_QTY: "",
        WAR: "",
        Partner_Id: "",
    });
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [stores, setStores] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [issueLists, setIssueLists] = useState([]);
    const [receiptTypes, setReceiptTypes] = useState(["Internal", "External"]);
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
                setStores(list || []);
            })
            .catch((error) => {
                console.log(error);
                setStores([]);
            });
    };

    const getItemNames = async (storeId) => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/Storelistwithoutpagination/?Partner_Id=${id3}`, header);
            if (response) {
                let listItems = response && response?.data?.filter((opt) => opt?.id === Number(storeId))[0]?.Items;
                setItemNames(listItems || [])
            }
        } catch (error) {
            console.log(error);
            setItemNames([]);
        }
    }


    const getIssueData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionIssuelist/`, header);
            if (response) {
                let listItems = response && response?.data
                setIssueLists(listItems || [])
            }
        } catch (error) {
            console.log(error);
            setIssueLists([]);
        }
    }

    const getMaterialConversionData = async () => {
        if (responsedata?.id) {
            try {
                const response = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionReceiptCRUD/?Matcon_Receipt_Id=${responsedata?.Matcon_Receipt_Id}`, header);
                if (response) {
                    setMaterialConversionInputs({
                        ...response?.data,
                        Store_Id: response?.data?.Store_Id?.id,
                        Store_Name: response?.data?.Store_Id?.Store_Name,
                    });
                    setMaterialConversionInputs1({
                        ...response?.data,
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
                Matcon_Receipt_Id: "",
                Receipt_Date: "",
                Requester_Id: "",
                Received_By: "",
                Original_Item: "",
                UOM: "",
                Received_Item: "",
                Issued_Value: "",
                Received_QTY: "",
                Issued_QTY: "",
                Receipt_Type: "",
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
        getIssueData();
        getItemNames(materialConversionInputs?.Store_Id);
    }, [responsedata?.id]);



    const handleClickBack = () => {
        setListDesignation(true);
        setCreateDesignation(false);
        if (!responsedata?.id) {
            setMaterialConversionInputs({
                Matcon_Receipt_Id: "",
                Receipt_Date: "",
                Requester_Id: "",
                Received_By: "",
                Original_Item: "",
                UOM: "",
                Received_Item: "",
                Issued_Value: "",
                Received_QTY: "",
                Issued_QTY: "",
                Receipt_Type: "",
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
        if (name === "Received_QTY") {
            if (
                (/^[+]?\d*\.?\d{0,2}$/.test(value) && Number(value)) ||
                value === ""
            ) {
                setMaterialConversionInputs({
                    ...materialConversionInputs,
                    ["Received_QTY"]: Number(value),
                    ["Closing_Stock"]: Number(materialConversionInputs?.Stock_QTY) || 0 + Number(value)
                })
            } else {
                toast.error(
                    `Please Enter a Valid Stock Quantity`
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

        if (materialConversionInputs?.Receipt_Date === "" || materialConversionInputs?.Receipt_Date === null || materialConversionInputs?.Receipt_Date === undefined) {
            newErrors.Receipt_Date = "Receipt Date is required"
        }
        if (employeeDetails?.Employee_FirstName === "" || employeeDetails?.Employee_FirstName === null || employeeDetails?.Employee_FirstName === undefined) {
            newErrors.Employee_FirstName = "Received By is required"
        }
        if (materialConversionInputs?.Received_Item === "" || materialConversionInputs?.Received_Item === null || materialConversionInputs?.Received_Item === undefined) {
            newErrors.Received_Item = "Received Item is required"
        }
        if (materialConversionInputs?.UOM === "" || materialConversionInputs?.UOM === null || materialConversionInputs?.UOM === undefined) {
            newErrors.UOM = "UOM is required"
        }
        if (materialConversionInputs?.Received_QTY === "" || materialConversionInputs?.Received_QTY === null || materialConversionInputs?.Received_QTY === undefined) {
            newErrors.Received_QTY = "Received QTY is required"
        }
        // if (materialConversionInputs?.Receipt_Type === "" || materialConversionInputs?.Receipt_Type === null || materialConversionInputs?.Receipt_Type === undefined) {
        //     newErrors.Receipt_Type = "Receipt Type is required"
        // }
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
                    Material_Issue_No: materialConversionInputs?.Material_Issue_No,
                    Receipt_Date: materialConversionInputs?.Receipt_Date,
                    Received_By: `${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`,
                    Requester_Id: employeeId,
                    Received_Item: materialConversionInputs?.Received_Item,
                    UOM: materialConversionInputs?.UOM,
                    Stock_QTY: materialConversionInputs?.Stock_QTY,
                    WAR: materialConversionInputs?.WAR,
                    Closing_Stock: materialConversionInputs?.Closing_Stock,
                    Received_QTY: Number(materialConversionInputs?.Received_QTY),
                    Issued_QTY: Number(materialConversionInputs?.Issued_QTY),
                    Receipt_Type: materialConversionInputs?.Receipt_Type,
                    Approved_By: materialConversionInputs?.Approved_By || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Item_Id: materialConversionInputs?.Item_Id || 105,
                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .post(`${BASE_URL}/Erpapp/MaterialconvertionReceiptCRUD/`, payload, header)
                    .then((respon) => {
                        console.log("gkjvjhjv", respon);
                        if (respon?.status === 201 && respon?.data?.id) {
                            toast.success("The Material Request is Created Successfully ");
                            listOfDesignations();
                            setListDesignation(true);
                            setCreateDesignation(false);
                            setMaterialConversionInputs({
                                Matcon_Receipt_Id: "",
                                Receipt_Date: "",
                                Requester_Id: "",
                                Received_By: "",
                                Original_Item: "",
                                UOM: "",
                                Received_Item: "",
                                Issued_Value: "",
                                Received_QTY: "",
                                Issued_QTY: "",
                                Receipt_Type: "",
                                Approved_By: "",
                                Store_Id: "",
                                Partner_Id: "",
                            });

                            // create a history
                            handleCreateHistory(respon?.data?.Matcon_Receipt_Id, id3, "material conversion receipt", header)

                        } else {
                            toast.error("Material Conversion Receipt Matching Query Doesn't Exist.")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        handleError(error)
                    });
            } else {
                var payload = {
                    ...materialConversionInputs,
                    Matcon_Receipt_Id: materialConversionInputs?.Matcon_Receipt_Id,
                    Material_Issue_No: materialConversionInputs?.Material_Issue_No,
                    Receipt_Date: materialConversionInputs?.Receipt_Date,
                    Received_By: `${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`,
                    Requester_Id: employeeId,
                    Received_Item: materialConversionInputs?.Received_Item,
                    UOM: materialConversionInputs?.UOM,
                    Stock_QTY: materialConversionInputs?.Stock_QTY,
                    WAR: materialConversionInputs?.WAR,
                    Closing_Stock: materialConversionInputs?.Closing_Stock,
                    Received_QTY: Number(materialConversionInputs?.Received_QTY),
                    Issued_QTY: Number(materialConversionInputs?.Issued_QTY),
                    Receipt_Type: materialConversionInputs?.Receipt_Type,
                    Approved_By: materialConversionInputs?.Approved_By || employeeId,
                    Store_Id: parseInt(materialConversionInputs?.Store_Id),
                    Item_Id: materialConversionInputs?.Item_Id,
                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                    Company_Id: parseInt(localStorage.getItem("OrganizationId")),
                    Created_Date: new Date().toJSON().slice(0, 10),
                    Created_By: parseInt(localStorage.getItem("EmployeeId")),
                    Updated_By: parseInt(localStorage.getItem("EmployeeId")),
                };
                await axios
                    .put(`${BASE_URL}/Erpapp/MaterialconvertionReceiptCRUD/`, payload, header)
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
                            if (materialConversionInputs?.Material_Issue_No !== materialConversionInputs1?.Material_Issue_No) {
                                EditedArr.push("Material Conversion Issue");
                            }
                            if (materialConversionInputs?.Received_QTY !== materialConversionInputs1?.Received_QTY) {
                                EditedArr.push("Received Quantity");
                            }


                            let editUser = localStorage.getItem("Username");
                            if (EditedArr?.length > 0 || changedValueKey?.length > 0) {
                                axios
                                    .post(
                                        `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                                        {
                                            Document_Id: respon?.data?.Matcon_Receipt_Id,
                                            Updated_Person: `${editUser} edited this material conversion receipt.`,
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
                            toast.error("Material Conversion Receipt Matching Query Doesn't Exist.")
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
                {`${responsedata?.id ? "Edit" : "Create"}`} Material Conversion Receipt
            </Typography>
            <form onSubmit={handleSubmitRequest}>
                <Div className="row" sx={{ minHeight: "400px" }}>

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container >
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Material Receipt No <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Matcon_Receipt_Id"
                                        value={materialConversionInputs?.Matcon_Receipt_Id}
                                        onChange={handleChange}
                                        placeholder={transactionSeriesType === "Automatic" ? "Auto Generated" : "Material Receipt No"}
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
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    MC Issue No <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Material_Issue_No"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option?.Matcon_Issue_Id) {
                                                return option?.Matcon_Issue_Id;
                                            }
                                            return "";
                                        }}
                                        options={issueLists}
                                        value={responsedata?.id === undefined ? issueLists?.find((opt) => opt?.Matcon_Issue_Id === materialConversionInputs?.Material_Issue_No) || null : materialConversionInputs?.Material_Issue_No}
                                        onChange={(e, newValue) => {
                                            console.log("newValuenewValue", newValue)
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Material_Issue_No: newValue?.Matcon_Issue_Id,
                                                Received_Item: newValue?.Requested_Item,
                                                Item_Id: newValue?.Item_Id,
                                                UOM: newValue?.UOM,
                                            })
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            option?.Matcon_Issue_Id === value || value === ""
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="MC Issue No"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Material_Issue_No && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Material_Issue_No}</span>}
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Received Item <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Received_Item"
                                        value={materialConversionInputs?.Received_Item}
                                        onChange={handleChange}
                                        placeholder="Received Item"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                    {!materialConversionInputs?.Received_Item && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Received_Item}</span>}
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
                                    Closing Stock <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Closing_Stock"
                                        value={materialConversionInputs?.Closing_Stock || 0}
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

                    <Div className="col-12 col-md-6 col-lg-6">
                        <Grid container>
                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Received By <span className="required">*</span>
                                </Typography>
                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <TextField
                                        className="col-12 input-box"
                                        name="Received_By"
                                        value={`${employeeDetails?.Employee_FirstName} ${employeeDetails?.Employee_LasttName}`}
                                        onChange={handleChange}
                                        placeholder="Received By"
                                        variant="outlined"
                                        autoComplete="off"
                                        disabled
                                    />
                                </Div>
                            </Grid>

                            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Receipt Date <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <ErpDateField
                                        id="Receipt_Date"
                                        name="Receipt_Date"
                                        inputValue={materialConversionInputs?.Receipt_Date}
                                        handleInputChange={handleChange}
                                        placeholder="Receipt Date"
                                        variant="outlined"
                                    />
                                    {!materialConversionInputs?.Receipt_Date && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Receipt_Date}</span>}
                                </Div>
                            </Grid>

                            {/* <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography className="col-md-12 col-lg-6 col-xl-5 input-label" sx={{ mt: 2 }}>
                                    Receipt Type <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <Autocomplete
                                        className="search-select col-12"
                                        name="Receipt_Type"
                                        getOptionLabel={(option) => {
                                            if (typeof option === "string") {
                                                return option;
                                            }
                                            if (option && option) {
                                                return option;
                                            }
                                            return "";
                                        }}
                                        options={receiptTypes}
                                        value={responsedata?.id === undefined ? receiptTypes?.find((opt) => opt === materialConversionInputs?.Receipt_Type) || null : materialConversionInputs?.Receipt_Type}
                                        onChange={(e, newValue) => {
                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Receipt_Type: newValue
                                            })
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            option === value || value === ""
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Receipt Type"
                                                variant="outlined"
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                    {!materialConversionInputs?.Receipt_Type && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Receipt_Type}</span>}
                                </Div>
                            </Grid> */}

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
                                        options={stores}
                                        value={responsedata?.id === undefined ? stores?.find((opt) => opt?.Store_Name === materialConversionInputs?.Store_Name) || null : materialConversionInputs?.Store_Name}
                                        onChange={(e, newValue) => {
                                            let listItems = newValue?.Items?.find((opt) => opt?.Item_Name === materialConversionInputs?.Requested_Item)
                                            console.log("newValuenewValue", newValue)

                                            setMaterialConversionInputs({
                                                ...materialConversionInputs,
                                                Store_Id: newValue?.id,
                                                Store_Name: newValue?.Store_Name,
                                                Stock_QTY: listItems?.Opening_Stock,
                                                WAR: listItems?.Unit_Price,
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
                                    Received Qty <span className="required">*</span>
                                </Typography>

                                <Div className="col-md-12 col-lg-6 col-xl-6">
                                    <NumericTextField
                                        className="col-12 input-box"
                                        name="Received_QTY"
                                        value={materialConversionInputs?.Received_QTY}
                                        onChange={handleChange}
                                        placeholder="Received Qty"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    {!materialConversionInputs?.Received_QTY && <span style={{ color: "red", fontSize: "13px" }}>{errors?.Received_QTY}</span>}
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

export default CreateMaterialReceiptConversion
