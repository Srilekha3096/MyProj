import React from "react";
import {
  MdElectricalServices,
  MdOutlineHomeRepairService,
  MdOutlineMedicalServices,
  MdWork,
} from "react-icons/md";
import NordicWalkingIcon from "@mui/icons-material/NordicWalking";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import DnsIcon from "@mui/icons-material/Dns";
import BallotIcon from "@mui/icons-material/Ballot";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { FcSelfServiceKiosk } from "react-icons/fc";

const servicemenus = [
  {
    id: 9,
    label: "SERVICE",
    type: "collapsible",
    icon: <MdOutlineMedicalServices style={{ fontSize: 18 }} />,
    children: [
      {
        id: 1,
        label: "Job Allocation",
        type: "collapsible",
        icon: (
          <MdWork style={{ fontSize: 16, marginLeft: 17, marginRight: 15 }} />
        ),
        children: [
          // {
          //   uri: "/service/master-job-allocations",
          //   label: "Allocation Master",
          //   type: "nav-item",
          //   icon: <AllInboxIcon sx={{ fontSize: 18, ml: 3 }} />,
          // },
          // {
          //   uri: "/service/list-job-allocations",
          //   label: "Allocation",
          //   type: "nav-item",
          //   icon: <BallotIcon sx={{ fontSize: 18, ml: 3 }} />,
          // },
          {
            id: 113,
            uri: "/service/list-job-allocations",
            label: "Roster",
            type: "nav-item",
            icon: <BallotIcon sx={{ fontSize: 18, ml: 3 }} />,
          },
          {
            id: 2,
            uri: "/service/Schedule",
            label: "Week Wise Roster",
            type: "nav-item",
            icon: <AllInboxIcon
              data-toggle="tooltip"
              data-placement="bottom"
              title="Week Wise Roster" sx={{ fontSize: 18, ml: 3 }} />,
          },
          {
            id: 3,
            uri: "/service/Employee-Wise",
            label: "Employee Wise Roster",
            type: "nav-item",
            icon: <AllInboxIcon
              data-toggle="tooltip"
              data-placement="bottom"
              title="Employee Wise Roster" sx={{ fontSize: 18, ml: 3 }} />,
          },
        ],
      },
      {
        id: 4,
        uri: "/service/list-job-time-card",
        label: "Job Time Card",
        type: "nav-item",
        icon: <AlarmAddIcon sx={{ fontSize: 18 }} />,
      },
    ],
  },
];


const adminServicemenus = [
  {
    id: 9,
    label: "SERVICE",
    type: "collapsible",
    icon: <MdOutlineMedicalServices style={{ fontSize: 18 }} />,
    children: [
      {
        id: 111,
        uri: "/service/category",
        label: "Service Category",
        type: "nav-item",
        icon: <DnsIcon sx={{ fontSize: 18 }} />,
      },
      {
        id: 112,
        uri: "/service/list-services",
        label: "Services",
        type: "nav-item",
        icon: <MdElectricalServices style={{ fontSize: 18 }} />,
      },
      {
        id: 40,
        uri: "/service/serviceCatalogue",
        label: "Service Catalogue",
        type: "nav-item",
        icon: <MdOutlineHomeRepairService style={{ fontSize: 18 }} />,
      },
      // {
      //   uri: "/service/list-plan-services",
      //   label: "Plan",
      //   type: "nav-item",
      //   icon: <MdNextPlan style={{ fontSize: 18 }} />,
      // },
      // {
      //   uri: "/service/list-subscription",
      //   label: "Subscription",
      //   type: "nav-item",
      //   icon: <MdSubscriptions style={{ fontSize: 16 }} />,
      // },
      // {
      //   uri: "/service/list-Subscriptionoverview",
      //   label: "Subscriptionoverview",
      //   type: "nav-item",
      //   icon: <MdSubscriptions style={{ fontSize: 16 }} />,
      // },
      // {
      //   uri: "/service/list-slots",
      //   label: "Slots",
      //   type: "nav-item",
      //   icon: <MdKeyboardCapslock style={{ fontSize: 18 }} />,
      // },
      // {
      //   uri: "/service/employee-allocations",
      //   label: "Employee Allocations",
      //   type: "nav-item",
      //   icon: <NordicWalkingIcon sx={{ fontSize: 18 }} />,
      // },
      {
        id: 50,
        uri: "/service/employee-allocations",
        label: "Assign Employees",
        type: "nav-item",
        icon: <NordicWalkingIcon sx={{ fontSize: 18 }} />,
      },
      {
        id: 264,
        uri: "/service/Kiosk",
        label: "Kiosk",
        type: "nav-item",
        icon: <FcSelfServiceKiosk sx={{ fontSize: 22 }} />
      },

      {
        id: 23,
        label: "Job Allocation",
        type: "collapsible",
        icon: (
          <MdWork style={{ fontSize: 16, marginLeft: 17, marginRight: 15 }} />
        ),
        children: [
          // {
          //   uri: "/service/ListMaster",
          //   label: "Allocation Master",
          //   type: "nav-item",
          //   icon: <AllInboxIcon sx={{ fontSize: 18, ml: 3 }} />,
          // },
          {
            id: 24,
            uri: "/service/store-checkin-status",
            label: "Store Check In",
            type: "nav-item",
            icon: <AllInboxIcon sx={{ fontSize: 18, ml: 3 }} />,
          },
          {
            id: 113,
            uri: "/service/list-job-allocations",
            label: "Roster",
            type: "nav-item",
            icon: <BallotIcon sx={{ fontSize: 18, ml: 3 }} />,
          },
          // {
          //   uri: "/service/mask-modification",
          //   label: "Mass Modification",
          //   type: "nav-item",
          //   icon: <BallotIcon sx={{ fontSize: 18, ml: 3 }} />,
          // },
          // {
          //   uri: "/service/Schedule",
          //   label: "Week Wise Roster",
          //   type: "nav-item",
          //   icon: <AllInboxIcon
          //     data-toggle="tooltip"
          //     data-placement="bottom"
          //     title="Week Wise Roster" sx={{ fontSize: 18, ml: 3 }} />,
          // },
          // {
          //   uri: "/service/Employee-Wise",
          //   label: "Employee Wise Roster",
          //   type: "nav-item",
          //   icon: <AllInboxIcon
          //     data-toggle="tooltip"
          //     data-placement="bottom"
          //     title="Employee Wise Roster" sx={{ fontSize: 18, ml: 3 }} />,
          // },

        ],
      },
      
      {
        id: 16,
        label: "Report",
        type: "collapsible",
        icon: (
          <MdWork style={{ fontSize: 16, marginLeft: 17, marginRight: 15 }} />
        ),
        children: [
          // {
          //   uri: "/service/ListMaster",
          //   label: "Allocation Master",
          //   type: "nav-item",
          //   icon: <AllInboxIcon sx={{ fontSize: 18, ml: 3 }} />,
          // },
          {
            id: 51,
            uri: "/service/Employee-Wise",
            label: "Rostering Report",
            type: "nav-item",
            icon: <AllInboxIcon
              data-toggle="tooltip"
              data-placement="bottom"
              title="Rostering Report"
              sx={{ fontSize: 18, ml: 3 }} />,
          },
          {
            id: 52,
            uri: "/service/Job-Completion-Report",
            label: "Job Completion Report",
            type: "nav-item",
            icon: <AllInboxIcon
              data-toggle="tooltip"
              data-placement="bottom"
              title="Job Completion Report" sx={{ fontSize: 18, ml: 3 }} />,
          },

        ],
      },
      // {
      //   uri: "/service/list-job-time-card",
      //   label: "Job Time Card",
      //   type: "nav-item",
      //   icon: <AlarmAddIcon sx={{ fontSize: 18 }} />,
      // },
    ],
  },
];


// Function to filter menus based on user type
const getFilteredMenus = (userType) => {
  if (userType === "Partner") {
    return servicemenus;
  } else {
    return adminServicemenus;
  }
};

const Menu = ({ userType }) => {
  const filteredMenus = getFilteredMenus(userType);

  return (
    <div>
      {/* Render the filtered menus */}
      {filteredMenus.map((menu) => (
        <div key={menu.label}>
          <div>{menu.label}</div>
          {menu.children && 
            menu.children.map((subMenu) => (
              <div key={subMenu.label}>{subMenu.label}</div>
            ))}
        </div>
      ))}
    </div>
  );
};

export { Menu, servicemenus, adminServicemenus };
