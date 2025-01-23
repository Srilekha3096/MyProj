import {
  Autocomplete,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Div from "@jumbo/shared/Div/Div";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import settingServices from "app/services/setting-api-services";
import { toast } from "react-toastify";
import { FaPlus, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { todayDate } from "app/shared/ReuseComponents/DateFormatter";

const CreateAssignWorkflows = ({
  setListWorkflow,
  setCreateWorkflow,
  listOfWorkflows,
  workflows
}) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const [approverHead, setApproverHead] = useState(false);
  const [openForms, setOpenForms] = useState(false);
  const [workflowNamesList, setWorkflowNamesList] = useState([]);
  const [listModules, setListModules] = useState([]);
  const [listFormNames, setListFormNames] = useState([]);
  const [listDocumentNames, setListDocumentNames] = useState([]);
  const [listFieldNames, setListFieldNames] = useState([]);
  const [listFieldNames2, setListFieldNames2] = useState([]);

  const [ruleName, setRuleName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [basedOnWorkflow, setBasedOnWorkflow] = useState("Amount");
  const [amount, setAmount] = useState(true);
  const [documentName, setDocumentName] = useState("");
  const [noOfLevels, setNoOfLevels] = useState("");

  const [moduleName, setModuleName] = useState("");
  const [formName, setFormName] = useState("");
  const [fieldName2, setFieldName2] = useState("");

  const [errors, setErrors] = useState();



  const filterOptions = (listDocumentNames, { inputValue }) => {
    return listDocumentNames?.filter((option) =>
      option?.FormName.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  };

  const getListofWorkflowNames = () => {
    axios
      .get(`${BASE_URL}/Erpapp/WorkflowNamelist/`, header)
      .then((res) => {
        console.log("WFNAmes", res.data);
        setWorkflowNamesList(res?.data?.results);
      }).catch((error) => {
        console.log(error);
      });
  };

  // workflow name filter based on workflow name
  const filterWorkflowNames = (newValue) => {
    axios
      .get(
        `${BASE_URL}/Erpapp/WorkflowNamefilter/?Workflow_Name=${newValue.Workflow_Name}`, header)
      .then((res) => {
        console.log("Filter", res.data);
        setRuleName(res.data[0]?.Rule_Name);
        setNoOfLevels(res.data[0]?.Noof_Level);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getModuleNames = async () => {
    await axios.post(
      `${BASE_URL}/Erpapp/Formmasterlist/`,
      header
    ).then((res) => {
      console.log(res?.data);
      setListModules(res?.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const getFormNames = (newValue) => {
    var payload = {
      ModuleName: newValue?.ModuleName,
    };
    axios
      .post(`${BASE_URL}/Erpapp/Formpermissionfilter/`, payload, header)
      .then((res) => {
        console.log("res", res);
        setListFormNames(res?.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getDocumentNames = () => {
    settingServices.listFormNames(header).then((res) => {
      console.log("Res", res);
      setListDocumentNames(res?.filter((opt)=>opt?.Is_Deleted === false));
    }).catch((error) => {
      console.log(error);
    });
  };

  const getFieldNames = (newValue) => {
    settingServices
      .filterFieldNamesFromWorkflowOrigin(newValue?.FormName, header)
      .then((res) => {
        console.log("res111", res.length);
        setListFieldNames(res);
        if (res?.length === 0) {
          setAmount(false);
          setBasedOnWorkflow("Level");
        } else {
          setAmount(true);
          setBasedOnWorkflow("Amount");
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  const getFieldNames2 = (newValue) => {
    var formname = newValue?.FormName;
    settingServices.filterlistFieldNames(formname, header).then((res) => {
      console.log("res111111", res);
      if (Array.isArray(res[0]?.Field_Name)) {
        setListFieldNames2(res[0]?.Field_Name || []);
        setAmount(true);
      } else {
        setAmount(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (workflowName === undefined || workflowName === null || workflowName === "") {
      newErrors.workflowName = "Workflow is required.";
    }
    if (ruleName === undefined || ruleName === null || ruleName === "") {
      newErrors.ruleName = "Rule Name is required.";
    }
    if (!basedOnWorkflow) {
      newErrors.basedOnWorkflow = "Based on workflow is required.";
    }
    if (!documentName) {
      newErrors.documentName = "Document Name is required.";
    }
    if (!noOfLevels) {
      newErrors.noOfLevels = "No of level is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const validateForm1 = () => {
    const newErrors = {};

    if (moduleName === undefined || moduleName === null || moduleName === "") {
      newErrors.moduleName = "Module Name is required.";
    }
    if (!formName) {
      newErrors.formName = "Form Name is required.";
    }
    if (!fieldName2) {
      newErrors.fieldName2 = "Field Name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmitCreateFormFields = (e) => {
    e.preventDefault();
    if (validateForm1()) {
      var payload = {
        Form_Name: formName,
        Field_Name: fieldName2,
        FieldShort_Name: "",
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
        Created_Date: todayDate
      };
      axios
        .post(`${BASE_URL}/Erpapp/WorkfloworiginCRUD/`, payload, header)
        .then((res) => {
          console.log(res);
          if (res?.data?.id) {
            toast.success("Fields Created Successfully");
            setModuleName("");
            setFormName("");
            setFieldName2("");
            setOpenForms(false);
            setErrors({})
          } else {
            toast.error("Check Your Inputs");
            setOpenForms(true);
          }
        }).catch((error) => {
          console.log(error);
          toast.error(error.message)
        });
    }
  };


  const handleSubmitWorkflow = (e) => {
    e.preventDefault();
    console.log("workflowsworkflows", workflows)
    if (validateForm()) {
      if (workflows?.find((opt) => opt?.Document_Name === documentName)) {
        toast.warning(`Assign Workflow For ${documentName} is already created.`)
      } else {
        var payload = {
          Document_Name: documentName,
          Field_Name: fieldName,
          Head_Approval: approverHead,
          Noof_Level: noOfLevels,
          Rule_Name: ruleName,
          WorkflowName_Id: workflowName?.id,
          Workflow_Basedon: basedOnWorkflow,
          Workflow_Name: workflowName?.Workflow_Name,
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Partner_Id: parseInt(localStorage.getItem("PartnerId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
          Created_Date: todayDate
        };
        axios
          .post(`${BASE_URL}/Erpapp/AssignworkflowCRUD/`, payload, header)
          .then((res) => {
            console.log(res);
            if (res?.data?.id) {
              toast.success("Workflow is Assigned Successfully");
              setCreateWorkflow(false);
              setListWorkflow(true);
              listOfWorkflows();

              setDocumentName("");
              setNoOfLevels("");
              setRuleName("");
              setWorkflowName("");
              setBasedOnWorkflow("");
              setFieldName("");
              setErrors({})
            } else {
              toast.error("Workflow Matching Query Doesn't Exist.")
            }
          }).catch((error) => {
            console.log(error);
            toast.error(error.message)
          });
      }
    }
  };

  const handleOpenWorkflowSetup = () => {
    setOpenForms(true);
  };


  return (
    <>

      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Assign Workflow
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Users shall use this form to set up the approvers to approve various
        documents
      </Typography>

      <form onSubmit={handleSubmitWorkflow}>
        <Div sx={{ minHeight: "300px" }}>
          <Grid container sx={{ mt: 2, ml: { sm: 0, md: 2 } }}>
            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-xs-12 col-lg-3 input-label" sx={{ mt: 2 }}>
                Document Name <span className="required">*</span>
              </Typography>
              <Div className="col-xs-12 col-md-7 col-lg-4">
                <Autocomplete
                  className="col-12 search-select"
                  name="documentName"
                  onFocus={getDocumentNames}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option && option?.FormName) {
                      return option?.FormName;
                    }
                    return "";
                  }}
                  options={listDocumentNames}
                  filterOptions={filterOptions}
                  value={listDocumentNames?.find(
                    (option) => option?.FormName === documentName || ""
                  ) || null}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    setDocumentName(newValue?.FormName);
                    getFieldNames(newValue);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.FormName === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Document Name"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {!documentName && errors?.documentName}
                </Div>
              </Div>
              <Div className="col-xs-12 col-md-5 col-lg-4 col-xl-2">
                <ButtonGroup aria-label="split button" sx={{ width: { xs: "100% !important", md: "100% !important", lg: "100% !important", xl: "100% !important" }, mt: { xs: 1, md: 0 } }} onClick={handleOpenWorkflowSetup}>
                  <Button className="create-button" sx={{ width: { xs: "100% !important", md: "100% !important", lg: "100% !important", xl: "100% !important" } }}>Add Field</Button>
                  <Button variant="contained" className="icon-button">
                    <FaPlus size={20} />
                  </Button>
                </ButtonGroup>
              </Div>
            </Grid>

            {amount === true && (
              <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                <Typography className="col-lg-3 input-label" sx={{ mt: 2 }}>
                  Field Name
                </Typography>

                <Div className="col-md-12 col-lg-9 col-xl-4">
                  <Autocomplete
                    className="col-12 search-select"
                    name="fieldName"
                    options={listFieldNames}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Field_Name) {
                        return option?.Field_Name;
                      }
                      return "";
                    }}
                    value={listFieldNames?.find(
                      (option) => option?.Field_Name === fieldName
                    ) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setFieldName(newValue?.Field_Name);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option?.Field_Name === value || value === ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Field Name"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                </Div>
              </Grid>
            )}

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>

              <Typography className="col-lg-3 input-label" sx={{ mt: 2 }}>
                Workflow Name <span className="required">*</span>
              </Typography>
              <Div className="col-md-12 col-lg-9 col-xl-4">
                <Autocomplete
                  className="col-12 search-select"
                  name="workflowName"
                  onFocus={getListofWorkflowNames}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option && option?.Workflow_Name) {
                      return option?.Workflow_Name;
                    }
                    return "";
                  }}
                  options={workflowNamesList}
                  value={workflowName}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    if (newValue) {
                      setWorkflowName(newValue);
                      filterWorkflowNames(newValue);
                    } else {
                      setNoOfLevels("");
                      setRuleName("");
                      setWorkflowName("");
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.Workflow_Name === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Workflow Name"
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />
                <Div style={{ color: "red" }}>
                  {!workflowName && errors?.workflowName}
                </Div>
              </Div>
            </Grid>

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>
              <Typography className="col-lg-3 input-label" sx={{ mt: 2 }}>
                No of Levels <span className="required">*</span>
              </Typography>
              <Div className="col-md-12 col-lg-9 col-xl-4">
                <TextField
                  className="col-12 input-box"
                  name="noOfLevels"
                  value={noOfLevels}
                  placeholder="No of Levels"
                  variant="outlined"
                  autoComplete="off"
                  disabled
                />
                <Div style={{ color: "red" }}>
                  {!noOfLevels && errors?.noOfLevels}
                </Div>
              </Div>
              {/* <FormControl className="col-md-4">
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
                        placeholder="No of Levels"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl> */}
            </Grid>

            <Grid item xs={12} className="row" sx={{ mt: 1 }}>

              <Typography className="col-lg-3 input-label" sx={{ mt: 2 }}>
                Rule Name <span className="required">*</span>
              </Typography>

              <Div className="col-md-12 col-lg-9 col-xl-4">
                <TextField
                  className="col-12 input-box"
                  name="ruleName"
                  value={ruleName}
                  placeholder="Rule Name"
                  variant="outlined"
                  autoComplete="off"
                  disabled
                />
                <Div style={{ color: "red" }}>
                  {!ruleName && errors?.ruleName}
                </Div>
              </Div>
            </Grid>
          </Grid>

          {/* <Div sx={{ mt: 2 }}>
            <FormControlLabel
              className="input-label"
              checked={approverHead}
              onChange={(e) => setApproverHead(e.target.checked)}
              control={<Checkbox size="small" />}
              label="Require Department Head Approval"
              labelPlacement="start"
            />
          </Div> */}

        </Div>


        {/* code for save and cancel button */}
        <Div className="buttons" sx={{ mt: 5 }}>
          <ButtonGroup
            aria-label="split button"
            type="submit"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
          >
            <Button type="submit" className="plus-button">
              Save
            </Button>
            <Button variant="contained" className="icon-button">
              <FaSave size={18} />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            aria-label="split button"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
            onClick={() => {
              setListWorkflow(true);
              setCreateWorkflow(false);

              setDocumentName("");
              setNoOfLevels("");
              setRuleName("");
              setWorkflowName("");
              setBasedOnWorkflow("");
              setFieldName("");

              setErrors({});
            }}
          >
            <Button className="plus-button">Cancel</Button>
            <Button variant="contained" className="icon-button">
              <TiCancel size={24} />
            </Button>
          </ButtonGroup>
        </Div>
      </form>

      <Dialog
        open={openForms}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmitCreateFormFields}>
          <div>
            <DialogContent>
              <Typography variant="h3">Create Field Name </Typography>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Typography className="col-12 input-label">
                    Model Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Autocomplete
                    onFocus={getModuleNames}
                    className="search-select col-12"
                    id="free-solo-demo"
                    options={listModules}
                    getOptionLabel={(option) => option?.ModuleName}
                    value={listModules?.find(
                      (option) => option?.ModuleName === moduleName
                    ) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setModuleName(newValue?.ModuleName);
                      getFormNames(newValue);
                    }}
                    sx={{ minWidth: "250px", maxWidth: "1005px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Form Name"
                        variant="outlined"
                        // {...register3("entityName")}
                        autoComplete="off"
                      />
                    )}
                  />
                  <Div style={{ color: "red" }}>
                    {!moduleName && errors?.moduleName}
                  </Div>
                </Grid>

                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Typography className="col-12 input-label">
                    Document Name/Form Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Autocomplete
                    // onFocus={getFormNames}
                    className="search-select col-12"
                    id="free-solo-demo"
                    options={listFormNames}
                    getOptionLabel={(option) => option?.FormName}
                    value={listFormNames?.find(
                      (option) => option?.FormName === formName
                    ) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setFormName(newValue?.FormName);
                      getFieldNames2(newValue);
                      // settingServices.filterFieldNames(newValue.FormName).then((res)=>{
                      //   console.log(res);
                      //   setListFieldNames(res);
                      // })
                    }}
                    sx={{ minWidth: "250px", maxWidth: "1005px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Document Name"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                  <Div style={{ color: "red" }}>
                    {!formName && errors?.formName}
                  </Div>
                </Grid>

                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Typography className="col-12 input-label">
                    Field Name <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ ml: 2 }}>
                  <Autocomplete
                    className="search-select col-12"
                    id="free-solo-demo"
                    name="fieldName2"
                    options={listFieldNames2 || []}
                    getOptionLabel={(option) => option?.Field_Name || []}
                    value={listFieldNames2?.find(
                      (option) => option?.Field_Name === fieldName2
                    ) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setFieldName2(newValue?.Field_Name);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Field Name"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                    sx={{ minWidth: "250px", maxWidth: "1005px" }}
                  />
                  <Div style={{ color: "red" }}>
                    {!fieldName2 && errors?.fieldName2}
                  </Div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <ButtonGroup
                aria-label="split button"
                type="submit"
                sx={{
                  mt: { xs: 0.5, lg: 0 },
                  mr: { xs: 0, md: 1 }
                }}
              >
                <Button type="submit" className="plus-button">Save</Button>
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
                  setOpenForms(false);
                  setModuleName("");
                  setFormName("");
                  setFieldName2("");

                  setErrors({});
                }}
              >
                <Button className="plus-button">Cancel</Button>
                <Button variant="contained" className="icon-button">
                  <TiCancel size={24} />
                </Button>
              </ButtonGroup>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default CreateAssignWorkflows;
