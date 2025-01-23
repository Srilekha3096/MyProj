import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  FaCalendarDay,
  FaEdit,
  FaStore
} from "react-icons/fa";
import {
  MdRoomPreferences,
  MdHomeWork,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { RiFlowChart, RiRefundFill } from "react-icons/ri";
import { GrMoney, GrTransaction } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DescriptionIcon from "@mui/icons-material/Description";
import { GiShinyPurse } from "react-icons/gi";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";

const settingmenus = [
  {
    id: 3,
    label: "SETTINGS",
    type: "collapsible",
    icon: <SettingsIcon sx={{ fontSize: 22 }} />,
    children: [
      // {
      //   uri: "/settings/general",
      //   label: "General",
      //   type: "nav-item",
      //   icon: <SettingsIcon sx={{ fontSize: 18 }} />,
      // },
      //   {
      //       uri: "/settings/edit-company-profile",
      //       label: 'Edit Company Profile',
      //       type: "nav-item",
      //       icon: <FaUserEdit style={{fontSize: 18}}/>
      //   },
      {
        id: 64,
        uri: "/settings/edit-company-details",
        label: "Edit Company Details",
        type: "nav-item",
        icon: <FaEdit style={{ fontSize: 18 }} />,
      },
      {
        id: 208,
        uri: "/settings/holiday-lists",
        label: "Holiday List",
        type: "nav-item",
        icon: <FaCalendarDay style={{ fontSize: 18 }} />,
      },
      // {
      //   uri: "/settings/roles&users",
      //   label: "Roles & Users",
      //   type: "nav-item",
      //   icon: <FaHouseUser style={{ fontSize: 18 }} />,
      // },
      // {
      //   uri: "/settings/transaction-approval",
      //   label: "Transaction Approval",
      //   type: "nav-item",
      //   icon: <AiOutlineTransaction style={{ fontSize: 18 }} />,
      // },
      {
        //   uri: "/settings/preferences",
        label: "Preferences",
        type: "collapsible",
        icon: (
          <MdRoomPreferences
            style={{ fontSize: 18, marginLeft: 15, marginRight: 18 }}
          />
        ),
        children: [
          {
            id: 209,
            uri: "/settings/preferences/transaction-series",
            label: "Transaction Series",
            type: "nav-item",
            icon: <GrTransaction style={{ fontSize: 16, marginLeft: 15 }} />,
          },
          {
            id: 70,
            uri: "/settings/preferences/items",
            label: "Items",
            type: "nav-item",
            icon: <HiTemplate style={{ fontSize: 16, marginLeft: 15 }} />,
          },

          {
            id: 72,
            uri: "/settings/preferences/sales-order",
            label: "Sales Order",
            type: "nav-item",
            icon: <LoyaltyIcon sx={{ fontSize: 16, ml: 2 }} />,
          },
          // {
          //   uri: "/service/list-subscription",
          //   label: "Subscription",
          //   type: "nav-item",
          //   icon: <MdSubscriptions style={{ fontSize: 16, marginLeft: "15px" }} />,
          // },
          {
            id: 69,
            uri: "/settings/preferences/invoice",
            label: "Invoice",
            type: "nav-item",
            icon: <DescriptionIcon sx={{ fontSize: 16, ml: 2 }} />,
          },
          {
            id: 71,
            uri: "/settings/preferences/purchase-order",
            label: "Purchase Order",
            type: "nav-item",
            icon: <GiShinyPurse style={{ fontSize: 16, marginLeft: 15 }} />,
          },
          // {
          //   uri: "/settings/preferences/budget",
          //   label: "Budget",
          //   type: "nav-item",
          //   icon: (
          //     <FaMoneyBillWaveAlt style={{ fontSize: 16, marginLeft: 15 }} />
          //   ),
          // },
          {
            id: 68,
            uri: "/settings/preferences/inventory",
            label: "Inventory",
            type: "nav-item",
            icon: (
              <BiCategory
                style={{ fontSize: 16, marginLeft: 15 }}
              />
            ),
          },
          {
            id: 210,
            uri: "/settings/preferences/budgetlock",
            label: "Budget Lock",
            type: "nav-item",
            icon: <GiShinyPurse style={{ fontSize: 16, marginLeft: 15 }} />,
          },
        ],
      },
      {
        id: 211,
        uri: "/inventory/item-lookup-category",
        label: "Lookup",
        type: "nav-item",
        icon: <BiCategory style={{ fontSize: 18 }} />,
      },
      // {
      //   uri: "/inventory/list-stores",
      //   label: "Stores",
      //   type: "nav-item",
      //   icon: <FaStore style={{ fontSize: 18 }} />,
      // },
      {
        id: 212,
        uri: "/inventory/list-cost-centre",
        label: "Cost Centre",
        type: "nav-item",
        icon: <BiCategory style={{ fontSize: 18 }} />,
      },
      {
        id: 213,
        uri: "/settings/Points",
        label: "Points",
        type: "nav-item",
        icon: <FaStore style={{ fontSize: 18 }} />,
      },
      {
        id: 214,
        uri: "/settings/ListAccountPeriod",
        label: "Account Period",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
      {
        id: 215,
        uri: "/settings/YearEndProcess",
        label: "Year End Process",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
      {
        id: 73,
        uri: "/settings/ListSetup",
        label: "Budget Setup",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
      {
        id: 216,
        uri: "/settings/BudgetAccountSetup",
        label: "Expense Group Setup",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
      {
        id: 217,
        uri: "/settings/price-setup",
        label: "Price Setup",
        type: "nav-item",
        icon: <BiCategory style={{ fontSize: 18 }} />,
      },

      {
        id: 218,
        uri: "/settings/RefundSetup",
        label: "Refund Setup",
        type: "nav-item",
        icon: <RiRefundFill style={{ fontSize: 18 }} />,
      },
      {
        id: 219,
        uri: "/settings/SlotPriceList",
        label: "Slot Price",
        type: "nav-item",
        icon: <RiRefundFill style={{ fontSize: 18 }} />,
      },
      {
        id: 220,
        uri: "/settings/ServicePausing",
        label: "Service Pausing Rule",
        type: "nav-item",
        icon: <GiShinyPurse style={{ fontSize: 18 }} />,
      },
      {
        id: 221,
        uri: "/settings/ScheduleServiceCancel",
        label: "Schedule Service Cancel",
        type: "nav-item",
        icon: <GiShinyPurse style={{ fontSize: 18 }} />,
      },
      {
        id: 222,
        uri: "/settings/PLAccouctSetup",
        label: "P & L Accouct Setup",
        type: "nav-item",
        icon: <GrMoney style={{ fontSize: 18 }} />,
      },
      {
        id: 223,
        uri: "/settings/BalanceSheetSetup",
        label: "Balance Sheet Accouct Setup",
        type: "nav-item",
        icon: <MdOutlineAccountBalanceWallet style={{ fontSize: 18 }} />,
      },
      {
        id: 224,
        uri: "/settings/Referal",
        label: "Referal",
        type: "nav-item",
        icon: <GiShinyPurse style={{ fontSize: 18 }} />,
      },
      {
        id: 225,
        uri: "/setting/tdssetup",
        label: "TDS SetUp",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
      {
        id: 226,
        uri: "/settings/slot-time-list",
        label: "Slot Time",
        type: "nav-item",
        icon: <AlarmAddIcon sx={{ fontSize: 18 }} />,
      },
      {
        id: 74,
        uri: "/settings/SmsTemplate",
        label: "DLT Template",
        type: "nav-item",
        icon: <AlarmAddIcon sx={{ fontSize: 18 }} />,
      },
      // {
      //   uri: "/settings/list-templates",
      //   label: "Templates",
      //   type: "nav-item",
      //   icon: <HiTemplate style={{ fontSize: 18 }} />,
      // },

      {
        id: 75,
        label: "Workflow",
        type: "collapsible",
        icon: (
          <MdRoomPreferences
            style={{ fontSize: 18, marginLeft: 15, marginRight: 18 }}
          />
        ),
        children: [
          {
            id: 75,
            uri: "/settings/workflow-rules",
            label: "Workflow Rules",
            type: "nav-item",
            icon: <RiFlowChart style={{ fontSize: 18, marginLeft: 15 }} />,
          },
          {
            id: 75,
            uri: "/settings/workflow",
            label: "Workflow",
            type: "nav-item",
            icon: <RiFlowChart style={{ fontSize: 18, marginLeft: 15 }} />,
          },
          {
            id: 75,
            uri: "/settings/assign-workflow",
            label: "Assign Workflow",
            type: "nav-item",
            icon: <RiFlowChart style={{ fontSize: 18, marginLeft: 15 }} />,
          },
          {
            id: 75,
            uri: "/settings/partner-workflow",
            label: "Workflow Approver Assignment",
            type: "nav-item",
            icon: <RiFlowChart style={{ fontSize: 18, marginLeft: 15 }} />,
          },
        ],
      },
      // {
      //   uri: "/settings/workflow-assignment",
      //   label: "Workflow",
      //   type: "nav-item",
      //   icon: <RiFlowChart style={{ fontSize: 18 }} />,
      // },
      // {
      //   uri: "/settings/workflow",
      //   label: "Assign Workflow",
      //   type: "nav-item",
      //   icon: <GrStackOverflow style={{ fontSize: 18 }} />,
      // },
      {
        id: 227,
        uri: "/settings/organization-structure",
        label: "Organization Structure",
        type: "nav-item",
        icon: <MdHomeWork style={{ fontSize: 18 }} />,
      },
    ],
  },
];
export default settingmenus;
