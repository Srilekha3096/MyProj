// CompanyDataProvider.js
import React, { useEffect, useState, createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import settingServices from 'app/services/setting-api-services';

const CompanyDataContext = createContext();

export const useCompanyData = () => {
  const context = useContext(CompanyDataContext);
  if (context === undefined) {
    throw new Error('useCompanyData must be used within a CompanyDataProvider');
  }
  return context;
};

export const CompanyDataProvider = React.memo(({ children }) => {
  const token = localStorage.getItem("accesstoken");
  const userDetailsString = localStorage.getItem("UserDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const companyId = userDetails?.Organization_Id;

  const header = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }), [token]);

  const [dateFormat, setDateFormat] = useState(null);
  const [currencyFormat, setCurrencyFormat] = useState("");
  const [inventoryFormatDigit, setInventoryFormatDigit] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const [updatedHistory, setUpdatedHistory] = useState([]);
  const [flagOfHeadApprover, setFlagOfHeadApprover] = useState(true);

  useEffect(() => {
    if (companyId) {
      const fetchCompanyData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header);
          const companyData = response?.data;

          if (companyData) {
            console.log("currencyFormat:", companyData?.Currencies);
            setDateFormat(companyData?.DateFormat);
            setCurrencyFormat(companyData?.Currencies);
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      };

      const fetchInventoryPreference = async () => {
        try {
          const response = await settingServices.getItemSettings(companyId, header);
          setInventoryFormatDigit(response?.rate_for_item);
        } catch (error) {
          console.error("Error fetching inventory preferences:", error);
        }
      };

      fetchCompanyData();
      fetchInventoryPreference();
    }
  }, [companyId, header]);

  const fetchApprovalData = async (WorkflowName, partnerId) => {
    if (partnerId && WorkflowName) {
      try {
        const response = await axios.get(`${BASE_URL}/Erpapp/workflowfilterapproval/?Document_Name=${WorkflowName}`);
        const data = response?.data;

        console.log("Approval data response:", response);

        const filteredList = partnerId
          ? data.filter((opt) => opt?.Partner_Id?.id ? opt?.Partner_Id?.id === parseInt(partnerId) : opt?.Partner_Id === parseInt(partnerId))
          : data;

        setWorkflows(filteredList);
        setFlagOfHeadApprover(filteredList?.[0]?.Head_Approval || false);
      } catch (error) {
        console.error("Error fetching approval data:", error);
      }
    }
  };

  const fetchHistoryData = async (documentId, partnerId) => {
    if (documentId && partnerId) {
      try {
        const response = await axios.get(`${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${partnerId}&Document_Id=${documentId}`);
        setUpdatedHistory(response?.data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    }
  };

  return (
    <CompanyDataContext.Provider value={{ dateFormat, currencyFormat, workflows, flagOfHeadApprover, fetchApprovalData, updatedHistory, fetchHistoryData, inventoryFormatDigit }}>
      {children}
    </CompanyDataContext.Provider>
  );
});
