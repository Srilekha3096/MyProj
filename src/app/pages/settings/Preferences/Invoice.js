import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "../Setting";
import { toast } from "react-toastify";
import settingServices from "app/services/setting-api-services";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ScrollToTop from "app/pages/ScrollToTop";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";

const Invoice = () => {
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
  const [invoiceId, setInvoiceId] = useState("");
  const [checkPrimaryContact, setCheckPrimaryContact] = useState(false);
  const [checkSendInvoice, setCheckSendInvoice] = useState(false);
  const [checkOrderNo, setCheckOrderNo] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [checkPayments, setCheckPayments] = useState(false);
  const [checkPaymentReceipt, setCheckPaymentReceipt] = useState(false);

  const PartnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = () => {
    settingServices
      .getInvoiceSettings(companyId, header)
      .then((res) => {
        console.log(res);
        var Id = res.Created_By;
        if (Id === 0) {
          setShowCreatePage(true);
          setShowUpdatePage(false);
        } else {
          setShowCreatePage(false);
          setShowUpdatePage(true);
        }
        setId(res.id);
        setInvoiceId(res.Invoicepreference_Id);
        setCheckPrimaryContact(res.Show_Primary);
        setCheckSendInvoice(res.Allow_Editing);
        setCheckOrderNo(res.usesaleorder);
        setNotifyEmail(res.Email);
        setCheckPayments(res.Getnotify);
        setCheckPaymentReceipt(res.Payreceipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmitInvoicePreferance = (e) => {
    e.preventDefault();
    var payload = {
      Show_Primary: checkPrimaryContact,
      Allow_Editing: checkSendInvoice,
      Email: notifyEmail,
      usesaleorder: checkOrderNo,
      Getnotify: checkPayments,
      Payreceipt: checkPaymentReceipt,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/InvoicepreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201 && res.data.id) {
          toast.success("Preferance invoice set Successfully");
          if (res.data.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Invoice Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };


  // this fun is going to use for update a preferance invoice
  const handleUpdateInvoicePreferance = (e) => {
    e.preventDefault();
    var payload = {
      id: id,
      Invoicepreference_Id: invoiceId,
      Show_Primary: checkPrimaryContact,
      Allow_Editing: checkSendInvoice,
      Email: notifyEmail,
      usesaleorder: checkOrderNo,
      Getnotify: checkPayments,
      Payreceipt: checkPaymentReceipt,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/InvoicepreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log("res", res);
        if (res.data.id && res.status === 200) {
          toast.success("Updated Successfully");
        } else {
          toast.error("Invoice Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
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
          Invoice
        </Typography>

        <Div sx={{ display: showCreatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitInvoicePreferance}>
            <Div sx={{ ml: 5 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPrimaryContact}
                      onChange={(e) => {
                        setCheckPrimaryContact(e.target.checked);
                      }}
                    />
                  }
                  label="Show primary contact name in 'Remit to' section in mail"
                  sx={{ mt: 0, mb: -1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkSendInvoice}
                      onChange={(e) => {
                        setCheckSendInvoice(e.target.checked);
                      }}
                    />
                  }
                  label="Allow editing in sent Invoice"
                />
              </FormGroup>

              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Invoice Order No</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Use sales order no"
                    name="Order No"
                    value="Order No"
                    checked={checkOrderNo === "Order No"}
                    onChange={(e) => setCheckOrderNo(e.target.value)}
                    sx={{ mt: -0.5, mb: -1 }}
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Use sales order reference no"
                    name="Reference No"
                    value="Reference No"
                    checked={checkOrderNo === "Reference No"}
                    onChange={(e) => setCheckOrderNo(e.target.value)}
                  />
                </FormGroup>
              </Div>

              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Payments</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPayments}
                      onChange={(e) => {
                        setCheckPayments(e.target.checked);
                      }}
                    />
                  }
                  label="Get Notified when customer pays online"
                  sx={{ mt: -0.5 }}
                />
              </Div>
              <Div className="row mt-1 mb-1">
                <Typography for="staticEmail" className="input-label col-4 col-md-3 col-lg-2 col-xl-2">
                  Email Id :
                </Typography>
                <Div className="col-6 col-md-6 col-lg-4 col-xl-3">
                  <TextField
                    type="text"
                    className="input-box col-12"
                    id="staticEmail"
                    placeholder="Enter Email Id"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    autoComplete="off"
                    variant="outlined"
                  />
                </Div>
              </Div>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={checkPaymentReceipt}
                    onChange={(e) => {
                      setCheckPaymentReceipt(e.target.checked);
                    }}
                  />
                }
                label="Do you want to include the payment receipt along with your Thank you note"
              />
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(545) && (
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

        {/* this code for update a preferance invoice */}
        <Div sx={{ display: showUpdatePage === true ? "block" : "none" }}>
          <form onSubmit={handleUpdateInvoicePreferance}>
            <Div sx={{ ml: 5 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPrimaryContact}
                      onChange={(e) => {
                        setCheckPrimaryContact(e.target.checked);
                      }}
                    />
                  }
                  label="Show primary contact name in 'Remit to' section in mail"
                  sx={{ mt: 0, mb: -1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkSendInvoice}
                      onChange={(e) => {
                        setCheckSendInvoice(e.target.checked);
                      }}
                    />
                  }
                  label="Allow editing in sent Invoice"
                />
              </FormGroup>

              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Invoice Order No</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Use sales order no"
                    name="Order No"
                    value="Order No"
                    checked={checkOrderNo === "Order No"}
                    onChange={(e) => setCheckOrderNo(e.target.value)}
                    sx={{ mt: -0.5, mb: -1 }}
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Use sales order reference no"
                    name="Reference No"
                    value="Reference No"
                    checked={checkOrderNo === "Reference No"}
                    onChange={(e) => setCheckOrderNo(e.target.value)}
                  />
                </FormGroup>
              </Div>

              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Payments</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPayments}
                      onChange={(e) => {
                        setCheckPayments(e.target.checked);
                      }}
                    />
                  }
                  label="Get Notified when customer pays online"
                  sx={{ mt: -0.5 }}
                />
              </Div>
              <Div className="row mt-1 mb-1">
                <Typography for="staticEmail" className="input-label col-4 col-md-3 col-lg-2 col-xl-2">
                  Email Id :
                </Typography>
                <Div className="col-6 col-md-6 col-lg-4 col-xl-3">
                  <TextField
                    type="text"
                    className="input-box col-12"
                    id="staticEmail"
                    placeholder="Enter Email Id"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    autoComplete="off"
                    variant="outlined"
                  />
                </Div>
              </Div>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={checkPaymentReceipt}
                    onChange={(e) => {
                      setCheckPaymentReceipt(e.target.checked);
                    }}
                  />
                }
                label="Do you want to include the payment receipt along with your Thank you note"
              />
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(546) && (
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

export default Invoice;
