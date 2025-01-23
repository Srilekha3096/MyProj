import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
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
import * as yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import React, { createContext, useContext, useEffect, useState } from "react";
import CountryLists from "./CountryLists";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import StateLists from "./StateLists";
import RegionLists from "./RegionLists";
import CityLists from "./CityLists";
import OrganizationStructure, { DataContext } from "./OrganizationStructure";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "app/services/auth-services";

const entityValidationSchema = yup.object({
  entityName: yup
    .string("Enter your entity name")
    .required("Entity name is required"),
  entityDescription: yup
    .string("Enter your entity description")
    .required("Entity Description is required")
    .min(10, "Entity Description must be at least 10 characters")
    .max(240, "Entity Description must not exceed 240 characters"),
});

export const IdContext = createContext();

const EntityLists = ({getEntity  }) => {
  const [open, setOpen] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [countries, setCountries] = useState([]);
  const [entityName, setEntityName] = useState("");
  const [entityDescription, setEntityDescription] = useState("");
  const [getId, setGetId] = useState("");

  const [entities, setEntities] = useContext(DataContext);


  const handleClose = () => {
    setOpen(false);
  };

  const handleAddLegalEntity = () => {
    setOpen(true);
  };

  const token = localStorage.getItem("accesstoken");

  const getCountry = () => {
    console.log("asfaf", getId);
    axios
      .post(
        `${BASE_URL}/Erpapp/CountryLists/`,
        {
          Entity_Id: getId,
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
        console.log(res.data);
        setCountries(res.data);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };

  useEffect(()=>{
    getEntity();
  },[])

  const handleCreateEntity = (entityName, entityDescription) => {
    var entitypayload = {
      Entity_Name: entityName,
      Entity_Description: entityDescription,
      Entity_Type_Code: 1,
      Organisation_Id: 2,
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/EntityDetailsCRUD/`, entitypayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Entity created successfully");
        setOpen(false);
        getEntity();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Entity name is already exists");
      });
  };



  return (
    <>
      <Div>
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
            <Button className="save-button" onClick={handleAddLegalEntity}>
              + Add Legal Entity
            </Button>
          </Div>
          <Grid container sx={{ minHeight: "220px" }}>
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
                  {entities.map((entity, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell padding="checkbox">
                          <FormControlLabel
                            control={
                              <Radio
                                color="primary"
                                size="small"
                                name="id"
                                value={entity.Entity_Id}
                                checked={checkId === entity.Entity_Id}
                                onChange={(e) => {
                                  setCheckId(e.target.value);
                                  setGetId(entity.id);
                                  getCountry();
                                }}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell>{entity.Entity_Id}</TableCell>
                        <TableCell>{entity.Entity_Name}</TableCell>
                        <TableCell>{entity.Entity_Description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Div component="label" sx={{ position: "absolute", top: "-40px", left: "130px",  }}>
            <Button className="save-button" hidden onClick={()=>getCountry()}>
              Click
            </Button>
          </Div>
        </Div>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Formik
              initialValues={{
                entityName: "",
                entityDescription: "",
              }}
              validationSchema={entityValidationSchema}
              onSubmit={(data) => {
                handleCreateEntity(data.entityName, data.entityDescription);
              }}
            >
              {/* <form onSubmit={handleCreateEntity}> */}
              {({ isSubmitting, touched, errors, resetForm }) => (
                <Form>
                  <Div>
                    <DialogContent>
                      <Grid container>
                        <Grid item xs={12} sx={{ ml: 1.5 }}>
                          <Typography className="col-12 input-label">
                            Legal Entity Name{" "}
                            <span className="required">*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 1.5 }}>
                          <JumboTextField
                            className={`col-12 input-box ${
                              touched.entityName && errors.entityName
                                ? "is-invalid"
                                : ""
                            }`}
                            id="outlined-basic"
                            placeholder="Legal Entity Name"
                            variant="outlined"
                            name="entityName"
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
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
                          <JumboTextField
                            className={`col-12 multiline-box ${
                              touched.entityDescription &&
                              errors.entityDescription
                                ? "is-invalid"
                                : ""
                            }`}
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
                            sx={{ minWidth: "280px", maxWidth: "1005px" }}
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <LoadingButton
                        type="submit"
                        className="save-button"
                        loading={isSubmitting}
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
                </Form>
              )}
            </Formik>
          </Dialog>
        </div>

      </Div>

      <Div sx={{ display: "none" }}>
        {/* <IdContext.Provider value={{getCountry}}> */}
          <CountryLists getId={getId}/>
        {/* </IdContext.Provider> */}
      </Div>
    </>
  );
};

export default EntityLists;