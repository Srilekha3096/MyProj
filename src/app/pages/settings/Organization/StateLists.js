import Div from "@jumbo/shared/Div";
import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Autocomplete,
  ButtonGroup,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./OrganizationStructure";
import { toast } from "react-toastify";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";

const StateLists = (scrollHeight) => {
  const {
    entities,
    countries,
    regions,
    states,
    id,
    id1,
    id2,
    name,
    name1,
    name2,
    name3,
    name4,
    setName,
    setName1,
    setName2,
    setName3,
    setName4,
    checkId1,
    checkId2,
    checkId3,
    checkId4,
    checkId5,
    setCheckId1,
    setCheckId2,
    setCheckId3,
    setCheckId4,
    setCheckId5,
    zones,
    getId,
    getId1,
    getId2,
    getId3,
    setGetId3,
    getId4,
    setGetId4,
    getCityDatas,
    getStateDatas,
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

  const [open, setOpen] = useState(false);
  const [stateLists, setStateLists] = useState([]);
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
  const [stateId, setStateId] = useState();
  const [stateName, setStateName] = useState("");
  const [stateDescription, setStateDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddState = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStateName("");
    setStateDescription("");
    setErrors({})
  };


  const getStateLists = () => {
    axios
      .post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        { country: countryName?.Country_Name },
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
    getStateDatas();
    getStateLists();
  }, []);



  useEffect(() => {
    const nextState = states?.filter((opt, index) => index + 1 === states?.length);
    if (nextState) {
      const nextStateId = nextState[0]?.State_Id;
      const numericPart = parseInt(nextStateId, 10) + 1;
      const paddedValue = numericPart.toString().padStart(nextStateId?.length, '0');
      console.log("nextState", states, nextState, numericPart, paddedValue)
      setStateId(paddedValue);
    }
  }, [stateName]);



  // Regular Expression
  const validate = () => {
    let error = {};

    if (stateName === "" || stateName === null || stateName === undefined) {
      error.stateName = "State Name is required"
    }
    if (stateDescription === "" || stateDescription === null || stateDescription === undefined) {
      error.stateDescription = "State Description is required"
    }

    return error;
  };



  const handleCreateState = (e) => {
    e.preventDefault();
    let validForm = validate();
    setErrors(validForm);

    if (Object.keys(validForm).length === 0) {
      if (currentData?.id !== undefined) {
        var statepayload = {
          ...currentData,
          Entity_Id: parseInt(entityName?.id),
          Country_Id: parseInt(countryName?.id),
          Region_Id: parseInt(regionName?.id),
          State_Name: stateName,
          State_Description: stateDescription,
          State_Type_Code: parseInt(`${id}${id1}${id2}${stateId}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .put(`${BASE_URL}/Erpapp/StateDetailsCRUD/`, statepayload, header)
          .then((res) => {
            console.log(res?.data);
            if (res?.data?.id) {
              toast.success("State updated successfully");
              setOpen(false);
              getStateDatas();
            } else {
              toast.error(res.message)
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("State name is already exists");
          });
      } else {
        var statepayload = {
          Entity_Id: parseInt(entityName?.id),
          Country_Id: parseInt(countryName?.id),
          Region_Id: parseInt(regionName?.id),
          State_Name: stateName,
          State_Description: stateDescription,
          State_Type_Code: parseInt(`${id}${id1}${id2}${stateId}`),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
        };
        axios
          .post(`${BASE_URL}/Erpapp/StateDetailsCRUD/`, statepayload, header)
          .then((res) => {
            console.log(res.data);
            if (res?.status === 201 && res?.data?.id) {
              toast.success("State created successfully");
              setOpen(false);
              getStateDatas();
              setStateName("");
              setStateDescription("");
            } else {
              toast.error(res.message)
            }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
            // toast.error("State name is already exists");
          });
      }
    }
  };


  // edit a state
  const editStateById = async (id) => {
    setCurrentData(id);
    setOpen(true);

    await axios.get(`${BASE_URL}/Erpapp/StateDetailsCRUD/?id=${id?.id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200) {
          setStateName(res?.data?.State_Name);
          setStateDescription(res?.data?.State_Description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // delete a state 
  const deleteStateById = async (id) => {
    await axios.delete(`${BASE_URL}/Erpapp/StateDetailsCRUD/?id=${id}`, header)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 && res?.data?.id) {
          toast.success("State deleted successfully");
          getStateDatas();
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
          {Array.isArray(userRolePermissions) && userRolePermissions.includes(313) && (
            <ErpCreateButton handleClick={handleAddState} name={"Add State"} />
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
                {states?.map((state) => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox" data-title="Status">
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              size="small"
                              checked={checkId4 === state?.State_Id}
                              value={state?.State_Id}
                              onChange={(e) => {
                                setCheckId4(
                                  e.target.value,
                                );
                                setGetId3(state?.id);
                                setName3(state?.State_Name);
                              }}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell data-title="Code">
                        {id}
                        {id1}
                        {id2}
                        {state?.State_Id}
                      </TableCell>
                      <TableCell data-title="Name">{state?.State_Name}</TableCell>
                      <TableCell data-title="Description">{state?.State_Description}</TableCell>
                      <TableCell data-title="Action">
                        <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={314} deletePermissionId={316} onClickEdit={() => editStateById(state)} onClickDelete={() => deleteStateById(state?.id)} align="left" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </JumboScrollbar>
        </Div>
      </Div>

      {/* dialog box */}
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleCreateState}>
          <div>
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
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Entity_Name) {
                        return option?.Entity_Name;
                      }
                      // else{
                      //   return option.Entity_Name === null;
                      // }
                      return "";
                    }}
                    value={entities?.find((option) => {
                      if (option && option?.Entity_Name) {
                        return entityName?.Entity_Name;
                      } else {
                        return null;
                      }
                    })}
                    onChange={(e, newValue) => setEntityName(newValue)}
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
                  <Div style={{ color: "red" }}>
                    {errors.entityName?.message}
                  </Div>
                </Grid>

                <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                  <Typography className="col-12 input-label">
                    Country Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                  <Autocomplete
                    className={`search-select col-12 ${errors.countryName ? "is-invalid" : ""
                      }`}
                    id="free-solo-demo"
                    placeholder="Country Name"
                    variant="outlined"
                    options={countries}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Country_Name) {
                        return option?.Country_Name;
                      }
                      return "";
                    }}
                    value={countries?.find(
                      (option) =>
                        option?.Country_Name === countryName?.Country_Name
                    )}
                    onChange={(e, newValue) => {
                      setCountryName(newValue);
                    }}
                    onFocus={() => getStateLists()}
                    isOptionEqualToValue={(option, value) =>
                      option?.Country_Name === value
                    }
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
                    {errors.countryName?.message}
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
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Region_Name) {
                        return option?.Region_Name;
                      }
                      return "";
                    }}
                    value={regions?.find(
                      (option) =>
                        option?.Region_Name === regionName?.Region_Name
                    )}
                    onChange={(e, newValue) => {
                      setRegionName(newValue);
                    }}
                    autoComplete="off"
                    isOptionEqualToValue={(option, value) =>
                      option?.Region_Name === value
                    }
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
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.name) {
                        return option?.name;
                      }
                      return "";
                    }}
                    options={stateLists?.map((statelist) => statelist)}
                    value={currentData?.id !== undefined ? stateName : stateLists?.find(
                      (option) => option?.name === stateName
                    )}
                    onChange={(e, newValue) => {
                      setStateName(newValue?.name);
                    }}
                    onFocus={() => getStateLists()}
                    autoComplete="off"
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
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ ml: { sm: 0, md: 1.5 } }}>
                  <TextField
                    className={`multiline-box col-12 ${errors.stateDescription ? "is-invalid" : ""
                      }`}
                    id="outlined-basic"
                    placeholder="Description"
                    multiline
                    rows={3}
                    variant="outlined"
                    autoComplete="off"
                    value={stateDescription}
                    onChange={(e) => setStateDescription(e.target.value)}
                    sx={{
                      minWidth: { xs: "100%" },
                      maxWidth: "1005px",
                    }}
                  />
                  <Div style={{ color: "red" }}>
                    {!stateDescription && <span style={{ color: "red", fontSize: "13px" }}>{errors?.stateDescription}</span>}
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
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default StateLists;