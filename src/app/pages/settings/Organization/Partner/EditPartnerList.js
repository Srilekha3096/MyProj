import Div from "@jumbo/shared/Div";
import {
  Button,
  FormControl,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  ButtonGroup,
  FormControlLabel,
  InputAdornment,
  Checkbox,
  FormGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import "./partners.css";
import itemServices from "app/services/item-master-services";
import { ErpDateField } from "app/shared/ReuseComponents/ButtonComponent";
import { todayDate } from "app/shared/ReuseComponents/DateFormatter";


const EditPartnerList = ({
  setEditPartnerList,
  setListMaterial,
  currentPart,
  setcurenrtPart
}) => {

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

  // Get Users
  const [OwnerNames, setOwnerNames] = useState([]);

  const [managedByLists, setManagedByLists] = useState([]);
  const [countryLists, setCountryLists] = useState([]);
  const [stateLists, setStateLists] = useState([]);
  const [cityLists, setCityLists] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setcityId] = useState("");

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
        console.log(res.data.data);
        setCountryLists(res.data.data);
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
        console.log(res.data.data);
        var state = res.data.data;
        setStateLists(state.states);
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
        console.log(res.data);
        var city = res.data.data;
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

  React.useEffect(() => {
    getCountryLists();
    getStateLists();
    getCityLists();
  }, [countryId, stateId, cityId]);


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
    getUsers()
  }, []);

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
  }, [])


  const handleClickBack = () => {
    setEditPartnerList(false);
    setListMaterial(true);
  };

  console.log("OwnerNames", OwnerNames);

  // Update States
  const [PartnerName, setPartnerName] = useState("");
  const [OperatedBy, setOperatedBy] = useState("");
  const [HeadOfOperation, setHeadOfOperation] = useState("");
  const [BusinessUnitPhone, setBusinessUnitPhone] = useState(0);
  const [BusinessUnitEMail, setBusinessUnitEMail] = useState("");
  const [BusinessUnitWeb, setBusinessUnitWeb] = useState("");
  const [BusinessUnitAddressline1, setBusinessUnitAddressline1] = useState("");
  const [BusinessUnitAddressline2, setBusinessUnitAddressline2] = useState("");
  const [BusinessUnitPincode, setBusinessUnitPincode] = useState("");
  const [BusinessUnitPanNo, setBusinessUnitPanNo] = useState("");
  const [BusinessUnitGSTNo, setBusinessUnitGSTNo] = useState("");
  const [AgreementRefNo, setAgreementRefNo] = useState("");
  const [AgreementValidupto, setAgreementValidupto] = useState("");
  const [PartnerId, setPartnerId] = useState("");
  const [id, setId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [commisionPaid, setCommisionPaid] = useState("");
  const [corporateBU, setCorporateBU] = useState(false);

  // Update States
  const [PartnerName1, setPartnerName1] = useState("");
  const [OperatedBy1, setOperatedBy1] = useState("");
  const [HeadOfOperation1, setHeadOfOperation1] = useState("");
  const [BusinessUnitPhone1, setBusinessUnitPhone1] = useState(0);
  const [BusinessUnitEMail1, setBusinessUnitEMail1] = useState("");
  const [BusinessUnitWeb1, setBusinessUnitWeb1] = useState("");
  const [BusinessUnitAddressline11, setBusinessUnitAddressline11] = useState("");
  const [BusinessUnitAddressline21, setBusinessUnitAddressline21] = useState("");
  const [BusinessUnitPincode1, setBusinessUnitPincode1] = useState("");
  const [BusinessUnitPanNo1, setBusinessUnitPanNo1] = useState("");
  const [BusinessUnitGSTNo1, setBusinessUnitGSTNo1] = useState("");
  const [AgreementRefNo1, setAgreementRefNo1] = useState("");
  const [AgreementValidupto1, setAgreementValidupto1] = useState("");
  const [selectedCountry1, setSelectedCountry1] = useState("");
  const [selectedState1, setSelectedState1] = useState("");
  const [selectedCity1, setSelectedCity1] = useState("");
  const [startTime1, setStartTime1] = useState("");
  const [endTime1, setEndTime1] = useState("");
  const [totalHours1, setTotalHours1] = useState("");
  const [commisionPaid1, setCommisionPaid1] = useState("");
  const [corporateBU1, setCorporateBU1] = useState(false);


  const HandleUpdate = async (e) => {
    e.preventDefault();

    let itempayload = {
      id: id,
      Partner_Id: PartnerId,
      Partner_Name: PartnerName,
      Operated_By: OperatedBy,
      HeadOf_Operation: HeadOfOperation,
      BusinessUnit_Phone: BusinessUnitPhone,
      BusinessUnit_EMail: BusinessUnitEMail,
      BusinessUnit_Web: BusinessUnitWeb,
      BusinessUnit_Addressline1: BusinessUnitAddressline1,
      BusinessUnit_City: selectedCity,
      BusinessUnit_Country: selectedCountry,
      BusinessUnit_State: selectedState,
      BusinessUnit_Zone: "",
      BusinessUnit_Pincode: BusinessUnitPincode,
      BusinessUnit_PanNo: BusinessUnitPanNo,
      BusinessUnit_GSTNo: BusinessUnitGSTNo,
      Agreement_RefNo: AgreementRefNo,
      Agreement_Validupto: AgreementValidupto ? AgreementValidupto : "0001-01-01",
      Ofc_Starttime: startTime,
      Ofc_Endtime: endTime,
      Total_hours: parseFloat(totalHours),
      Corporate_BU: corporateBU,
      Commision_Paid: commisionPaid || 0,
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
      Updated_Date: todayDate,
    }

    console.log("itempayload :", itempayload);

    try {
      const res = await axios.put(`${BASE_URL}/Erpapp/PartnerCRUD/`, itempayload, header);
      console.log(res?.data);
      if (res?.data?.id) {
        toast.success(`${PartnerId} is Updated successfully`);
        getUsers();
        setListMaterial(true);
        setEditPartnerList(false);

        // For history Saving

        // Edited Fields History

        let EditedArr = [];

        if (PartnerName !== PartnerName1) {
          EditedArr.push("Partner Name");
        }
        if (OperatedBy !== OperatedBy1) {
          EditedArr.push("Operated By");
        }
        if (HeadOfOperation !== HeadOfOperation1) {
          EditedArr.push("HeadOfOperation");
        }
        if (BusinessUnitPhone !== BusinessUnitPhone1) {
          EditedArr.push("Contact No");
        }
        if (BusinessUnitEMail !== BusinessUnitEMail1) {
          EditedArr.push("Email");
        }
        if (BusinessUnitWeb !== BusinessUnitWeb1) {
          EditedArr.push("Website");
        }
        if (BusinessUnitAddressline1 !== BusinessUnitAddressline11) {
          EditedArr.push("Adress 1");
        }
        if (BusinessUnitAddressline2 !== BusinessUnitAddressline21) {
          EditedArr.push("Adress 2");
        }
        if (BusinessUnitPincode !== BusinessUnitPincode1) {
          EditedArr.push("pincode");
        }
        if (BusinessUnitPanNo !== BusinessUnitPanNo1) {
          EditedArr.push("Pancard No");
        }
        if (BusinessUnitGSTNo !== BusinessUnitGSTNo1) {
          EditedArr.push("GST No");
        }
        if (AgreementRefNo !== AgreementRefNo1) {
          EditedArr.push("Agreement No");
        }
        if (AgreementValidupto !== AgreementValidupto1) {
          EditedArr.push("Agreement Validupto");
        }
        if (selectedCountry !== selectedCountry1) {
          EditedArr.push("Country");
        }
        if (selectedState !== selectedState1) {
          EditedArr.push("State");
        }
        if (selectedCity !== selectedCity1) {
          EditedArr.push("City");
        }
        if (startTime !== startTime1) {
          EditedArr.push("Start Time");
        }
        if (endTime !== endTime1) {
          EditedArr.push("End Time");
        }
        if (totalHours !== totalHours1) {
          EditedArr.push("Total Hours");
        }
        if (commisionPaid !== commisionPaid1) {
          EditedArr.push("Commision Paid");
        }
        if (corporateBU !== corporateBU1) {
          EditedArr.push("Corporate BU");
        }

        let editUser = localStorage.getItem("Username");

        console.log("EditedArr", EditedArr);
        if (EditedArr?.length > 0) {
          axios
            .post(
              `${BASE_URL}/Erpapp/Updaterecordscrud/`,
              {
                Document_Id: PartnerId,
                Updated_Person: `${editUser} edited this Bussiness Unit.`,
                Is_Deleted: false,
                Updated_Time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                Updated_Field: EditedArr.join(","),
                Updated_Date: todayDate,
                Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                Updated_By: parseInt(localStorage.getItem("UserId")),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then((res) => {
              console.log("Result", res.data);
              // alert("Success")
            })
            .catch((res) => {
              console.log(res.message);
            });
        }

      } else {
        toast.error("Please check your inputs")
      }
    }
    catch (error) {
      console.log(error);
      toast.error("You do not have permission to perform this action.");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Erpapp/PartnerCRUD/?Partner_Id=${currentPart?.Partner_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      })
      setPartnerId(response?.data?.Partner_Id);
      setId(response?.data?.id);
      setPartnerName(response?.data?.Partner_Name);
      setOperatedBy(response?.data?.Operated_By);
      setHeadOfOperation(response?.data?.HeadOf_Operation);
      setBusinessUnitPhone(response?.data?.BusinessUnit_Phone);
      setBusinessUnitEMail(response?.data?.BusinessUnit_EMail);
      setBusinessUnitWeb(response?.data?.BusinessUnit_Web);
      setBusinessUnitAddressline1(response?.data?.BusinessUnit_Addressline1);
      setBusinessUnitAddressline2(response?.data?.Operated_By);
      setSelectedCity(response?.data?.BusinessUnit_City);
      setSelectedCountry(response?.data?.BusinessUnit_Country);
      setSelectedState(response?.data?.BusinessUnit_State);
      setBusinessUnitPincode(response?.data?.BusinessUnit_Pincode);
      setBusinessUnitPanNo(response?.data?.BusinessUnit_PanNo);
      setBusinessUnitGSTNo(response?.data?.BusinessUnit_GSTNo);
      setAgreementRefNo(response?.data?.Agreement_RefNo);
      setAgreementValidupto(response?.data?.Agreement_Validupto);
      setStartTime(response?.data?.Ofc_Starttime);
      setEndTime(response?.data?.Ofc_Endtime);
      setTotalHours(response?.data?.Total_hours);
      setCommisionPaid(response?.data?.Commision_Paid);
      setCorporateBU(response?.data?.Corporate_BU);

      //for History
      setPartnerName1(response?.data?.Partner_Name);
      setOperatedBy1(response?.data?.Operated_By);
      setHeadOfOperation1(response?.data?.HeadOf_Operation);
      setBusinessUnitPhone1(response?.data?.BusinessUnit_Phone);
      setBusinessUnitEMail1(response?.data?.BusinessUnit_EMail);
      setBusinessUnitWeb1(response?.data?.BusinessUnit_Web);
      setBusinessUnitAddressline11(response?.data?.BusinessUnit_Addressline1);
      setBusinessUnitAddressline21(response?.data?.Operated_By);
      setSelectedCity1(response?.data?.BusinessUnit_City);
      setSelectedCountry1(response?.data?.BusinessUnit_Country);
      setSelectedState1(response?.data?.BusinessUnit_State);
      setBusinessUnitPincode1(response?.data?.BusinessUnit_Pincode);
      setBusinessUnitPanNo1(response?.data?.BusinessUnit_PanNo);
      setBusinessUnitGSTNo1(response?.data?.BusinessUnit_GSTNo);
      setAgreementRefNo1(response?.data?.Agreement_RefNo);
      setAgreementValidupto1(response?.data?.Agreement_Validupto);
      setStartTime1(response?.data?.Ofc_Starttime);
      setEndTime1(response?.data?.Ofc_Endtime);
      setTotalHours1(response?.data?.Total_hours);
      setCommisionPaid1(response?.data?.Commision_Paid);
      setCorporateBU1(response?.data?.Corporate_BU);

    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPart]);


  // get a total office hours
  useEffect(() => {
    console.log("totalhours", startTime, endTime)
    const fromTimeObject = new Date(`2024-01-01T${startTime}`);
    const toTimeObject = new Date(`2024-01-01T${endTime}`);

    const timeDiff = Math.abs(toTimeObject - fromTimeObject);
    console.log("timeDiff", timeDiff);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const totalhours = `${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
    console.log("totalhours...", totalhours)
    setTotalHours(totalhours);
  }, [startTime, endTime]);


  return (
    <>
      <Div>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Edit Business Unit
        </Typography>

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
                    value={PartnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="input-box"
                    id="outlined-basic"
                    placeholder="Business Unit Name"
                    variant="outlined"
                  />
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
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.first_name) {
                        return `${option?.first_name} ${option?.last_name}`;
                      }
                      return "";
                    }}
                    value={HeadOfOperation}
                    onChange={(e, newValue) => {
                      setHeadOfOperation(`${newValue?.first_name} ${newValue?.last_name}`);
                      console.log(newValue);
                    }}
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
                    value={BusinessUnitEMail}
                    onChange={(e) => setBusinessUnitEMail(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Mail Id"
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
                    value={BusinessUnitAddressline1}
                    onChange={(e) => setBusinessUnitAddressline1(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Address Line 1"
                    variant="outlined"
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Country <span className="required">*</span>
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
                  {/* <TextField
                    name="Country"
                    value={values.Country}
                    onChange={handleChangeItem}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Country"
                    variant="outlined"
                  /> */}
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  City <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <Autocomplete
                    className="search-select col-12"
                    name="selectedState"
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
                  {/* <TextField
                    name="City"
                    value={values.City}
                    onChange={handleChangeItem}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="City"
                    variant="outlined"
                  /> */}
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  PAN No
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    name="Pan_No"
                    value={BusinessUnitPanNo}
                    onChange={(e) => setBusinessUnitPanNo(e.target.value)}
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
                    name="Agreement_Ref"
                    value={AgreementRefNo}
                    onChange={(e) => setAgreementRefNo(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Agreement Ref No"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Office Timing From  <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="From Time"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Total Hours  <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    type="text"
                    name="totalHours"
                    value={totalHours}
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
                    name="commisionPaid"
                    value={commisionPaid}
                    onChange={(e) => {
                      if (e.target.name === "commisionPaid") {
                        const regex = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
                        const getValue = e.target.value
                        console.log("regex.test(getValue)", regex, getValue);
                        if (regex.test(getValue)) {
                          setCommisionPaid(getValue);
                        } else {
                          setCommisionPaid("")
                        }
                      }
                    }}
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
                  <FormControlLabel control={<Checkbox value={corporateBU} checked={corporateBU} onChange={(e) => setCorporateBU(e.target.checked)} />} label="" />
                </FormGroup>
              </Grid> */}

            </Grid>
          </Div>

          <Div className="col-12 col-md-6">
            <Grid container>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Operated By <span className="required">*</span>
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
                    value={OperatedBy}
                    onChange={(e, newValue) => {
                      setOperatedBy(newValue?.value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Managed By"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Contact No <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField className="col-12 search-select"
                    name="Contact"
                    value={BusinessUnitPhone}
                    onChange={(e) => setBusinessUnitPhone(e.target.value)}
                    variant="outlined"
                    placeholder="Contact No"
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Website
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    name="Website"
                    value={BusinessUnitWeb}
                    onChange={(e) => setBusinessUnitWeb(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Website"
                    variant="outlined"
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Address Line 2 <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    name="Address_2"
                    value={BusinessUnitAddressline2}
                    onChange={(e) => setBusinessUnitAddressline2(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="Address Line 2"
                    variant="outlined"
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  State<span className="required">*</span>
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
                    value={BusinessUnitPincode}
                    onChange={async (e) => {
                      setBusinessUnitPincode(e.target.value);
                      const getValue = e.target.value
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
                    }}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="PIN Code"
                    variant="outlined"
                  />
                </FormControl>

              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  GST No
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    name="GST_No"
                    value={BusinessUnitGSTNo}
                    onChange={(e) => setBusinessUnitGSTNo(e.target.value)}
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
                    id="AgreementValidupto"
                    name="AgreementValidupto"
                    inputValue={AgreementValidupto === "0001-01-01" ? "" : AgreementValidupto}
                    handleInputChange={(e) => setAgreementValidupto(e.target.value)}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Office Timing To  <span className="required">*</span>
                </Typography>
                <FormControl className="col-md-12 col-lg-5 col-xl-6">
                  <TextField
                    type="time"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="col-12 input-box"
                    id="outlined-basic"
                    placeholder="To Time"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Working Days
                </Typography>
                <FormGroup className="col-md-12 col-lg-5 col-xl-6" sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: 3 }}>
                  <FormControlLabel control={<Checkbox />} label="Sunday" />
                  <FormControlLabel control={<Checkbox />} label="Monday" />
                  <FormControlLabel control={<Checkbox />} label="Tuesday" />
                  <FormControlLabel control={<Checkbox />} label="Wednesday" />
                  <FormControlLabel control={<Checkbox />} label="Thursday" />
                  <FormControlLabel control={<Checkbox />} label="Friday" />
                  <FormControlLabel control={<Checkbox />} label="Saturday" />
                </FormGroup>
              </Grid> */}


              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography className="col-md-12 col-lg-7 col-xl-5 input-label" sx={{ mt: 2 }}>
                  Corporate BU
                </Typography>
                <FormGroup className="col-md-12 col-lg-5 col-xl-6">
                  <FormControlLabel control={<Checkbox value={corporateBU} checked={corporateBU} onChange={(e) => setCorporateBU(e.target.checked)} />} label="" />
                </FormGroup>
              </Grid>

            </Grid>
          </Div>
        </Div>

        {/* code for purchase list table */}
        <Div
          className="buttons"
          sx={{ mt: 5, ml: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <ButtonGroup
            type="submit"
            aria-label="split button"
            sx={{ mr: { md: 2 } }}
            onClick={HandleUpdate}
          >
            <Button type="submit" className="plus-button">
              Update
            </Button>
            <Button variant="contained" className="icon-button">
              <FaSave size={18} />
            </Button>
          </ButtonGroup>

          <ButtonGroup aria-label="split button" onClick={handleClickBack}>
            <Button className="plus-button">Cancel</Button>
            <Button variant="contained" className="icon-button">
              <TiCancel size={24} />
            </Button>
          </ButtonGroup>

        </Div>
      </Div>
    </>
  );
};



export default EditPartnerList;