import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import settingServices from "app/services/setting-api-services";
import CreateAssignWorkflows from "./CreateAssignWorkflows";
import EditAssignWorkflows from "./EditAssignWorkflows";
import Setting from "../../Setting";
import ScrollToTop from "app/pages/ScrollToTop";
import useResponsive from "app/pages/useResponsive";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import CommonPagination from "app/shared/ReuseComponents/CommonPagination";
import { ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { CustomSkeleton } from "app/shared/ReuseComponents/StyledComponents";
import { ErpCreateButton, ErpSearchBox } from "app/shared/ReuseComponents/ButtonComponent";



const ListAssignWorkflows = ({ scrollHeight }) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setRowsPerPage(10);
    setSkeleton(true);
    settingServices
      .AssignWorkflowLists(newPage, header)
      .then((res) => {
        setWorkflows(res?.results);
        setCount(res?.count);
        setSkeleton(false);
      })
      .catch((error) => {
        console.log(error);
        setSkeleton(false);
      });
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
      .AssignWorkflowLists(page, header)
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
    setCurrentWorkflows({
      id: data?.id,
      Assignworkflow_Id: data?.Assignworkflow_Id,
      Partner_Id: data?.Partner_Id,
      WorkflowName_Id: data?.WorkflowName_Id,
      Workflow_Name: data?.Workflow_Name,
      Workflow_Basedon: data?.Workflow_Basedon,
      Document_Name: data?.Document_Name,
      Field_Name: data?.Field_Name,
      Noof_Level: data?.Noof_Level,
      Head_Approval: data?.Head_Approval,
      Rule_Name: data?.Rule_Name,
      Created_By: data?.Created_By,
    });
  };

  const handleDeletePopup = (data) => {
    setOpenDelete(true);
    setCurrentDeleteId(data?.id);
    setCurrentDeleteWorkflowNo(data?.Assignworkflow_Id);
    setCurrentWorkflows(data);
  };

  const deleteData = (e) => {
    e.preventDefault();

    settingServices
      .deleteAssignWorkflow(currentDeleteWorkflowNo, header)
      .then((response) => {
        console.log(response);
        toast.success(`${currentDeleteWorkflowNo} is Deleted Successfully`);
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
      .get(`${BASE_URL}/Erpapp/workflowasignsearch/?search=${data}`, header)
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



  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Div sx={{ display: listWorkflow === true ? "block" : "none" }}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Assign Workflow List - Count : {count || 0}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            User shall use this form to list all the Assign workflows created by
            administrator. Administrator can also edit and remove the Assign workflow.
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
              <ErpCreateButton handleClick={CreateWorkFlow} name={"Assign Workflow"} />
            </Grid>
          </Grid>

          {/* code for workflow list table */}
          <React.Fragment>
            <Div sx={{ mt: 1 }}>
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
                        Document Name
                      </TableCell>
                      <TableCell>
                        Workflow Name
                      </TableCell>
                      <TableCell sx={{ minWidth: "180px !important" }}>
                        Workflow Based On
                      </TableCell>
                      <TableCell>Rule</TableCell>
                      <TableCell>No Of Levels</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skeleton ? <CustomSkeleton headCount={7} rowCount={10} />
                      : count > 0 ? (
                        workflows
                          ?.slice(
                            visitedPages * rowsPerPage,
                            visitedPages * rowsPerPage + rowsPerPage
                          )
                          .map((data) => {
                            return (
                              <TableRow hover key={data.id} sx={{ fontSize: 14 }}>
                                <TableCell data-title="Date">
                                  {/* {data.Created_Date.slice(0, 10)} */}
                                  <DateFormatter date={data?.Created_Date} />
                                </TableCell>
                                <TableCell data-title="Document Name">
                                  {data.Document_Name}
                                </TableCell>
                                <TableCell data-title="Workflow Name">
                                  {data.Workflow_Name}
                                </TableCell>
                                <TableCell data-title="Workflow Based On">
                                  {data.Workflow_Basedon}
                                </TableCell>

                                <TableCell data-title="Rule">
                                  {data.Rule_Name}
                                </TableCell>
                                <TableCell data-title="No Of Levels">
                                  {data.Noof_Level}
                                </TableCell>
                                <TableCell data-title="Action">
                                  <Div>
                                    <IconButton
                                      size="small"
                                      className="edit-icon"
                                      onClick={() => handleEditPopup(data)}
                                    >
                                      <BiEdit />
                                    </IconButton>

                                    <IconButton
                                      size="small"
                                      className="delete-icon"
                                      onClick={() => {
                                        handleDeletePopup(data);
                                      }}
                                    >
                                      <MdDelete />
                                    </IconButton>
                                  </Div>
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
            </Div>

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

          {/* Delete workflow popup */}
          <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={deleteData} content={"Are you sure you want to delete the workflow"} id={currentWorkflows?.Document_Name} />


        </Div>

        <Div sx={{ display: createWorkflow === true ? "block" : "none" }}>
          <CreateAssignWorkflows
            setCreateWorkflow={setCreateWorkflow}
            setListWorkflow={setListWorkflow}
            listOfWorkflows={listOfWorkflows}
            workflows={workflows}
          />
        </Div>
        <Div sx={{ display: editWorkflow === true ? "block" : "none" }}>
          <EditAssignWorkflows
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

export default ListAssignWorkflows;
