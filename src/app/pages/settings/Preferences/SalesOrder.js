import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "../Setting";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import settingServices from "app/services/setting-api-services";
import ScrollToTop from "app/pages/ScrollToTop";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";

const SalesOrder = () => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };


  const dispatch = useDispatch();
  const { userRolePermissions, formPermissions, modulePermissions } = useSelector(selectedUserRolePermissions);


  const [showCreatePage, setShowCreatePage] = useState(true);
  const [showUpdatePage, setShowUpdatePage] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const [id, setId] = useState("");
  const [salePreferanceId, setSalePreferanceId] = useState("");
  const [checkAddress, setCheckAddress] = useState(false);
  const [checkTermsConditions, setCheckTermsConditions] = useState(false);
  const [checkCustomerNotes, setCheckCustomerNotes] = useState(false);
  const [customerNotes, setCustomerNotes] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [cancellationBeforeHours, setCancellationBeforeHours] = useState("");
  const [pauseServiceBefore, setPauseServiceBefore] = useState(0);
  const [refundPercentage, setRefundPercentage] = useState(0);


  const partnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = () => {
    settingServices
      .getSalesOrderSettings(companyId, header)
      .then((res) => {
        console.log(res);
        var Id = res?.Created_By;
        if (Id === 0) {
          setShowCreatePage(true);
          setShowUpdatePage(false);
        } else {
          setShowCreatePage(false);
          setShowUpdatePage(true);
        }
        setId(res?.id);
        setSalePreferanceId(res?.Salesorderpreference_Id);
        setCheckAddress(res?.Address);
        setCheckCustomerNotes(res?.Customernotes);
        setCheckTermsConditions(res?.Termsandcondition);
        setCustomerNotes(res?.Notes);
        setTermsAndConditions(res?.Termsand_condition);
        setCancellationBeforeHours(res?.Cancelbefore_Service);
        setPauseServiceBefore(res?.Pausebefore_Service);
        setRefundPercentage(res?.Refund_Percentage);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmitSalesPreferance = (e) => {
    e.preventDefault();
    var payload = {
      Address: checkAddress,
      Customernotes: checkCustomerNotes,
      Termsandcondition: checkTermsConditions,
      Notes: customerNotes,
      Termsand_condition: termsAndConditions,
      Cancelbefore_Service: Number(cancellationBeforeHours),
      Pausebefore_Service: Number(pauseServiceBefore),
      Refund_Percentage: Number(refundPercentage),
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/SalesorderpreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res?.data?.id) {
          toast.success("Created successfully");
          if (res?.data?.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Sales Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };


  const onChange = (evt, editor) => {
    var newContent = editor.getData();
    setTermsAndConditions(newContent);
  };

  // this code for update the preferance sales order
  const handleUpdateSalesPreferance = (e) => {
    e.preventDefault();
    var payload = {
      id: id,
      Salesorderpreference_Id: salePreferanceId,
      Address: checkAddress,
      Customernotes: checkCustomerNotes,
      Termsandcondition: checkTermsConditions,
      Notes: customerNotes,
      Termsand_condition: termsAndConditions,
      Cancelbefore_Service: Number(cancellationBeforeHours),
      Pausebefore_Service: Number(pauseServiceBefore),
      Refund_Percentage: Number(refundPercentage),
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };

    axios
      .put(`${BASE_URL}/Erpapp/SalesorderpreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res?.data?.id) {
          toast.success("updated successfully");
        } else {
          toast.error("Sales Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        console.log(error);
        toast.error(error.message)
      });
  };



  const handleClick = () => {
    setOpenBox(false);
    getUser()
  }


  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);


  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Preferences
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Sales Order
        </Typography>

        <Div sx={{ display: showCreatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitSalesPreferance}>
            <Div className="row" sx={{ mt: 2 }}>
              <Typography variant="h4">
                Select the fields of the sales order to set in respective
                invoices
              </Typography>
              <br />

              <Div className="col-12 col-md-12 col-lg-6 col-xl-5">

                <Grid container>
                  <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkAddress}
                            onChange={(e) => {
                              setCheckAddress(e.target.checked);
                            }}
                          />
                        }
                        label="Address"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkCustomerNotes}
                            onChange={(e) => {
                              setCheckCustomerNotes(e.target.checked);
                            }}
                          />
                        }
                        label="Customer Notes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkTermsConditions}
                            onChange={(e) => {
                              setCheckTermsConditions(e.target.checked);
                            }}
                          />
                        }
                        label="Terms & Conditions"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                    <Div sx={{ mt: 2 }}>
                      <Typography variant="h4">Customer Notes</Typography>
                      <TextField
                        className="multiline-box ms-1 col-10"
                        multiline
                        rows={6}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        InputProps={{
                          readOnly: checkCustomerNotes === true ? false : true,
                        }}
                        placeholder="Thank you for your business"
                        sx={{
                          cursor: checkCustomerNotes === false ? "no-drop" : "text",
                        }}
                        disabled={checkCustomerNotes === false ? true : false}
                      />
                    </Div>

                  </Grid>
                </Grid>
              </Div>

              {/* right side column */}
              <Div className="col-12 col-md-12 col-lg-6 col-xl-7" sx={{ pt: { lg: 2, xl: 1 } }}>
                <Grid container>
                  {/* <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Cancellation before hours
                    </Typography>

                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="col-12 input-box"
                        value={cancellationBeforeHours}
                        onChange={(e) => setCancellationBeforeHours(e.target.value)}
                        placeholder="Cancelation before hours"
                      />
                    </Div>
                    <span className="input-label col-1">Hrs</span>
                  </Grid>

                  <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Pause service before
                    </Typography>

                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="input-box col-12"
                        value={pauseServiceBefore}
                        onChange={(e) => setPauseServiceBefore(e.target.value)}
                        placeholder="Pause service before"
                      />
                    </Div>
                    <span className="input-label col-1">Days</span>
                  </Grid> */}


                  {/* <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Refund percentage
                    </Typography>

                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="input-box col-12"
                        value={refundPercentage}
                        onChange={(e) => setRefundPercentage(e.target.value)}
                        placeholder="Refund percentage" />
                    </Div>
                    <span className="input-label col-1">%</span>
                  </Grid> */}

                  <Grid xs={12} className="row">
                    <Div>
                      <Typography variant="h4" className="input-label">Terms and Condition</Typography>

                      <Div className="col-12">
                        <CKEditor
                          editor={ClassicEditor}
                          content={termsAndConditions}
                          data={termsAndConditions}
                          onChange={onChange}
                          disabled={!checkTermsConditions}
                        />
                      </Div>
                    </Div>
                  </Grid>

                </Grid>
              </Div>
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(357) && (
                <>
                  <ErpSaveUpdateButton name={"Save"} type={"submit"} />
                  <ErpCancelButton handleClick={() => {
                    setOpenBox(true)
                  }} />
                </>
              )}
            </Div>

          </form>
        </Div>


        {/* code for update a sales order preferance */}
        <Div sx={{ display: showUpdatePage === true ? "block" : "none" }}>
          <form onSubmit={handleUpdateSalesPreferance}>
            <Div className="row" sx={{ mt: 2 }}>
              <Typography variant="h4">
                Select the fields of the sales order to update in respective
                invoices
              </Typography>
              <br />

              <Div className="col-12 col-md-12 col-lg-6 col-xl-5">

                <Grid container>
                  <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkAddress}
                            onChange={(e) => {
                              setCheckAddress(e.target.checked);
                            }}
                          />
                        }
                        label="Address"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkCustomerNotes}
                            onChange={(e) => {
                              setCheckCustomerNotes(e.target.checked);
                            }}
                          />
                        }
                        label="Customer Notes"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={checkTermsConditions}
                            onChange={(e) => {
                              setCheckTermsConditions(e.target.checked);
                            }}
                          />
                        }
                        label="Terms & Conditions"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} className="row" sx={{ mt: 1 }}>

                    <Div sx={{ mt: 2 }}>
                      <Typography variant="h4">Customer Notes</Typography>
                      <TextField
                        className="multiline-box ms-1 col-12"
                        multiline
                        rows={6}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        InputProps={{
                          readOnly: checkCustomerNotes === true ? false : true,
                        }}
                        placeholder="Thank you for your business"
                        disabled={checkCustomerNotes === false ? true : false}
                        sx={{
                          cursor: checkCustomerNotes === false ? "no-drop" : "text",
                        }}
                      />
                    </Div>

                  </Grid>
                </Grid>
              </Div>

              {/* right side column */}
              <Div className="col-12 col-md-12 col-lg-6 col-xl-7" sx={{ pt: { lg: 2, xl: 1 } }}>
                <Grid container>
                  {/* <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Cancellation before hours
                    </Typography>
                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="col-12 input-box"
                        value={cancellationBeforeHours}
                        onChange={(e) => setCancellationBeforeHours(e.target.value)}
                        placeholder="Cancelation before hours"
                      />
                    </Div>
                    <span className="input-label col-1">Hrs</span>
                  </Grid>

                  <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Pause service before
                    </Typography>

                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="col-12 input-box"
                        value={pauseServiceBefore}
                        onChange={(e) => setPauseServiceBefore(e.target.value)}
                        placeholder="Pause service before"
                      />
                    </Div>
                    <span className="input-label col-1">Days</span>
                  </Grid> */}

                  {/* <Grid xs={12} className="row" sx={{ mt: 1 }}>
                    <Typography variant="h5" className="col-md-12 col-lg-8 col-xl-6 input-label">
                      Refund percentage
                    </Typography>

                    <Div className="col-11 col-md-11 col-lg-3 col-xl-5">
                      <TextField
                        className="col-12 input-box"
                        value={refundPercentage}
                        onChange={(e) => setRefundPercentage(e.target.value)}
                        placeholder="Refund percentage"
                      />
                    </Div>
                    <span className="input-label col-1">%</span>
                  </Grid> */}

                  <Grid xs={12} className="row">
                    <Div>
                      <Typography variant="h4" className="input-label">Terms and Condition</Typography>

                      <Div className="col-12">
                        <CKEditor
                          editor={ClassicEditor}
                          content={termsAndConditions}
                          data={termsAndConditions}
                          events={{
                            change: onChange,
                          }}
                          onChange={onChange}
                          disabled={!checkTermsConditions}
                        />
                      </Div>
                    </Div>
                  </Grid>
                </Grid>
              </Div>
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(358) && (
                <>
                  <ErpSaveUpdateButton name={"Update"} type={"submit"} />
                  <ErpCancelButton handleClick={() => {
                    setOpenBox(true)
                  }} />
                </>
              )}
            </Div>

          </form>
        </Div>

        <ErpConfirmDialogBox flag={openBox} setFlag={setOpenBox} handleClick={handleClick} content={"You have done some changes. Onclicking the cancel button changed data will not be saved."} />

        <ScrollToTop Scrollheight={180} />
      </JumboContentLayoutMain>
    </>
  );
};

export default SalesOrder;
