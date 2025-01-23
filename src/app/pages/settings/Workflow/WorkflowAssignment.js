import styled from "@emotion/styled";
import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Setting from "../Setting";
import Div from "@jumbo/shared/Div/Div";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  workflowRuleValidationSchema,
  workflowValidationSchema,
} from "app/schemas/SettingValidationSchemas";
import { toast } from "react-toastify";



const manufacturer = [
  { id: 0, name: "Rule Based" },
  { id: 1, name: "Level Based" },
];

const actionNames = [
  { id: 0, name: "Create" },
  { id: 1, name: "Create/Edit" },
  { id: 2, name: "Delete" },
];

const WorkflowAssignment = ({ scrollHeight }) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const [value, setValue] = useState();
  const [openForms, setOpenForms] = useState(false);

  const [workflowName, setWorkflowName] = useState("");
  const [basedOnWorkflow, setBasedOnWorkflow] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [ruleName1, setRuleName1] = useState("");
  const [action, setAction] = useState(null);
  const [noOfLevels, setNoOfLevels] = useState("");
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const [listRules, setListRules] = useState([]);

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(workflowRuleValidationSchema),
  });

  const handleSaveActions = (e) => {
    e.preventDefault();
    console.log("NEW");
    var payload = {
      Partner_Id: 1,
      Rule_Name: ruleName1,
      Action: action,
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/WorkflowRuleCRUD/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Created Successfully");
        setOpenForms(false);
        listofWorkflowRules();
      });
  };

  const listofWorkflowRules = () => {
    axios
      .get(`${BASE_URL}/Erpapp/WorkflowRulelist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setListRules(res.data.results);
      });
  };

  useEffect(() => {
    listofWorkflowRules();
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(workflowValidationSchema),
  });

  const handleCreateWorkflow = (e) => {
    e.preventDefault();
    var payload = {
      Partner_Id: 1,
      WorkflowRule_Id: ruleName.id,
      Rule_Name: ruleName.Rule_Name,
      Workflow_Name: workflowName,
      Workflow_Basedon: basedOnWorkflow,
      Noof_Level: noOfLevels,
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/WorkflowNameCRUD/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Created Successfully");
      });
  };

  return (
    <>
      {/* General settings code */}
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Workflow
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Users shall use this form to set up the approvers to approve various
          documents
        </Typography>

        {/* code for inventory list table */}
        <React.Fragment>
          <form onSubmit={handleCreateWorkflow}>
            <Div sx={{ mt: 3, ml: 15, width: "800px", minHeight: "350px" }}>
              <Box>
                <Div className="row">
                  <Div
                    className="input-label col-md-4"
                    sx={{ pl: 3, fontWeight: 600 }}
                  >
                    Workflow Name
                  </Div>
                  <Div className="col-md-7">
                    <TextField
                      className="input-box col-12"
                      variant="outlined"
                      {...register("workflowName")}
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                      placeholder="Workflow Name"
                    />
                    <Div style={{ color: "red" }}>
                      {errors.workflowName?.message}
                    </Div>
                  </Div>
                </Div>
              </Box>
              <br />
              <Box>
                <Div className="row">
                  <Div
                    className="input-label col-md-4"
                    sx={{ pl: 3, fontWeight: 600 }}
                  >
                    Workflow Based On
                  </Div>
                  <Div className="col-md-7">
                    <FormControl className="col-md-12">
                      <Autocomplete
                        className="search-select"
                        value={manufacturer.find(
                          (option) => option.name === basedOnWorkflow
                        )}
                        onChange={(e) => setBasedOnWorkflow(e.target.value)}
                        getOptionLabel={(option) => option.name}
                        options={manufacturer}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register("basedOnWorkflow")}
                            placeholder="Workflow Based On"
                          />
                        )}
                      />
                      <Div style={{ color: "red" }}>
                        {errors.basedOnWorkflow?.message}
                      </Div>
                    </FormControl>
                  </Div>
                </Div>
              </Box>
              <br />
              <Box>
                <Div className="row">
                  <Div
                    className="input-label col-md-4"
                    sx={{ pl: 3, fontWeight: 600 }}
                  >
                    Rule Name
                  </Div>
                  <Div className="col-md-7">
                    <FormControl className="col-md-12">
                      <Autocomplete
                        className="search-select"
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option && option?.Rule_Name) {
                            return option?.Rule_Name || "";
                          }
                          return "";
                        }}
                        options={listRules}
                        value={listRules.find(
                          (option) => option?.Rule_Name === ruleName
                        )}
                        onChange={(e, newValue) => {
                          setRuleName(newValue);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option?.Rule_Name === value || value === ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register("ruleName")}
                            placeholder="Rule Name"
                          />
                        )}
                      />
                      <Div style={{ color: "red" }}>
                        {errors.ruleName?.message}
                      </Div>
                    </FormControl>
                  </Div>
                  <Div className="col-md-1">
                    <Button
                      className="save-button col-md-12"
                      onClick={() => setOpenForms(true)}
                      sx={{ width: "130px" }}
                    >
                      Add Rule
                    </Button>
                  </Div>
                </Div>
                <br />
                <Div className="row">
                  <Div
                    className="input-label col-md-4"
                    sx={{ pl: 3, fontWeight: 600 }}
                  >
                    No. of Levels
                  </Div>
                  <Div className="col-md-7">
                    <FormControl className="col-md-12">
                      <Autocomplete
                        className="search-select"
                        name="noOfLevels"
                        getOptionLabel={(option) => {
                          if (typeof option === "number") {
                            return option.toString();
                          }
                          if (option && option) {
                            return option;
                          }
                          return 0;
                        }}
                        options={numbers}
                        value={numbers.find((option) => option === noOfLevels)}
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setNoOfLevels(newValue);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option === value || value === 0
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register("noOfLevels")}
                            placeholder="No of Levels"
                            variant="outlined"
                            autoComplete="off"
                          />
                        )}
                      />
                      <Div style={{ color: "red" }}>
                        {errors.noOfLevels?.message}
                      </Div>
                    </FormControl>
                  </Div>
                </Div>
              </Box>
            </Div>

            <Div sx={{ mt: 5, ml: 1 }}>
              <Button
                type="submit"
                className="save-button"
                sx={{
                  mr: 3,
                }}
              >
                Save
              </Button>

              <Button
                className="cancel-button"
                onClick={() => {
                  setRuleName("");
                  setWorkflowName("");
                  setNoOfLevels("");
                  setBasedOnWorkflow("");
                }}
              >
                Cancel
              </Button>
            </Div>
          </form>
        </React.Fragment>

        <Dialog
          open={openForms}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleSaveActions}>
            <div>
              <DialogContent>
                <Typography variant="h3">Create Rule Name </Typography>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={12} sx={{ ml: 2 }}>
                    <Typography className="col-12 input-label">
                      Rule Name <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 2 }}>
                    <TextField
                      className="input-box col-12"
                      name="ruleName1"
                      {...register1("ruleName1")}
                      value={ruleName1}
                      onChange={(e) => setRuleName1(e.target.value)}
                      placeholder="Rule Name"
                      sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    />
                    <Div style={{ color: "red" }}>
                      {errors1.ruleName1?.message}
                    </Div>
                  </Grid>

                  <Grid item xs={12} sx={{ ml: 2 }}>
                    <Typography className="col-12 input-label">
                      Action When <span className="required">*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ ml: 2 }}>
                    <FormControl className="col-12">
                      <Autocomplete
                        className={`search-select col-12 ${
                          errors1.action ? "is-invalid" : ""
                        }`}
                        name="action"
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option && option?.name) {
                            return option?.name;
                          }
                          return "";
                        }}
                        options={actionNames}
                        value={actionNames.find(
                          (option) => option?.name === action
                        )}
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setAction(newValue?.name);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option?.id === value.id || value === ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Action Name"
                            {...register1("action")}
                            variant="outlined"
                            autoComplete="off"
                          />
                        )}
                        sx={{ minWidth: "280px", maxWidth: "1005px" }}
                      />
                      <Div style={{ color: "red" }}>
                        {errors1.action?.message}
                      </Div>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit" className="save-button" sx={{ mr: 2 }}>
                  Save
                </Button>
                <Button
                  onClick={() => setOpenForms(false)}
                  className="cancel-button"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
      </JumboContentLayoutMain>
    </>
  );
};

export default WorkflowAssignment;
