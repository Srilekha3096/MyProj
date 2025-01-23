import {
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "../../Setting";
import Div from "@jumbo/shared/Div/Div";
import itemServices from "app/services/item-master-services";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import settingServices from "app/services/setting-api-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import hrApiServices from "app/services/hr-api-services";
import { NumericTextField } from "app/shared/ReuseComponents/StyledComponents";

const EditPartnerWorkflow = ({
  setListWorkflow,
  setEditWorkflow,
  listOfWorkflows,
  currentWorkflows,
  scrollHeight
}) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const [showCreatePage, setShowCreatePage] = useState(true);
  const [showUpdatePage, setShowUpdatePage] = useState(false);

  const [approverHead, setApproverHead] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [listDocumentNames, setListDocumentNames] = useState([]);
  const [listFieldNames, setListFieldNames] = useState([]);

  const [partnerName, setPartnerName] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [basedOnWorkflow, setBasedOnWorkflow] = useState("Amount");
  const [amount, setAmount] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [noOfLevels, setNoOfLevels] = useState("");

  const [approverNameLists, setApproverNameLists] = useState([]);

  const [rows, setRows] = useState([
    {
      id: "",
      from_value: "",
      to_value: "",
      approver_name: "",
      role: "",
      level: "",
    },
  ]);


  const defaultPartnerName = currentWorkflows?.Partner_Id;
  const defaultWorkflowName = currentWorkflows?.Workflow_Name;
  const defaultDocumentName = currentWorkflows?.Document_Name;
  const defaultFieldName = currentWorkflows?.Field_Name;
  const defaultRuleName = currentWorkflows?.Assignworkflow_Id?.Rule_Name;
  const defaultNoofLevel = currentWorkflows?.Noof_Level;
  const defaultHeadApprover = currentWorkflows?.Head_Approval;
  const defaultRows = currentWorkflows?.Amountjosn;

  useEffect(() => {
    setPartnerName(defaultPartnerName);
    setWorkflowName(defaultWorkflowName);
    setDocumentName(defaultDocumentName);
    setFieldName(defaultFieldName);
    setRuleName(defaultRuleName);
    setNoOfLevels(defaultNoofLevel);
    setApproverHead(defaultHeadApprover);
    setRows(defaultRows);
  }, [
    currentWorkflows,
    defaultPartnerName,
    defaultWorkflowName,
    defaultDocumentName,
    defaultFieldName,
    defaultRuleName,
    defaultNoofLevel,
    defaultHeadApprover,
    defaultRows,
  ]);

  useEffect((res) => {
    if (res) {
      setShowCreatePage(true);
      setShowUpdatePage(false);
    } else {
      setShowCreatePage(false);
      setShowUpdatePage(true);
    }
  }, []);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleAddRow = () => {
    let arr = [];
    rows?.map((item, ind) => {
      console.log("kkkkk", item);
      if (
        item?.id == "" ||
        item?.level == "" ||
        item?.approver_name == "" ||
        item?.role == ""
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      } else if (
        item?.id == undefined ||
        item?.level == undefined ||
        item?.approver_name == undefined ||
        item?.role == undefined
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      }
    });

    if (arr.length == 0) {
      let items = {
        id: "",
        level: "",
        from_value: "",
        to_value: "",
        approver_name: "",
        role: "",
      };
      setRows([...rows, items]);
    }
  };

  const handleRemoveRow = (index) => {
    const list = [...rows];
    if (rows?.length !== 1) {
      list.splice(index, 1);
    }
    setRows(list);
  };


  // get a employee lists
  useEffect(() => {
    const getUsers = () => {
      hrApiServices.listofDropdownAllEmployees(header).then((res) => {
        console.log(res);
        // const list = res?.filter((opt) => opt?.Business_Unit === partnerName)
        setEmployees(res);
      }).catch((error) => {
        console.log(error);
      });
    };

    getUsers();
  }, [])

  const getListOfPartners = () => {
    itemServices.listPartners(header).then((res) => {
      console.log("Partners", res);
      setApprovers(res);
    }).catch((error) => {
      console.log(error)
    });
  };

  // assign workflow filter based on document name
  const filterWorkflowDocumentName = (newValue) => {
    axios
      .get(
        `${BASE_URL}/Erpapp/Assignworkflowfilter/?Document_Name=${newValue}`, header)
      .then((res) => {
        console.log("WFNAmes", res.data);
        setWorkflowName(res.data[0]?.Workflow_Name);
        setFieldName(res?.data[0]?.Field_Name);
        setRuleName(res?.data[0]?.Rule_Name);
        setNoOfLevels(res?.data[0]?.Noof_Level);
        setApproverHead(res?.data[0]?.Head_Approval);

        if (res?.data[0]?.Field_Name === "") {
          setAmount(false);
          setBasedOnWorkflow("Level");
        } else {
          setAmount(true);
          setBasedOnWorkflow("Amount");
        }

        const levels = res.data[0]?.Noof_Level;
        if (levels) {
          const newRows = [];
          for (let i = 0; i < levels; i++) {
            const data = {
              id: "",
              level: `Level ${i + 1}`,
              from_value: "",
              to_value: "",
              approver_name: "",
              role: "",
            };
            newRows.push(data);
          }
          setRows(newRows);
        }

      }).catch((error) => {
        console.log(error)
      });
  };


  useEffect(() => {
    // filterWorkflowDocumentName(defaultDocumentName)
    axios
      .get(
        `${BASE_URL}/Erpapp/Assignworkflowfilter/?Document_Name=${defaultDocumentName}`, header)
      .then((res) => {
        console.log("WFNAmes", res.data);
        if (res?.data[0]?.Field_Name === "") {
          setAmount(false);
          setBasedOnWorkflow("Level");
        } else {
          setAmount(true);
          setBasedOnWorkflow("Amount");
        }
      }).catch((error) => {
        console.log(error)
      });
  }, [currentWorkflows?.id])


  const getFieldNames = (newValue) => {
    settingServices
      .filterFieldNamesFromWorkflowOrigin(newValue, header)
      .then((res) => {
        console.log("res1", res?.length);
        setListFieldNames(res);
        setFieldName(res[0]?.Field_Name);
        if (res?.length === 0) {
          setAmount(false);
          setBasedOnWorkflow("Level");
        } else {
          setAmount(true);
          setBasedOnWorkflow("Amount");
        }
      }).catch((error) => {
        console.log(error)
      });
  };


  // useEffect(() => {
  //   getFieldNames(defaultDocumentName);
  // }, [currentWorkflows, defaultDocumentName]);

  const getDocumentNames = () => {
    // settingServices.listFormNames().then((res) => {
    //   console.log("Res", res);
    //   setListDocumentNames(res);
    // });
    axios
      .get(`${BASE_URL}/Erpapp/Assignworkflowdropdwonlist/`, header)
      .then((res) => {
        console.log(res?.data);
        setListDocumentNames(res?.data);
      }).catch((error) => {
        console.log(error)
      });
  };

  const handleValueChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...rows];
    if (name === "from_value" || name === "to_value") {
      list[index][name] = Number(value);
    } else {
      list[index][name] = value;
    }
    setRows(list);
    console.log(list);
  };

  // const handleChangeApproverName = (e, newValue, index) => {
  //   const list = [...rows];
  //   const rowlist = list[index];
  //   rowlist["approver_name"] = newValue?.first_name || "";
  //   rowlist["id"] = newValue?.id || "";
  //   rowlist["role"] = newValue?.Designation || "";
  //   rowlist["level"] = ""
  //   setRows(list);
  // };


  let loginUser = localStorage.getItem("Username");
  let loginUserRole = localStorage.getItem("Designation");

  const handleChangeApproverName = (e, newValue, index) => {
    // Create a copy of the rows array
    const list = [...rows];

    // Ensure index is valid
    if (index < 0 || index >= list.length) return;

    // Get the current row data
    const rowlist = { ...list[index] };

    // Get the previous approver name if exists
    const previousApproverName = rowlist?.approver_name;

    // Update the row with the new approver data
    rowlist["approver_name"] = newValue ? `${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}` : "";
    rowlist["id"] = newValue?.id || "";
    rowlist["role"] = newValue?.Designation || "";
    rowlist["level"] = `Level ${index + 1}`;

    // Update the list with the modified row
    list[index] = rowlist;

    // Set the updated rows state
    setRows(list);

    // Manage the approver names list
    // let updatedApproverNameLists = rows.map(row => row.approver_name).filter(name => name);
    let updatedApproverNameLists = list?.map(row => row?.approver_name).filter(name => name && name !== "");

    // Add the new approver if it's not already in the list
    const newApproverName = newValue ? `${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}` : "";
    if (newApproverName && !updatedApproverNameLists.includes(newApproverName)) {
      updatedApproverNameLists.push(newApproverName);
    }

    // Remove the previous approver if it exists
    if (previousApproverName && previousApproverName !== newApproverName) {
      updatedApproverNameLists = updatedApproverNameLists?.filter(name => name !== previousApproverName);
    }

    // Set the updated approver names list state
    setApproverNameLists(updatedApproverNameLists);
  };



  // Filter users whose first_name is not in the selectedNames array
  const filteroptions = employees?.filter((user) => {
    if (loginUserRole !== "Admin" && `${user?.Employee_FirstName} ${user?.Employee_LasttName}` === loginUser) {
      return false; // Include the admin user
    }
    return !approverNameLists?.includes(`${user?.Employee_FirstName} ${user?.Employee_LasttName}`); // Exclude users in approverNameLists
  });


  const getFilteredOptions = (currentIndex) => {
    // const selectedApprovers = rows?.map(row => row?.approver_name).filter(name => name && name !== "");
    const selectedApprovers = rows?.map((row, index) => index !== currentIndex ? row.approver_name : null)?.filter(name => name && name !== "");
    return employees?.filter(user => {
      const userName = `${user?.Employee_FirstName} ${user?.Employee_LasttName}`;
      if (loginUserRole !== "Admin" && userName === loginUser) {
        return false; // Include the admin user
      }
      // Allow the current row's approver and exclude others
      return !selectedApprovers.includes(userName) || rows[currentIndex].approver_name === userName;
    });
  };


  const handleSubmitWorkflow = (e) => {
    e.preventDefault();
    var payload = {
      id: currentWorkflows?.id,
      Workflow_Id: currentWorkflows?.Workflow_Id,
      Workflow_Name: workflowName?.Workflow_Name,
      WorkflowName_Id: workflowName?.id,
      Workflow_Basedon: basedOnWorkflow,
      Document_Name: documentName?.Document_Name,
      Field_Name: fieldName,
      Noof_Level: noOfLevels,
      Amountjosn: rows,
      leveljson: rows,
      Head_Approval: approverHead,
      Partner_Id: partnerName?.id,
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/WorkflowCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res?.data?.id) {
          toast.success("Workflow is Updated Successfully");
          setEditWorkflow(false);
          setListWorkflow(true);
          listOfWorkflows();
        }
      }).catch((error) => {
        console.log(error)
      });
  };


  const handleClickCancel = () => {
    setListWorkflow(true);
    setEditWorkflow(false);
    setPartnerName(defaultPartnerName);
    setWorkflowName(defaultWorkflowName);
    setDocumentName(defaultDocumentName);
    setFieldName(defaultFieldName);
    setRuleName(defaultRuleName);
    setNoOfLevels(defaultNoofLevel);
    setApproverHead(defaultHeadApprover);
    setRows(defaultRows);
  }

  console.log("approverNameLists", approverNameLists)

  return (
    <>
      <Setting />
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Workflow Approval
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Users shall use this form to set up the approvers to approve various
        documents
      </Typography>

      <Div>
        <form onSubmit={handleSubmitWorkflow}>
          <Div className="container" sx={{ minHeight: "300px" }}>
            <Grid container sx={{ mt: 2, ml: { sm: 0, md: 3 } }}>
              <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  Business Unit <span className="required">*</span>
                </Typography>
                <Div className="col-md-4">
                  <Autocomplete
                    className="search-select"
                    name="partnerName"
                    onFocus={getListOfPartners}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Partner_Name) {
                        return option?.Partner_Name;
                      }
                      return "";
                    }}
                    options={approvers}
                    value={partnerName}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setPartnerName(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option?.Partner_Name === value || value === ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Business Unit"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                </Div>


              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  Document Name <span className="required">*</span>
                </Typography>

                <Div className="col-md-4">
                  <Autocomplete
                    className="col-12 search-select"
                    name="documentName"
                    onFocus={getDocumentNames}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option && option?.Document_Name) {
                        return option?.Document_Name;
                      }
                      return "";
                    }}
                    options={listDocumentNames}
                    value={documentName}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setDocumentName(newValue);
                      filterWorkflowDocumentName(newValue?.Document_Name);
                      // getFieldNames(newValue?.Document_Name);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option?.Document_Name === value || value === ""
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

                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  Workflow Name <span className="required">*</span>
                </Typography>

                <Div className="col-md-4">
                  <TextField
                    className="col-12 input-box"
                    name="workflowName"
                    value={workflowName}
                    // onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="Workflow Name"
                    variant="outlined"
                    autoComplete="off"
                    disabled
                  />
                </Div>
                {/* <Div className="col-md-6">
                      <Autocomplete
                        className="search-select"
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
                        value={workflowNamesList.find(
                          (option) => option?.Workflow_Name === workflowName
                        )}
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setWorkflowName(newValue);
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
                    </Div> */}

              </Grid>

              {/* <Grid item xs={12} className="row" sx={{ mt: 1 }}>
    
                    <Typography className="col-md-4 col-lg-3 input-label" sx={{ mt: 2 }}>
                      Workflow Based On <span className="required">*</span>
                    </Typography>
                    <Div className="col-md-6">
                      <JumboAutocomplete
                        className="search-select"
                        name="basedOnWorkflow"
                        // onFocus={getListBasedOnWorkflows}
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option && option.values) {
                            return option.values;
                          }
                          return "";
                        }}
                        options={workflows}
                        value={basedOnWorkflow}
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setBasedOnWorkflow(newValue.values);
                          switch (newValue.values) {
                            case "Amount":
                              setAmount(true);
                              setLevels(false);
                              break;
                            case "Level":
                              setLevels(true);
                              setAmount(false);
                              break;
                            default:
                              setAmount(true);
                              setLevels(false);
                              break;
                          }
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.values === value || value === ""
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
                    </Div>
    
                  </Grid> */}

              {amount === true && (
                <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                  <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                    Field Name
                  </Typography>

                  <Div className="col-md-4">
                    <TextField
                      className="col-12 input-box"
                      name="fieldName"
                      value={fieldName}
                      placeholder="Field Name"
                      variant="outlined"
                      autoComplete="off"
                      disabled
                    />
                  </Div>
                  {/* <FormControl className="col-md-6">
                        <Autocomplete
                          className="search-select"
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
                          value={listFieldNames.find(
                            (option) => option?.Field_Name === fieldName
                          )}
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
                      </FormControl> */}


                </Grid>
              )}

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  Rule Name <span className="required">*</span>
                </Typography>

                <Div className="col-md-4">
                  <TextField
                    className="col-12 input-box"
                    name="ruleName"
                    value={ruleName}
                    placeholder="Rule Name"
                    variant="outlined"
                    autoComplete="off"
                    disabled
                  />

                </Div>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  No of Levels <span className="required">*</span>
                </Typography>

                <Div className="col-md-4">
                  <TextField
                    className="col-12 input-box"
                    name="noOfLevels"
                    value={noOfLevels}
                    // onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="No of Levels"
                    variant="outlined"
                    autoComplete="off"
                    disabled
                  />
                </Div>
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
              {/* )} */}
            </Grid>

            <Div sx={{ mt: 2, p: { xs: 0, md: 2 } }}>
              <FormControlLabel
                className="input-label"
                checked={approverHead}
                onChange={(e) => setApproverHead(e.target.checked)}
                control={<Checkbox size="small" />}
                label="Require Department Head Approval"
                labelPlacement="start"
              />
            </Div>

            <Div sx={{ mt: 2 }}>
              <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={scrollHeight ? scrollHeight : 200}
                autoHide={true}
                hideTracksWhenNotNeeded
                id="no-more-tables"
              >
                <Table className="table table-bordered">
                  <TableHead className="table-head">
                    <TableRow>
                      <TableCell>Level</TableCell>
                      {amount && (
                        <>
                          <TableCell>From Range</TableCell>
                          <TableCell>To Range</TableCell>
                        </>
                      )}
                      <TableCell>Approver's Name</TableCell>
                      {/* <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((option, index) => {
                      let { level, from_value, to_value, approver_name } = option;
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ minWidth: "210px" }} data-title="Level">
                            <TextField
                              className="input-box col-12"
                              placeholder="Level"
                              name="level"
                              value={`Level ${index + 1}`}
                              // onChange={(event, newValue) => {
                              //   handleValueChange(event, index);
                              // }}
                              autoComplete="off"
                              disabled
                            />
                          </TableCell>
                          {amount && (
                            <>
                              <TableCell sx={{ minWidth: "210px" }} data-title="From Range">
                                <NumericTextField
                                  className="input-box col-12"
                                  placeholder="From Range"
                                  name="from_value"
                                  value={from_value}
                                  onChange={(event, newValue) => {
                                    handleValueChange(event, index);
                                  }}
                                  autoComplete="off"
                                />
                              </TableCell>
                              <TableCell sx={{ minWidth: "210px" }} data-title="To Range">
                                <NumericTextField
                                  className="input-box col-12"
                                  placeholder="To Range"
                                  name="to_value"
                                  value={to_value}
                                  onChange={(event, newValue) => {
                                    handleValueChange(event, index);
                                  }}
                                  autoComplete="off"
                                />
                              </TableCell>
                            </>
                          )}

                          <TableCell sx={{ minWidth: "210px" }} data-title="Approver Name">
                            <FormControl className="col-12">
                              <Autocomplete
                                className="search-select col-12"
                                name="approver_name"
                                // onFocus={getUsers}
                                getOptionLabel={(option) => {
                                  if (typeof option === "string") {
                                    return option;
                                  }
                                  if (option && `${option?.Employee_FirstName} ${option?.Employee_LasttName}`) {
                                    return `${option?.Employee_FirstName} ${option?.Employee_LasttName}`;
                                  }
                                  return "";
                                }}
                                options={getFilteredOptions(index)}
                                // options={filteroptions}
                                // options={users?.filter((opt) => !approver_name?.includes(opt?.first_name))}
                                value={approver_name || ""}
                                onChange={(e, newValue) =>
                                  handleChangeApproverName(e, newValue, index)
                                }
                                isOptionEqualToValue={(option, value) =>
                                  `${option?.Employee_FirstName} ${option?.Employee_LasttName}` === value || value === ""
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Approver Name"
                                    variant="outlined"
                                    autoComplete="off"
                                  />
                                )}
                              />
                            </FormControl>
                          </TableCell>
                          {/* <TableCell data-title="Action">
                            <Button
                              color="error"
                              onClick={() => handleRemoveRow(index)}
                            >
                              <MdDelete size={24} />
                            </Button>
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {/* <Button onClick={handleAddRow}>+ Add More</Button> */}
              </JumboScrollbar>
            </Div>
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
              <Button className="plus-button" type="submit">
                Update
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="icon-button"
              >
                <FaSave size={18} />
              </Button>
            </ButtonGroup>
            <ButtonGroup
              aria-label="split button"
              onClick={handleClickCancel}
              sx={{
                mt: { xs: 0.5, lg: 0 },
                mr: { xs: 0, md: 1 }
              }}
            >
              <Button className="plus-button">Cancel</Button>
              <Button variant="contained" className="icon-button">
                <TiCancel size={24} />
              </Button>
            </ButtonGroup>
          </Div>
        </form>
      </Div>
    </>
  );
};

export default EditPartnerWorkflow;
