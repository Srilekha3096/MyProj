import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Div from "@jumbo/shared/Div/Div";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { workflowRuleValidationSchema } from "app/schemas/SettingValidationSchemas";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { todayDate } from "app/shared/ReuseComponents/DateFormatter";

const actionNames = [
  { id: 0, name: "Create" },
  { id: 1, name: "Create/Edit" },
  { id: 2, name: "Delete" },
];

const CreateWorkflowRules = ({
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

  const [ruleName1, setRuleName1] = useState("");
  const [action, setAction] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(workflowRuleValidationSchema),
  });

  const handleSaveActions = (e) => {
    // e.preventDefault();
    if (workflows?.find((opt) => opt?.Rule_Name === ruleName1)) {
      toast.warning(`Workflow Rule ${ruleName1} is already created.`)
    } else {
      var payload = {
        Partner_Id: parseInt(localStorage.getItem("PartnerId")),
        Rule_Name: ruleName1.replace(/[&!@#$%^0-9]/g, ''),
        Action: action,
        Company_Id: parseInt(localStorage.getItem("OrganizationId")),
        Created_By: parseInt(localStorage.getItem("UserId")),
        Updated_By: parseInt(localStorage.getItem("UserId")),
        Created_Date: todayDate
      };
      axios
        .post(`${BASE_URL}/Erpapp/WorkflowRuleCRUD/`, payload, header)
        .then((res) => {
          console.log(res);
          if (res?.status === 201 && res?.data?.id) {
            toast.success("Created Successfully");
            setListWorkflow(true);
            setCreateWorkflow(false);
            setRuleName1("");
            setAction("");
            listOfWorkflows();
          } else {
            toast.error("Check Your Inputs");
          }
        });
    }
  };

  return (
    <>

      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Create Workflow Rule
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Users shall use this form to set up the approvers to approve various
        documents
      </Typography>

      <Div>
        <form onSubmit={handleSubmit(handleSaveActions)}>
          <Div className="" sx={{ minHeight: { sm: "250px", md: "350px" } }}>
            <Grid container rowSpacing={2} sx={{ mt: { sm: 2, md: 3 }, ml: { sm: 0, md: 1 } }}>
              <Grid item xs={12} className="row">
                <Typography className="col-12 col-md-4 col-lg-3 col-xl-2">
                  Rule Name <span className="required">*</span>
                </Typography>

                <Div className="col-12 col-md-4">
                  <TextField
                    className="input-box col-12"
                    name="ruleName1"
                    {...register("ruleName1")}
                    value={ruleName1}
                    onChange={(e) => setRuleName1(e.target.value)}
                    placeholder="Rule Name"
                    variant="outlined"
                  />
                  <Div style={{ color: "red" }}>
                    {errors.ruleName1?.message}
                  </Div>
                </Div>
              </Grid>
              <Grid item xs={12} className="row">
                <Typography className="col-12 col-md-4 col-lg-3 col-xl-2">
                  Action When <span className="required">*</span>
                </Typography>

                <Div className="col-12 col-md-4">
                  <FormControl className="col-12">
                    <Autocomplete
                      className={`search-select col-12 ${errors.action ? "is-invalid" : ""
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
                      value={actionNames?.find(
                        (option) => option?.name === action
                      ) || null}
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
                          {...register("action")}
                          variant="outlined"
                          autoComplete="off"
                        />
                      )}
                    />
                    <Div style={{ color: "red" }}>
                      {errors.action?.message}
                    </Div>
                  </FormControl>
                </Div>
              </Grid>
            </Grid>
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
                setRuleName1("");
                setAction("");
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

export default CreateWorkflowRules;
