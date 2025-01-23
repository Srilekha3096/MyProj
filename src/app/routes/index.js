import React, { Suspense } from "react";
import Page from "@jumbo/shared/Page";
import ProtectedRoutes from "../ProtectedRoutes";
import { ERPCustomLoader } from "app/shared/ReuseComponents/StyledComponents";
//import ;

import Home from "../pages/home";
import Login from "app/pages/auth-pages/login/Login";
import ForgotPassword from "app/pages/auth-pages/forgot-password/ForgotPassword";
import ForgotPasswordForm from "app/pages/auth-pages/forgot-password/ForgotPasswordForm";


import AuthGuard from "app/pages/auth-pages/login/AuthGuard";
import Test from "app/pages/home/Test";


// analytics
const Dashboard = React.lazy(() => import("app/pages/analytics/Dashboard"));
const VendorAnalysis = React.lazy(() => import("app/pages/analytics/VendorAnalysis"));
const MonthlyProfit = React.lazy(() => import("app/pages/analytics/MonthlyProfit"));
const UsersTargetAndAchieved = React.lazy(() => import("app/pages/analytics/UsersTargetAndAchieved"));
const Operations = React.lazy(() => import("app/pages/analytics/Operations"));
const Transactions = React.lazy(() => import("app/pages/analytics/Transactions"));

// settings
const GeneralSettings = React.lazy(() => import("app/pages/settings/GeneralSettings"));
const EditCompanyDetails = React.lazy(() => import("app/pages/settings/company/EditCompanyDetails"));
const TransactionApproval = React.lazy(() => import("app/pages/settings/TransactionApproval"));
const TransactionSeries = React.lazy(() => import("app/pages/settings/Preferences/TransactionSeries"));
const PreferenceItems = React.lazy(() => import("app/pages/settings/Preferences/PreferenceItems"));
const SalesOrder = React.lazy(() => import("app/pages/settings/Preferences/SalesOrder"));
const Invoice = React.lazy(() => import("app/pages/settings/Preferences/Invoice"));
const SettingInventory = React.lazy(() => import("app/pages/settings/Preferences/Inventory"));
const PurchaseOrderSetting = React.lazy(() => import("app/pages/settings/Preferences/PurchaseOrderSetting"));
const OrganizationStructure = React.lazy(() => import("app/pages/settings/Organization/OrganizationStructure"));
const WorkflowAssignment = React.lazy(() => import("app/pages/settings/Workflow/WorkflowAssignment"));
const WorkflowList = React.lazy(() => import("app/pages/settings/Workflow/Workflows/WorkflowList"));
const ListAssignWorkflows = React.lazy(() => import("app/pages/settings/Workflow/AssignWorkflow/ListAssignWorkflows"));
const ListPartnerWorkflow = React.lazy(() => import("app/pages/settings/Workflow/PartnerWorkflow/ListPartnerWorkflow"));
const ListWorkflowRules = React.lazy(() => import("app/pages/settings/Workflow/WorkflowRules/ListWorkflowRules"));

const routesForPublic = [
  {
    path: "/test",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={AuthGuard(Test)} />,
      </Suspense>
  },
  {
    path: "/home",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={AuthGuard(Home)} />,
      </Suspense>
  },


  // analytics menus
  {
    path: "/analytics/dashboard",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={Dashboard} />,
      </Suspense>
  },

  {
    path: "/analytics/vendoryanalysis",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={VendorAnalysis} />,
      </Suspense>
  },
  
 
  {
    path: "/analytics/vendoryanalysis",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={VendorAnalysis} />,
      </Suspense>
  },
  
  
  {
    path: "/analytics/monthlyprofit",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={MonthlyProfit} />,
      </Suspense>
  },
  
  {
    path: "/analytics/usertarget",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={UsersTargetAndAchieved} />
      </Suspense>
  },
 
  {
    path: "/analytics/Operations",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={Operations} />
      </Suspense>
  },
  {
    path: "/analytics/Transactions",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={Transactions} />
      </Suspense>
  },
 

  // settings submenu url
  {
    path: "/settings/general",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={GeneralSettings} />,
      </Suspense>
  },
  {
    path: "/settings/edit-company-details",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={EditCompanyDetails} />,
      </Suspense>
  },
  

  {
    path: "/settings/transaction-approval",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={TransactionApproval} />,
      </Suspense>
  },
  {
    path: "/settings/preferences/transaction-series", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={TransactionSeries} />,
      </Suspense>
  },
  {
    path: "/settings/preferences/items", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={PreferenceItems} />,
      </Suspense>
  },
  {
    path: "/settings/preferences/sales-order", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={SalesOrder} />,
      </Suspense>
  },
  {
    path: "/settings/preferences/invoice", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={Invoice} />,
      </Suspense>
  },
  {
    path: "/settings/preferences/purchase-order", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={PurchaseOrderSetting} />,
      </Suspense>
  },
  
  {
    path: "/settings/preferences/inventory", //inside of preference menu
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={SettingInventory} />,
      </Suspense>
  },
  

  {
    path: "/settings/assign-workflow",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={ListAssignWorkflows} />,
      </Suspense>
  },

  {
    path: "/settings/partner-workflow",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={ListPartnerWorkflow} />,
      </Suspense>
  },

  {
    path: "/settings/workflow-rules",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={ListWorkflowRules} />,
      </Suspense>
  },

  {
    path: "/settings/workflow",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={WorkflowList} />,
      </Suspense>
  },

  {
    path: "/settings/workflow-assignment",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={WorkflowAssignment} />,
      </Suspense>
  },


  {
    path: "/settings/organization-structure",
    element:
      <Suspense fallback={<ERPCustomLoader />}>
        <ProtectedRoutes component={OrganizationStructure} />,
      </Suspense>
  },

];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: (
      <Page component={Login} layout={"solo-page"} disableSmLogin={false} />
    ),
  },
  {
    path: "/",
    element: (
      <Page component={Login} layout={"solo-page"} disableSmLogin={true} />
    ),
  },

  {
    path: "/auth-pages/forgot-password",
    element: (
      <Page
        component={ForgotPassword}
        layout={"solo-page"}
        disableSmLogin={true}
      />
    ),
  },
  {
    path: "/auth-pages/forgot-password-form",
    element: (
      <Page
        component={ForgotPasswordForm}
        layout={"solo-page"}
        disableSmLogin={true}
      />
    ),
  },
  
];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
