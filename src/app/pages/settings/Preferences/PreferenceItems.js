import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Setting from "../Setting";
import settingServices from "app/services/setting-api-services";
import ScrollToTop from "app/pages/ScrollToTop";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { ErpCancelButton, ErpDateField, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";

const PreferenceItems = () => {
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


  const [createPage, setCreatePage] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const [userId, setUserId] = useState(0);

  const [id, setId] = useState("");
  const [itemId, setItemId] = useState("");
  const [decimalRate, setDecimalRate] = useState(1);
  const [hsnCode, setHsnCode] = useState(false);
  const [inventoryTracking, setInventoryTracking] = useState(false);
  const [inventoryStartDate, setInventoryStartDate] = useState("");
  const [preventStock, setPreventStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [nodify, setNotify] = useState(false);
  const [toMail, setToMail] = useState("");
  const [openBox, setOpenBox] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const PartnerId = localStorage.getItem("PartnerId");
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = () => {
    settingServices
      .getItemSettings(companyId, header)
      .then((res) => {
        console.log(res);
        setCurrentItems(res);
        var Id = res?.Created_By;
        setUserId(Id);
        if (Id === 0) {
          setCreatePage(true);
          setUpdatePage(false);
        } else {
          setCreatePage(false);
          setUpdatePage(true);
        }
        setId(res?.id);
        setItemId(res?.Itempreference_Id);
        setDecimalRate(res?.rate_for_item);
        setInventoryStartDate(res?.Inventry_startdate);
        setToMail(res?.Notifyto);
        setHsnCode(res?.HSN_codeOrSAC_code);
        setInventoryTracking(res?.Inventry_Tracking);
        setPreventStock(res?.Stock_belowzero);
        setOutOfStock(res?.Out_Of_stock);
        setNotify(res?.Re_order_point);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSaveItems = (e) => {
    e.preventDefault();

    var payload = {
      rate_for_item: decimalRate,
      HSN_codeOrSAC_code: hsnCode,
      Inventry_Tracking: inventoryTracking,
      Inventry_startdate: inventoryStartDate,
      Stock_belowzero: preventStock,
      Out_Of_stock: outOfStock,
      Re_order_point: nodify,
      Notifyto: toMail,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/ItempreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res.data);
        if (res.status === 201 && res.data.id) {
          toast.success("Successfully set a item preferance");
          if (res.data.id === 0) {
            setUpdatePage(false);
            setCreatePage(true);
          } else {
            setCreatePage(false);
            setUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Item Matching Query Doesn't Exist.")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };


  // code for update the preferance inventory items
  const handleUpdateItems = (e) => {
    e.preventDefault();
    var payload = {
      id: id,
      Itempreference_Id: itemId,
      rate_for_item: decimalRate,
      HSN_codeOrSAC_code: hsnCode,
      Inventry_Tracking: inventoryTracking,
      Inventry_startdate: inventoryStartDate,
      Stock_belowzero: preventStock,
      Out_Of_stock: outOfStock,
      Re_order_point: nodify,
      Notifyto: toMail,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/ItempreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 && res.data.id) {
          toast.success("Successfully update a item preferance");
        } else {
          toast.error("Item Matching Query Doesn't Exist.")
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
          Items
        </Typography>

        <Div sx={{ display: createPage === true ? "block" : "none" }}>
          <form onSubmit={handleSaveItems}>
            <Div className="mb-3 mt-2 row">
              <Typography
                variant="h4"
                sx={{ pt: 1, pl: { md: 1, lg: 7 } }}
                className="col-sm-6 col-md-12 col-lg-6 col-xl-3"
              >
                Decimal rate for item quantity
              </Typography>
              <Div className="col-sm-6 col-md-12 col-lg-6 col-xl-3">
                <TextField
                  type="text"
                  className="input-box col-12"
                  placeholder="Set a decimal rate"
                  name="decimalRate"
                  value={decimalRate}
                  onChange={(e) => {
                    setDecimalRate(e.target.value);
                  }}
                  autoComplete="off"
                />
              </Div>
            </Div>

            <Div sx={{ mt: -2, pl: { xs: 1, md: 5.5 } }}>
              <Typography className="input-label">HSN or SAC code</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={hsnCode}
                    onChange={(e) => {
                      setHsnCode(e.target.checked);
                    }}
                  />
                }
                label="Enable HSN Code or SAC Field"
                sx={{ ml: 3, mt: -1 }}
              />
            </Div>

            <Div sx={{ mt: -1, pl: { xs: 1, md: 5.5 } }}>
              <Typography className="input-label">Inventory</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={inventoryTracking}
                    onChange={(e) => {
                      setInventoryTracking(e.target.checked);
                    }}
                  />
                }
                label=" Enable Inventory tracking"
                sx={{ ml: 3, mt: -1 }}
              />
            </Div>

            <Div className="row">
              <Typography
                variant="h4"
                sx={{ pl: { xs: 2, md: 7 } }}
                className="col-12 col-md-5 col-lg-4 col-xl-3"
              >
                Inventory Start Date
              </Typography>
              <Div className="col-12 col-md-5 col-lg-5 col-xl-3">
                <ErpDateField
                  id="inventoryStartDate"
                  name="inventoryStartDate"
                  inputValue={inventoryStartDate}
                  handleInputChange={(e) => setInventoryStartDate(e.target.value)}
                  variant="outlined"
                />
              </Div>
            </Div>

            <FormGroup sx={{ pl: 5.5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={preventStock}
                    onChange={(e) => {
                      setPreventStock(e.target.checked);
                    }}
                  />
                }
                label=" Prevent Stock from going  below zero"
                sx={{ mt: -1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={outOfStock}
                    onChange={(e) => {
                      setOutOfStock(e.target.checked);
                    }}
                  />
                }
                label=" Show an out-of-stock warning when item stock  drops  below zero"
                sx={{ mt: -1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={nodify}
                    onChange={(e) => {
                      setNotify(e.target.checked);
                    }}
                  />
                }
                label="Notify me when an item reaches the re-order point"
                sx={{ mt: -1 }}
              />
            </FormGroup>

            <Div className="row">
              <Typography
                variant="h4"
                sx={{ pt: 1, pl: { xs: 2, md: 7 } }}
                className="col-12 col-md-5 col-lg-4 col-xl-3"
              >
                Notify to <span class="required">*</span>
              </Typography>
              <Div className="col-12 col-md-5 col-lg-5 col-xl-3">
                <TextField
                  type="text"
                  className="input-box col-12"
                  placeholder="example@gmail.com"
                  name="toMail"
                  value={toMail}
                  onChange={(e) => {
                    setToMail(e.target.value);
                  }}
                  autoComplete="off"
                />
              </Div>
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(533) && (
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

        <Div sx={{ display: updatePage === true ? "block" : "none" }}>
          <form onSubmit={handleUpdateItems}>
            <Div className="mb-3 mt-2 row">
              <Typography
                variant="h4"
                sx={{ pt: 1, pl: { md: 1, lg: 7 } }}
                className="col-sm-6 col-md-12 col-lg-6 col-xl-3"
              >
                Decimal rate for item quantity
              </Typography>
              <Div className="col-sm-6 col-md-12 col-lg-6 col-xl-3">
                <TextField
                  type="text"
                  className="input-box col-12"
                  placeholder="Set a decimal rate"
                  name="decimalRate"
                  value={decimalRate}
                  onChange={(e) => {
                    setDecimalRate(e.target.value);
                  }}
                  autoComplete="off"
                />
              </Div>
            </Div>

            <Div sx={{ mt: -2, pl: { xs: 1, md: 5.5 } }}>
              <Typography className="input-label">HSN or SAC code</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={hsnCode}
                    onChange={(e) => {
                      setHsnCode(e.target.checked);
                    }}
                  />
                }
                label="Enable HSN Code or SAC Field"
                sx={{ ml: 3, mt: -1 }}
              />
            </Div>

            <Div sx={{ mt: -1, pl: { xs: 1, md: 5.5 } }}>
              <Typography className="input-label">Inventory</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={inventoryTracking}
                    onChange={(e) => {
                      setInventoryTracking(e.target.checked);
                    }}
                  />
                }
                label=" Enable Inventory tracking"
                sx={{ ml: 3, mt: -1 }}
              />
            </Div>

            <Div className="row mt-1">
              <Typography
                variant="h4"
                sx={{ pl: { xs: 2, md: 7 } }}
                className="col-12 col-md-5 col-lg-4 col-xl-3"
              >
                Inventory Start Date
              </Typography>
              <Div className="col-12 col-md-5 col-lg-5 col-xl-3">
                <ErpDateField
                  id="inventoryStartDate"
                  name="inventoryStartDate"
                  inputValue={inventoryStartDate}
                  handleInputChange={(e) => setInventoryStartDate(e.target.value)}
                  variant="outlined"
                />
              </Div>
            </Div>

            <FormGroup sx={{ pl: 5.5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={preventStock}
                    onChange={(e) => {
                      setPreventStock(e.target.checked);
                    }}
                  />
                }
                label=" Prevent Stock from going  below zero"
                sx={{ mt: -1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={outOfStock}
                    onChange={(e) => {
                      setOutOfStock(e.target.checked);
                    }}
                  />
                }
                label=" Show an out-of-stock warning when item stock  drops  below zero"
                sx={{ mt: -1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={nodify}
                    onChange={(e) => {
                      setNotify(e.target.checked);
                    }}
                  />
                }
                label="Notify me when an item reaches the re-order point"
                sx={{ mt: -1 }}
              />
            </FormGroup>

            <Div className="row">
              <Typography
                variant="h4"
                sx={{ pt: 1, pl: { xs: 2, md: 7 } }}
                className="col-12 col-md-5 col-lg-4 col-xl-3"
              >
                Notify to <span class="required">*</span>
              </Typography>
              <Div className="col-12 col-md-5 col-lg-5 col-xl-3">
                <TextField
                  type="text"
                  className="input-box col-12"
                  placeholder="example@gmail.com"
                  name="toMail"
                  value={toMail}
                  onChange={(e) => setToMail(e.target.value)}
                  autoComplete="off"
                />
              </Div>
            </Div>

            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(534) && (
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

export default PreferenceItems;
