import {
  Autocomplete,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
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
import { todayDate } from "app/shared/ReuseComponents/DateFormatter";
import { handleError } from "app/pages/auth-pages/login/AuthGuard";
import { NumericTextField } from "app/shared/ReuseComponents/StyledComponents";

const CreatePartnerWorkflow = ({
  setListWorkflow,
  setCreateWorkflow,
  listOfWorkflows,
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

  const [workflows, setWorkflows] = useState([]);
  const [approverHead, setApproverHead] = useState(false);
  const [openForms, setOpenForms] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [listModules, setListModules] = useState([]);
  const [listFormNames, setListFormNames] = useState([]);
  const [listDocumentNames, setListDocumentNames] = useState([]);
  const [listFieldNames, setListFieldNames] = useState([]);
  const [listFieldNames2, setListFieldNames2] = useState([]);

  const [partnerId, setPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [workflowName, setWorkflowName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [basedOnWorkflow, setBasedOnWorkflow] = useState("Amount");
  const [amount, setAmount] = useState(false);
  const [noOfLevels, setNoOfLevels] = useState("");

  const [moduleName, setModuleName] = useState("");
  const [formName, setFormName] = useState("");
  const [fieldName2, setFieldName2] = useState("");


  const [approverNameLists, setApproverNameLists] = useState([]);


  const [rows, setRows] = useState([{
    id: "",
    level: "Level 1",
    from_value: "",
    to_value: "",
    approver_name: "",
    role: "",
  }]);

  const [errors, setErrors] = useState();



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

    if (arr?.length == 0) {
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
  }, [partnerName])

  const getListOfPartners = () => {
    itemServices.listPartners(header).then((res) => {
      console.log("Partners", res);
      setApprovers(res);
    }).catch((error) => {
      console.log(error);
    });
  };


  useEffect(() => {
    const getPreviousWorkflows = async () => {
      await axios.get(`${BASE_URL}/Erpapp/Workflowlistwithoutpagination/?Partner_Id=${partnerId}`, header).then((res) => {
        setWorkflows(res?.data);
      }).catch((error) => {
        console.log(error);
      })
    }

    getPreviousWorkflows()
  }, [partnerId])

  // assign workflow filter based on document name
  const filterWorkflowDocumentName = async (newValue) => {
    await axios
      .get(
        `${BASE_URL}/Erpapp/Assignworkflowfilter/?Document_Name=${newValue}`, header)
      .then((res) => {
        console.log("WFNAmesWFNAmes", res?.data);
        setWorkflowName(res?.data[0]?.Workflow_Name);
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
        console.log(error);
      });
  };


  // useEffect(() => {
  //   filterWorkflowDocumentName(documentName)
  // }, [documentName]);


  const getModuleNames = () => {
    settingServices.filterFormNames(header).then((res) => {
      console.log(res?.results);
      setListModules(res?.results);
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
        setListFormNames(res.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getDocumentNames = () => {
    axios
      .get(`${BASE_URL}/Erpapp/Assignworkflowdropdwonlist/`, header)
      .then((res) => {
        console.log(res.data);
        setListDocumentNames(res?.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getFieldNames = (newValue) => {
    settingServices
      .filterFieldNamesFromWorkflowOrigin(newValue, header)
      .then((res) => {
        console.log("res1", res?.length);
        setFieldName(res[0]?.Field_Name);
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

  // useEffect(() => {
  //   getFieldNames(documentName);
  // }, []);

  const getFieldNames2 = (newValue) => {
    console.log("newValue.FormName", newValue?.FormName);
    var formname = newValue?.FormName;
    settingServices.filterlistFieldNames(formname, header).then((res) => {
      console.log("res1", res);
      setListFieldNames2(res);
      setFieldName(res[0]?.Field_Name);
      if (res) {
        setAmount(true);
      } else {
        setAmount(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleSubmitCreateFormFields = (e) => {
    e.preventDefault();
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
        setOpenForms(false);
        if (res.status === 201) {
          toast.success("Fields Created Successfully");
        }
      }).catch((error) => {
        console.log(error);
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

  // const handleChangeApproverName = (event, newValue, index) => {
  //   const list = [...rows];
  //   list[index].approver_name = newValue?.first_name || "";
  //   list[index].id = newValue?.id || "";
  //   list[index].role = newValue?.Designation || "";
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
    rowlist["approver_name"] = `${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}` || "";
    rowlist["id"] = newValue?.id || "";
    rowlist["role"] = newValue?.Designation || "";
    rowlist["level"] = "";

    // Update the list with the modified row
    list[index] = rowlist;

    // Set the updated rows state
    setRows(list);

    // Manage the approver names list
    const updatedApproverNameLists = [...approverNameLists];

    // Remove the previous approver if it exists
    if (previousApproverName) {
      const prevIndex = updatedApproverNameLists.indexOf(previousApproverName);
      if (prevIndex !== -1) {
        updatedApproverNameLists.splice(prevIndex, 1);
      }
    }

    // // Add the new approver if it's not already in the list
    // if (newValue && !updatedApproverNameLists.includes(`${newValue?.first_name} ${newValue?.last_name}`)) {
    //   updatedApproverNameLists.push(`${newValue?.first_name} ${newValue?.last_name}`);
    // }

    // Handle existing approver names
    if (previousApproverName && previousApproverName !== `${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}`) {
      const prevIndex = updatedApproverNameLists.indexOf(previousApproverName);
      if (prevIndex !== -1) {
        updatedApproverNameLists.splice(prevIndex, 1); // Remove the previous approver
      }
    }

    // Add the new approver if it's not already in the list
    const newApproverName = `${newValue?.Employee_FirstName} ${newValue?.Employee_LasttName}`;
    if (newValue && newApproverName && !updatedApproverNameLists.includes(newApproverName)) {
      updatedApproverNameLists.push(newApproverName);
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


  const validateForm = () => {
    const newErrors = {};

    if (partnerName === undefined || partnerName === null || partnerName === "") {
      newErrors.partnerName = "Business Unit is required.";
    }
    if (workflowName === undefined || workflowName === null || workflowName === "") {
      newErrors.workflowName = "Workflow is required.";
    }
    if (ruleName === undefined || ruleName === null || ruleName === "") {
      newErrors.ruleName = "Rule Name is required.";
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


  const handleSubmitWorkflow = (e) => {
    e.preventDefault();
    console.log("workflowsworkflows", workflows)
    if (validateForm()) {
      if (workflows?.filter((i) => i?.Partner_Id?.id === partnerId)?.find((opt) => opt?.Document_Name === documentName)) {
        toast.warning(`Workflow Approval For ${documentName} is already created.`)
      } else {
        var payload = {
          Workflow_Name: workflowName,
          Assignworkflow_Id: documentId,
          Workflow_Basedon: basedOnWorkflow,
          Document_Name: documentName,
          Field_Name: fieldName,
          Noof_Level: noOfLevels,
          Amountjosn: rows,
          leveljson: rows,
          Head_Approval: approverHead,
          Partner_Id: parseInt(partnerId),
          Company_Id: parseInt(localStorage.getItem("OrganizationId")),
          Created_By: parseInt(localStorage.getItem("UserId")),
          Updated_By: parseInt(localStorage.getItem("UserId")),
          Created_Date: todayDate
        };
        axios
          .post(`${BASE_URL}/Erpapp/WorkflowCRUD/`, payload, header)
          .then((res) => {
            console.log(res);
            if (res?.status === 201 && res?.data?.id) {
              toast.success("Workflow is Created Successfully");
              setCreateWorkflow(false);
              setListWorkflow(true);
              listOfWorkflows();
              setPartnerName("");
              setDocumentName("");
              setWorkflowName("");
              setFieldName("");
              setRuleName("");
              setNoOfLevels("");
              setRows([
                {
                  id: "",
                  from_value: "",
                  to_value: "",
                  approver_name: "",
                  role: "",
                  level: "",
                },
              ]);

              setErrors({})
            }
          }).catch((error) => {
            console.log(error);
            handleError(error)
          });
      }
    }
  };

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
                    value={approvers?.find((opt) => opt?.Partner_Name === partnerName) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setPartnerName(newValue?.Partner_Name);
                      setPartnerId(newValue?.id)
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
                  <Div style={{ color: "red" }}>
                    {!partnerName && errors?.partnerName}
                  </Div>
                </Div>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                <Typography variant="h4" className="col-md-4 col-lg-3" sx={{ mt: 2 }}>
                  Document Name <span className="required">*</span>
                </Typography>

                <Div className="col-md-4">
                  <Autocomplete
                    className="search-select"
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
                    value={listDocumentNames?.find((opt) => opt?.Document_Name === documentName) || null}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      if (newValue) {
                        setDocumentName(newValue?.Document_Name);
                        setDocumentId(newValue?.id)
                        filterWorkflowDocumentName(newValue?.Document_Name);
                        // getFieldNames(newValue?.Document_Name);
                      } else {
                        setWorkflowName("");
                        setFieldName("");
                        setRuleName("");
                        setNoOfLevels("");
                        setDocumentName("");
                        setApproverHead(false);
                        setRows([{
                          id: "",
                          level: "Level 1",
                          from_value: "",
                          to_value: "",
                          approver_name: "",
                          role: "",
                        }])
                      }
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
                  <Div style={{ color: "red" }}>
                    {!documentName && errors?.documentName}
                  </Div>
                </Div>
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
                    placeholder="Workflow Name"
                    variant="outlined"
                    autoComplete="off"
                    disabled
                  />
                  <Div style={{ color: "red" }}>
                    {!workflowName && errors?.workflowName}
                  </Div>
                </Div>
              </Grid>

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
                  <Div style={{ color: "red" }}>
                    {!ruleName && errors?.ruleName}
                  </Div>
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
                    placeholder="No of Levels"
                    variant="outlined"
                    autoComplete="off"
                    disabled
                  />
                  <Div style={{ color: "red" }}>
                    {!noOfLevels && errors?.noOfLevels}
                  </Div>
                </Div>
              </Grid>
            </Grid>

            <Div sx={{ mt: 2 }}>
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
                <Table className="table table-bordered" sx={{ width: "95%" }}>
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
                    {rows && rows?.map((option, index) => {
                      const { level, from_value, to_value, approver_name } = option;
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ minWidth: "210px" }} data-title="Level">
                            <TextField
                              className="input-box col-12"
                              placeholder="Level"
                              name="level"
                              // value={level}
                              value={`Level ${index + 1}`}
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

                          <TableCell sx={{ minWidth: "210px" }} data-title="Approver's Name">
                            <FormControl className="col-12">
                              <Autocomplete
                                className="search-select col-12"
                                name="approver_name"
                                getOptionLabel={(option) => `${option?.Employee_FirstName} ${option?.Employee_LasttName}`}
                                options={filteroptions}
                                // options={users?.filter((opt) => !approver_name?.includes(opt?.first_name))}
                                value={employees?.find(
                                  (option) => `${option?.Employee_FirstName} ${option?.Employee_LasttName}` === approver_name
                                ) || null}
                                onChange={(event, newValue) => {
                                  handleChangeApproverName(
                                    event,
                                    newValue,
                                    index
                                  );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                  option?.id === value?.id || value === ""
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
                {/* {noOfLevels === rows?.length ? (
                  <Button disabled={true}>+ Add More</Button>
                ) : (
                  <Button onClick={handleAddRow}>+ Add More</Button>
                )} */}
              </JumboScrollbar>
            </Div>
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
                setListWorkflow(true);
                setCreateWorkflow(false);
                setPartnerName("");
                setDocumentName("");
                setWorkflowName("");
                setFieldName("");
                setRuleName("");
                setNoOfLevels("");
                setRows([
                  {
                    id: "",
                    level: "",
                    from_value: "",
                    to_value: "",
                    approver_name: "",
                    role: "",
                  },
                ]);

                setErrors({})
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

      {/* create a new field */}
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
                    )}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setModuleName(newValue?.ModuleName);
                      getFormNames(newValue);
                    }}
                    sx={{ minWidth: "280px", maxWidth: "1005px" }}
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
                    {/* {errors3.entityName?.message} */}
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
                    value={listFormNames.find(
                      (option) => option?.FormName === formName
                    )}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setFormName(newValue?.FormName);
                      getFieldNames2(newValue);
                      // settingServices.filterFieldNames(newValue.FormName).then((res)=>{
                      //   console.log(res);
                      //   setListFieldNames(res);
                      // })
                    }}
                    sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Document Name"
                        variant="outlined"
                        // {...register3("entityName")}
                        autoComplete="off"
                      />
                    )}
                  />
                  <Div style={{ color: "red" }}>
                    {/* {errors3.entityName?.message} */}
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
                    // className={`search-select col-12 ${
                    //   errors3.regionName ? "is-invalid" : ""
                    // }`}
                    id="free-solo-demo"
                    name="fieldName2"
                    getOptionLabel={(option) => option?.Field_Name}
                    value={listFieldNames2.find(
                      (option) => option?.Field_Name === fieldName2
                    )}
                    options={listFieldNames2}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setFieldName2(newValue?.Field_Name);
                    }}
                    autoComplete="off"
                    sx={{ minWidth: "280px", maxWidth: "1005px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Field Name"
                        variant="outlined"
                        // {...register3("regionName")}
                        autoComplete="off"
                      />
                    )}
                  />
                  <Div style={{ color: "red" }}>
                    {/* {errors3.regionName?.message} */}
                  </Div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <ButtonGroup aria-label="split button" sx={{ mr: 3 }}>
                <Button className="plus-button" type="submit">
                  Save
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
                onClick={() => setOpenForms(false)}
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

export default CreatePartnerWorkflow;
