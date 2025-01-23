import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Div from "@jumbo/shared/Div/Div";
import { Form, Formik } from "formik";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import settingServices from "app/services/setting-api-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

const workflows = [
  { id: 1, values: "Amount" },
  { id: 2, values: "Level" },
];

const EditWorkflow = ({
  setListWorkflow,
  setEditWorkflow,
  listOfWorkflows,
  currentWorkflows,
}) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const [listRuleNames, setListRuleNames] = useState([]);

  const [workflowName, setWorkflowName] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [basedOnWorkflow, setBasedOnWorkflow] = useState("Level");
  const [noOfLevels, setNoOfLevels] = useState("");
  const [errors, setErrors] = useState();
  const textFieldRef = useRef(null);


  const defaultRuleName = currentWorkflows.Rule_Name;

  const defaultWorkflowName = currentWorkflows.Workflow_Name;
  console.log("defaultWorkflowName", defaultWorkflowName);
  const defaultWorkflowBasedon = currentWorkflows.Workflow_Basedon;
  const defaultNoofLevel = currentWorkflows.Noof_Level;

  useEffect(() => {
    setRuleName(defaultRuleName);
    setWorkflowName(defaultWorkflowName);
    setNoOfLevels(defaultNoofLevel);
    setBasedOnWorkflow(defaultWorkflowBasedon);
  }, [
    currentWorkflows,
    defaultRuleName,
    defaultWorkflowBasedon,
    defaultWorkflowName,
    defaultNoofLevel,
  ]);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);


  const getRuleNames = () => {
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
        setListRuleNames(res.data.results);
      }).catch((error) => {
        console.log(error);
      });
  };



  const validateForm = () => {
    const newErrors = {};

    if (ruleName === undefined || ruleName === null || ruleName === "") {
      newErrors.ruleName = "Rule Name is required.";
    }
    if (!workflowName) {
      newErrors.workflowName = "Workflow is required.";
    }
    if (!basedOnWorkflow) {
      newErrors.basedOnWorkflow = "Based on workflow is required.";
    }
    if (!noOfLevels) {
      newErrors.noOfLevels = "No of level is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleUpdateWorkflow = (e) => {
    e.preventDefault();

    if (validateForm()) {
      var payload = {
        id: currentWorkflows?.id,
        WorkflowName_Id: currentWorkflows?.WorkflowName_Id,
        Partner_Id: parseInt(localStorage.getItem("PartnerId")),
        WorkflowRule_Id: ruleName?.id,
        Rule_Name: ruleName?.Rule_Name,
        Workflow_Name: workflowName,
        Workflow_Basedon: basedOnWorkflow,
        Noof_Level: noOfLevels,
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };
      axios
        .put(`${BASE_URL}/Erpapp/WorkflowNameCRUD/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.id && res.status === 200) {
            toast.success("Successfully Update a Workflow");
            setListWorkflow(true);
            setEditWorkflow(false);
            listOfWorkflows();
            setErrors({});
          } else {
            toast.error("Workflow Matching Query Doesn't Exist.")
          }
        }).catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Workflow
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Users shall use this form to set up the approvers to approve various
        documents
      </Typography>

      <form onSubmit={handleUpdateWorkflow}>
        <Div sx={{ minHeight: "350px" }}>
          <Grid container sx={{ mt: 2, ml: { sm: 0, md: 3 } }}>
            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-md-4 col-xl-2 input-label" sx={{ mt: 2 }}>
                Workflow Name <span className="required">*</span>
              </Typography>
              <Div className="col-md-4">
                <TextField
                  className="col-12 input-box"
                  name="workflowName"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Wrokflow Name"
                  variant="outlined"
                  autoComplete="off"
                />
                <Div style={{ color: "red" }}>
                  {!workflowName && errors?.workflowName}
                </Div>
              </Div>
            </Grid>

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-md-4 col-xl-2 input-label" sx={{ mt: 2 }}>
                Workflow Based On<span className="required">*</span>
              </Typography>
              <Div className="col-md-4">
                <Autocomplete
                  className="col-12 search-select"
                  name="basedOnWorkflow"
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option && option?.values) {
                      return option?.values;
                    }
                    return "";
                  }}
                  options={workflows}
                  value={basedOnWorkflow}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    setBasedOnWorkflow(newValue?.values);
                    // switch (newValue.values) {
                    //   case "Amount":
                    //     setAmount(true);
                    //     setLevels(false);
                    //     break;
                    //   case "Level":
                    //     setLevels(true);
                    //     setAmount(false);
                    //     break;
                    //   default:
                    //     setAmount(true);
                    //     setLevels(false);
                    //     break;
                    // }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.values === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Workflow Based On"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {!basedOnWorkflow && errors?.basedOnWorkflow}
                </Div>
              </Div>
            </Grid>

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-md-4 col-xl-2 input-label" sx={{ mt: 2 }}>
                Rule Name <span className="required">*</span>
              </Typography>

              <Div className="col-md-4">
                <Autocomplete
                  className="col-12 search-select"
                  name="ruleName"
                  onFocus={getRuleNames}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option && option?.Rule_Name) {
                      return option?.Rule_Name;
                    }
                    return "";
                  }}
                  options={listRuleNames}
                  value={ruleName}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    setRuleName(newValue);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.Rule_Name === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Rule Name"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {!ruleName && errors?.ruleName}
                </Div>
              </Div>
              {/* <Div className="col-md-1">
                    <Button
                      className="save-button"
                      onClick={handleOpenWorkflowSetup}
                    >
                      Add
                    </Button>
                  </Div> */}
            </Grid>

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-md-4 col-xl-2 input-label" sx={{ mt: 2 }}>
                No of Levels <span className="required">*</span>
              </Typography>
              {/* <FormControl className="col-md-6">
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
                    value={noOfLevels}
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
                        placeholder="No of Levels"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl> */}
              <Div className="col-md-4">
                <TextField
                  className="col-12 input-box"
                  name="noOfLevels"
                  value={noOfLevels}
                  onChange={(e) => setNoOfLevels(e.target.value)}
                  placeholder="No of Levels"
                  variant="outlined"
                  autoComplete="off"
                />
                <Div style={{ color: "red" }}>
                  {!noOfLevels && errors?.noOfLevels}
                </Div>
              </Div>
            </Grid>
          </Grid>
        </Div>


        <Div className="buttons" sx={{ mt: 5 }}>
          <ButtonGroup
            aria-label="split button"
            type="submit"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
          >
            <Button type="submit" className="plus-button">Update</Button>
            <Button variant="contained" className="icon-button">
              <FaSave size={18} />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="split button"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
            onClick={() => {
              setListWorkflow(true);
              setEditWorkflow(false);
              setErrors({});
            }}>
            <Button className="plus-button">Cancel</Button>
            <Button variant="contained" className="icon-button">
              <TiCancel size={24} />
            </Button>
          </ButtonGroup>
        </Div>
      </form>
    </>
  );
};

export default EditWorkflow;
