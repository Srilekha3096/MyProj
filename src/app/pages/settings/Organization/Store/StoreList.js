import Div from "@jumbo/shared/Div";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../OrganizationStructure";
import { toast } from "react-toastify";
import { storesValidationSchema } from "app/schemas/SettingValidationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "app/services/auth-services";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { fetchTransactionSeries } from "app/shared/ReuseComponents/DateFormatter";
import { Country } from "country-state-city";
import CreateStore from "./CreateStore";
import hrApiServices from "app/services/hr-api-services";
import dropdownApiServices from "app/services/dropdownapi-services";
import ViewStoreSettings from "./ViewStoreSettings";
import { ErpAlertViewDialogBox, ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";


const countryOptions = Country.getAllCountries();

const StoreList = (scrollHeight) => {
    const { name1, name3, name4, name5, name6, countries, states, cities, zones, getId4, getId5, getId6, id4, userRolePermissions } =
        useContext(DataContext);

    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [openListStore, setOpenListStore] = useState(true);
    const [openCreateStore, setOpenCreateStore] = useState(false);
    const [openEditStore, setOpenEditStore] = useState(false);
    const [openViewStore, setOpenViewStore] = useState(false);
    const [openDeleteStore, setOpenDeleteStore] = useState(false);
    const [overviewAlert, setOverviewAlert] = useState(false);


    const [cityName, setCityName] = useState({
        City_Name: name4
    });
    const [zoneName, setZoneName] = useState();
    const [pincode, setPincode] = useState("");
    const [cityId, setCityId] = useState(getId4);

    const [currentData, setCurrentData] = useState({})


    const [employeeName, setEmployeeName] = useState("");
    const [storeId, setStoreId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeIncharge, setStoreIncharge] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [location, setLocation] = useState("");

    const [partners, setPartners] = useState([]);
    const [employeeLists, setEmployeeLists] = useState([]);
    const [businessUnitList, setBusinessUnitList] = useState([]);
    const [storeLists, setStoreLists] = useState([]);


    const [selectedCountry, setSelectedCountry] = useState(name1);
    const [selectedState, setSelectedState] = useState(name3);
    const [selectedCity, setSelectedCity] = useState(name4);
    const [partnerId, setPartnerId] = useState(getId5);
    const [partnerName, setPartnerName] = useState(name5);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");



    const getPartnerLists = async () => {
        await axios
            .get(`${BASE_URL}/Erpapp/PartnerListreportDropdown/`, header)
            .then((response) => {
                if (response) console.log(response);
                setBusinessUnitList(response?.data);
            })
            .catch((error) => {
                console.log("Error in retrieving business unit list===>", error);
            });
    };

    useEffect(() => {
        getPartnerLists();
    }, []);

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


    const getStores = () => {
        dropdownApiServices
            .getStoreDropdownList(partnerId, header)
            .then((res) => {
                console.log(res);
                setStoreLists(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getStores()
    }, [])



    const handleAddZones = () => {
        setOpenCreateStore(true);
    };



    const handleClose = () => {
        setOpenEditStore(false);
        reset()
    };


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



    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(storesValidationSchema),
    });

    const handleUpdateStore = (e) => {
        e.preventDefault();

        var payload = {
            id: currentData?.id,
            Store_Id: currentData?.Store_Id,
            Store_Name: storeName,
            StoreBuilding_Name: buildingName,
            Store_Street: currentData?.Store_Street,
            Store_Area: location,
            Store_City: selectedCity,
            Store_State: selectedState,
            Store_Country: selectedCountry,
            Store_Incharge: storeIncharge,
            Own_Partner: partnerName,
            Items: currentData?.Items,
            Lotitude: latitude,
            Longitude: longitude,
            Partner_OrganizationId: localStorage.getItem("OrganizationId"),
            Store_UserId: localStorage.getItem("UserId"),
            Partner_Id: parseInt(partnerId),
            Company_Id: parseInt(localStorage.getItem("OrganizationId")),
            Created_Date: new Date().toJSON().slice(0, 10),
            Created_By: parseInt(localStorage.getItem("UserId")),
            Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
            .put(`${BASE_URL}/Erpapp/StoremasterCRUD/`, payload, header)
            .then((res) => {
                console.log(res?.data);
                if (res?.data?.id) {
                    toast.success("Updated Successfully");
                    getStores();
                    setOpenEditStore(false);

                    // Edited Fields History

                    let EditedArr = [];

                    if (storeName !== currentData?.Store_Name) {
                        EditedArr.push("Store Name");
                    }
                    if (buildingName !== currentData?.StoreBuilding_Name) {
                        EditedArr.push("Building Name");
                    }
                    if (location !== currentData?.Store_Area) {
                        EditedArr.push("Location");
                    }
                    if (selectedCity !== currentData?.Store_City) {
                        EditedArr.push("City");
                    }
                    if (selectedState !== currentData?.Store_State) {
                        EditedArr.push("State");
                    }
                    if (selectedCountry !== currentData?.Store_Country) {
                        EditedArr.push("Country");
                    }
                    if (storeIncharge !== currentData?.Store_Incharge) {
                        EditedArr.push("Store Incharge");
                    }
                    if (partnerName !== currentData?.Own_Partner) {
                        EditedArr.push("Business Unit");
                    }
                    if (latitude !== currentData?.Lotitude) {
                        EditedArr.push("Latitude");
                    }
                    if (longitude !== currentData?.Longitude) {
                        EditedArr.push("Longitude");
                    }


                    // history of updated records
                    let editUser = localStorage.getItem("Username");
                    if (EditedArr?.length > 0) {
                        axios
                            .post(
                                `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                                {
                                    Document_Id: currentData?.Store_Id,
                                    Updated_Person: `${editUser} edited this store.`,
                                    Is_Deleted: false,
                                    Updated_Time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                                    Updated_Field: EditedArr.join(","),
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
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Store is already exists");
            });
    };


    // edit store
    const editStoreById = async (data) => {
        setOpenEditStore(true);
        setCurrentData(data);

        await axios
            .get(`${BASE_URL}/Erpapp/StoremasterCRUD/?Store_Id=${data?.Store_Id}`, header)
            .then((res) => {
                console.log(res?.data);
                if (res?.data?.id) {
                    setStoreName(res?.data?.Store_Name);
                    setBuildingName(res?.data?.StoreBuilding_Name);
                    setLocation(res?.data?.Store_Area);
                    setSelectedCity(res?.data?.Store_City);
                    setSelectedState(res?.data?.Store_State);
                    setSelectedCountry(res?.data?.Store_Country);
                    setStoreIncharge(res?.data?.Store_Incharge);
                    setPartnerName(res?.data?.Own_Partner);
                    setPartnerId(res?.data?.Partner_Id?.id);
                    setLatitude(res?.data?.Lotitude);
                    setLongitude(res?.data?.Longitude);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    // delete store
    const deleteStoreById = async (data) => {
        const previousRecordResponse = await handleGetAllServiceRelatedDatas(data);
        if (previousRecordResponse?.length > 0) {
            toast.warning("You cannot delete this record because it is being used somewhere.")
        } else {
            setOpenDeleteStore(true);
            setCurrentData(data);
        }
    }

    const handleDeleteStore = async () => {
        await axios
            .delete(`${BASE_URL}/Erpapp/StoremasterCRUD/?Store_Id=${currentData?.Store_Id}`, header)
            .then((res) => {
                console.log(res?.data);
                if (res?.data?.id) {
                    toast.success("Store Deleted Successfully.")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    // GetPartners
    const getPartners = async () => {
        await axios.get(`${BASE_URL}/Erpapp/PartnerListreportDropdown/`, header)
            .then((response) => {
                console.log("Partner Response", response?.data);
                const names = response?.data;
                const filterPartners = names?.filter((opt) => opt?.BusinessUnit_City === cityName?.City_Name)
                const uniqueNames = filterPartners?.filter(newName => !partners?.some(prevName => prevName.id === newName.id));
                console.log("filterPartners", uniqueNames, filterPartners)
                setPartners(filterPartners);
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        getPartners();
    }, [cityName]);


    const handleGetAllServiceRelatedDatas = async (data) => {
        try {
            const response = await axios.get(`${BASE_URL}/Erpapp/storeeditdropdownlist/?Partner_Id=${data?.Partner_Id}`, header);
            const filterData = response?.data;
            return filterData;
        } catch (error) {
            console.log(error);
        }
    }



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




    return (
        <>
            <Div>
                <Div
                    className="card"
                    sx={{ p: 2, borderRadius: 0, m: 0 }}
                >
                    <Div sx={{ display: openListStore === true ? "block" : "none" }}>
                        <Div
                            sx={{
                                position: "absolute",
                                right: 15,
                                // width: "100%",
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            {Array.isArray(userRolePermissions) && userRolePermissions.includes(301) && (
                                <ErpCreateButton handleClick={handleAddZones} name={"Add Store"} />
                            )}
                        </Div>
                        <br />

                        <Div sx={{ mt: { lg: 3, md: 5, xs: 5 }, minHeight: "300px" }}>
                            <JumboScrollbar
                                autoHeight={true}
                                autoHideTimeout={4000}
                                autoHeightMin={scrollHeight ? scrollHeight : 300}
                                autoHide={true}
                                hideTracksWhenNotNeeded
                                id="no-more-tables"
                            >
                                <Table stickyHeader className="table table-borderless">
                                    <TableHead className="table-head">
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Store Id</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Store Name</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Store Incharge</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Zone Name</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {storeLists?.filter((opt) => opt?.Store_Area === name6).length > 0 ? storeLists?.filter((opt) => opt.Store_Area === name6).map((store) => {
                                            return (
                                                <TableRow key={store.id}>
                                                    <TableCell padding="checkbox" data-title="Status">
                                                        <FormControlLabel
                                                            control={<Radio color="primary" size="small" />}
                                                        />
                                                    </TableCell>
                                                    <TableCell data-title="Store Id"
                                                        onClick={() => {
                                                            if (Array.isArray(userRolePermissions) && userRolePermissions.includes(303)) {
                                                                setOpenViewStore(true);
                                                                setOpenListStore(false);
                                                                setCurrentData(store);
                                                            } else {
                                                                setOverviewAlert(true);
                                                                setOpenListStore(true);
                                                                setOpenViewStore(false);
                                                            }
                                                        }}
                                                        sx={{ color: "#00BFFF", cursor: "pointer" }}
                                                    >
                                                        {store?.Store_Id}
                                                    </TableCell>
                                                    <TableCell data-title="Store Name">{store?.Store_Name}</TableCell>
                                                    <TableCell data-title="Store Incharge">{store?.Store_Incharge || "-"}</TableCell>
                                                    <TableCell data-title="Zone Name">{store?.Store_Area}</TableCell>
                                                    <TableCell data-title="Action">
                                                        <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={302} deletePermissionId={304} onClickEdit={() => editStoreById(store)} onClickDelete={() => deleteStoreById(store)} align="left" />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }) : (
                                            <TableRow>
                                                <TableCell colSpan={10} sx={{ textAlign: "center" }}>No Records</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </JumboScrollbar>
                        </Div>
                    </Div>

                    {openViewStore && Array.isArray(userRolePermissions) && userRolePermissions.includes(303) ? (
                        <ViewStoreSettings currentData={currentData} countries={countries} states={states} cities={cities} zones={zones} name1={name1} name3={name3} name4={name4} name5={name5} name6={name6} getId5={getId5} openViewStore={openViewStore} setEditOverviewItem={setOpenViewStore} openListStore={openListStore} setListStore={setOpenListStore} fullScreen={fullScreen} />

                    ) : (
                        <>
                            <ErpAlertViewDialogBox flag={overviewAlert} setFlag={setOverviewAlert} />
                        </>
                    )}

                </Div>

                <Div>
                    <Dialog
                        fullWidth
                        open={openEditStore}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="lg"
                    >
                        <form onSubmit={(handleUpdateStore)}>
                            <DialogContent>
                                <Div sx={{ mt: 2, minHeight: "300px" }}>
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
                                                            value={currentData?.Store_Id}
                                                            // onChange={(e) => {
                                                            //     setStoreId(e.target.value);
                                                            // }}
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
                                                        Store Incharge <span className="required">*</span>
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
                                                        <Div style={{ color: "red" }}>
                                                            {!storeIncharge && errors.storeIncharge?.message}
                                                        </Div>
                                                    </Div>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Div>
                            </DialogContent>

                            {/* code for save and cancel button */}
                            <DialogActions>
                                <Div className="buttons" sx={{
                                    mb: 3, display: "flex",
                                    justifyContent: "end"
                                }}>
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
                                            Update
                                        </Button>
                                        <Button variant="contained" className="icon-button">
                                            <FaSave size={18} />
                                        </Button>
                                    </ButtonGroup>

                                    <ButtonGroup
                                        aria-label="split button"
                                        onClick={handleClose}
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
                            </DialogActions>
                        </form>
                    </Dialog>
                </Div>

                <Div>
                    {openCreateStore &&
                        <CreateStore countries={countries} states={states} cities={cities} zones={zones} name1={name1} name3={name3} name4={name4} name5={name5} name6={name6} getId5={getId5} openCreateStore={openCreateStore} setOpenCreateStore={setOpenCreateStore} getStores={getStores} fullScreen={fullScreen} />
                    }


                    {openDeleteStore &&
                        <ErpDeleteDialogBox flag={openDeleteStore} setFlag={setOpenDeleteStore} handleClick={handleDeleteStore} content={"Are you sure you want to delete the store"} id={currentData?.Store_Name} />
                    }
                </Div>
            </Div>
        </>
    );
};

export default StoreList