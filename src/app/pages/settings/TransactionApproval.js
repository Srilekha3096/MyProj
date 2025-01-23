import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import Div from "@jumbo/shared/Div";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Setting from "./Setting";
import settingServices from "app/services/setting-api-services";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import { toast } from "react-toastify";
import { TiCancel } from "react-icons/ti";
import { FaSave } from "react-icons/fa";
import ScrollToTop from "../ScrollToTop";

const TransactionApproval = () => {
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

  const [id, setId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [checkSalesTransaction, setCheckSalesTransaction] = useState(false);
  const [checkPurchaseTransaction, setCheckPurchaseTransaction] = useState(false);
  const [notifyForApproval, setNotifyForApproval] = useState(false);
  const [notifyTo, setNotifyTo] = useState("");
  const [notifySubmitter, setNotifySubmitter] = useState(false);

  const PartnerId = parseInt(localStorage.getItem("PartnerId"));
  const companyId = parseInt(localStorage.getItem("OrganizationId"));

  const getUser = () => {
    try {
      settingServices
        .transactionApproval(companyId, header)
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
          setTransactionId(res.Transactionapprovalpreference_Id);
          setCheckSalesTransaction(res.Sales);
          setCheckPurchaseTransaction(res.Purchase);
          setNotifyTo(res.Toallsepecific);
          setNotifySubmitter(res.Notify);
          setNotifyForApproval(res.Approved);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [PartnerId]);

  const handleSubmitTransactionApproval = (e) => {
    e.preventDefault();
    var payload = {
      Notify: notifySubmitter,
      Purchase: checkPurchaseTransaction,
      Sales: checkSalesTransaction,
      Approved: notifyForApproval,
      Toallsepecific: notifyTo,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .post(`${BASE_URL}/Erpapp/TransactionapprovalCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.data.id) {
          toast.success("Created successfully");
          if (res.data.id === 0) {
            setShowUpdatePage(false);
            setShowCreatePage(true);
          } else {
            setShowCreatePage(false);
            setShowUpdatePage(true);
            getUser();
          }
        } else {
          toast.error("Transaction Approval Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        toast.error(error.message);
      });
  };

  const handleClickCancel = () => {
    setCheckSalesTransaction(false);
    setCheckPurchaseTransaction(false);
    setNotifyForApproval(false);
    setNotifyTo("");
    setNotifySubmitter(false);
  };

  // code for update the transaction approval
  const handleUpdateTransactionApproval = (e) => {
    e.preventDefault();
    var payload = {
      id: id,
      Transactionapprovalpreference_Id: transactionId,
      Notify: notifySubmitter,
      Purchase: checkPurchaseTransaction,
      Sales: checkSalesTransaction,
      Approved: notifyForApproval,
      Toallsepecific: notifyTo,
      Partner_Id: parseInt(localStorage.getItem("PartnerId")),
      Company_Id: parseInt(localStorage.getItem("OrganizationId")),
      Created_By: parseInt(localStorage.getItem("UserId")),
      Updated_By: parseInt(localStorage.getItem("UserId")),
    };
    axios
      .put(`${BASE_URL}/Erpapp/TransactionapprovalCRUD/`, payload, header)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.id) {
          toast.success("Updated Successfully");
        } else {
          toast.error("Transaction Approval Matching Query Doesn't Exist.")
        }
      }).catch((error) => {
        toast.error(error.message);
      });
  };

  const handleUpdateCancel = () => {
    setCheckSalesTransaction(checkSalesTransaction);
    setCheckPurchaseTransaction(checkPurchaseTransaction);
    setNotifyForApproval(notifyForApproval);
    setNotifyTo(notifyTo);
    setNotifySubmitter(notifySubmitter);
  };

  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          {/* Transaction Approvals */}
          Transaction Approval Notification
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Sales and Purchase transactions like Invoices, Purchase requisitions,
          Bill Payments etc are to be performed only on approvals
        </Typography>

        <Div sx={{ display: showCreatePage === true ? "block" : "none" }}>
          <form onSubmit={handleSubmitTransactionApproval}>
            <Div>
              <FormGroup sx={{ pt: 1, pb: 1, pl: 5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkSalesTransaction}
                      onChange={(e) =>
                        setCheckSalesTransaction(e.target.checked)
                      }
                    />
                  }
                  label="Sales Transactions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPurchaseTransaction}
                      onChange={(e) =>
                        setCheckPurchaseTransaction(e.target.checked)
                      }
                    />
                  }
                  label="Purchase Transactions"
                />
              </FormGroup>
              {/* <Typography variant="h3" sx={{ pt: 1, pl: 5 }}>
                <Checkbox size="small" color="primary" checked={checkSalesTransaction} onChange={(e) => setCheckSalesTransaction(e.target.checked)} /> Sales Transactions
              </Typography>
              <Typography variant="h3" sx={{ pl: 5 }}>
                <Checkbox size="small" checked={checkPurchaseTransaction} onChange={(e) => setCheckPurchaseTransaction(e.target.checked)} /> Purchase Transactions
              </Typography> */}
            </Div>

            <Div
              className="card"
              sx={{
                width: { xs: "none", md: "max-content" },
                ml: { md: 2, lg: 10 },

              }}
            >
              <Div className="transaction-approval-checkbox" sx={{ pl: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifyForApproval}
                      onChange={(e) => setNotifyForApproval(e.target.checked)}
                      disabled={
                        checkPurchaseTransaction === true ? false : true
                      }
                    />
                  }
                  label=" Notify when
                  transactions are submitted for approval"
                />

                <Div sx={{ ml: 3 }}>
                  <FormGroup sx={{ mt: -1 }}>
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          disabled={notifyForApproval === true ? false : true}
                        />
                      }
                      label="To all approvers"
                      value="To All"
                      checked={notifyTo === "To All"}
                      onChange={(e) => {
                        setNotifyTo(e.target.value);
                      }}
                      sx={{ mt: -0.5, mb: -1 }}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          disabled={notifyForApproval === true ? false : true}
                        />
                      }
                      label="To specific email address"
                      value="To Specific"
                      checked={notifyTo === "To Specific"}
                      onChange={(e) => {
                        setNotifyTo(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Div>
              </Div>

              <Div className="transaction-approval-checkbox" sx={{ pl: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifySubmitter}
                      onChange={(e) => setNotifySubmitter(e.target.checked)}
                      disabled={
                        checkPurchaseTransaction === true ? false : true
                      }
                    />
                  }
                  label="Notify submitter when transaction is approved"
                />
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
                <Button type="submit" className="plus-button">
                  Save
                </Button>
                <Button variant="contained" className="icon-button">
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
          <ScrollToTop Scrollheight={180} />
        </Div>

        {/* code for update transaction approvals */}
        <Div sx={{ display: showUpdatePage === true ? "block" : "none" }}>
          <form onSubmit={handleUpdateTransactionApproval}>
            <Div>
              <FormGroup sx={{ pt: 1, pb: 1, pl: 5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkSalesTransaction}
                      onChange={(e) =>
                        setCheckSalesTransaction(e.target.checked)
                      }
                    />
                  }
                  label="Sales Transactions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkPurchaseTransaction}
                      onChange={(e) =>
                        setCheckPurchaseTransaction(e.target.checked)
                      }
                    />
                  }
                  label="Purchase Transactions"
                />
              </FormGroup>
              {/* <Typography variant="h3" sx={{ pt: 1, pl: 5 }}>
                <Checkbox size="small" color="primary" checked={checkSalesTransaction} onChange={(e) => setCheckSalesTransaction(e.target.checked)} /> Sales Transactions
              </Typography>
              <Typography variant="h3" sx={{ pl: 5 }}>
                <Checkbox size="small" checked={checkPurchaseTransaction} onChange={(e) => setCheckPurchaseTransaction(e.target.checked)} /> Purchase Transactions
              </Typography> */}
            </Div>

            <Div
              className="card"
              sx={{
                width: "max-content",
                ml: 10,
                pr: 5,
              }}
            >
              <Div className="transaction-approval-checkbox" sx={{ pl: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifyForApproval}
                      onChange={(e) => setNotifyForApproval(e.target.checked)}
                      disabled={
                        checkPurchaseTransaction === true ? false : true
                      }
                    />
                  }
                  label=" Notify when
                  transactions are submitted for approval"
                />

                <Div sx={{ ml: 3 }}>
                  <FormGroup sx={{ mt: -1 }}>
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          disabled={notifyForApproval === true ? false : true}
                        />
                      }
                      label="To all approvers"
                      value="To All"
                      checked={notifyTo === "To All"}
                      onChange={(e) => {
                        setNotifyTo(e.target.value);
                      }}
                      sx={{ mt: -0.5, mb: -1 }}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          size="small"
                          disabled={notifyForApproval === true ? false : true}
                        />
                      }
                      label="To specific email address"
                      value="To Specific"
                      checked={notifyTo === "To Specific"}
                      onChange={(e) => {
                        setNotifyTo(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Div>
              </Div>

              <Div className="transaction-approval-checkbox" sx={{ pl: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={notifySubmitter}
                      onChange={(e) => setNotifySubmitter(e.target.checked)}
                      disabled={
                        checkPurchaseTransaction === true ? false : true
                      }
                    />
                  }
                  label="Notify submitter when transaction is approved"
                />
              </Div>
            </Div>

            <Div sx={{ mt: 20 }}>

              <ButtonGroup aria-label="split button">
                <Button
                  className="plus-button"
                  type="submit"
                // onClick={handleUpload}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  className="icon-button"
                >
                  <FaSave size={20} />
                </Button>
              </ButtonGroup>

              <ButtonGroup aria-label="split button" sx={{ ml: 2 }}>
                <Button className="plus-button" onClick={handleUpdateCancel} sx={{ width: "99px" }}>
                  Cancel
                </Button>
                <Button variant="contained" className="icon-button">
                  <TiCancel size={24} />
                </Button>
              </ButtonGroup>

            </Div>
          </form>
          <ScrollToTop Scrollheight={180} />
        </Div>
        <ScrollToTop Scrollheight={180} />

      </JumboContentLayoutMain>
    </>
  );
};

export default TransactionApproval;
