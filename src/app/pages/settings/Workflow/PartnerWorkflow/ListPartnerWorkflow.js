import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import settingServices from "app/services/setting-api-services";
import CreatePartnerWorkflow from "./CreatePartnerWorkflow";
import EditPartnerWorkflow from "./EditPartnerWorkflow";
import ScrollToTop from "app/pages/ScrollToTop";
import useResponsive from "app/pages/useResponsive";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import CommonPagination from "app/shared/ReuseComponents/CommonPagination";
import { ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { CustomSkeleton } from "app/shared/ReuseComponents/StyledComponents";
import { ErpActionButton, ErpCreateButton, ErpSearchBox } from "app/shared/ReuseComponents/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";


const ListPartnerWorkflow = ({ scrollHeight }) => {
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


  const [listWorkflow, setListWorkflow] = useState(true);
  const [createWorkflow, setCreateWorkflow] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [currentDeleteWorkflowNo, setCurrentDeleteWorkflowNo] = useState("");

  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflows, setCurrentWorkflows] = useState([]);

  const [searchData, setSearchData] = useState("")


  // skeleton flag
  const [skeleton, setSkeleton] = useState(false);


  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visitedPages, setVisitedPages] = useState(page - 1);
  const rowsPerPageOptions = [10];
  const totalRecords = count;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  let isMobile = useResponsive("down", "md");


  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    setSkeleton(true);

    try {
      //  search
      if (Boolean(searchData) && Boolean(searchData?.length > 0)) {
        await axios
          .get(`${BASE_URL}/Erpapp/workflowsearch/?search=${searchData}&page=${newPage}`, header)
          .then((res) => {
            console.log(res?.data);
            setWorkflows(res?.data);
            setCount(res?.data?.length);
          })
          .catch((error) => {
            console.log("ds", error);
          });
      } else {
        settingServices
          .listWorkflows(newPage, header)
          .then((res) => {
            setWorkflows(res?.results);
            setCount(res?.count);
            setSkeleton(false);
          })
          .catch((error) => {
            console.log(error);
            setSkeleton(false);
          });
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(1);
    // setVisitedPages(visitedPages);
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor(((page - 1) * rowsPerPage) / newRowsPerPage) + 1;

    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
  };

  const listOfWorkflows = () => {
    setSkeleton(true);
    settingServices
      .listWorkflows(page, header)
      .then((res) => {
        console.log(res?.count);
        setWorkflows(res?.results);
        setCount(res?.count);
        setSkeleton(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeleton(false);
      });
  };

  useEffect(() => {
    listOfWorkflows();
  }, [setWorkflows]);

  const CreateWorkFlow = () => {
    setListWorkflow(false);
    setCreateWorkflow(true);
  };

  const handleEditPopup = (data) => {
    setEditWorkflow(true);
    setListWorkflow(false);
    setCurrentWorkflows(data);
  };

  const handleDeletePopup = (data) => {
    setOpenDelete(true);
    setCurrentDeleteId(data?.id);
    setCurrentDeleteWorkflowNo(data?.Workflow_Id);
    setCurrentWorkflows(data);
  };

  const deleteData = (e) => {
    e.preventDefault();

    settingServices
      .deleteWorkflow(currentDeleteWorkflowNo, header)
      .then((response) => {
        toast.success(`${currentWorkflows?.Document_Name} is Deleted Successfully`);
        setOpenDelete(false);
        listOfWorkflows();
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const handleSearch = async (data) => {
    await axios
      .get(`${BASE_URL}/Erpapp/workflowsearch/?search=${data}`, header)
      .then((res) => {
        console.log(res?.data);
        setWorkflows(res?.data);
        setCount(res?.data?.length);
      })
      .catch((error) => {
        console.log("ds", error);
      });
  };


  const handleSearchWorkflows = (e) => {
    var data = e.target.value;
    setSearchData(data);
    data !== "" ? handleSearch(data) : listOfWorkflows();
  }


  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);


  return (
    <>
      <JumboContentLayoutMain>
        <Div sx={{ display: listWorkflow === true ? "block" : "none" }}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Business Unit Workflow List - Count : {count || 0}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            User shall use this form to apply the workflow to business unit for
            specific documents.
          </Typography>

          <Grid container sx={{ mt: 2 }}>
            <Grid
              item
              className="filter"
              xs={12}
              md={1}
              lg={3}
              xl={5}
            ></Grid>

            <Grid item xs={12} md={5} sm={12} lg={4} xl={4}>
              <ErpSearchBox handleChange={handleSearchWorkflows} searchData={searchData} />
            </Grid>

            <Grid item xs={12} md={6} sm={12} lg={5} xl={3} sx={{ display: "flex", justifyContent: "flex-end", mt: { xs: 1, md: 0 } }}>
              {Array.isArray(userRolePermissions) && userRolePermissions.includes(217) && (
                <ErpCreateButton handleClick={CreateWorkFlow} name={"Create Workflow"} />
              )}
            </Grid>
          </Grid>

          {/* code for purchase list table */}
          <Div sx={{ mt: 1 }}>
            <React.Fragment>
              <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={scrollHeight ? scrollHeight : 360}
                autoHide={true}
                hideTracksWhenNotNeeded
                id="no-more-tables"
              >
                <Table stickyHeader className="table">
                  <TableHead className="table-head">
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>
                        Business Unit
                      </TableCell>
                      <TableCell>
                        Workflow Name
                      </TableCell>
                      <TableCell sx={{ minWidth: "200px !important" }}>
                        Workflow Based On
                      </TableCell>
                      <TableCell sx={{ minWidth: "200px !important" }}>
                        Document Name
                      </TableCell>
                      {/* <TableCell>
                      Rule
                    </TableCell> */}
                      {/* <TableCell>Field Name</TableCell> */}
                      <TableCell>No Of Levels</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skeleton ? <CustomSkeleton headCount={7} rowCount={10} />
                      : workflows?.length > 0 ? (
                        workflows?.map((data) => {
                            return (
                              <TableRow hover key={data?.id} sx={{ fontSize: 14 }}>
                                <TableCell data-title="Date">
                                  {/* {data.Created_Date.slice(0, 10)} */}
                                  <DateFormatter date={data?.Created_Date} />
                                </TableCell>
                                <TableCell data-title="Business Unit">
                                  {data?.Partner_Id?.Partner_Name}
                                </TableCell>
                                <TableCell data-title="Workflow Name">
                                  {data?.Workflow_Name}
                                </TableCell>
                                <TableCell data-title="Workflow Based On">
                                  {data?.Workflow_Basedon}
                                </TableCell>
                                <TableCell data-title="Document Name">
                                  {data?.Document_Name}
                                </TableCell>
                                {/* <TableCell data-title="Field Name">
                              {data.Field_Name}
                            </TableCell> */}
                                <TableCell data-title="No Of Levels">
                                  {data?.Noof_Level}
                                </TableCell>
                                <TableCell data-title="Action">
                                  <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={218} deletePermissionId={219} onClickEdit={() => handleEditPopup(data)} onClickDelete={() => handleDeletePopup(data)} align="left" />
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            No Workflows
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </JumboScrollbar>

              {/* pagination */}
              <Div sx={{ display: "flex", flexWrap: "wrap" }}>
                <CommonPagination
                  totalPages={totalPages}
                  page={page}
                  handleChangePage={handleChangePage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Div>
            </React.Fragment>
          </Div>

          {/* Delete workflow popup */}
          <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={deleteData} content={"Are you sure you want to delete the workflow"} id={currentWorkflows?.Document_Name} />


        </Div>

        <Div sx={{ display: createWorkflow === true ? "block" : "none" }}>
          <CreatePartnerWorkflow
            setCreateWorkflow={setCreateWorkflow}
            setListWorkflow={setListWorkflow}
            listOfWorkflows={listOfWorkflows}
            workflows={workflows}
          />
        </Div>
        <Div sx={{ display: editWorkflow === true ? "block" : "none" }}>
          <EditPartnerWorkflow
            setEditWorkflow={setEditWorkflow}
            setListWorkflow={setListWorkflow}
            listOfWorkflows={listOfWorkflows}
            currentWorkflows={currentWorkflows}
          />
        </Div>
        <ScrollToTop Scrollheight={180} />
      </JumboContentLayoutMain>
    </>
  );
};

export default ListPartnerWorkflow;
