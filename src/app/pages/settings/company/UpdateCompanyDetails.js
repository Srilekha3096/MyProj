import Div from "@jumbo/shared/Div";
import Span from "@jumbo/shared/Span";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { MdSave } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { CommonOverviewSkeleton } from "app/shared/ReuseComponents/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";



const date = [
  { label: 1, yearformat: "yyyy-MM-dd" },
  { label: 2, yearformat: "MM-dd-yyyy" },
  { label: 3, yearformat: "dd-MM-yyyy" },
];

const currencies = [
  { label: 1, curency: "INR", format: "Rupees - ₹" },
  { label: 2, curency: "USD", format: "Dollar - $" },
  { label: 3, curency: "JPY", format: "Yen – ¥" },
  { label: 4, curency: "EUR", format: "Euro - €" },
  { label: 5, curency: "BRL", format: "Real - R$" },
];


const UpdateCompanyDetails = ({ skeleton, id, compId }) => {
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



  const [business, setBusiness] = useState([]);
  const [companyAdd, setCompanyAdd] = useState({});
  const [fiscal, setFiscal] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [currency, setCurrency] = useState(null);
  const [currencyFormat, setCurrencyFormat] = useState(null);
  const [dateFormat, setDateFormat] = useState(null);
  const [fiscalMonth, setFiscalMonth] = useState(null);
  const [checkMonth, setCheckMonth] = useState(false);
  const [base64, setbase64] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [showProfile, setShowProfile] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showHour, setShowHour] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);

  const [accountingPeriods, setAccountingPeriods] = useState([]);
  const [errors, setErrors] = useState({})

  const [sunCheckbox, setSunCheckbox] = useState(false);
  const [monCheckbox, setMonCheckbox] = useState(false);
  const [tueCheckbox, setTueCheckbox] = useState(false);
  const [wedCheckbox, setWedCheckbox] = useState(false);
  const [thuCheckbox, setThuCheckbox] = useState(false);
  const [friCheckbox, setFriCheckbox] = useState(false);
  const [satCheckbox, setSatCheckbox] = useState(false);


  const [loadingStatus, setLoadingStatus] = useState(false);


  const ShowCompanyProfile = () => {
    setShowProfile(true);
    setShowHour(false);
    setShowYear(false);
    setShowDetails(false);
    setShowCurrencies(false);
  };

  const ShowCompanyDetails = () => {
    setShowDetails(true);
    setShowYear(false);
    setShowHour(false);
    setShowCurrencies(false);
    setShowProfile(false);
  };

  const ShowFiscalYear = () => {
    setShowYear(true);
    setShowHour(false);
    setShowCurrencies(false);
    setShowDetails(false);
    setShowProfile(false);
  };

  const ShowBusinessHour = () => {
    setShowHour(true);
    setShowYear(false);
    setShowCurrencies(false);
    setShowDetails(false);
    setShowProfile(false);
  };

  const ShowCurrencies = () => {
    setShowCurrencies(true);
    setShowHour(false);
    setShowYear(false);
    setShowDetails(false);
    setShowProfile(false);
  };

  const companyId = localStorage.getItem("OrganizationId");

  const getCompanyDetails = async () => {
    setLoadingStatus(true);
    await axios
      .get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header)
      .then((res) => {
        console.log("D", res.data);

        setBusiness(res?.data?.Business_Hour);
        setSunCheckbox(res?.data?.Business_Hour?.Sunday_Chekbox);
        setMonCheckbox(res?.data?.Business_Hour?.Monday_Chekbox);
        setTueCheckbox(res?.data?.Business_Hour?.Tuesday_Chekbox);
        setWedCheckbox(res?.data?.Business_Hour?.Wednessday_Chekbox);
        setThuCheckbox(res?.data?.Business_Hour?.Thursday_Chekbox);
        setFriCheckbox(res?.data?.Business_Hour?.Friday_Chekbox);
        setSatCheckbox(res?.data?.Business_Hour?.Saturday_Chekbox);

        setCompanyAdd(res?.data?.CompanyAddress);
        setFiscal(res?.data?.Fiscal_Year);
        setCompanyMail(res?.data?.CompanyMail);
        setCompanyName(res?.data?.Company_Name);
        setCompanyLogo(res?.data?.CompanyLogo);

        setCurrency(res?.data?.Currencies);
        if (res?.data?.Currencies === "INR") {
          setCurrencyFormat("Rupees - ₹")
        } else if (res?.data?.Currencies === "USD") {
          setCurrencyFormat("Dollar - $")
        } else if (res?.data?.Currencies === "JPY") {
          setCurrencyFormat("Yen – ¥")
        } else if (res?.data?.Currencies === "EUR") {
          setCurrencyFormat("Euro - €")
        } else if (res?.data?.Currencies === "BRL") {
          setCurrencyFormat("Real - R$")
        }
        setDateFormat(res?.data?.DateFormat);
        setCheckMonth(res.data?.Allow_Edit);
        // setCheckMonth(res?.data?.Fiscal_Year?.Calandermonth);
        setFiscalMonth(res?.data?.Fiscal_Year);
        setSelectedCountry(res?.data?.CompanyAddress?.Building_Country);
        setSelectedState(res?.data?.CompanyAddress?.Building_State);
        setSelectedCity(res?.data?.CompanyAddress?.Building_City);

        fetch(`${BASE_URL}${res?.data?.CompanyLogo}`)
          .then((response) => response.arrayBuffer())
          .then((buffer) => {
            const base64 = btoa(
              new Uint8Array(buffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            // const encoded = base64.b64encode(byte).decode('ascii');

            setbase64(base64);
            const urlParts = res?.data?.CompanyLogo.split("/");
            console.log(urlParts);
            setCompanyLogo(urlParts[urlParts?.length - 1]);
          });

        setLoadingStatus(false);
      })
      .catch((error) => {
        console.log("ds", error);
        setLoadingStatus(false);
      });
  };


  useEffect(() => {
    getCompanyDetails();
  }, [companyId])


  const listofAccountingPeriod = async () => {
    await axios.get(`${BASE_URL}/Erpapp/Financeyearwithoutpagination/`, header)
      .then((res) => {
        const lists = res?.data;
        setAccountingPeriods(lists);
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    listofAccountingPeriod();
  }, []);


  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

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
        setCountries(res?.data?.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getStateLists = (country) => {
    axios
      .post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        { country: country },
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
        setStates(state?.states);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCityLists = (state) => {
    var payload = {
      country: selectedCountry,
      state: state,
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
        console.log(res.data);
        var city = res?.data?.data;
        var citynames = city?.map((cityname) => cityname);
        setCities(citynames);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  useEffect(() => {
    getCountryLists();
    getStateLists(selectedCountry);
    getCityLists(selectedState);
  }, [countryId, stateId, selectedCountry, selectedState]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusiness((values) => ({ ...values, [name]: value }));
    setCompanyAdd((values) => ({ ...values, [name]: value }));
    setFiscal((values) => ({ ...values, [name]: value }));
    console.log("GGG", fiscal?.Calendar_MonthName);
  };

  const handleChangeMonth = (e) => {
    var month = e.target.checked;
    setCheckMonth(month);
    console.log(month);
  };

  // image upload function
  const handleChangeImage = (e) => {
    console.log("file uploaded: ", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
      // reader.readAsArrayBuffer(file);
      setCompanyLogo(e.target.files[0].name);
    }
  };

  const handleReaderLoaded = (e) => {
    console.log("file uploaded 2: ", e);
    let binaryString = e.target.result;
    setbase64(btoa(binaryString));
  };

  const handleClickConfirm = () => {
    if (currency === "INR") {
      setCurrencyFormat("Rupees - ₹")
    } else if (currency === "USD") {
      setCurrencyFormat("Dollar - $")
    } else if (currency === "JPY") {
      setCurrencyFormat("Yen – ¥")
    } else if (currency === "EUR") {
      setCurrencyFormat("Euro - €")
    } else if (currency === "BRL") {
      setCurrencyFormat("Real - R$")
    }
    toast.success("Currency is formatted");

  };

  const validate = () => {

    let error = {}
    if (companyName === "") {
      error.companyName = "Company Name  is required"
    }
    if (base64 === "") {
      error.base64 = "Please select a image"
    }
    if (currency === "") {
      error.currency = "Currency Required"
    }
    if (companyMail === "") {
      error.companyMail = "Company Mail Required"
    }
    if (companyAdd?.Building_Street === "") {
      error.Building_Street = "Building Street Required"
    }
    if (companyAdd?.Zip_Code === "") {
      error.Zip_Code = "Zip Code Required"
    }
    if (companyAdd?.Building_Area === "") {
      error.Building_Area = "Building Area Required"
    }
    if (companyAdd?.Building_Country === "") {
      error.Building_Country = "Building Country Required"
    }
    if (companyAdd?.Building_State === "") {
      error.Building_State = "Building State Required"
    }
    if (companyAdd?.Building_City === "") {
      error.Building_City = "Building City Required"
    }
    return error;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let validForm = validate();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      var companyPayload = {
        id: id,
        Company_Id: compId,
        Company_Name: companyName,
        CompanyLogo: base64,
        CompanyLogo_Name: companyLogo,
        CompanyMail: companyMail,
        CompanyAddress: {
          id: companyAdd?.id,
          Address_Id: companyAdd?.Address_Id,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Address_Type: "",
          Building_Street: companyAdd?.Building_Street,
          Building_Name: "",
          Building_Area: companyAdd?.Building_Area,
          Building_Country: selectedCountry || companyAdd?.Building_Country,
          Building_State: selectedState || companyAdd?.Building_State,
          Building_City: selectedCity || companyAdd?.Building_City,
          Zip_Code: companyAdd?.Zip_Code,
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        },
        Fiscal_Year: fiscalMonth?.id,
        Business_Hour:
        {
          id: business?.id,
          Businesshours_Id: business?.Businesshours_Id,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Monday_Chekbox: monCheckbox,
          Monday_Starttime: business?.Monday_Starttime,
          Monday_EndTime: business?.Monday_EndTime,
          Tuesday_Chekbox: tueCheckbox,
          Tuesday_Starttime: business?.Tuesday_Starttime,
          Tuesday_Endtime: business?.Tuesday_Endtime,
          Wednessday_Chekbox: wedCheckbox,
          Wednessday_Starttime: business?.Wednessday_Starttime,
          Wednessday_Endtime: business?.Wednessday_Endtime,
          Thursday_Chekbox: thuCheckbox,
          Thursday_Starttime: business?.Thursday_Starttime,
          Thursday_Endtime: business?.Thursday_Endtime,
          Friday_Chekbox: friCheckbox,
          Friday_Starttime: business?.Friday_Starttime,
          Friday_Endtime: business?.Friday_Endtime,
          Saturday_Chekbox: satCheckbox,
          Saturday_Starttime: business?.Saturday_Starttime,
          Saturday_Endtime: business?.Saturday_Endtime,
          Sunday_Chekbox: sunCheckbox,
          Sunday_Starttime: business?.Sunday_Starttime,
          Sunday_Endtime: business?.Sunday_Endtime,
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        },
        DateFormat: dateFormat,
        Currencies: currency,
        Allow_Edit: checkMonth,
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };

      console.log("companyPayload", companyPayload);

      axios
        .put(`${BASE_URL}/Erpapp/CompanyCRUD/`, companyPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res?.data);
          if (res?.status === 200 && res?.data?.id) {
            toast.success("Company details updated successfully");
            setShowProfile(true);
            setShowDetails(false);
            setShowYear(false);
            setShowHour(false);
            setShowCurrencies(false);


            localStorage.setItem("DateFormat", res?.data?.DateFormat)
            localStorage.setItem("CurrencyFormat", res?.data?.Currencies)
          } else {
            toast.error("Enter valid company details");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Enter valid company details");
        });
    }
    else {
      toast.error("Please Fill Required Filed")
    }
  };


  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);


  return (
    <>
      {/* Update company details code */}
      <Div>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Update Your Company Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <Div
              sx={{
                display: "flex",
                justifyContent: "end",
                mr: 0.5,
              }}
            >
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(78) && (
                <ButtonGroup
                  type="submit"
                  aria-label="split button"
                >
                  <Button type="submit" color="success" variant="contained" className="plus-button">
                    Update
                  </Button>
                  <Button variant="contained" className="icon-button">
                    <MdSave size={20} />
                  </Button>
                </ButtonGroup>
              )}
            </Div>

            <div>
              <Div
                className="card"
                sx={{ m: 1, ml: 0, mr: 0, p: 2, minHeight: "466px" }}
              >
                {!loadingStatus ? (
                  <>
                    <Div
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 16,
                        fontWeight: 500,
                        cursor: "pointer",
                        overflow: "auto",
                      }}
                    >
                      <Button
                        onClick={ShowCompanyProfile}
                        sx={{
                          color: showProfile === true ? "#00BFFF" : "#000000", minWidth: "200px !important"
                        }}
                      >
                        Company Profile
                      </Button>
                      <Button
                        onClick={ShowCompanyDetails}
                        sx={{
                          color: showDetails === true ? "#00BFFF" : "#000000", minWidth: "200px !important"
                        }}
                      >
                        Company Details
                      </Button>
                      <Button
                        onClick={ShowFiscalYear}
                        sx={{
                          color: showYear === true ? "#00BFFF" : "#000000", minWidth: "200px !important"
                        }}
                      >
                        Financial Year
                      </Button>
                      <Button
                        onClick={ShowBusinessHour}
                        sx={{
                          color: showHour === true ? "#00BFFF" : "#000000", minWidth: "200px !important"
                        }}
                      >
                        Business Hour
                      </Button>
                      <Button
                        onClick={ShowCurrencies}
                        sx={{
                          color: showCurrencies === true ? "#00BFFF" : "#000000", minWidth: "200px !important"
                        }}
                      >
                        Currencies
                      </Button>
                    </Div>

                    {/* code for company profile */}
                    <Div>
                      <Div
                        sx={{
                          display: showProfile === true ? "block" : "none",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ pl: { xs: 0, md: 3.5 }, pt: 3, fontWeight: 600 }}
                        >
                          Company Profile
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ pl: { xs: 0, md: 3.5 }, fontWeight: 500 }}
                        >
                          You can fix your Company Profile Details here
                        </Typography>
                        <form>
                          <Div
                            sx={{
                              mt: 4,
                              ml: { xs: 0, md: 2 },
                            }}
                          >
                            <Grid item xs={12} sm={4} lg={4} className="row">
                              <Typography
                                className="input-label col-md-6 col-lg-4 col-xl-3"
                                sx={{ mt: 1 }}
                              >
                                Company Name <Span className="required">*</Span>
                              </Typography>
                              <Div className="col-md-5">

                                <TextField
                                  className="col-12 input-box"
                                  id="outlined-basic"
                                  placeholder="Company Name"
                                  variant="outlined"
                                  value={companyName}
                                  name="companyName"
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  autoComplete="off"
                                />
                              </Div>

                            </Grid>
                          </Div>

                          <Div sx={{ mt: 2, ml: { xs: 0, md: 2 } }}>
                            <Typography
                              variant="h3"
                              fontWeight={600}
                              sx={{ ml: 1.5 }}
                            >
                              Address :
                            </Typography>
                            <br />
                            <Grid container>
                              <Grid item xs={12} className="row">
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  Street & Building Name
                                  <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">

                                  <TextField
                                    className="col-12 input-box"
                                    id="outlined-basic"
                                    placeholder="Street & Building Name"
                                    variant="outlined"
                                    value={companyAdd?.Building_Street}
                                    name="Building_Street"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  Area Name <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">

                                  <TextField
                                    className="col-12 input-box"
                                    id="outlined-basic"
                                    placeholder="Area Name"
                                    variant="outlined"
                                    value={companyAdd?.Building_Area}
                                    name="Building_Area"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  Country <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">
                                  <Autocomplete
                                    className="search-select"
                                    name="selectedCountry"
                                    options={countries}
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
                                    onChange={(event, newValue) => {
                                      setSelectedCountry(newValue?.country);
                                      setCountryId(newValue?.id);
                                      getStateLists(newValue?.country);
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder="Select Country" variant="outlined" />}
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  State <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">
                                  <Autocomplete
                                    className="search-select"
                                    name="selectedState"
                                    options={states}
                                    getOptionLabel={(option) => {
                                      if (typeof option === "string") {
                                        return option;
                                      }
                                      if (option && option?.name) {
                                        return option?.name;
                                      }
                                      return "";
                                    }}
                                    getOptionValue={(options) => {
                                      return options["name"];
                                    }}
                                    value={selectedState}
                                    onChange={(event, newValue) => {
                                      setSelectedState(newValue?.name);
                                      setStateId(newValue?.id)
                                      getCityLists(newValue?.name);
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder="Select State" variant="outlined" />}
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  City <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">
                                  <Autocomplete
                                    className="search-select"
                                    name="selectedCity"
                                    options={cities}
                                    getOptionLabel={(option) => {
                                      if (typeof option === "string") {
                                        return option;
                                      }
                                      if (option && option) {
                                        return option;
                                      }
                                      return "";
                                    }}
                                    getOptionValue={(options) => {
                                      return options;
                                    }}
                                    value={selectedCity}
                                    onChange={(event, newValue) => {
                                      setSelectedCity(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder="Select City" variant="outlined" />}
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  Pincode <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">

                                  <TextField
                                    className="col-12 input-box"
                                    id="outlined-basic"
                                    placeholder="Pincode"
                                    variant="outlined"
                                    value={companyAdd?.Zip_Code}
                                    name="Zip_Code"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                  />
                                </Div>
                              </Grid>

                              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                                <Typography
                                  className="input-label col-md-6 col-lg-4 col-xl-3"
                                  sx={{ mt: 1 }}
                                >
                                  Date Format
                                  <Span className="required">*</Span>
                                </Typography>
                                <Div className="col-md-5">
                                  <Autocomplete
                                    className="search-select col-12"
                                    id="highlights-demo"
                                    name="dateFormat"
                                    getOptionLabel={(option) => {
                                      if (typeof option === "string") {
                                        return option;
                                      }
                                      if (option && option.yearformat) {
                                        return option.yearformat;
                                      }
                                      return "";
                                    }}
                                    options={date}
                                    value={
                                      dateFormat
                                      //   date.find(
                                      //   (option) => option.label === dateFormat
                                      // )
                                    }
                                    onChange={(e, item) => {
                                      setDateFormat(item.yearformat);
                                      console.log("abc", item);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                      option.label === value.label &&
                                      option.yearformat === value
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Date Format"
                                        variant="outlined"
                                        autoComplete="off"
                                      />
                                    )}
                                  ></Autocomplete>
                                </Div>
                              </Grid>
                            </Grid>
                          </Div>
                        </form>
                      </Div>

                      {/* code for company details */}
                      <Div
                        sx={{
                          display: showDetails === true ? "block" : "none",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ pl: { xs: 0, md: 3.5 }, pt: 3, fontWeight: 600 }}
                        >
                          Company Details
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ pl: { xs: 0, md: 3.5 }, fontWeight: 500 }}
                        >
                          You can fix your  Company Details here
                        </Typography>
                        <Grid container>
                          <Grid item xs={12} md={12} lg={6} sx={{ display: "flex", justifyContent: "center" }}>
                            <Div sx={{ mt: 10 }}>
                              <Div
                                sx={{
                                  p: 3,
                                  width: 200,
                                  height: { xs: 230, xl: 225 },
                                  border: "1px solid #B2BABB ",
                                  borderRadius: 0, textAlign: { xs: "center", md: "center" }, display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {base64 ? (
                                  <img
                                    alt="Company Logo"
                                    src={`data:image/png;base64,${base64}`}
                                    width={150}
                                    height={140}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                ) : (
                                  <img
                                    alt="Company"
                                    src={"../images/default.jpg"}
                                    width={150}
                                    height={140}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                )}
                              </Div>

                              <Div sx={{ textAlign: "center" }}>
                                <Button
                                  component="label"
                                  onChange={handleChangeImage}
                                  sx={{
                                    color: "#00BFFF",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Upload Company Logo
                                  <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    style={{
                                      backgroundColor: "transparent",
                                    }}
                                    name="companyLogo"
                                    onChange={handleInputChange}
                                  />
                                </Button>
                              </Div>
                            </Div>
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Div sx={{ mt: { md: 0, lg: 10 }, ml: { md: 0, lg: 10 }, textAlign: { xs: "left", md: "left" } }}>
                              <Div
                                sx={{
                                  fontSize: { xs: 16, md: 18 },
                                  fontWeight: 600,
                                  color: "#00BFFF",
                                  marginBottom: "5px",
                                }}
                              >
                                {companyName}
                              </Div>

                              <Div>
                                <TextField
                                  className="col-md-8 input-box"
                                  id="outlined-basic"
                                  placeholder="Company Mail"
                                  variant="outlined"
                                  value={companyMail}
                                  name="companyMail"
                                  onChange={(e) => setCompanyMail(e.target.value)}
                                  autoComplete="off"
                                />
                              </Div>
                            </Div>
                          </Grid>
                        </Grid>
                      </Div>

                      {/* code for fiscal year */}
                      <Div
                        style={{
                          display: showYear === true ? "block" : "none",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ pl: { xs: 0, md: 3.5 }, pt: 3, fontWeight: 600 }}
                        >
                          Accounting Period
                        </Typography>
                        <Typography variant="h3" sx={{ pl: { xs: 0, md: 3.5 }, fontWeight: 500 }}>
                          You can fix your company's accounting period here
                        </Typography>
                        <Div sx={{ mt: 5 }}>
                          <Grid container>
                            <Grid item xs={12} md={2} lg={3} xl={2}></Grid>
                            <Grid item xs={12} md={5} xl={3}>
                              <Typography className="input-label">
                                Accounting Period
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                              <FormControl className="col-12 col-md-12 col-xl-6">
                                <Autocomplete
                                  className="search-select"
                                  name="fiscalMonth"
                                  getOptionLabel={(option) => {
                                    if (typeof option === "string") {
                                      return option;
                                    }
                                    if (option && option?.CalendarName) {
                                      return option?.CalendarName;
                                    }
                                    return "";
                                  }}
                                  options={accountingPeriods}
                                  value={
                                    fiscalMonth
                                    // manufacturer.find(
                                    // (option) => option && option.month === fiscalMonth
                                    // )
                                  }
                                  onChange={(e, newValue) => {
                                    setFiscalMonth(newValue);
                                    console.log("HHH", newValue);
                                  }}
                                  isOptionEqualToValue={(option, value) =>
                                    option?.CalendarName === value
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Fiscal Year"
                                      variant="outlined"
                                      autoComplete="off"
                                    />
                                  )}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>

                          <Grid container>
                            <Grid item xs={12} md={2} lg={3} xl={2}></Grid>
                            <Grid item xs={12} md={5} xl={3}>
                              <Typography className="input-label" sx={{ pt: 1 }}>
                                Allow Editing GL Closing Balance
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} xl={4}>
                              <Div sx={{ pt: 1 }}>
                                <FormControlLabel
                                  control={<Checkbox size="small" />}
                                  name="checkMonth"
                                  checked={checkMonth}
                                  onChange={handleChangeMonth}
                                />
                              </Div>
                            </Grid>
                          </Grid>
                        </Div>
                      </Div>

                      {/* code for Business hour */}
                      <Div
                        style={{
                          display: showHour === true ? "block" : "none",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ pl: { xs: 0, md: 3.5 }, pt: 3, fontWeight: 600 }}
                        >
                          Business Hour
                        </Typography>
                        <Typography variant="h3" sx={{ pl: { xs: 0, md: 3.5 }, fontWeight: 500 }}>
                          You can fix your company's business hour here
                        </Typography>
                        <Div sx={{ mt: 3, fontWeight: 400 }}>
                          <Grid container>
                            <Grid className="row" item xs={12} md={5} lg={4}>
                              <Typography
                                variant="h3"
                                sx={{ color: "#00BFFF", pl: { lg: 0, xl: 10 } }}
                              >
                                Business Days
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 1, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="sunCheckbox"
                                  checked={sunCheckbox}
                                  onChange={(e) => {
                                    setSunCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />{" "}
                                Sunday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="monCheckbox"
                                  checked={monCheckbox}
                                  onChange={(e) => {
                                    setMonCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />
                                Monday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="tueCheckbox"
                                  checked={tueCheckbox}
                                  onChange={(e) => {
                                    setTueCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />{" "}
                                Tuesday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="wedCheckbox"
                                  checked={wedCheckbox}
                                  onChange={(e) => {
                                    setWedCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />{" "}
                                Wednesday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="thuCheckbox"
                                  checked={thuCheckbox}
                                  onChange={(e) => {
                                    setThuCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />
                                Thursday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="friCheckbox"
                                  checked={friCheckbox}
                                  onChange={(e) => {
                                    setFriCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />
                                Friday
                              </Typography>
                              <Typography variant="h3" sx={{ pt: 0, pl: { lg: 0, xl: 9 } }}>
                                <Checkbox
                                  size="small"
                                  name="satCheckbox"
                                  checked={satCheckbox}
                                  onChange={(e) => {
                                    setSatCheckbox(e.target.checked);
                                    console.log("C", e.target.checked);
                                  }}
                                />
                                Saturday
                              </Typography>
                            </Grid>
                            <Grid className="row" item xs={6} md={3.5} lg={4}>
                              <Typography
                                className="col"
                                variant="h3"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 }, color: "#00BFFF" }}
                              >
                                Start Time
                              </Typography>
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Sunday_Starttime"
                                value={business.Sunday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Monday_Starttime"
                                value={business.Monday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Tuesday_Starttime"
                                value={business.Tuesday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Wednessday_Starttime"
                                value={business.Wednessday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Thursday_Starttime"
                                value={business.Thursday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Friday_Starttime"
                                value={business.Friday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Saturday_Starttime"
                                value={business.Saturday_Starttime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                            </Grid>
                            <Grid className="row" item xs={6} md={3.5} lg={4}>
                              <Typography
                                variant="h3"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 }, color: "#00BFFF" }}
                              >
                                End Time
                              </Typography>

                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Sunday_Endtime"
                                value={business.Sunday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Monday_EndTime"
                                value={business.Monday_EndTime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Tuesday_Endtime"
                                value={business.Tuesday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Wednessday_Endtime"
                                value={business.Wednessday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Thursday_Endtime"
                                value={business.Thursday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Friday_Endtime"
                                value={business.Friday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                              <TextField
                                type="time"
                                className="input-box col-10"
                                sx={{ pt: 0, pl: { lg: 0, xl: 10 } }}
                                name="Saturday_Endtime"
                                value={business.Saturday_Endtime}
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                            </Grid>
                          </Grid>
                        </Div>
                      </Div>

                      {/* code for Currencies */}
                      <Div
                        style={{
                          display: showCurrencies === true ? "block" : "none",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ pl: { xs: 0, md: 3.5 }, pt: 3, fontWeight: 600 }}
                        >
                          Currencies
                        </Typography>
                        <Typography variant="h3" sx={{ pl: { xs: 0, md: 3.5 }, fontWeight: 500 }}>
                          You can fix your currencies which will be used to
                          transact all financial transactions. Once you setup you
                          can not change later
                        </Typography>
                        <Div sx={{ mt: 5, pl: { xs: 0, md: 3.5 } }}>
                          <Grid container>
                            <Grid className="row" item xs={12} md={5} lg={4} xl={2.8}>
                              <Typography
                                variant="h3"
                                className="col-12"
                                sx={{ color: "#00BFFF" }}
                              >
                                Home Currencies
                              </Typography>
                              <Div className="col-12 col-lg-12 col-md-12 col-xl-12" >
                                <Autocomplete
                                  className="search-select"
                                  name="currency"
                                  getOptionLabel={(option) => {
                                    if (typeof option === "string") {
                                      return option;
                                    }
                                    if (option && option?.curency) {
                                      return option?.curency;
                                    }
                                    return "";
                                  }}
                                  options={currencies}
                                  value={currency}
                                  onChange={(e, newValue) => {
                                    setCurrency(newValue?.curency);
                                    setCurrencyFormat()
                                    console.log("HHH", newValue);
                                  }}
                                  isOptionEqualToValue={(option, value) =>
                                    option.curency === value
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Currency Format"
                                      autoComplete="off"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Div>
                            </Grid>
                            <Grid className="row" item xs={12} md={6} lg={5} xl={3}>
                              <Typography
                                className="col-12 col-xl-12"
                                variant="h3"
                                sx={{ color: "#00BFFF" }}
                              >
                                Format
                              </Typography>

                              <Div className="col-12 col-md-10 col-lg-10 col-xl-12">
                                <TextField
                                  className="input-box col-12 col-md-12 col-lg-12 col-xl-12"
                                  value={currencyFormat}
                                  placeholder="Currency Format"
                                  autoComplete="off"
                                  disabled
                                />
                              </Div>

                            </Grid>

                          </Grid>
                          {/* <Button
                          className="plus-button"
                          sx={{
                            mt: 10,
                            ml: 0.5,
                          }}
                          onClick={handleClickConfirm}
                        >
                          Confirm
                        </Button> */}

                          <Div sx={{ mt: 10, pl: 2 }}>
                            <ButtonGroup
                              aria-label="split button"
                              sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                              }}
                            >
                              <Button className="plus-button" sx={{ width: "99px" }} onClick={handleClickConfirm}>
                                Confirm
                              </Button>
                              <Button variant="contained" className="icon-button">
                                <FaSave size={18} />
                              </Button>
                            </ButtonGroup>
                          </Div>
                        </Div>
                      </Div>
                    </Div>
                  </>
                ) : (
                  <CommonOverviewSkeleton />
                )}
              </Div>
            </div>

          </div>
        </form>

      </Div>
    </>
  );
};

export default UpdateCompanyDetails;
