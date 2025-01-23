import {
  Autocomplete,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div/Div";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

const actionNames = [
  { id: 0, name: "Create" },
  { id: 1, name: "Create/Edit" },
  { id: 2, name: "Delete" },
];

const EditWorkflowRules = ({
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

  const [ruleName1, setRuleName1] = useState("");
  const [action, setAction] = useState(null);
  const [errors, setErrors] = useState();


  useEffect(() => {
    const getWorkflowRule = async () => {
      await axios.get(`${BASE_URL}/Erpapp/WorkflowRuleCRUD/?WorkflowRule_Id=${currentWorkflows?.WorkflowRule_Id}`, header).then((res) => {
        const response = res?.data;
        setRuleName1(response?.Rule_Name);
        setAction(response?.Action)
      }).catch((error) => {
        console.log(error);
      })
    }

    getWorkflowRule()
  }, [currentWorkflows]);

  const validateForm = () => {
    const newErrors = {};

    if (!ruleName1) {
      newErrors.ruleName1 = [
        { string: "Rule Name is required.", code: "required" },
      ];
    }
    if (!action) {
      newErrors.action = [
        { string: "Action is required.", code: "required" },
      ];
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveActions = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        id: currentWorkflows?.id,
        WorkflowRule_Id: currentWorkflows?.WorkflowRule_Id,
        Partner_Id: currentWorkflows?.Partner_Id,
        Rule_Name: ruleName1.replace(/[&!@#$%^0-9]/g, ''),
        Action: action,
        Company_Id: currentWorkflows?.Company_Id,
        Created_By: currentWorkflows?.Created_By,
        Updated_By: parseInt(localStorage.getItem("UserId")),
      };

      axios
        .put(`${BASE_URL}/Erpapp/WorkflowRuleCRUD/`, payload, header)
        .then((res) => {
          console.log(res);
          if (res?.status === 200 && res?.data?.id) {
            toast.success("Updated Successfully");
            setListWorkflow(true);
            setEditWorkflow(false);
            listOfWorkflows();
            setErrors({});
          } else {
            toast.error("Check Your Inputs");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>

      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Edit Workflow Rule
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Users shall use this form to set up the approvers to approve various
        documents
      </Typography>

      <Div>
        <form onSubmit={handleSaveActions}>
          <Div className="" sx={{ minHeight: { sm: "250px", md: "350px" } }}>
            <Grid container rowSpacing={2} sx={{ mt: { sm: 2, md: 3 }, ml: { sm: 0, md: 1 } }}>
              <Grid item xs={12} className="row">
                <Typography className="col-12 col-md-4 col-lg-3 col-xl-2 input-label">
                  Rule Name <span className="required">*</span>
                </Typography>

                <Div className="col-12 col-md-4">
                  <TextField
                    className="input-box col-12"
                    name="ruleName1"
                    value={ruleName1 || ""}
                    onChange={(e) => setRuleName1(e.target.value)}
                    placeholder="Rule Name"
                  />
                  <Div style={{ color: "red" }}>
                    {!ruleName1 && errors?.ruleName1?.[0] && (
                      <div
                        className="error"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {errors?.ruleName1[0]?.string}
                      </div>
                    )}
                  </Div>
                </Div>
              </Grid>
              <Grid item xs={12} className="row">
                <Typography className="col-12 col-md-4 col-lg-3 col-xl-2 input-label">
                  Action When <span className="required">*</span>
                </Typography>

                <Div className="col-12 col-md-4">
                  <Autocomplete
                    className="search-select col-12"
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
                    value={action || ""}
                    onChange={(e, newValue) => {
                      console.log(newValue);
                      setAction(newValue?.name);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option?.name === value || value === ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Action Name"
                        variant="outlined"
                        autoComplete="off"
                      />
                    )}
                  />
                  <Div style={{ color: "red" }}>
                    <Div style={{ color: "red" }}>
                      {!action && errors?.action?.[0] && (
                        <div
                          className="error"
                          style={{ color: "red", fontSize: "12px" }}
                        >
                          {errors?.action[0]?.string}
                        </div>
                      )}
                    </Div>
                  </Div>
                </Div>

              </Grid>
            </Grid>
          </Div>

          {/* code for update and cancel button */}
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
                Update
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
                setEditWorkflow(false);
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
      </Div>
    </>
  );
};

export default EditWorkflowRules;
