import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "../Setting";
import settingServices from "app/services/setting-api-services";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ScrollToTop from "app/pages/ScrollToTop";
import { ErpConfirmDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";
import { ErpCancelButton, ErpSaveUpdateButton } from "app/shared/ReuseComponents/ButtonComponent";

const SettingInventory = () => {
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

  const [id, setId] = useState(0);
  const [preferanceId, setPreferanceId] = useState(0);
  const [inventoryValution, setInventoryValution] = useState("FIFO");
  const [category, setCategory] = useState({
    categoryA: "",
    categoryB: "",
    categoryC: "",
  });
  const [expireDate, setExpireDate] = useState(false);
  const [approveAdjustment, setApproveAdjustment] = useState(false);
  const [notifycategoryA, setNotifycategoryA] = useState(false);

  const PartnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = () => {
    settingServices
      .getInventorySettings(companyId, header)
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
        setPreferanceId(res.Inventorypreference_Id);
        setInventoryValution(res.Inventorybasedon);
        setCategory({
          categoryA: res.Category1,
          categoryB: res.Category2,
          categoryC: res.Category3,
        });
        setExpireDate(res.Donotissue);
        setApproveAdjustment(res.Adjustment);
        setNotifycategoryA(res.Itemsused);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmitSave = (e) => {
    e.preventDefault();

    var payload = {
      Inventorybasedon: inventoryValution,
      Category1: category.categoryA,
      Category2: category.categoryB,
      Category3: category.categoryC,
      Donotissue: expireDate,
      Adjustment: approveAdjustment,
      Itemsused: notifycategoryA,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/InventorypreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.data.id) {
          toast.success("Successfully set a inventory preferance");
          if (res.data.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Inventory Matching Query Doesn't Exist.")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message)
      });
  };


  // this fun is going to use update the inventory preferance
  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    var payload = {
      id: id,
      Inventorypreference_Id: preferanceId,
      Inventorybasedon: inventoryValution,
      Category1: category.categoryA,
      Category2: category.categoryB,
      Category3: category.categoryC,
      Donotissue: expireDate,
      Adjustment: approveAdjustment,
      Itemsused: notifycategoryA,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/InventorypreferenceCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.data.id && res.status === 200) {
          toast.success("Successfully set a inventory preferance");
          if (res.data.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
          }
        } else {
          toast.error("Inventory Matching Query Doesn't Exist.")
        }
      })
      .catch((error) => {
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
          Inventory
        </Typography>

        <Div sx={{ display: showCreatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitSave}>
            <Grid container sx={{ mt: 2, ml: { md: 0, lg: 5 } }}>
              <Grid item xs={12} className="row">
                <Typography className="input-label col-md-6 col-lg-3 col-xl-3">
                  Inventory valution based on
                </Typography>
                <Div className="col-md-6 col-lg-3 col-xl-3">
                  <Select
                    className="col-12 input-select"
                    id="demo-customized-select-native"
                    name="inventoryValution"
                    value={inventoryValution}
                    onChange={(e) => {
                      setInventoryValution(e.target.value);
                    }}
                    defaultValue="FIFO"
                  >
                    <MenuItem value="FIFO">FIFO</MenuItem>
                    {/* <MenuItem value="FIFI">FIFI</MenuItem> */}
                    <MenuItem value="LIFO">LIFO</MenuItem>
                    <MenuItem value="WAR">WAR</MenuItem>
                  </Select>
                </Div>
              </Grid>

              {/* <Typography variant="h4" sx={{ mt: 2, ml: 1.5 }}>
                Value of ABC category items
              </Typography>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-3 col-lg-3 col-xl-2">
                  (A) Category
                </Typography>

                <Div className="col-md-6 col-lg-5 col-xl-4">
                  <TextField
                    className="col-12 input-box"
                    id="outlined-basic"
                    variant="outlined"
                    name="categoryA"
                    value={category.categoryA}
                    onChange={handleChangeCategory}
                    placeholder="Category A"
                    autoComplete="off"
                  />
                </Div>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-3 col-lg-3 col-xl-2">
                  (B) Category
                </Typography>
                <Div className="col-md-6 col-lg-5 col-xl-4">

                  <TextField
                    className="col-12 input-box"
                    id="outlined-basic"
                    variant="outlined"
                    name="categoryB"
                    value={category.categoryB}
                    onChange={handleChangeCategory}
                    placeholder="Category B"
                    autoComplete="off"
                  />
                </Div>
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-3 col-lg-3 col-xl-2">
                  (C) Category
                </Typography>
                <Div className="col-md-6 col-lg-5 col-xl-4">

                  <TextField
                    className="col-12 input-box"
                    name="categoryC"
                    value={category.categoryC}
                    onChange={handleChangeCategory}
                    placeholder="Category C"
                    autoComplete="off"
                    variant="outlined"
                  />
                </Div>
              </Grid> */}
            </Grid>

            <Div sx={{ mt: 1, ml: 6, minHeight: "300px" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={expireDate}
                      onChange={(e) => {
                        setExpireDate(e.target.checked);
                      }}
                    />
                  }
                  label="Do not issue if item date is expired"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={approveAdjustment}
                      onChange={(e) => {
                        setApproveAdjustment(e.target.checked);
                      }}
                    />
                  }
                  label="Inventory adjustment shall be approved"
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifycategoryA}
                      onChange={(e) => {
                        setNotifycategoryA(e.target.checked);
                      }}
                    />
                  }
                  label="Get Notified when A category items are issued"
                /> */}
              </FormGroup>
            </Div>

            {/* code for save and cancel button */}
            <Div className="buttons" sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(553) && (
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

        {/* this code for update a inventory preferance */}
        <Div sx={{ display: showUpdatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitUpdate}>
            <Grid container sx={{ mt: 2, ml: { md: 0, lg: 5 } }}>
              <Grid item xs={12} className="row">
                <Typography className="input-label col-3">
                  Inventory valution based on
                </Typography>
                <FormControl className="col-3">
                  <Select
                    className="input-select"
                    id="demo-customized-select-native"
                    name="inventoryValution"
                    value={inventoryValution}
                    onChange={(e) => {
                      setInventoryValution(e.target.value);
                    }}
                    defaultValue="FIFO"
                  >
                    <MenuItem value="FIFO">FIFO</MenuItem>
                    {/* <MenuItem value="FIFI">FIFI</MenuItem> */}
                    <MenuItem value="LIFO">LIFO</MenuItem>
                    <MenuItem value="WAR">WAR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* <Typography variant="h4" sx={{ mt: 2, ml: 1.5 }}>
                Value of ABC category items
              </Typography>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-2">
                  (A) Category
                </Typography>
                <TextField
                  className="col-md-4 input-box"
                  id="outlined-basic"
                  variant="outlined"
                  name="categoryA"
                  value={category.categoryA}
                  onChange={handleChangeCategory}
                  placeholder="Category Name"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-2">
                  (B) Category
                </Typography>
                <TextField
                  className="col-md-4 input-box"
                  id="outlined-basic"
                  variant="outlined"
                  name="categoryB"
                  value={category.categoryB}
                  onChange={handleChangeCategory}
                  placeholder="Category Name"
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} className="row" sx={{ mt: 1, ml: 3 }}>
                <Typography className="input-label col-md-2">
                  (C) Category
                </Typography>
                <TextField
                  className="col-md-4 input-box"
                  name="categoryC"
                  value={category.categoryC}
                  onChange={handleChangeCategory}
                  placeholder="Category Name"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid> */}


              <Div sx={{ mt: 1, ml: 6, minHeight: "300px" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={expireDate}
                        onChange={(e) => {
                          setExpireDate(e.target.checked);
                        }}
                      />
                    }
                    label="Do not issue if item date is expired"
                    sx={{ mt: 0, mb: -1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={approveAdjustment}
                        onChange={(e) => {
                          setApproveAdjustment(e.target.checked);
                        }}
                      />
                    }
                    label="Inventory adjustment shall be approved"
                    sx={{ mt: 0, mb: -1 }}
                  />
                  {/* <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifycategoryA}
                      onChange={(e) => {
                        setNotifycategoryA(e.target.checked);
                      }}
                    />
                  }
                  label="Get Notified when A category items are issued"
                /> */}
                </FormGroup>
              </Div>
            </Grid>

            <Div sx={{ mt: 5 }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(554) && (
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

export default SettingInventory;
