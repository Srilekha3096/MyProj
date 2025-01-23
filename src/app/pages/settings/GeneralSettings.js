import Div from "@jumbo/shared/Div";
import "./Setting.css";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  ButtonGroup
} from "@mui/material";
import React, { useState } from "react";
import Setting from "./Setting";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import { useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ScrollToTop from "../ScrollToTop";
import useResponsive from "app/pages/useResponsive";



const partners = [
  { name: "Ravindra Auto Spares & Services" },
  { name: "Kathir Auto Spares & Services" },
  { name: "Magesh Auto Spares & Services" },
  { name: "Dinesh Auto Spares & Services" },
];

const GeneralSettings = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);

  let isMobile = useResponsive("down", "md")

  const handleChange = (e) => {
    setCheck(e.target.checked);
  };

  const handleChange1 = (e) => {
    setCheck1(e.target.checked);
  };

  const handleChange2 = (e) => {
    setCheck2(e.target.checked);
  };

  const handleChange3 = (e) => {
    setCheck3(e.target.checked);
  };

  const handleChange4 = (e) => {
    setCheck4(e.target.checked);
  };

  const handleChange5 = (e) => {
    setCheck5(e.target.checked);
  };

  const handleChange6 = (e) => {
    setCheck6(e.target.checked);
  };

  const [openBox, setOpenBox] = useState(false);
  const [state, setState] = useState({
    openSave: false,
    openCancel: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSave } = state;

  const handleClickSave = (newState) => () => {
    setState({ openSave: true, ...newState });
  };

  const handleClickCancel = (newState) => () => {
    setState({ openCancel: true, ...newState });
    setOpenBox(true);
  };

  const handleClose = () => {
    setState({ ...state, openSave: false });
    setOpenBox(false);
  };

  return (
    <>
      {/* General settings code */}
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          General
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Select the modules you are going to enable for Business Unit
        </Typography>
        <Typography variant="h3" sx={{ pt: 2, fontWeight: 600 }}>
          Enable modules for Business Unit
        </Typography>

        <Grid container columns={12}>
          <Grid item xs={9} md={12} className="row" sx={{ mt: 1 }}>
            <Typography className="col-md-3 col-xl-2 input-label" sx={{ mt: 2 }}>
              Select a BU <span className="required">*</span>
            </Typography>
            <Div className="col-md-6 col-xl-4">
              <Autocomplete
                disablePortal
                className="search-select"
                getOptionLabel={(option) => option.name}
                options={partners}
                renderInput={(params) => (
                  <TextField {...params} placeholder="BU Name" />
                )}
              />
            </Div>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox name="Purchase" size="small" />}
                label={
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Purchase
                  </Typography>
                }
                checked={check}
                onChange={handleChange}
                sx={{ mb: -1 }}
              />
              <FormGroup sx={{ ml: 2 }}>
                <FormControlLabel
                  control={<Checkbox name="Purchase Request" size="small" />}
                  label="Purchase Request"
                  checked={check === true && "check1"}
                  onChange={handleChange1}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Purchase Order" size="small" />}
                  label="Purchase Order"
                  checked={check2}
                  onChange={handleChange2}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Pending PRs" size="small" />}
                  label="Pending PRs"
                  checked={check3}
                  onChange={handleChange3}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="RFQ" size="small" />}
                  label="RFQ"
                  checked={check4}
                  onChange={handleChange4}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Supplier Quotation" size="small" />}
                  label="Supplier Quotation"
                  checked={check5}
                  onChange={handleChange5}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Price Comparison" size="small" />}
                  label="Price Comparison"
                  checked={check6}
                  onChange={handleChange6}
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="PO Amendent" size="small" />}
                  label="PO Amendent"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="PO Cancellation" size="small" />}
                  label="PO Cancellation"
                  sx={{ mb: -1 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox name="Inventory" size="small" />}
                label=
                {
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Inventory
                  </Typography>
                }
                sx={{ mb: -1 }}
              />
              <FormGroup sx={{ ml: 2 }}>
                <FormControlLabel
                  control={<Checkbox name="Inventory Item" size="small" />}
                  label="Inventory Item"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Goods Receipt" size="small" />}
                  label="Goods Receipt"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Stores Adjustment" size="small" />}
                  label="Stores Adjustment"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Material Request" size="small" />}
                  label="Material Request"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Material Returns" size="small" />}
                  label="Material Returns"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Material Transfer" size="small" />}
                  label="Material Transfer"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Material Issue" size="small" />}
                  label="Material Issue"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Item Group" size="small" />}
                  label="Item Group"
                  sx={{ mb: -1 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox name="Finance" size="small" />}
                label=
                {
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Finance
                  </Typography>
                }
                sx={{ mb: -1 }}
              />
              <FormGroup sx={{ ml: 2 }}>
                <FormControlLabel
                  control={<Checkbox name="Account" size="small" />}
                  label="Account"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Journals" size="small" />}
                  label="Journals"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Voucher" size="small" />}
                  label="Voucher"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Contra Voucher" size="small" />}
                  label="Contra Voucher"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Opening Balance" size="small" />}
                  label="Opening Balance"
                  sx={{ mb: -1 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox name="Service" size="small" />}
                label=
                {
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Service
                  </Typography>
                }
                sx={{ mb: -1 }}
              />
              <FormGroup sx={{ ml: 2 }}>
                <FormControlLabel
                  control={<Checkbox name="Service Category" size="small" />}
                  label="Service Category"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Services" size="small" />}
                  label="Services"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Plan" size="small" />}
                  label="Plan"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Subscription" size="small" />}
                  label="Subscription"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Slots" size="small" />}
                  label="Slots"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Employee Allocation" size="small" />}
                  label="Employee Allocation"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Job Allocation" size="small" />}
                  label="Job Allocation"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Job Timecard" size="small" />}
                  label="Job Timecard"
                  sx={{ mb: -1 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={<Checkbox name="Budget" size="small" />}
                label={
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Budget
                  </Typography>
                }
                sx={{ mb: -1, fontWeight: 600 }}
              />
              <FormGroup sx={{ ml: 2 }}>
                <FormControlLabel
                  control={<Checkbox name="Create Budget" size="small" />}
                  label="Create Budget"
                  sx={{ mb: -1 }}
                />
                <FormControlLabel
                  control={<Checkbox name="Budget Heads" size="small" />}
                  label="Budget Heads"
                  sx={{ mb: -1 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        {/* 
        <Div sx={{ mt: 5 }}>


          <ButtonGroup
            aria-label="split button"
            // onClick={handleClickOpen}
            sx={{
              mr: 3,
            }}
          >
            <Button type="submit" className="plus-button" sx={{ width: "99px" }} onClick={handleClickSave({
              vertical: "top",
              horizontal: "right",
            })}>
              Save
            </Button>
            <Button variant="contained" className="icon-button" sx={{ p: 1 }}>
              <FaSave size={18} />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="split button" onClick={handleClickCancel({
            vertical: "top",
            horizontal: "right",
          })}>
            <Button className="plus-button" sx={{ width: "99px" }}>Cancel</Button>
            <Button variant="contained" className="icon-button" sx={{ p: 1 }}>
              <TiCancel size={24} />
            </Button>
          </ButtonGroup>
        </Div> */}

        <Div className="buttons" sx={{ mt: 3 }}>
          <ButtonGroup
            aria-label="split button"
            type="submit"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
          >
            <Button type="submit" className="plus-button" sx={{ width: "99px" }} onClick={handleClickSave({
              vertical: "top",
              horizontal: "right",
            })}>
              Save
            </Button>
            <Button variant="contained" className="icon-button">
              <FaSave size={18} />
            </Button>
          </ButtonGroup>

          <ButtonGroup aria-label="split button"
            sx={{
              mt: { xs: 0.5, lg: 0 },
              mr: { xs: 0, md: 1 }
            }}
            onClick={handleClickCancel({
              vertical: "top",
              horizontal: "right",
            })}>
            <Button className="plus-button" sx={{ width: "99px" }}>Cancel</Button>
            <Button variant="contained" className="icon-button">
              <TiCancel size={20} />
            </Button>
          </ButtonGroup>
        </Div>

        <Div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSave}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert severity="success" sx={{ mt: 5.5, pr: 15 }}>
              Saved Successfully
            </Alert>
          </Snackbar>
          <Dialog

            open={openBox}
            maxWidth={window.innerWidth <= 600 ? 'xs' : window.innerWidth <= 768 ? 'sm' : window.innerWidth <= 992 ? 'md' : 'md'}
            fullWidth
          >
            <form>
              <DialogContent>
                <Typography variant="h3">
                  You have done some changes. Onclicking the cancel button changed
                  data will not be saved. Still you want to cancel the changes?
                </Typography>
              </DialogContent>
              <DialogActions>
                {isMobile ? (
                  <>
                    <Button
                      onClick={handleClose}
                      color={"error"}
                      variant="contained"
                    >
                      Yes
                    </Button>

                    <Button onClick={handleClose} variant="contained" >
                      No
                    </Button>
                  </>
                ) :
                  <Div className="buttons" sx={{ mt: 5 }}>
                    <Button
                      onClick={handleClose}
                      className="save-button"
                      autoFocus
                      sx={{
                        mr: 3,
                      }}
                    >
                      Yes
                    </Button>

                    <Button onClick={handleClose} className="cancel-button">
                      No
                    </Button>
                  </Div>
                }
              </DialogActions>

            </form>
          </Dialog>
        </Div>
        <ScrollToTop Scrollheight={180} />
      </JumboContentLayoutMain>
    </>
  );
};

export default GeneralSettings;
