import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import Select from "react-select";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./OrganizationStructure";
import id from "date-fns/esm/locale/id/index";
import { BASE_URL } from "app/services/auth-services";

const RegionLists = () => {

  const [entities, setEntities] = useContext(DataContext);


  const [open, setOpen] = React.useState(false);
  const [regions, setRegions] = useState([]);
  const [checkId, setCheckId] = useState(false);
  const [countryLists, setCountryLists] = useState([]);
  const [countries,setCountries] = useState([]);
  const [entityName, setEntityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [regionName, setRegionName] = useState("");
  const [regionDiscription, setRegionDescription] = useState("");

  const handleAddRegion = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("accesstoken");

  const getCountry = () => {
    axios
      .get(`${BASE_URL}/Erpapp/CountryLists/?Entity_Name=test`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setCountries(res.data.results);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  const getRegionLists = () => {
    axios
      .get(`${BASE_URL}/Erpapp/RegionLists/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res?.data?.results);
        setRegions(res?.data?.results);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

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

  useEffect(() => {
    // getEntity();
    getRegionLists();
    getCountryLists();
    getCountry();
  }, []);

  const entity_Id = entities.map((entity) => entity.Entity_Id);

  const country_Id = countries.map((country) => country.Country_Id);

  const handleCreateRegion = (e) => {
    e.preventDefault();
    var regionpayload = {
      Entity_Id: entityName.id,
      Country_Id: countryName.id,
      Region_Name: regionName,
      Region_Description: regionDiscription,
      Region_Type_Code: 3,
      Organisation_Id: 2,
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/RegionDetailsCRUD/`, regionpayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        getRegionLists();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

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
          }}
        >
          <Button className="save-button" onClick={handleAddRegion}>
            {" "}
            + Add Region
          </Button>
        </Div>

        <Grid container>
          <Grid item xs={12} md={8} sx={{ mt: { xs: 5, md: -1 } }}>
            <Table className="table table-borderless">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  {/* <TableCell className="col-2" sx={{ fontWeight: 600 }}>
                            Address
                          </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {regions?.map((region) => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox">
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              size="small"
                              checked={checkId === region.Region_Id}
                              value={region.Region_Id}
                              onChange={(e) =>
                                setCheckId(
                                  e.target.value,
                                  console.log(e.target.value)
                                )
                              }
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>{id}{region.Region_Id}</TableCell>
                      <TableCell>{region.Region_Name}</TableCell>
                      <TableCell>{region.Region_Description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Div>

      <div>
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleCreateRegion}>
            <div>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Entity Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Select
                      className="react-select-box col-12"
                      id="outlined-basic"
                      placeholder="Entity Name"
                      variant="outlined"
                      name="entityName"
                      options={entities}
                      getOptionLabel={(option) => option.Entity_Name}
                      value={entities.find(
                        (option) => option.Entity_Name === entityName
                      )}
                      onChange={(newValue) => setEntityName(newValue)}
                      sx={{ minWidth: "280px", maxWidth: "1005px" }}
                      // renderInput={(params) => (
                      //   <TextField {...params} placeholder="Entity Name" />
                      // )}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Country Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Select
                      className="react-select-box col-12"
                      id="outlined-basic"
                      placeholder="Country Name"
                      variant="outlined"
                      options={countries}
                      getOptionLabel={(option) => option.Country_Name}
                      value={countries.find(
                        (option) => option.Country_Name === countryName
                      )}
                      onChange={(newValue) => {
                        setCountryName(newValue);
                        console.log(newValue.country);
                      }}
                      sx={{
                        minWidth: "280px",
                        maxWidth: "1005px",
                        fontSize: "14px",
                      }}
                      // renderInput={(params) => (
                      //   <TextField {...params} placeholder="Country Name" />
                      // )}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Region Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <TextField
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Region Name"
                      variant="outlined"
                      value={regionName}
                      onChange={(e) => setRegionName(e.target.value)}
                      autoComplete="off"
                      sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <TextField
                      className="col-12 multiline-box"
                      id="outlined-basic"
                      placeholder="Description"
                      multiline
                      rows={3}
                      variant="outlined"
                      value={regionDiscription}
                      onChange={(e) => setRegionDescription(e.target.value)}
                      autoComplete="off"
                      sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    />
                  </Grid>

                  {/* <Grid item xs={12} sx={{ ml: 1.5 }}>
                        <Typography className="col-12 input-label">
                          Address <span className="required">*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: 1.5 }}>
                        <TextField
                          className="col-12 multiline-box"
                          id="outlined-basic"
                          placeholder="Address"
                          multiline
                          rows={3}
                          variant="outlined"
                          sx={{ minWidth: "280px", maxWidth: "1005px" }}
                        />
                      </Grid> */}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit" className="save-button" sx={{ mr: 2 }}>
                  Save
                </Button>
                <Button
                  onClick={handleClose}
                  className="cancel-button"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default RegionLists;