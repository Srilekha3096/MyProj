import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import {
  Autocomplete,
  Typography,
  Tab,
  Box,
  Button,
  Dialog,
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
  ButtonGroup,
  DialogActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, {
  createContext,
  useCallback,
  useEffect,
} from "react";
import Setting from "../Setting";
import Div from "@jumbo/shared/Div";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import axios from "axios";
import ZoneLists from "./ZoneLists";
import { toast } from "react-toastify";
import CityLists from "./CityLists";
import { BASE_URL } from "app/services/auth-services";
import StateLists from "./StateLists";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ScrollToTop from "app/pages/ScrollToTop";
import PartnerList from "app/pages/settings/Organization/Partner/PartnerList";
import StoreList from "./Store/StoreList";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import useResponsive from "app/pages/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { MdDelete } from "react-icons/md";

export const DataContext = createContext();

export default function OrganizationStructure({ scrollHeight }) {
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

  const [errors, setErrors] = useState({});


  const [id, setId] = useState("");
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [id3, setId3] = useState("");
  const [id4, setId4] = useState("");

  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");
  const [name5, setName5] = useState("");
  const [name6, setName6] = useState("");

  const [inputNumber, setInputNumber] = useState("1");
  const [entities, setEntities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);


  const [entityId, setEntityId] = useState("");
  const [entityName, setEntityName] = useState(name);
  const [entityDescription, setEntityDescription] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countryDescription, setCountryDescription] = useState("");
  const [regionId, setRegionId] = useState("");
  const [regionName, setRegionName] = useState("");
  const [regionDescription, setRegionDescription] = useState("");

  const [currentData, setCurrentData] = useState({});

  let isMobile = useResponsive("down", "lg");


  const handleChange = (index, newValue) => {
    console.log("newValuenewValue", newValue, inputNumber)
    // setInputNumber(newValue, index);
    switch (inputNumber) {
      case "1":
        if (inputNumber < newValue) {
          if (checkId1) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your Entity");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;
      case "2":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your Country");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;
      case "3":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2 && checkId3) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your Region");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;
      case "4":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2 && checkId3 && checkId4) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your State");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;
      case "5":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2 && checkId3 && checkId4 && checkId5) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your City");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;

      case "6":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2 && checkId3 && checkId4 && checkId5 && checkId6) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your Business Unit");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;

      case "7":
        if (inputNumber < newValue) {
          if (checkId1 && checkId2 && checkId3 && checkId4 && checkId5 && checkId6 && checkId7) {
            setInputNumber(newValue, index);
          } else {
            toast.error("Choose Your Zone");
          }
        } else {
          setInputNumber(newValue, index);
        }

        break;
      default:
        setInputNumber(newValue, index);
    }
  };

  const [openEntity, setOpenEntity] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);

  const [checkId1, setCheckId1] = useState(false);
  const [checkId2, setCheckId2] = useState(false);
  const [checkId3, setCheckId3] = useState(false);
  const [checkId4, setCheckId4] = useState(false);
  const [checkId5, setCheckId5] = useState(false);
  const [checkId6, setCheckId6] = useState(false);
  const [checkId7, setCheckId7] = useState(false);

  const [countryLists, setCountryLists] = useState([]);
  const [stateLists, setStateLists] = useState([]);

  const [getId, setGetId] = useState("");
  const [getId1, setGetId1] = useState("");
  const [getId2, setGetId2] = useState("");
  const [getId3, setGetId3] = useState("");
  const [getId4, setGetId4] = useState("");
  const [getId5, setGetId5] = useState("");
  const [getId6, setGetId6] = useState("");


  const handleClose = () => {
    setOpenEntity(false);
    setOpenCountry(false);
    setOpenRegion(false);
    setErrors({});

    setEntityName("");
    setEntityDescription("");

    setCountryName("");
    setCountryDescription("");

    setRegionName("");
    setRegionDescription("");
  };

  const handleAddLegalEntity = () => {
    setOpenEntity(true);
    setCurrentData({});
  };

  const handleAddCountry = () => {
    setOpenCountry(true);
    setCurrentData({});
  };

  const handleAddRegion = () => {
    setOpenRegion(true);
    setCurrentData({});
  };

  // const handleAddState = () => {
  //   setOpen(true);
  // };

  // const handleAddCity = () => {
  //   setOpen(true);
  // };

  const getEntityDatas = useCallback(async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/EntityLists/`, header)
      .then((res) => {
        console.log(res?.data?.results);
        setEntities(res?.data?.results);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  }, [entities]);

  const getEntity = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/EntityDetailsCRUD/?id=${getId}`, header)
      .then((res) => {
        console.log("entityid", res?.data);
        setId(res?.data?.Entity_Id);
        setName(res?.data?.Entity_Name);
        // setCountries(res.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCountryDatas = async () => {
    await axios
      .post(
        `${BASE_URL}/Erpapp/CountryLists/`,
        {
          Entity_Id: getId,
        },
        header
      )
      .then((res) => {
        console.log(res?.data);
        setCountries(res?.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCountry = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/CountryDetailsCRUD/?id=${getId1}`, header)
      .then((res) => {
        console.log("countryid", res?.data);
        setId1(res?.data?.Country_Id);
        setName1(res?.data?.Country_Name);
        // setName(res.data.Entity_Name);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getRegionDatas = async () => {
    await axios
      .post(
        `${BASE_URL}/Erpapp/RegionLists/`,
        {
          Country_Id: getId1,
        },
        header
      )
      .then((res) => {
        console.log(res?.data);
        setRegions(res?.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getRegion = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/RegionDetailsCRUD/?id=${getId2}`, header)
      .then((res) => {
        console.log("regionid", res?.data);
        setId2(res?.data?.Region_Id);
        setName2(res?.data?.Region_Name);
        // setName(res.data.Entity_Name);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getStateDatas = async () => {
    await axios
      .post(
        `${BASE_URL}/Erpapp/StateLists/`,
        {
          Entity_Id: getId,
          Country_Id: getId1,
          Region_Id: getId2,
        },
        header
      )
      .then((res) => {
        console.log("res?.data", res?.data);
        const filterLists = res?.data?.filter((opt) => opt?.Entity_Id === getId && opt?.Country_Id === getId1 && opt?.Region_Id === getId2)
        setStates(filterLists);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getStates = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/StateDetailsCRUD/?id=${getId3}`, header)
      .then((res) => {
        console.log("stateid", res?.data);
        setId3(res?.data?.State_Id);
        setName3(res?.data?.State_Name);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCityDatas = async () => {
    await axios
      .post(
        `${BASE_URL}/Erpapp/CityLists/`,
        {
          State_Id: getId3,
        },
        header
      )
      .then((res) => {
        console.log(res?.data);
        setCities(res?.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getCity = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/CityDetailsCRUD/?id=${getId4}`, header)
      .then((res) => {
        console.log("cityid", res?.data);
        setId4(res?.data?.City_Id);
        setName4(res?.data?.City_Name);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getZoneDatas = async () => {
    await axios
      .post(
        `${BASE_URL}/Erpapp/ZoneLists/`,
        {
          City_Id: getId4,
        },
        header
      )
      .then((res) => {
        console.log(res?.data);
        setZones(res?.data);
        // setCityName(res.data.City_Id)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEntity();
    getCountry();
    getRegion();
    getStates();
    getCity();
    getEntityDatas();
    getCountryDatas();
    getRegionDatas();
    getStateDatas();
    getCityDatas();
    getZoneDatas();
    getCountryLists();
    getStateLists();
  }, []);



  useEffect(() => {
    const nextEntity = entities?.find((opt, index) => index + 1 === entities?.length);
    if (nextEntity) {
      const nextEntityId = nextEntity?.Entity_Id;
      const numericPart = parseInt(nextEntityId, 10) + 1;
      const paddedValue = numericPart.toString().padStart(nextEntityId?.length, '0');
      setEntityId(paddedValue);
      console.log("numericPart", paddedValue)
    }
  }, [entityId]);


  // Regular Expression
  const validateEntity = () => {
    let error = {};

    if (entityName === "" || entityName === null || entityName === undefined) {
      error.entityName = "Entity Name is required"
    }
    if (entityDescription === "" || entityDescription === null || entityDescription === undefined) {
      error.entityDescription = "Entity Description is required"
    }

    return error;
  };

  const handleCreateEntity = async (e) => {
    e.preventDefault();

    let validForm = validateEntity();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var entitypayload = {
          ...currentData,
          Entity_Name: entityName,
          Entity_Description: entityDescription,
          Entity_Type_Code: parseInt(entityId) || parseInt(entities?.length) + 1,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .put(`${BASE_URL}/Erpapp/EntityDetailsCRUD/`, entitypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Entity updated successfully");
              setOpenEntity(false);
              getEntityDatas();
            } else {
              toast.error("Entity Matching Query Doesn't Exist.")
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
          });
      } else {
        var entitypayload = {
          Entity_Name: entityName,
          Entity_Description: entityDescription,
          Entity_Type_Code: parseInt(entityId) || parseInt(entities?.length) + 1,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .post(`${BASE_URL}/Erpapp/EntityDetailsCRUD/`, entitypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Entity created successfully");
              setOpenEntity(false);
              getEntityDatas();
              setEntityName("");
              setEntityDescription("");
            } else {
              toast.error("Entity Matching Query Doesn't Exist.")
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("Entity name is already exists");
          });
      }
    }
  };

  // edit entity
  const editEntityById = async (data) => {
    console.log("datadata", data);
    setOpenEntity(true);
    setCurrentData(data);

    await axios.get(`${BASE_URL}/Erpapp/EntityDetailsCRUD/?id=${data?.id}`, header)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setEntityName(res?.data?.Entity_Name);
          setEntityDescription(res?.data?.Entity_Description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // delete a entity 
  const deleteEntityById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/EntityDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("Entity deleted successfully");
          getEntityDatas();
        } else {
          toast.error(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }


  useEffect(() => {
    const nextCountry = countries?.filter((opt, index) => index + 1 === countries?.length);
    if (nextCountry) {
      const nextCountryId = nextCountry[0]?.Country_Id;
      const numericPart = parseInt(nextCountryId, 10) + 1;
      const paddedValue = numericPart.toString().padStart(nextCountryId?.length, '0');
      setCountryId(paddedValue);
    }
  }, [countryName]);

  // Regular Expression
  const validateCountry = () => {
    let error = {};

    if (countryName === "" || countryName === null || countryName === undefined) {
      error.countryName = "Country Name is required"
    }
    if (countryDescription === "" || countryDescription === null || countryDescription === undefined) {
      error.countryDescription = "Country Description is required"
    }

    return error;
  };

  const handleCreateCountry = async (e) => {
    e.preventDefault();

    let validForm = validateCountry();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var countrypayload = {
          ...currentData,
          Entity_Id: getId,
          Country_Name: countryName,
          Country_Description: countryDescription,
          Country_Type_Code: parseInt(`${id}${countryId}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .put(`${BASE_URL}/Erpapp/CountryDetailsCRUD/`, countrypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Country updated successfully");
              setOpenCountry(false);
              getCountryDatas();
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
          });
      } else {
        var countrypayload = {
          Entity_Id: getId,
          Country_Name: countryName,
          Country_Description: countryDescription,
          Country_Type_Code: parseInt(`${id}${countryId}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .post(`${BASE_URL}/Erpapp/CountryDetailsCRUD/`, countrypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.status === 201 && res?.data?.id) {
              toast.success("Country created successfully");
              setOpenCountry(false);
              getCountryDatas();
              setCountryName("");
              setCountryDescription("");
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("Country name is already exists");
          });
      }
    }
  };

  // edit country
  const editCountryById = async (data) => {
    setOpenCountry(true);
    setCurrentData(data);

    await axios.get(`${BASE_URL}/Erpapp/CountryDetailsCRUD/?id=${data?.id}`, header)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setCountryName(res?.data?.Country_Name);
          setCountryDescription(res?.data?.Country_Description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // delete a country 
  const deleteCountryById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/CountryDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("Country deleted successfully");
          getCountryDatas();
        } else {
          toast.error(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }


  useEffect(() => {
    const nextRegion = regions?.filter((opt, index) => index + 1 === regions?.length);
    if (nextRegion) {
      const nextRegionId = nextRegion[0]?.Region_Id;
      const numericPart = parseInt(nextRegionId, 10) + 1;
      const paddedValue = numericPart.toString().padStart(nextRegionId?.length, '0');
      setRegionId(paddedValue);
    }
  }, [regionName]);


  // Regular Expression
  const validateRegion = () => {
    let error = {};

    if (regionName === "" || regionName === null || regionName === undefined) {
      error.regionName = "Region Name is required"
    }
    if (regionDescription === "" || regionDescription === null || regionDescription === undefined) {
      error.regionDescription = "Region Description is required"
    }

    return error;
  };

  const handleCreateRegion = async (e) => {
    e.preventDefault();

    let validForm = validateRegion();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var regionpayload = {
          ...currentData,
          Entity_Id: getId,
          Country_Id: getId1,
          Region_Name: regionName,
          Region_Description: regionDescription,
          Region_Type_Code: parseInt(`${id}${id1}${regionId}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        await axios
          .put(`${BASE_URL}/Erpapp/RegionDetailsCRUD/`, regionpayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Region updated successfully");
              setOpenRegion(false);
              getRegionDatas();
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
          });
      } else {
        const getRegionName = regions?.some((opt) => opt?.Region_Name === regionName)
        if (getRegionName) {
          toast.error("Region Name is already exists")
        } else {
          var regionpayload = {
            Entity_Id: getId,
            Country_Id: getId1,
            Region_Name: regionName,
            Region_Description: regionDescription,
            Region_Type_Code: parseInt(`${id}${id1}${regionId}`),
            Company_Id: parseInt(localStorage.getItem("OrganizationId")),
            Created_By: parseInt(localStorage.getItem("UserId")),
            Updated_By: parseInt(localStorage.getItem("UserId")),
          };
          await axios
            .post(`${BASE_URL}/Erpapp/RegionDetailsCRUD/`, regionpayload, header)
            .then((res) => {
              console.log(res?.data);
              if (res?.status === 201 && res?.data?.id) {
                toast.success("Region created successfully");
                setOpenRegion(false);
                getRegionDatas();
                setRegionName("");
                setRegionDescription("");
              }
            })
            .catch((error) => {
              console.log(error);
              handleError(error);
            });
        }
      }
    }
  };

  // edit region
  const editRegionById = async (data) => {
    setOpenRegion(true);
    setCurrentData(data);

    await axios.get(`${BASE_URL}/Erpapp/RegionDetailsCRUD/?id=${data?.id}`, header)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setRegionName(res?.data?.Region_Name);
          setRegionDescription(res?.data?.Region_Description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // delete a region 
  const deleteRegionById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/RegionDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("Region deleted successfully");
          getRegionDatas();
        } else {
          toast.error(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }


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
    axios
      .post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        { country: countryName.country },
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


  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);


  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Organization Structure
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Users shall use this form to set up the Organization structure for all
          operational activities.
        </Typography>

        <Div>
          <TabContext value={inputNumber}>
            <Box
              sx={{
                borderBottom: 0,
                borderColor: "divider",
                overflow: "auto",
                mb: -1,
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="scrollable auto tabs example"
                variant="scrollable"
                scrollButtons={isMobile ? true : false}
                allowScrollButtonsMobile
              >
                <Tab
                  label="Legal Entity"
                  value="1"
                  sx={{ fontSize: "16px", color: "#000000" }}
                />
                <Tab
                  label="Country"
                  value="2"
                  onClick={() => {
                    getCountryDatas();
                    getEntity();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />
                <Tab
                  label="Region"
                  value="3"
                  onClick={() => {
                    getRegionDatas();
                    getCountry();
                    getEntity();
                    getRegion();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />
                <Tab
                  label="State"
                  value="4"
                  onClick={() => {
                    getStateDatas();
                    getCountry();
                    getEntity();
                    getRegion();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />
                <Tab
                  label="City"
                  value="5"
                  onClick={() => {
                    getCountry();
                    getEntity();
                    getRegion();
                    getStates();
                    getCityDatas();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />

                <Tab
                  label="Business Unit"
                  value="6"
                  onClick={() => {
                    getCountry();
                    getEntity();
                    getRegion();
                    getStates();
                    getCityDatas();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />

                <Tab
                  label="Zones"
                  value="7"
                  onClick={() => {
                    getCity();
                    getZoneDatas();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />

                <Tab
                  label="Store"
                  value="8"
                  onClick={() => {
                    getCity();
                    getZoneDatas();
                  }}
                  sx={{ fontSize: "16px", color: "#000000" }}
                />

                {/* <Tab
                  label="Hub"
                  value="8"
                  sx={{ fontSize: "16px", color: "#000000" }}
                /> */}
                {/* <Tab
                  label="Location"
                  value="9"
                  sx={{ fontSize: "16px", color: "#000000" }}
                /> */}
              </TabList>

            </Box>

            <DataContext.Provider
              value={{
                entities,
                countries,
                regions,
                states,
                cities,
                zones,
                id,
                id1,
                id2,
                id3,
                id4,
                name,
                name1,
                name2,
                name3,
                name4,
                name5,
                name6,
                setName,
                setName1,
                setName2,
                setName3,
                setName4,
                setName5,
                setName6,
                checkId1,
                checkId2,
                checkId3,
                checkId4,
                checkId5,
                checkId6,
                setCheckId1,
                setCheckId2,
                setCheckId3,
                setCheckId4,
                setCheckId5,
                setCheckId6,
                setCheckId7,
                getId,
                getId1,
                getId2,
                setGetId2,
                getId3,
                setGetId3,
                getId4,
                setGetId4,
                getId5,
                setGetId5,
                getId6,
                setGetId6,
                getCityDatas,
                getStates,
                getZoneDatas,
                getStateDatas,
                userRolePermissions,
                currentData,
                setCurrentData
              }}
            >
              <TabPanel value="1" index="1" sx={{ ml: -3 }}>
                {/* <EntityLists getEntity={getEntity}/> */}
                <Div>
                  <Div
                    className="card"
                    sx={{ p: 2, minHeight: "390px", borderRadius: 0, m: 0 }}
                  >
                    <Div
                      sx={{
                        position: "absolute",
                        right: 15,
                        // width: "100%",
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      {Array.isArray(userRolePermissions) && userRolePermissions.includes(121) && (
                        <ErpCreateButton handleClick={handleAddLegalEntity} name={"Add Legal Entity"} />
                      )}
                    </Div>
                    <br />

                    <Div sx={{ mt: { lg: 3, md: 5, xs: 5 } }}>
                      <JumboScrollbar
                        autoHeight={true}
                        autoHideTimeout={4000}
                        autoHeightMin={scrollHeight ? scrollHeight : 349}
                        autoHide={true}
                        hideTracksWhenNotNeeded
                        id="no-more-tables"
                      >
                        <Table stickyHeader className="table table-borderless">
                          <TableHead className="table-head">
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {entities?.map((entity, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell padding="checkbox" data-title="Status">
                                    <FormControlLabel
                                      control={
                                        <Radio
                                          color="primary"
                                          size="small"
                                          name="id"
                                          value={entity?.Entity_Id}
                                          checked={
                                            checkId1 === entity?.Entity_Id
                                          }
                                          onChange={(e) => {
                                            setCheckId1(e.target.value);
                                            setGetId(entity?.id);
                                            setName(entity?.Entity_Name);
                                            getCountry();
                                          }}
                                        />
                                      }
                                    />
                                  </TableCell>
                                  <TableCell data-title="Code">{entity?.Entity_Id}</TableCell>
                                  <TableCell data-title="Name">{entity?.Entity_Name}</TableCell>
                                  <TableCell data-title="Description">{entity?.Entity_Description}</TableCell>
                                  <TableCell data-title="Action">
                                    <Div sx={{ textAlign: "left" }}>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          size="small"
                                          className="delete-icon"
                                          onClick={() => deleteEntityById(entity?.id)}
                                          disabled={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(124) ? false : true}
                                        >
                                          <MdDelete
                                            color={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(124) ? "" : "#C7C8CC"}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </JumboScrollbar>
                    </Div>
                  </Div>

                  {/* create entity popup */}
                  <Dialog
                    open={openEntity}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <form onSubmit={handleCreateEntity}>
                      <DialogContent>
                        <Grid container>
                          <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                            <Typography className="col-12 input-label">
                              Legal Entity Name{" "}
                              <span className="required">*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                            <TextField
                              className="col-12 input-box"
                              id="outlined-basic"
                              placeholder="Legal Entity Name"
                              variant="outlined"
                              name="entityName"
                              value={entityName}
                              onChange={(e) =>
                                setEntityName(e.target.value)
                              }
                              autoComplete="off"
                              sx={{
                                minWidth: { xs: "100%" },
                                maxWidth: "1005px",
                              }}
                            />
                            <Div style={{ color: "red" }}>
                              {errors.entityName}
                            </Div>
                          </Grid>

                          <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                            <Typography className="col-12 input-label">
                              Description <span className="required">*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                            <TextField
                              className="col-12 multiline-box"
                              id="outlined-basic"
                              placeholder="Description"
                              multiline
                              rows={3}
                              variant="outlined"
                              name="entityDescription"
                              value={entityDescription}
                              onChange={(e) =>
                                setEntityDescription(e.target.value)
                              }
                              autoComplete="off"
                              sx={{
                                minWidth: { xs: "100%" },
                                maxWidth: "1005px",
                              }}
                            />
                            <Div style={{ color: "red" }}>
                              {errors.entityDescription}
                            </Div>
                          </Grid>
                        </Grid>
                      </DialogContent>

                      {/* code for save and cancel button */}
                      <DialogActions>
                        <Div className="buttons" sx={{
                          mb: 3, display: "flex",
                          justifyContent: { sm: "center", md: "end" }
                        }}>
                          <ButtonGroup
                            aria-label="split button"
                            type="submit"
                            sx={{
                              mt: { xs: 0.5, lg: 0 },
                              mr: { xs: 0, md: 1 }
                            }}
                          >
                            <Button type="submit" className="plus-button" sx={{ width: { md: { md: "99px !important" } } }}>
                              {currentData?.id !== undefined ? "Update" : "Save"}
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
                            <Button className="plus-button" sx={{ width: { md: { md: "99px !important" } } }}>Cancel</Button>
                            <Button variant="contained" className="icon-button">
                              <TiCancel size={20} />
                            </Button>
                          </ButtonGroup>
                        </Div>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Div>
              </TabPanel>

              <TabPanel value="2" index="2" sx={{ ml: -2 }}>
                {/* <CountryLists countries={countries} getId={getId}/> */}
                <Div
                  className="card"
                  sx={{ p: 2, minHeight: "390px", borderRadius: 0, m: 0 }}
                >
                  <Div
                    sx={{
                      position: "absolute",
                      right: 15,
                      // width: "100%",
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    {Array.isArray(userRolePermissions) && userRolePermissions.includes(85) && (
                      <ErpCreateButton handleClick={handleAddCountry} name={"Add Country"} />
                    )}
                  </Div>
                  <br />

                  <Div sx={{ mt: { lg: 3, md: 5, xs: 5 } }}>
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
                            <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {countries?.map((country) => {
                            return (
                              <TableRow>
                                <TableCell padding="checkbox" data-title="Status">
                                  <FormControlLabel
                                    control={
                                      <Radio
                                        color="primary"
                                        size="small"
                                        checked={
                                          checkId2 === country?.Country_Id
                                        }
                                        value={country?.Country_Id}
                                        onChange={(e) => {
                                          setCheckId2(e.target.value);
                                          setGetId1(country?.id);
                                          setName1(country?.Country_Name);
                                          getRegion();
                                        }}
                                      />
                                    }
                                  />
                                </TableCell>
                                <TableCell data-title="Code">
                                  {id}
                                  {country?.Country_Id}
                                </TableCell>
                                <TableCell data-title="Name">{country?.Country_Name}</TableCell>
                                <TableCell data-title="Description">
                                  {country?.Country_Description}
                                </TableCell>
                                <TableCell data-title="Action">
                                  <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={86} deletePermissionId={88} onClickEdit={() => editCountryById(country)} onClickDelete={() => deleteCountryById(country?.id)} align="left" />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </JumboScrollbar>
                  </Div>

                </Div>

                {/* create a country */}
                <Dialog
                  open={openCountry}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <form onSubmit={handleCreateCountry}>
                    <DialogContent>
                      <Grid container>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Entity Name <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <FormControl className="col-12">
                            <Autocomplete
                              className={`search-select col-12 ${errors.entityName ? "is-invalid" : ""
                                }`}
                              id="entityName"
                              name="entityName"
                              options={entities?.map((entity) => entity)}
                              getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                  return option;
                                }
                                if (option && option?.Entity_Name) {
                                  return option?.Entity_Name;
                                }
                                return "";
                              }}
                              value={entities?.find(
                                (option) =>
                                  option?.Entity_Name === entityName
                              )}
                              onChange={(e, newValue) => {
                                setEntityName(newValue);
                                // setValue(
                                //   "entityName",
                                //   entities?.find(
                                //     (option) =>
                                //       option?.Entity_Name === entityName
                                //   )
                                // );
                              }}
                              defaultValue={entities?.find(
                                (option) => option?.Entity_Name === name
                              )}
                              isOptionEqualToValue={(option, value) =>
                                option?.Entity_Name === value
                              }
                              sx={{
                                minWidth: { xs: "100%" },
                                maxWidth: "1005px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Entity Name"
                                  variant="outlined"
                                  autoComplete="off"
                                />
                              )}
                            />
                          </FormControl>
                          <Div style={{ color: "red" }}>
                            {errors.entityName}
                          </Div>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Country Name <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Autocomplete
                            // freeSolo
                            className={`search-select col-12 ${errors.countryName ? "is-invalid" : ""
                              }`}
                            id="countryName"
                            name="countryName"
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              if (option && option?.country) {
                                return option?.country;
                              }
                              return "";
                            }}
                            options={countryLists?.map(
                              (countrylist) => countrylist
                            )}
                            value={currentData?.id !== undefined ? countryName : countryLists?.find(
                              (option) => option?.country === countryName
                            )}
                            onChange={(e, newValue) => {
                              setCountryName(newValue?.country);
                            }}
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                              fontSize: "14px",
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Country Name"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )}
                          />

                          <Div style={{ color: "red" }}>
                            {errors.countryName}
                          </Div>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Description
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <TextField
                            className={`multiline-box col-12 ${errors.countryDescription ? "is-invalid" : ""
                              }`}
                            id="outlined-basic"
                            placeholder="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                            name="countryDescription"
                            value={countryDescription}
                            onChange={(e) =>
                              setCountryDescription(e.target.value)
                            }
                            autoComplete="off"
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                            }}
                          />
                          <Div style={{ color: "red" }}>
                            {errors.countryDescription}
                          </Div>
                        </Grid>
                      </Grid>
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
                          // loading={isSubmitting}
                          sx={{
                            mt: { xs: 0.5, lg: 0 },
                            mr: { xs: 0, md: 1 }
                          }}
                        >
                          <Button type="submit" className="plus-button" sx={{ width: { md: "99px !important" } }}>
                            {currentData?.id !== undefined ? "Update" : "Save"}
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
                  {/* //     </Form>
                    //   )}
                    // </Formik> */}
                </Dialog>

              </TabPanel>

              <TabPanel value="3" index="3" sx={{ ml: -2 }}>
                {/* <RegionLists /> */}
                <Div
                  className="card"
                  sx={{ p: 2, minHeight: "380px", borderRadius: 0, m: 0 }}
                >
                  <Div
                    sx={{
                      position: "absolute",
                      right: 15,
                      // width: "100%",
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    {Array.isArray(userRolePermissions) && userRolePermissions.includes(173) && (
                      <ErpCreateButton handleClick={handleAddRegion} name={"Add Region"} />
                    )}
                  </Div>
                  <br />

                  <Div sx={{ mt: { lg: 3, md: 5, xs: 5 } }}>
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
                            <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {regions?.map((region) => {
                            return (
                              <TableRow>
                                <TableCell padding="checkbox" data-title="Status">
                                  <FormControlLabel
                                    control={
                                      <Radio
                                        color="primary"
                                        size="small"
                                        checked={checkId3 === region?.Region_Id}
                                        value={region?.Region_Id}
                                        onChange={(e) => {
                                          setCheckId3(e.target.value);
                                          setGetId2(region?.id);
                                          setName2(region?.Region_Name);
                                          getStates();
                                        }}
                                      />
                                    }
                                  />
                                </TableCell>
                                <TableCell data-title="Code">
                                  {id}
                                  {id1}
                                  {region?.Region_Id}
                                </TableCell>
                                <TableCell data-title="Name">{region?.Region_Name}</TableCell>
                                <TableCell data-title="Description">
                                  {region?.Region_Description}
                                </TableCell>
                                <TableCell data-title="Action">
                                  <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={174} deletePermissionId={176} onClickEdit={() => editRegionById(region)} onClickDelete={() => deleteRegionById(region?.id)} align="left" />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </JumboScrollbar>
                  </Div>

                </Div>

                {/* create a region */}
                <Dialog
                  open={openRegion}
                  // onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <form onSubmit={handleCreateRegion}>
                    <DialogContent>
                      <Grid container>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Entity Name <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Autocomplete
                            // freeSolo
                            className={`search-select col-12 ${errors.entityName ? "is-invalid" : ""
                              }`}
                            id="free-solo-demo"
                            placeholder="Entity Name"
                            name="entityName"
                            options={entities?.map((entity) => entity)}
                            getOptionLabel={(option) => option?.Entity_Name}
                            value={entities?.find(
                              (option) => option?.Entity_Name === entityName
                            )}
                            onChange={(e, newValue) =>
                              setEntityName(newValue)
                            }
                            defaultValue={entities?.find(
                              (option) => option?.Entity_Name === name
                            )}
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Entity Name"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )}
                          />
                          <Div style={{ color: "red" }}>
                            {errors.entityName}
                          </Div>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Country Name <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Autocomplete
                            // freeSolo
                            className={`search-select col-12 ${errors.countryName ? "is-invalid" : ""
                              }`}
                            id="free-solo-demo"
                            placeholder="Country Name"
                            name="countryName"
                            options={countries?.map((country) => country)}
                            getOptionLabel={(option) => option?.Country_Name}
                            value={countries?.find(
                              (option) =>
                                option?.Country_Name === countryName
                            )}
                            onChange={(e, newValue) => {
                              setCountryName(newValue);
                            }}
                            defaultValue={countries.find(
                              (option) => option?.Country_Name === name1
                            )}
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                              fontSize: "14px",
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Country Name"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )}
                          />
                          <Div style={{ color: "red" }}>
                            {errors.countryName}
                          </Div>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Region Name <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <TextField
                            className={`input-box col-12 ${errors.regionName ? "is-invalid" : ""
                              }`}
                            id="outlined-basic"
                            placeholder="Region Name"
                            variant="outlined"
                            name="regionName"
                            value={regionName}
                            onChange={(e) => setRegionName(e.target.value)}
                            autoComplete="off"
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                            }}
                          />
                          <Div style={{ color: "red" }}>
                            {errors.regionName}
                          </Div>
                        </Grid>

                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <Typography className="col-12 input-label">
                            Description
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                          <TextField
                            className={`multiline-box col-12 ${errors.regionDescription ? "is-invalid" : ""
                              }`}
                            id="outlined-basic"
                            placeholder="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                            name="regionDescription"
                            value={regionDescription}
                            onChange={(e) =>
                              setRegionDescription(e.target.value)
                            }
                            autoComplete="off"
                            sx={{
                              minWidth: { xs: "100%" },
                              maxWidth: "1005px",
                            }}
                          />
                          <Div style={{ color: "red" }}>
                            {errors.regionDescription}
                          </Div>
                        </Grid>
                      </Grid>
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
                          // loading={isSubmitting}
                          sx={{
                            mt: { xs: 0.5, lg: 0 },
                            mr: { xs: 0, md: 1 }
                          }}
                        >
                          <Button type="submit" className="plus-button" sx={{ width: { md: "99px !important" } }}>
                            {currentData?.id !== undefined ? "Update" : "Save"}
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
              </TabPanel>

              <TabPanel value="4" index="4" sx={{ ml: -2 }}>
                <StateLists />
              </TabPanel>

              <TabPanel value="5" index="5" sx={{ ml: -2 }}>
                <CityLists />
              </TabPanel>

              <TabPanel value="6" index="6" sx={{ ml: -2 }}>
                <PartnerList />
              </TabPanel>

              <TabPanel value="7" index="7" sx={{ ml: -2 }}>
                <ZoneLists />
              </TabPanel>

              <TabPanel value="8" index="8" sx={{ ml: -2 }}>
                <StoreList />
              </TabPanel>
            </DataContext.Provider>
          </TabContext>
        </Div>
        <ScrollToTop Scrollheight={180} />
      </JumboContentLayoutMain>
    </>
  );
}