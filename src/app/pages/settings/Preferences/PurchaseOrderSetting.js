import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "../Setting";
import settingServices from "app/services/setting-api-services";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import ScrollToTop from "app/pages/ScrollToTop";
// import { CKEditor } from "ckeditor4-react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { useDispatch, useSelector } from "react-redux";



const PurchaseOrderSetting = () => {
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
  const [purchasePreferenceId, setPurchasePreferenceId] = useState("");
  const [checkPOSchedule, setCheckPOSchedule] = useState(false);
  const [checkGoodsReceived, setCheckGoodsReceived] = useState(false);
  const [checkStockQuantity, setCheckStockQuantity] = useState(false);
  const [checkPRQuantity, setCheckPRQuantity] = useState(false);
  const [notifySupplier, setNotifySupplier] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");

  const partnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));


  const editorConfig = {
    toolbar: 'Basic',
    removeButtons: 'Cut,Copy,Paste',
  };

  const onChange = (evt, editor) => {
    var newContent = editor?.getData();
    // var temporaryDiv = document.createElement("div");
    // temporaryDiv.innerHTML = newContent;
    // var textContent = temporaryDiv.innerText || temporaryDiv.textContent;
    // console.log("textContent", textContent);
    setTermsAndCondition(newContent);
  };

  const getUser = () => {
    settingServices
      .getPurchaseOrderSettings(companyId, header)
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
        setPurchasePreferenceId(res?.Purchasepreference_Id);
        setCheckPOSchedule(res?.PO_schedule);
        setCheckGoodsReceived(res?.Goods_received);
        setCheckStockQuantity(res?.Stock_quantity);
        setCheckPRQuantity(res?.PR_quantity);
        setNotifySupplier(res?.Bill_overdue);
        setTermsAndCondition(res?.Termsandcondition);
        setNotifyEmail(res?.Notifyto);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmitPurchaseOrderPreferance = (e) => {
    e.preventDefault();
    if (!notifyEmail) {
      toast.error("Please Enter the Email Id")
    }
    var payload = {
      PO_schedule: checkPOSchedule,
      Goods_received: checkGoodsReceived,
      Stock_quantity: checkStockQuantity,
      PR_quantity: checkPRQuantity,
      Bill_overdue: notifySupplier,
      Termsandcondition: termsAndCondition,
      Notifyto: notifyEmail,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/PurchasepreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.data.id) {
          toast.success("Created Successfully");
          if (res.data.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Purchase Matching Query Doesn't Exist.")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };


  const handleUpdatePurchaseOrderPreferance = (e) => {
    e.preventDefault();
    var payload = {
      id: id,
      Purchasepreference_Id: purchasePreferenceId,
      PO_schedule: checkPOSchedule,
      Goods_received: checkGoodsReceived,
      Stock_quantity: checkStockQuantity,
      PR_quantity: checkPRQuantity,
      Bill_overdue: notifySupplier,
      Termsandcondition: termsAndCondition,
      Notifyto: notifyEmail,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/PurchasepreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.data.id && res.status === 200) {
          toast.success("Updated Successfully");
        } else {
          toast.error("Purchase Matching Query Doesn't Exist.")
        }
      })
      .catch((error) => {
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
          Purchase Order
        </Typography>

        <Div sx={{ display: showCreatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitPurchaseOrderPreferance}>
            <Div sx={{ mt: 1, ml: 5 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPOSchedule}
                      onChange={(e) => {
                        setCheckPOSchedule(e.target.checked);
                      }}
                    />
                  }
                  label="Notify me when the PO schedule is due before 3 days"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkGoodsReceived}
                      onChange={(e) => {
                        setCheckGoodsReceived(e.target.checked);
                      }}
                    />
                  }
                  label="Notify me when the goods received at store against the PO"
                />
              </FormGroup>
              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Purchase requisition</Typography>
                <FormGroup >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkStockQuantity}
                        onChange={(e) => {
                          setCheckStockQuantity(e.target.checked);
                        }}
                      />
                    }
                    label="Show Item Stock quantity against the required quantity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkPRQuantity}
                        onChange={(e) => {
                          setCheckPRQuantity(e.target.checked);
                        }}
                      />
                    }
                    label="Show pending PR quantity during PO"
                  />
                </FormGroup>
              </Div>
              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Payments</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={notifySupplier}
                        onChange={(e) => {
                          setNotifySupplier(e.target.checked);
                        }}
                      />
                    }
                    label="Get Notified when supplier bill is overdue"
                    sx={{ mt: 0 }}
                  />
                </FormGroup>
              </Div>
              <Div className="row mt-2">
                <Typography for="staticEmail" className="input-label col-12 col-md-5 col-lg-2 col-xl-2">
                  Email Id <span class="required">*</span>
                </Typography>
                <Div className="col-12 col-md-7 col-lg-5 col-xl-5">
                  <TextField
                    type="text"
                    className="input-box col-12"
                    id="staticEmail"
                    placeholder="Enter Email Id"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    required
                  />
                </Div>
              </Div>
              <Div className="row mt-2">
                <Typography className="input-label col-12 col-md-5 col-lg-2 col-xl-2">
                  Terms and Condition
                </Typography>
                <Div className="col-12 col-md-7 col-lg-7 col-xl-7">
                  {/* <TextField
                    type="text"
                    className="multiline-box col-12"
                    multiline
                    rows={4}
                    placeholder="Enter the terms and condition"
                    value={termsAndCondition}
                    onChange={(e) => setTermsAndCondition(e.target.value)}
                  /> */}
                  <CKEditor
                    editor={ClassicEditor}
                    content={termsAndCondition}
                    data={termsAndCondition}
                    events={{
                      change: onChange,
                    }}
                    onChange={onChange}
                  />
                </Div>
              </Div>

            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(397) && (
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

        {/* code for update the preferance purchase order */}
        <Div sx={{ display: showUpdatePage === true ? "block" : "none" }}>
          <form onSubmit={handleUpdatePurchaseOrderPreferance}>
            <Div sx={{ mt: 1, ml: 5 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPOSchedule}
                      onChange={(e) => {
                        setCheckPOSchedule(e.target.checked);
                      }}
                    />
                  }
                  label="Notify me when the PO schedule is due before 3 days"
                  sx={{ mt: 0, mb: -1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkGoodsReceived}
                      onChange={(e) => {
                        setCheckGoodsReceived(e.target.checked);
                      }}
                    />
                  }
                  label="Notify me when the goods received at store against the PO"
                />
              </FormGroup>
              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Purchase requisition</Typography>
                <FormGroup sx={{ mt: -0.5 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkStockQuantity}
                        onChange={(e) => {
                          setCheckStockQuantity(e.target.checked);
                        }}
                      />
                    }
                    label="Show Item Stock quantity against the required quantity"
                    sx={{ mt: 0, mb: -1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkPRQuantity}
                        onChange={(e) => {
                          setCheckPRQuantity(e.target.checked);
                        }}
                      />
                    }
                    label="Show pending PR quantity during PO"
                  />
                </FormGroup>
              </Div>
              <Div sx={{ mt: 1 }}>
                <Typography variant="h4">Payments</Typography>
                <FormGroup sx={{ mt: -0.5 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={notifySupplier}
                        onChange={(e) => {
                          setNotifySupplier(e.target.checked);
                        }}
                      />
                    }
                    label="Get Notified when supplier bill is overdue"
                    sx={{ mt: 0 }}
                  />
                </FormGroup>
              </Div>
              <Div className="row mt-2">
                <Typography for="staticEmail" className="input-label col-2">
                  Email Id :
                </Typography>
                <Div className="col-5">
                  <TextField
                    type="text"
                    className="input-box col-10"
                    id="staticEmail"
                    placeholder="Enter Email Id"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                  />
                </Div>
              </Div>
              <Div className="row mt-2">
                <Typography className="input-label col-2">
                  Terms and Condition
                </Typography>
                <Div className="col-7">
                  {/* <TextField
                    type="text"
                    className="multiline-box col-10"
                    multiline
                    rows={4}
                    placeholder="Enter the terms and condition"
                    value={termsAndCondition}
                    onChange={(e) => setTermsAndCondition(e.target.value)}
                  /> */}
                  <CKEditor
                    editor={ClassicEditor}
                    content={termsAndCondition}
                    data={termsAndCondition}
                    events={{
                      change: onChange,
                    }}
                    onChange={onChange}
                  />
                </Div>
              </Div>

            </Div>

            <Div sx={{ mt: 10 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(398) && (
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

export default PurchaseOrderSetting;
