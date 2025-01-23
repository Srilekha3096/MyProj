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
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./OrganizationStructure";
import { toast } from "react-toastify";
import { BASE_URL } from "app/services/auth-services";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";



const CityLists = (scrollHeight) => {
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
    setName4,
    checkId5,
    setCheckId5,
    getId,
    getId1,
    getId2,
    getId3,
    setGetId4,
    getCityDatas,
    getStates,
    userRolePermissions,
    currentData,
    setCurrentData
  } = useContext(DataContext);


  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };


  const [open, setOpen] = React.useState(false);
  const [entityName, setEntityName] = useState({
    id: getId,
    Entity_Name: name,
  });
  const [countryName, setCountryName] = useState({
    id: getId1,
    Country_Name: name1,
  });
  const [regionName, setRegionName] = useState({
    id: getId2,
    Region_Name: name2,
  });
  const [stateName, setStateName] = useState({
    id: getId3,
    State_Name: name3,
  });
  const [cityId, setCityId] = useState();
  const [cityName, setCityName] = useState("");
  const [cityDescription, setCityDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [cityLists, setCityLists] = useState([]);

  const handleAddCity = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCityName("");
    setCityDescription("");
    setErrors({});
  };

  const getCityLists = () => {
    var payload = {
      country: countryName?.Country_Name,
      state: stateName?.State_Name,
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
    const currentValue = cities?.filter((opt, index) => index + 1 === cities?.length)[0]?.City_Id
    const numericPart = parseInt(currentValue, 10) + 1;
    const paddedValue = numericPart.toString().padStart(currentValue?.length, '0');
    console.log("data", paddedValue)
    setCityId(paddedValue);
  }, [cityName]);


  // Regular Expression
  const validate = () => {
    let error = {};

    if (cityName === "" || cityName === null || cityName === undefined) {
      error.cityName = "City Name is required"
    }
    if (cityDescription === "" || cityDescription === null || cityDescription === undefined) {
      error.cityDescription = "City Description is required"
    }

    return error;
  };

  const handleCreateCity = (e) => {
    e.preventDefault();
    let validForm = validate();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var citypayload = {
          ...currentData,
          Entity_Id: parseInt(entityName?.id),
          Country_Id: parseInt(countryName?.id),
          Region_Id: parseInt(regionName?.id),
          State_Id: parseInt(stateName?.id),
          City_Name: cityName,
          City_Description: cityDescription,
          // City_Type_Code: parseInt(`${id}${id1}${id2}${id3}${cityId}`),
          City_Type_Code: parseInt(`${id}${id1}${id2}${id3}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .put(`${BASE_URL}/Erpapp/CityDetailsCRUD/`, citypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("City updated successfully");
              setOpen(false);
              getCityDatas();
            } else {
              toast.error(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("City name is already exists");
          });
      } else {
        var citypayload = {
          Entity_Id: parseInt(entityName?.id),
          Country_Id: parseInt(countryName?.id),
          Region_Id: parseInt(regionName?.id),
          State_Id: parseInt(stateName?.id),
          City_Name: cityName,
          City_Description: cityDescription,
          // City_Type_Code: parseInt(`${id}${id1}${id2}${id3}${cityId}`),
          City_Type_Code: parseInt(`${id}${id1}${id2}${id3}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .post(`${BASE_URL}/Erpapp/CityDetailsCRUD/`, citypayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.status === 201 && res?.data?.id) {
              toast.success("City created successfully");
              setOpen(false);
              getCityDatas();
              setCityName("");
              setCityDescription("");
              setErrors({});
            } else {
              toast.error(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("City name is already exists");
          });
      }
    }
  };


  // edit a city
  const editCityById = async (id) => {
    setCurrentData(id);
    setOpen(true);

    await axios.get(`${BASE_URL}/Erpapp/CityDetailsCRUD/?id=${id?.id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200) {
          setCityName(res?.data?.City_Name);
          setCityDescription(res?.data?.City_Description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // delete a city 
  const deleteCityById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/CityDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("City deleted successfully");
          getCityDatas();
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
          {Array.isArray(userRolePermissions) && userRolePermissions.includes(69) && (
            <ErpCreateButton handleClick={handleAddCity} name={"Add City"} />
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
                  <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities?.map((city) => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox" data-title="Status">
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              size="small"
                              checked={checkId5 === city?.City_Id}
                              value={city?.City_Id}
                              onChange={(e) => {
                                setCheckId5(e.target.value);
                                setGetId4(city?.id);
                                setName4(city?.City_Name);
                              }}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell data-title="Code">
                        {id}
                        {id1}
                        {id2}
                        {id3}
                        {city?.City_Id}
                      </TableCell>
                      <TableCell data-title="Name">{city?.City_Name}</TableCell>
                      <TableCell data-title="Description">{city?.City_Description}</TableCell>
                      <TableCell data-title="Action">
                        <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={70} deletePermissionId={72} onClickEdit={() => editCityById(city)} onClickDelete={() => deleteCityById(city?.id)} align="left" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </JumboScrollbar>
        </Div>

      </Div>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleCreateCity}>
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
                  variant="outlined"
                  options={entities}
                  getOptionLabel={(option) => option?.Entity_Name}
                  value={entities?.find(
                    (option) =>
                      option?.Entity_Name === entityName?.Entity_Name
                  )}
                  onChange={(e, newValue) => setEntityName(newValue)}
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
                  variant="outlined"
                  options={countries}
                  getOptionLabel={(option) => option?.Country_Name}
                  value={countries?.find(
                    (option) =>
                      option?.Country_Name === countryName?.Country_Name
                  )}
                  onChange={(e, newValue) => {
                    setCountryName(newValue);
                  }}
                  onFocus={() => getStates()}
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
                <Autocomplete
                  // freeSolo
                  className={`search-select col-12 ${errors.regionName ? "is-invalid" : ""
                    }`}
                  id="free-solo-demo"
                  placeholder="Region Name"
                  options={regions?.map((region) => region)}
                  getOptionLabel={(option) => option?.Region_Name}
                  value={regions?.find(
                    (option) =>
                      option?.Region_Name === regionName?.Region_Name
                  )}
                  onChange={(e, newValue) => {
                    setRegionName(newValue);
                  }}
                  autoComplete="off"
                  sx={{
                    minWidth: { xs: "100%" },
                    maxWidth: "1005px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Region Name"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {errors.regionName?.message}
                </Div>
              </Grid>

              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <Typography className="col-12 input-label">
                  State Name <span className="required">*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <Autocomplete
                  // freeSolo
                  className={`search-select col-12 ${errors.stateName ? "is-invalid" : ""
                    }`}
                  id="free-solo-demo"
                  placeholder="State Name"
                  options={states?.map((state) => state)}
                  getOptionLabel={(option) => option?.State_Name}
                  value={states?.find(
                    (option) => option?.State_Name === stateName?.State_Name
                  )}
                  onChange={(e, newValue) => {
                    setStateName(newValue);
                  }}
                  onInputChange={() => getCityLists()}
                  sx={{
                    minWidth: { xs: "100%" },
                    maxWidth: "1005px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="State Name"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {errors.stateName}
                </Div>
              </Grid>
              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <Typography className="col-12 input-label">
                  City Name <span className="required">*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <FormControl className="col-12">
                  <Autocomplete
                    // freeSolo
                    id="free-solo-demo"
                    className={`search-select col-12 ${errors.cityName ? "is-invalid" : ""
                      }`}
                    type="search"
                    placeholder="Select City "
                    options={cityLists?.map((city) => city)}
                    getOptionLabel={(option) => option}
                    value={cityName}
                    onChange={(e, newValue) => {
                      setCityName(newValue);
                    }}
                    onFocus={() => getCityLists()}
                    autoComplete="off"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="City Name"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                    sx={{
                      height: "38px",
                      lineHeight: 1,
                      borderRadius: "3px",
                      fontSize: "14px",
                    }}
                  />
                </FormControl>
                <Div style={{ color: "red" }}>
                  {errors.cityName}
                </Div>
              </Grid>

              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <Typography className="col-12 input-label">
                  Description
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                <TextField
                  className={`multiline-box col-12 ${errors.cityDescription ? "is-invalid" : ""
                    }`}
                  id="outlined-basic"
                  placeholder="Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  autoComplete="off"
                  value={cityDescription}
                  onChange={(e) => setCityDescription(e.target.value)}
                  sx={{
                    minWidth: { xs: "100%" },
                    maxWidth: "1005px",
                  }}
                />
                <Div style={{ color: "red" }}>
                  {errors.cityDescription}
                </Div>
              </Grid>
            </Grid>
          </DialogContent>

          {/* code for save and cancel button */}
          <DialogActions>
            <Div className="buttons" sx={{
              mt: 5, mb: 3, display: "flex",
              justifyContent: "center"
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
    </>
  );
};

export default CityLists;