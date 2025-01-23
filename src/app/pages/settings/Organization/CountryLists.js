import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
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
import Select from "react-select";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import StateLists from "./StateLists";
import RegionLists from "./RegionLists";
import CityLists from "./CityLists";
import { IdContext } from "./EntityLists";
import { Form, Formik } from "formik";
import { DataContext } from "./OrganizationStructure";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "app/services/auth-services";

const countryValidationSchema = yup.object({
  entityName: yup
    .string("Select your entity name")
    .required("Entity name is required"),
  countryName: yup
    .string("Select your country")
    .required("Country is required"),
  countryDescription: yup
    .string("Enter your country description")
    .required("Country Description is required")
    .min(10, "Country Description must be at least 10 characters")
    .max(240, "Country Description must not exceed 240 characters"),
});

const CountryLists = (props) => {
  const [entities, setEntities] = useContext(DataContext);

  const [id, setId] = useState("");
  const [name,setName] = useState('');
  const [open, setOpen] = React.useState(false);
  // const [countries, setCountries] = useState([]);
  // const [entities, setEntities] = useState([]);
  const [checkId, setCheckId] = useState(false);
  const [countryLists, setCountryLists] = useState([]);
  const [entityName, setEntityName] = useState(entities[0]);
  const [countryName, setCountryName] = useState("");
  const [countryDescription, setCountryDescription] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCountry = () => {
    setOpen(true);
  };

  const token = localStorage.getItem("accesstoken");

  const getEntity = () => {
    console.log("dss", props.getId);
    axios
      .get(
        `${BASE_URL}/Erpapp/EntityDetailsCRUD/?id=${props.getId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("entityid",res.data);
        setId(res.data.Entity_Id);
        setName(res.data.Entity_Name)
        console.log(res.data.Entity_Name)
        // setCountries(res.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  // const getCountry = () => {
  //   console.log("dss", props.getId);
  //   axios
  //     .post(
  //       `${BASE_URL}/Erpapp/CountryLists/`,
  //       {
  //         Entity_Id: parseInt(props.getId),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
       
  //       // setCountries(res.data);
  //     })
  //     .catch((error) => {
  //       console.log("ds", error);
  //     });
  // };

  const handleCreateCountry = (e) => {
    e.preventDefault();
    var countrypayload = {
      Entity_Id: entityName,
      Country_Name: countryName,
      Country_Description: countryDescription,
      Country_Type_Code: 2,
      Organisation_Id: 2,
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(
        `${BASE_URL}/Erpapp/CountryDetailsCRUD/`,
        countrypayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Country created successfully");
        setOpen(false);
        // getCountry();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Country name is already exists");
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
    // getCountry();
    getCountryLists();
    getEntity();
  }, []);

  // const entity_Id = entities.map((entity) => entity.Entity_Id);


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
          <Button className="save-button" onClick={handleAddCountry}>
            {" "}
            + Add Country
          </Button>
        </Div>
        <Grid
          container
          sx={{
            maxHeight: "350px",
            overflow: "auto",
            overscrollBehavior: "contain",
            WebkitScrollSnapType: "y",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid item xs={12} md={8} sx={{ mt: { xs: 5, md: -1 } }}>
            <Table className="table table-borderless">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.countries.map((country) => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox">
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              size="small"
                              checked={checkId === country.Country_Id}
                              value={country.Country_Id}
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
                      <TableCell>
                        {id}
                        {country.Country_Id}
                      </TableCell>
                      <TableCell>{country.Country_Name}</TableCell>
                      <TableCell>{country.Country_Description}</TableCell>
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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <Formik
            initialValues={{
              entityName: "",
              countryName: "",
              countryDescription: "",
            }}
            validationSchema={countryValidationSchema}
            onSubmit={(data) => {
              handleCreateCountry(
                data.entityName,
                data.countryName,
                data.countryDescription
              );
            }}
          >
            {({ isSubmitting, touched, errors, resetForm }) => ( */}
          <form onSubmit={handleCreateCountry}>
            <Div>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Entity Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <FormControl className="col-12">
                      <Autocomplete
                        // disablePortal
                        freeSolo
                        className="search-select col-12"
                        id="free-solo-demo"
                        name="entityName"
                        options={entities.map((entity) => entity)}
                        getOptionLabel={(option) => option.Entity_Name}
                        value={entities.find(
                          (option) => option.Entity_Name === entityName
                        )}
                        onChange={(e, newValue) => {
                          setEntityName(newValue.id);
                          console.log(newValue.id);
                        }}
                        defaultValue={name}
                        sx={{ minWidth: "280px", maxWidth: "1005px" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Entity Name"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Typography className="col-12 input-label">
                      Country Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 1.5 }}>
                    <Autocomplete
                      freeSolo
                      className="search-select col-12"
                      id="free-solo-demo"
                      name="countryName"
                      options={countryLists.map((countrylist) => countrylist)}
                      getOptionLabel={(option) => option.country}
                      value={countryLists.find(
                        (option) => option.country === countryName
                      )}
                      onChange={(e, newValue) => {
                        setCountryName(newValue.country);
                        console.log(newValue.country);
                      }}
                      sx={{
                        minWidth: "280px",
                        maxWidth: "1005px",
                        fontSize: "14px",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Country Name"
                          variant="outlined"
                        />
                      )}
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
                      name="countryDescription"
                      value={countryDescription}
                      onChange={(e) => setCountryDescription(e.target.value)}
                      sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  type="submit"
                  // loading={isSubmitting}
                  className="save-button"
                  sx={{ mr: 2 }}
                >
                  Save
                </LoadingButton>
                <Button
                  onClick={handleClose}
                  className="cancel-button"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Div>
          </form>
          {/* )}
          </Formik> */}
        </Dialog>
      </div>
    </>
  );
};

export default CountryLists;