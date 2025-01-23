import Div from "@jumbo/shared/Div";
import {
  Button,
  FormControl,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import "./partners.css";
import itemServices from "app/services/item-master-services";
import { DataContext } from "app/pages/settings/Organization/OrganizationStructure";
import { handleCreateHistory } from "app/shared/ReuseComponents/UpdatedHistoryRecords";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { ErpDateField } from "app/shared/ReuseComponents/ButtonComponent";
import { todayDate } from "app/shared/ReuseComponents/DateFormatter";



const CreatePartner = ({
  scrollHeight,
  setCreateMaterial,
  setListMaterial,
}) => {


  const {
    entities,
    countries,
    regions,
    states,
    cities,
    id,
    id1,
    id2,
    id3,
    name,
    name1,
    name2,
    name3,
    name4,
    setName4,
    checkId5,
    setCheckId5,
    getId,
    getId1,
    getId2,
    getId3,
    getId4,
    setGetId4,
    getCityDatas,
    getStates,
  } = useContext(DataContext);

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

  const partnerId = parseInt(localStorage.getItem("PartnerId"));

  // Get Users
  const [OwnerNames, setOwnerNames] = useState([]);
  const [HeadOperation, setHeadOperation] = useState("");

  const [values, setValues] = useState({
    Bussiness_Unit: "",
    Operated_By: "",
    Contact: "",
    Email: "",
    Website: "",
    Head_Of_Operation: "",
    Address_1: "",
    Address_2: "",
    City: "",
    State: "",
    Country: "",
    Pin_Code: "",
    Pan_No: "",
    GST_No: "",
    Agreement_Ref: "",
    Valid_Upto: "",
    Corporate_BU: false,
    Commision_Paid: "",
  });


  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Erpapp/Userlistwithoutpagination/`, header);
      console.log("oji", response?.data);
      setOwnerNames(response?.data?.map((item) => `${item?.first_name} ${item?.last_name}`));
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getUsers();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const [selectedCountry, setSelectedCountry] = useState(name1);
  const [selectedState, setSelectedState] = useState(name3);
  const [selectedCity, setSelectedCity] = useState(name4);

  const [managedByLists, setManagedByLists] = useState([]);
  const [countryLists, setCountryLists] = useState([]);
  const [stateLists, setStateLists] = useState([]);
  const [cityLists, setCityLists] = useState([]);
  const [countryId, setCountryId] = useState(getId1);
  const [stateId, setStateId] = useState(getId3);
  const [cityId, setcityId] = useState(getId4);


  const getCountryLists = () => {
    axios
      .get(`https://countriesnow.space/api/v0.1/countries`, {
        headers: {
          //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res?.data?.data);
        setCountryLists(res?.data?.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getStateLists = () => {
    axios.post(
      `https://countriesnow.space/api/v0.1/countries/states`,
      { country: selectedCountry },
      {
        headers: {
          //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res?.data?.data);
        var state = res?.data?.data;
        setStateLists(state?.states);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCityLists = () => {
    var payload = {
      country: selectedCountry,
      state: selectedState,
    };

    axios
      .post(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
        var city = res?.data?.data;
        var citynames = city?.map((cityname) => {
          const normalizedCity = cityname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (normalizedCity === "Naini Tal") {
            return normalizedCity.replace(" ", "");
          }
          return normalizedCity;
        });
        setCityLists(citynames);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  useEffect(() => {
    getCountryLists();
    getStateLists();
    getCityLists();
  }, [countryId, stateId, selectedCountry, selectedState, cityId]);


  useEffect(() => {
    // get managed by from lookup
    const getManagedBy = () => {
      var unitpayload = {
        Search: "Managed By",
      };
      itemServices
        .getUnits(unitpayload, header)
        .then((res) => {
          console.log(res[0].value);
          setManagedByLists(res[0].value);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getManagedBy();
  }, []);


  const handleCreateBU = async (e) => {
    e.preventDefault();
    let itempayload = {
      Partner_Name: values?.Bussiness_Unit,
      Operated_By: values?.Operated_By,
      HeadOf_Operation: HeadOperation,
      BusinessUnit_Phone: values?.Contact,
      BusinessUnit_EMail: values?.Email,
      BusinessUnit_Web: values?.Website,
      BusinessUnit_Addressline1: values?.Address_1,
      BusinessUnit_City: selectedCity,
      BusinessUnit_Country: selectedCountry,
      BusinessUnit_State: selectedState,
      BusinessUnit_Zone: "",
      BusinessUnit_Pincode: values?.Pin_Code,
      BusinessUnit_PanNo: values?.Pan_No,
      BusinessUnit_GSTNo: values?.GST_No,
      Agreement_RefNo: values?.Agreement_Ref,
      Agreement_Validupto: values?.Valid_Upto ? values?.Valid_Upto : "0001-01-01",
      Ofc_Starttime: values?.Ofc_Starttime,
      Ofc_Endtime: values?.Ofc_Endtime,
      Total_hours: values?.Total_hours,
      Corporate_BU: values?.Corporate_BU,
      Commision_Paid: values?.Commision_Paid || 0,
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
      Created_Date: todayDate,
      Updated_Date: todayDate,
    }

    console.log("itempayload :", itempayload);
    try {
      const res = await axios.post(`${BASE_URL}/Erpapp/PartnerCRUD/`, itempayload, header)
      console.log("res", res);

      if (res?.data?.id) {
        // reset values
        setValues({
          Operated_By: "",
          Head_Of_Operation: " ",
          Contact: "",
          Email: "",
          Website: "",
          Address_1: "",
          Address_2: "",
          City: "",
          State: "",
          Country: "",
          Pin_Code: "",
          Pan_No: "",
          GST_No: "",
          Agreement_Ref: "",
          Valid_Upto: "",
        })
        setHeadOperation("");

        toast.success(`Business Unit Created Successfully`);
        setCreateMaterial(false);
        setListMaterial(true);

        // history of updated records
        handleCreateHistory(res?.data?.Partner_Id, res?.data?.id, "Business Unit", header)

      }
    }
    catch (error) {
      console.log(error);
      handleError(error)
      // toast.error("You do not have permission to perform this action.");
    }
  }

  const handleChangeItem = async (e) => {
    if (e.target.name === "Pin_Code") {
      // let API_KEY = '65afa4042e767571080003lgca37daa'
      // await axios.get(`https://geocode.maps.co/search?q=${e.target.value}&api_key=${API_KEY}`).then((res) => {
      //   console.log("PPPP...", res)
      //   let result = res.data.results || [];
      //   if (result) {
      //     console.log("result", result)
      //     toast.success("Pincode is valid")
      //   } else {
      //     toast.error("Please enter a valid pincode");
      //   }
      // }).catch((error) => {
      //   console.log(error);
      //   toast.error(error.message);
      // })

      const getValue = e.target.value

      setValues({ ...values, ["Pin_Code"]: getValue });
      try {
        const response = await axios.get(`${BASE_URL}/Erpapp/PincodeCRUD/?pincode=${getValue}`, header);
        const pincodeData = response?.data;
        // const pincodeExists = pincodeData?.some((opt) => opt?.cityname?.toLowerCase() === selectedCity?.toLowerCase());

        if (getValue?.length > 5) {
          if (pincodeData?.length > 0) {
            toast.success("Pincode is valid");
          } else {
            toast.error("The provided pincode doesn't exist in the city.");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Please enter a valid pincode");
      }


    } else if (e.target.name === "Commision_Paid") {
      const regex = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
      const getValue = e.target.value

      if (regex.test(getValue)) {
        setValues({ ...values, ["Commision_Paid"]: getValue });
      } else {
        setValues({ ...values, ["Commision_Paid"]: "" });
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };


  // get a total office hours
  useEffect(() => {
    // const fromTimeObject = new Date(`2022-01-01T${values?.Ofc_Starttime}`);
    // const toTimeObject = new Date(`2022-01-01T${values?.Ofc_Endtime}`);
    // const timediff = toTimeObject.getTime() - fromTimeObject.getTime();
    // const totalhours = timediff / (1000 * 60 * 60);
    // console.log("totalhours",totalhours)
    // setValues({ ...values, ["Total_hours"]: totalhours.toFixed(2) });
    const yearB = new Date().getFullYear()
    console.log("yearB", yearB)
    const fromTimeObject = new Date(`${yearB}-01-01T${values?.Ofc_Starttime}`);
    const toTimeObject = new Date(`${yearB}-01-01T${values?.Ofc_Endtime}`);

    const timeDiff = Math.abs(toTimeObject - fromTimeObject);
    console.log("timeDiff", timeDiff);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    let totalhours = 0.0
    if (values?.Ofc_Starttime && values?.Ofc_Endtime) {
      totalhours = `${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
    }
    else {
      totalhours = 0.0;
    }
    console.log("totalhours...", totalhours)
    setValues({ ...values, ["Total_hours"]: totalhours });
  }, [values?.Ofc_Starttime, values?.Ofc_Endtime]);



  const [open, setOpen] = useState(false);

  const handleClickCancel = (newState) => {
    // navigate("/purchase/purchase-request-list");
    setCreateMaterial(false);
    setListMaterial(true);
    setOpen(false);
  };

  return (
    <>
      <Div>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Create Business Unit
        </Typography>

        <form onSubmit={handleCreateBU}>
          <Div className="row" sx={{ mt: 3 }}>
            <Div className="col-12 col-md-6">
              <Grid container>
                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Business Unit Name <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Bussiness_Unit"
                      value={values?.Bussiness_Unit}
                      onChange={handleChangeItem}
                      className="input-box"
                      id="outlined-basic"
                      placeholder="Business Unit Name"
                      variant="outlined"
                    />
                    {/* <Div style={{ color: "red" }}> */}
                    {/* {errors.supplierName?.message} */}
                    {/* </Div> */}
                  </FormControl>


                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Head Of Operation <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <Autocomplete
                      className="col-12 search-select"
                      id="combo-box-demo"
                      disablePortal
                      name="Head_Of_Operation"
                      options={OwnerNames}
                      getOptionLabel={(option) => option}
                      onChange={(e, newValue) => {
                        setHeadOperation(newValue);
                        console.log(newValue);
                      }}
                      value={HeadOperation}
                      renderInput={(params) => <TextField {...params} placeholder="Head Of Operation" />}
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Email Id <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Email"
                      value={values?.Email}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Email Id"
                      variant="outlined"
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Address Line 1 <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Address_1"
                      value={values?.Address_1}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Address Line 1"
                      variant="outlined"
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Country<span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <Autocomplete
                      className="search-select col-12"
                      name="selectedCountry"
                      options={countryLists}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.country) {
                          return option?.country;
                        }
                        return "";
                      }}
                      value={selectedCountry}
                      onChange={(e, newValue) => {
                        setSelectedCountry(newValue?.country);
                        setCountryId(newValue?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a country"
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    City<span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <Autocomplete
                      className="search-select col-12"
                      name="selectedCity"
                      options={cityLists}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option) {
                          return option;
                        }
                        return "";
                      }}
                      value={selectedCity}
                      onChange={(e, newValue) => {
                        setSelectedCity(newValue);
                        setcityId(newValue?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a city"
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    PAN No
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Pan_No"
                      value={values?.Pan_No}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="PAN No"
                      variant="outlined"
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Agreement Ref No
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      className="col-12 input-box"
                      name="Agreement_Ref"
                      value={values?.Agreement_Ref}
                      onChange={handleChangeItem}
                      placeholder="Agreement Ref No"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Office Timing From <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      type="time"
                      name="Ofc_Starttime"
                      value={values?.Ofc_Starttime}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="From Time"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Total Hours <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      type="text"
                      name="Total_hours"
                      value={values?.Total_hours}
                      // onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Total Hours"
                      variant="outlined"
                      disabled
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Commision Paid
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      type="text"
                      name="Commision_Paid"
                      value={values?.Commision_Paid}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Commision Paid"
                      variant="outlined"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                      }}
                    />
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Corporate BU
                  </Typography>
                  <FormGroup className="col-md-12 col-lg-5 col-xl-6">
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="" />
                  </FormGroup>
                </Grid> */}

              </Grid>
            </Div>

            <Div className="col-12 col-md-6">
              <Grid container>
                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Managed By <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <Autocomplete
                      className="search-select col-12"
                      name="Operated_By"
                      options={managedByLists}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.value) {
                          return option?.value;
                        }
                        return "";
                      }}
                      value={values?.Operated_By}
                      onChange={(e, newValue) => {
                        setValues({ ...values, ["Operated_By"]: newValue?.value });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Managed By"
                          autoComplete="off"
                        />
                      )}
                    />
                    {/* <Select className="col-12 input-select"
                      onChange={handleChangeItem}
                      name="Operated_By"
                      defaultValue="ManagedBy"
                    >
                      <MenuItem value="ManagedBy" style={{ display: "none", }}>Managed By</MenuItem>
                      <MenuItem value="Partner">Partner</MenuItem>
                      <MenuItem value="Owner">Owner</MenuItem>
                    </Select> */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Contact No <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField className="col-12 search-select"
                      name="Contact"
                      value={values?.Contact}
                      onChange={handleChangeItem}
                      variant="outlined"
                      placeholder="Contact No"
                    />
                    {/* <Div style={{ color: "red" }}>{errors.poNumber?.message}</Div> */}
                    {/*  */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Website
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Website"
                      value={values?.Website}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Website"
                      variant="outlined"
                    />
                    {/* <Div style={{ color: "red" }}>{errors.poNumber?.message}</Div> */}
                    {/*  */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Address Line 2 <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Address_2"
                      value={values?.Address_2}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Address Line 2"
                      variant="outlined"
                    />
                    {/* <Div style={{ color: "red" }}>{errors.poNumber?.message}</Div> */}
                    {/*  */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    State <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <Autocomplete
                      className="search-select col-12"
                      name="selectedState"
                      options={stateLists}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.name) {
                          return option?.name;
                        }
                        return "";
                      }}
                      value={selectedState}
                      onChange={(e, newValue) => {
                        setSelectedState(newValue?.name);
                        setStateId(newValue?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a state"
                          autoComplete="off"
                        />
                      )}
                    />

                    {/* <TextField
                    name="State"
                    value={values.State}
                    onChange={handleChangeItem}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="State"
                    variant="outlined"
                  /> */}
                    {/* <Div style={{ color: "red" }}>{errors.poNumber?.message}</Div> */}
                    {/*  */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    PIN Code <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="Pin_Code"
                      value={values?.Pin_Code}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="PIN Code"
                      variant="outlined"
                    />
                    {/* <Div style={{ color: "red" }}>{errors.poNumber?.message}</Div> */}
                    {/*  */}
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    GST No
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      name="GST_No"
                      value={values?.GST_No}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="GST No"
                      variant="outlined"
                    />
                  </FormControl>

                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Valid Upto
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <ErpDateField
                      id="Valid_Upto"
                      name="Valid_Upto"
                      inputValue={values?.Valid_Upto}
                      handleInputChange={handleChangeItem}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Office Timing To <span className="required">*</span>
                  </Typography>
                  <FormControl className="col-md-12 col-lg-5 col-xl-6">
                    <TextField
                      type="time"
                      name="Ofc_Endtime"
                      value={values?.Ofc_Endtime}
                      onChange={handleChangeItem}
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="To Time"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Corporate BU
                  </Typography>
                  <FormGroup className="col-md-12 col-lg-5 col-xl-6">
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="" />
                  </FormGroup>
                </Grid>

                {/* <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                    Working Days
                  </Typography>
                  <FormGroup className="col-md-12 col-lg-5 col-xl-6" sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: 3 }}>
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Sunday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Monday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Tuesday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Wednesday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Thursday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Friday" />
                    <FormControlLabel control={<Checkbox value={values?.Corporate_BU} onChange={(e) => {
                      setValues({
                        ...values,
                        Corporate_BU: e.target.checked
                      })
                    }} />} label="Saturday" />
                  </FormGroup>
                </Grid> */}

              </Grid>
            </Div>
          </Div>

          {/* code for purchase list table */}
          <Div className="buttons" sx={{ mt: 5, ml: 1, display: "flex", justifyContent: "flex-start" }}>
            <ButtonGroup
              type="submit"
              aria-label="split button"
              sx={{ mr: { sm: 0, md: 2 } }}
            >
              <Button type="submit" className="plus-button">
                Save
              </Button>
              <Button variant="contained" className="icon-button">
                <FaSave size={18} />
              </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="split button" onClick={handleClickCancel}>
              <Button className="plus-button">Cancel</Button>
              <Button variant="contained" className="icon-button">
                <TiCancel size={24} />
              </Button>
            </ButtonGroup>

          </Div>
        </form>
      </Div>
    </>
  );
};



export default CreatePartner;