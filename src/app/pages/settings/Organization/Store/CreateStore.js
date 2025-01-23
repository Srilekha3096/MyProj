import Div from "@jumbo/shared/Div";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { fetchTransactionSeries } from "app/shared/ReuseComponents/DateFormatter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { storesValidationSchema } from "app/schemas/SettingValidationSchemas";
import { BASE_URL } from "app/services/auth-services";
import hrApiServices from "app/services/hr-api-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { handleCreateHistory } from "app/shared/ReuseComponents/UpdatedHistoryRecords";



const CreateStore = ({ countries, states, cities, zones, name1, name3, name4, name5, name6, getId5, openCreateStore, setOpenCreateStore, getStores, fullScreen }) => {
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


    const [partnerId, setPartnerId] = useState(getId5);
    const [partnerName, setPartnerName] = useState(name5);
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeIncharge, setStoreIncharge] = useState("");
    const [location, setLocation] = useState(name6);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");


    const [employeeLists, setEmployeeLists] = useState([]);
    const [businessUnitList, setBusinessUnitList] = useState([]);


    const getPartnerLists = async () => {
        await axios
            .get(`${BASE_URL}/Erpapp/PartnerListreportDropdown/`, header)
            .then((response) => {
                if (response) {
                    const list = response?.data?.filter((opt) => opt?.BusinessUnit_City === selectedCity)
                    setBusinessUnitList(list);
                }
            })
            .catch((error) => {
                console.log("Error in retrieving business unit list===>", error);
            });
    };


    // get employee list
    useEffect(() => {
        const fetchEmployeeList = async () => {
            try {
                const res = await hrApiServices.listofDropdownEmployees(partnerId, header);
                if (res) {
                    console.log("RES", res)
                    setEmployeeLists(res);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployeeList();
    }, [partnerId]);


    useEffect(() => {
        getPartnerLists();
    }, []);

    const [buildingName, setBuildingName] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(name1);
    const [selectedState, setSelectedState] = useState(name3);
    const [selectedCity, setSelectedCity] = useState(name4);



    const handleSearchLocation = useCallback(async () => {
        try {
            if (location !== undefined && location !== "") {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`);
                const data = await response.json();
                console.log("dataaa", data)
                if (data?.length > 0) {
                    setLatitude(data[0].lat);
                    setLongitude(data[0].lon);
                } else {
                    setLatitude('');
                    setLongitude('');
                    toast.error('Location not found');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [location]);


    useEffect(() => {
        handleSearchLocation()
    }, [location])



    const handleCloseCreateStore = () => {
        setStoreName("");
        setBuildingName("");
        setLocation("");
        setPartnerName("");
        setStoreIncharge("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        setLongitude("");
        setLatitude("");
        reset();
        setOpenCreateStore(false)
    };



    const {
        reset,
        register,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(storesValidationSchema),
    });


    const [transactionSeriesType, setTransactionSeriesType] = useState("");

    useEffect(() => {
        const transactionSeries = fetchTransactionSeries("Stores")

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
    }, [transactionSeriesType])



    const handleCreateStore = () => {


        var storepayload = {
            Type: "",
            Store_Name: storeName,
            StoreBuilding_Name: buildingName,
            Store_Street: "",
            Store_Area: location,
            Store_City: selectedCity,
            Store_State: selectedState,
            Store_Country: selectedCountry,
            Store_Incharge: storeIncharge,
            Own_Partner: partnerName,
            Items: [{
                id: "",
                Upload_Image: "",
                Category: "",
                Item_Group: "",
                Item_Code: "",
                Item_Name: "",
                UOM: "",
                Unit_Price: 0,
                Opening_Stock: 0,
                ReOrder_Lvl: 0,
                Min_Stock_Lvl: 0
            }],
            Longitude: longitude,
            Lotitude: latitude,
            Partner_OrganizationId: localStorage.getItem("OrganizationId"),
            Store_UserId: localStorage.getItem("UserId"),
            Partner_Id: parseInt(partnerId),
            Company_Id: parseInt(localStorage.getItem("OrganizationId")),
            Created_Date: new Date().toJSON().slice(0, 10),
            Created_By: parseInt(localStorage.getItem("UserId")),
            Updated_By: parseInt(localStorage.getItem("UserId")),
        };

        axios
            .post(`${BASE_URL}/Erpapp/StoremasterCRUD/`, storepayload, header)
            .then((respon) => {
                console.log(respon?.data);
                if (respon?.data?.id) {
                    toast.success("Store information created successfully!");
                    reset();

                    setStoreName("");
                    setBuildingName("");
                    setLocation("");
                    setPartnerName("");
                    setStoreIncharge("");
                    setSelectedCountry("");
                    setSelectedState("");
                    setSelectedCity("");
                    setLongitude("");
                    setLatitude("");

                    setOpenCreateStore(false);
                    getStores();

                    // create a history
                    handleCreateHistory(respon?.data?.Store_Id, partnerId, "store", header)

                } else {
                    toast.error("Error updating store information.");
                }
            })
            .catch((error) => {
                console.log(error);
                handleError(error)
            });
    }


    return (
        <Dialog
            fullScreen={fullScreen}
            maxWidth="lg"
            open={openCreateStore}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Create Store
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleCreateStore)}>
                    <Div sx={{ minHeight: "250px" }}>
                        <Grid container xs={12}>
                            <Grid item xs={12} md={6}>
                                <Grid container xs={12}>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Store Id <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <TextField
                                                className="col-12 input-box"
                                                name="storeId"
                                                {...register("storeId")}
                                                value={storeId}
                                                onChange={(e) => {
                                                    setStoreId(e.target.value);
                                                }}
                                                placeholder={transactionSeriesType === "Automatic" ? "Auto Generated" : "Store Id"}
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
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Store Name <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <TextField
                                                className={`col-12 input-box  ${errors.storeName ? "is-invalid" : ""
                                                    }`}
                                                name="storeName"
                                                {...register("storeName")}
                                                value={storeName}
                                                onChange={(e) => {
                                                    setStoreName(e.target.value);
                                                    console.log(e.target.value);
                                                }}
                                                placeholder="Store Name"
                                                autoComplete="off"
                                            />
                                            <Div style={{ color: "red" }}>
                                                {!storeName && errors.storeName?.message}
                                            </Div>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Building Name <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <TextField
                                                className={`col-12 input-box  ${errors.buildingName ? "is-invalid" : ""
                                                    }`}
                                                name="buildingName"
                                                {...register("buildingName")}
                                                value={buildingName}
                                                onChange={(e) => setBuildingName(e.target.value)}
                                                placeholder="Building Name"
                                                autoComplete="off"
                                            />
                                            <Div style={{ color: "red" }}>
                                                {!buildingName && errors.buildingName?.message}
                                            </Div>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Country <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.countryName ? "is-invalid" : ""
                                                        }`}
                                                    name="countryName"
                                                    options={countries}
                                                    getOptionLabel={(option) => option ? option?.Country_Name : ""}
                                                    value={countries?.find(
                                                        (option) => option?.Country_Name === selectedCountry
                                                    ) || null}
                                                    onChange={(event, newValue) => {
                                                        setSelectedCountry(newValue?.Country_Name);
                                                        setSelectedState(null); // Reset selectedState
                                                        setSelectedCity(null); // Reset selectedCity
                                                        console.log("Selected Country:", newValue);
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("countryName")}
                                                            placeholder="Select Country"
                                                        />
                                                    )}
                                                    disabled
                                                />
                                                <Div style={{ color: "red" }}>
                                                    {!selectedCountry && errors.countryName?.message}
                                                </Div>
                                            </FormControl>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            State <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.stateName ? "is-invalid" : ""
                                                        }`}
                                                    name="stateName"
                                                    options={states}
                                                    getOptionLabel={(option) => option ? option?.State_Name : ""}
                                                    value={states?.find(
                                                        (option) => option?.State_Name === selectedState
                                                    ) || null}
                                                    onChange={(event, newValue) => {
                                                        setSelectedState(newValue?.State_Name);
                                                        setSelectedCity(null); // Reset selectedCity
                                                        console.log("Selected State:", newValue);
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("stateName")}
                                                            placeholder="Select State"
                                                        />
                                                    )}
                                                    disabled
                                                />
                                                <Div style={{ color: "red" }}>
                                                    {!selectedState && errors.stateName?.message}
                                                </Div>
                                            </FormControl>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            City <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.cityName ? "is-invalid" : ""
                                                        }`}
                                                    name="cityName"
                                                    options={cities}
                                                    getOptionLabel={(option) => option ? option?.City_Name : ""}
                                                    value={cities?.find(
                                                        (option) => option?.City_Name === selectedCity
                                                    ) || null}
                                                    onChange={(event, newValue) => {
                                                        setSelectedCity(newValue?.City_Name);
                                                        console.log("Selected City:", newValue);
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("cityName")}
                                                            placeholder="Select City"
                                                        />
                                                    )}
                                                    disabled
                                                />
                                                <Div style={{ color: "red" }}>
                                                    {!selectedCity && errors.cityName?.message}
                                                </Div>
                                            </FormControl>
                                        </Div>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Grid container xs={12}>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-sm-12 col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Choose a BU <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-sm-12 col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.partnerName ? "is-invalid" : ""
                                                        }`}
                                                    onFocus={getPartnerLists}
                                                    name="partnerName"
                                                    options={businessUnitList?.map(
                                                        (partnerlist) => partnerlist
                                                    )}
                                                    getOptionLabel={(option) => option?.Partner_Name}
                                                    value={businessUnitList?.find(
                                                        (option) => option?.Partner_Name === partnerName
                                                    ) || null}
                                                    onChange={(e, newValue) => {
                                                        setPartnerName(newValue?.Partner_Name);
                                                        setPartnerId(newValue?.id);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("partnerName")}
                                                            placeholder="Choose a business unit"
                                                            autoComplete="off"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    disabled
                                                />
                                            </FormControl>
                                            <Div style={{ color: "red" }}>
                                                {!partnerName && errors.partnerName?.message}
                                            </Div>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Location <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.Location ? "is-invalid" : ""}`}
                                                    name="location"
                                                    options={zones}
                                                    getOptionLabel={(option) => option?.Zone_Name}
                                                    value={zones?.find(
                                                        (option) => option?.Zone_Name === location
                                                    ) || null}
                                                    onChange={(e, newValue) => {
                                                        setLocation(newValue?.Zone_Name);
                                                        handleSearchLocation(newValue?.Zone_Name)
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("location")}
                                                            placeholder="Location"
                                                            autoComplete="off"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    disabled
                                                />
                                            </FormControl>
                                            <Div style={{ color: "red" }}>
                                                {!location && errors.location?.message}
                                            </Div>
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Longitude <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <TextField
                                                className="col-12 input-box"
                                                name="longitude"
                                                value={longitude}
                                                placeholder="Longitude"
                                                autoComplete="off"
                                                disabled
                                            />
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Latitude <span className="required">*</span>
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <TextField
                                                className="col-12 input-box"
                                                name="latitude"
                                                value={latitude}
                                                placeholder="Latitude"
                                                autoComplete="off"
                                                disabled
                                            />
                                        </Div>
                                    </Grid>

                                    <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                        <Typography className="col-md-12 col-lg-6 col-xl-4 input-label" sx={{ mt: 2 }}>
                                            Store Incharge
                                        </Typography>
                                        <Div className="col-md-12 col-lg-6 col-xl-8">
                                            <FormControl className="col-12">
                                                <Autocomplete
                                                    className={`search-select col-12 ${errors.storeIncharge ? "is-invalid" : ""
                                                        }`}
                                                    name="storeIncharge"
                                                    options={employeeLists}
                                                    getOptionLabel={(option) => `${option?.Employee_FirstName} ${option?.Employee_LasttName}`}
                                                    value={employeeLists?.find(
                                                        (option) => `${option?.Employee_FirstName} ${option?.Employee_LasttName}` === storeIncharge
                                                    ) || null}
                                                    onChange={(e, newValue) => {
                                                        setStoreIncharge(`${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}`);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            {...register("storeIncharge")}
                                                            placeholder="Store Incharge"
                                                            autoComplete="off"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                            {/* <Div style={{ color: "red" }}>
                                                {!storeIncharge && errors.storeIncharge?.message}
                                            </Div> */}
                                        </Div>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Div>

                    {/* code for save and cancel button */}
                    <Div
                        className="buttons"
                        sx={{
                            mt: 5, mb: 3, display: "flex",
                            justifyContent: "end"
                        }}
                    >
                        <ButtonGroup
                            aria-label="split button"
                            type="submit"
                            color="primary"
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 },
                            }}
                        >
                            <Button type="submit" className="plus-button" sx={{ width: { md: "99px !important" } }}>
                                Save
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <FaSave size={18} />
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup
                            aria-label="split button"
                            onClick={handleCloseCreateStore}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button" sx={{ width: { md: "99px !important" } }}>Cancel</Button>
                            <Button variant="contained" className="icon-button">
                                <TiCancel size={20} />
                            </Button>
                        </ButtonGroup>
                    </Div>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default CreateStore