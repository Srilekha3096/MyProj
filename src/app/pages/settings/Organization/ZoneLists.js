import Div from "@jumbo/shared/Div";
import {
  Autocomplete,
  Button,
  ButtonGroup,
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
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./OrganizationStructure";
import { toast } from "react-toastify";
import { BASE_URL } from "app/services/auth-services";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";


const ZoneLists = (scrollHeight) => {
  const { name1, name3, name4, cities, zones, getId4, getId6, setGetId6, setName6, getZoneDatas, getId5, name5, checkId7, setCheckId7, userRolePermissions, currentData, setCurrentData } = useContext(DataContext);

  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };


  const [partners, setPartners] = useState([]);


  const [open, setOpen] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [cityName, setCityName] = useState({
    City_Name: name4
  });
  const [businessUnit, setBusinessUnit] = useState(name5);
  const [zoneLists, setZoneLists] = useState([]);
  const [zoneName, setZoneName] = useState();
  const [pincode, setPincode] = useState("");
  const [cityId, setCityId] = useState(getId4);
  const [errors, setErrors] = useState({});


  const handleAddZones = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setZoneName("");
    // setCityName("");
    // setBusinessUnit("");
    setPincode("");
    setErrors({});
  };

  const handleCheckZone = async () => {
    try {
      console.log("pin", pincode);
      const response = await axios.get(`${BASE_URL}/Erpapp/PincodeCRUD/?pincode=${pincode}`, header);
      const dataResponse = response?.data;
      console.log("PincodeCRUD", response?.data);

      const normalizeCityName = (cityName) => {
        let normalized = cityName?.toLowerCase().replace(/\s/g, '');
        normalized = normalized?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return normalized;
      };

      const isValidPincode = dataResponse?.some((opt) => {
        const normalizedCityName = normalizeCityName(opt?.cityname);
        const normalizedSearchName = normalizeCityName(cityName?.City_Name);

        return normalizedCityName === normalizedSearchName;
      });

      console.log("isValidPincode", isValidPincode, dataResponse);
      if (dataResponse?.length > 0) {
        toast.success("Pincode is valid");
        setZoneLists(dataResponse);
        getZoneDatas();
        setShowSave(true);
      } else {
        toast.error("The provided pincode doesn't exist in the city.");
        setZoneLists([]);
      }
    } catch (error) {
      console.error(error);
      setZoneName("");
      setCityName("");
      setBusinessUnit("");
      setPincode("");
      setErrors({});

      // Show error message
      toast.error("Please enter a valid pincode");
    }
  };



  // const handleCheckZone = async () => {
  //   console.log("pin", pincode);
  //   axios
  //     .get(`https://api.postalpincode.in/pincode/${pincode}`)
  //     .then((res) => {
  //       console.log("pinCodes", res?.data);
  //       if (res?.data) {
  //         res?.data?.map((item) => {
  //           let postOffice = item?.PostOffice
  //           setZoneName(postOffice)
  //         })
  //       }
  //       if (res.data.cityname.toLowerCase() === name4.toLowerCase()) {
  //         toast.success("Pincode is valid");
  //       } else {
  //         toast.error("Pincode is Already Exists");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Please enter a valid pincode");
  //     });
  //   // let API_KEY = '65afa4042e767571080003lgca37daa'
  //   // await axios.get(`https://app.zipcodebase.com/landing_demo/?codes=${pincode}&country=&api_key=${API_KEY}`).then((res) => {
  //   //   console.log("PPPP...", res)
  //   //   let result = res.data.results[pincode]?.filter((opt) => opt.province === cityName?.City_Name) || [];
  //   //   if (result) {
  //   //     console.log("result", result)
  //   //     setZoneLists(result);
  //   //     getZoneDatas();
  //   //     setShowSave(true);
  //   //     toast.success("Pincode is valid")
  //   //   }else{
  //   //     toast.error("Please enter a valid pincode");
  //   //   }
  //   // }).catch((error) => {
  //   //   console.log(error);
  //   //   toast.error(error.message);
  //   // })
  // };

  // Regular Expression
  const validate = () => {
    let error = {};

    if (pincode === "" || pincode === null || pincode === undefined) {
      error.pincode = "Pin Code is required"
    }
    if (zoneName === "" || zoneName === null || zoneName === undefined) {
      error.zoneName = "Zone Name is required"
    }

    return error;
  };

  const handleCreateZone = (e) => {
    e.preventDefault();

    let validForm = validate();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var zonepayload = {
          ...currentData,
          Zone_Name: zoneName,
          Pincode: pincode,
          City_Id: cityId,
          Zone_Type_Code: 6,
          Partner_Id: getId5,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .put(`${BASE_URL}/Erpapp/ZoneDetailsCRUD/`, zonepayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Zone updated successfully");
              getZoneDatas();
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        var zonepayload = {
          Zone_Name: zoneName,
          Pincode: pincode,
          City_Id: cityId,
          Zone_Type_Code: 6,
          Partner_Id: getId5,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .post(`${BASE_URL}/Erpapp/ZoneDetailsCRUD/`, zonepayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("Zone created successfully");
              getZoneDatas();
              setZoneName("");
              setPincode("");
              setBusinessUnit("");
              setCityName("");
              setErrors({});
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Zone name is already exists");
          });
      }
    }
  };


  // GetPartners
  const getPartners = async () => {
    await axios.get(`${BASE_URL}/Erpapp/citywisepartner/?BusinessUnit_City=${cityName?.City_Name}`, header)
      .then((response) => {
        console.log("Partner Response", response?.data);
        const names = response?.data;
        setPartners(names);
      }).catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    getPartners();
  }, [cityName]);


  // edit a zone
  const editZoneById = async (id) => {
    setCurrentData(id);
    await axios.get(`${BASE_URL}/Erpapp/ZoneDetailsCRUD/?id=${id?.id}`, header)
      .then((res) => {
        console.log(res.data);
        if (res?.status === 200) {
          setPincode(res?.data?.Pincode);
          setZoneName(res?.data?.Zone_Name);
          setShowSave(true);
        } else {
          toast.error(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  }


  // delete a zone 
  const deleteZoneById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/ZoneDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("Zone deleted successfully");
          getZoneDatas();
        } else {
          toast.error(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }




  return (
    <>
      <Div>
        <Div
          className="card"
          sx={{ p: 2, borderRadius: 0, m: 0 }}
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
            {Array.isArray(userRolePermissions) && userRolePermissions.includes(201) && (
              <ErpCreateButton handleClick={handleAddZones} name={"Add Zone"} />
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
                    <TableCell sx={{ fontWeight: 600 }}>Pincode</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Zone Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>City Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {zones?.filter((opt) => opt?.Partner_Id === getId5).length > 0 ? zones?.filter((opt) => opt.Partner_Id === getId5).map((zone) => {
                    return (
                      <TableRow key={zone?.id}>
                        <TableCell padding="checkbox" data-title="Status">
                          <FormControlLabel
                            control={
                              <Radio
                                color="primary"
                                size="small"
                                checked={getId6 === zone?.id}
                                value={zone?.id}
                                onChange={(e) => {
                                  console.log("e.target.value", e.target.value, getId6)
                                  setCheckId7(e.target.value);
                                  setGetId6(zone?.id);
                                  setName6(zone?.Zone_Name);
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell data-title="Pincode">{zone?.Pincode}</TableCell>
                        <TableCell data-title="Zone Name">{zone?.Zone_Name}</TableCell>
                        <TableCell data-title="City Name">{name4}</TableCell>
                        <TableCell data-title="Action">
                          <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={202} deletePermissionId={204} onClickEdit={() => editZoneById(zone)} onClickDelete={() => deleteZoneById(zone?.id)} align="left" />
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

        {/* create a zone */}
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleCreateZone}>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className="col-12 input-label">
                    City Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className="col-12">
                    <Autocomplete
                      className={`search-select col-12 ${errors.cityName ? "is-invalid" : ""
                        }`}
                      id="free-solo-demo"
                      name="cityName"
                      options={cities?.map((city) => city)}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.City_Name) {
                          return option?.City_Name;
                        }
                        return "";
                      }}
                      value={cityName?.City_Name}
                      onChange={(e, newValue) => {
                        setCityName(newValue);
                        setCityId(newValue?.id);
                      }}
                      isOptionEqualToValue={(option, value) => option?.City_Name === value}
                      sx={{
                        minWidth: { xs: "100%" },
                        maxWidth: "1005px",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="City Name"
                          variant="outlined"
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormControl>
                  <Div style={{ color: "red" }}>
                    {errors.cityName}
                  </Div>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="col-12 input-label">
                    Business Unit <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className="col-12">
                    <Autocomplete
                      className="search-select col-12"
                      id="free-solo-demo"
                      name="businessUnit"
                      options={partners}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.Partner_Name) {
                          return option?.Partner_Name;
                        }
                        return "";
                      }}
                      value={businessUnit}
                      onChange={(e, newValue) => {
                        setBusinessUnit(newValue);
                      }}
                      isOptionEqualToValue={(option, value) => option?.Partner_Name === value}
                      sx={{
                        minWidth: { xs: "100%" },
                        maxWidth: "1005px",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Business Unit"
                          variant="outlined"
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="col-12 input-label">
                    Pincode <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    className={`input-box col-10 ${errors.pincode ? "is-invalid" : ""
                      }`}
                    id="outlined-basic"
                    placeholder="Enter the pincode"
                    variant="outlined"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => {
                      console.log("outlined", e.target.value)
                      setPincode(e.target.value);
                    }}
                    autoComplete="off"
                    sx={{
                      minWidth: { xs: "100%" },
                      maxWidth: "1005px",
                    }}
                  />
                  <Div style={{ color: "red" }}>
                    {errors.pincode}
                  </Div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{ ml: { md: 4 }, mt: { xs: 2, md: 0 } }}
                >
                  <Button className="save-button" onClick={handleCheckZone}>
                    Check
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Typography className="col-12 input-label">
                    Zone Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                      className={`input-box col-12 ${errors.zoneName ? "is-invalid" : ""
                        }`}
                      id="outlined-basic"
                      placeholder="Enter the zone name"
                      variant="outlined"
                      {...register("zoneName")}
                      name="zoneName"
                      value={zoneName}
                      onChange={(e) => setZoneName(e.target.value)}
                      autoComplete="off"
                      sx={{
                        minWidth: { xs: "100%" },
                        maxWidth: "1005px",
                      }}
                    /> */}
                  <FormControl className="col-12">
                    <Autocomplete
                      className={`search-select col-12 ${errors.zoneName ? "is-invalid" : ""
                        }`}
                      id="free-solo-demo"
                      name="zoneName"
                      options={zoneLists?.map((zone) => zone)}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option && option?.Zonename) {
                          return option?.Zonename;
                        }
                        return "";
                      }}
                      value={zoneName}
                      onChange={(e, newValue) => {
                        setZoneName(newValue?.Zonename);
                      }}
                      isOptionEqualToValue={(option, value) => option?.Zonename === value}
                      sx={{
                        minWidth: { xs: "100%" },
                        maxWidth: "1005px",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter the zone name"
                          variant="outlined"
                          autoComplete="off"
                        />
                      )}
                    />
                  </FormControl>
                  <Div style={{ color: "red" }}>
                    {errors.zoneName}
                  </Div>
                </Grid>
              </Grid>
            </DialogContent>
            {/* code for save and cancel button */}
            <Div className="buttons" sx={{
              mt: 5, mb: 3, display: "flex",
              justifyContent: "center"
            }}>
              <ButtonGroup
                aria-label="split button"
                type="submit"
                color="primary"
                // loading={isSubmitting}
                disabled={showSave ? false : true}
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  mr: { xs: 0, md: 1 },
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
          </form>
        </Dialog>
      </Div>
    </>
  );
};

export default ZoneLists;