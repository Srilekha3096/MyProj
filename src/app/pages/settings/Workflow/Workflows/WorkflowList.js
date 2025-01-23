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
import EditWorkflow from "./EditWorkflow";
import settingServices from "app/services/setting-api-services";
import CreateWorkflow from "./CreateWorkflow";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import Setting from "../../Setting";
import ScrollToTop from "app/pages/ScrollToTop";
import useResponsive from "app/pages/useResponsive";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import CommonPagination from "app/shared/ReuseComponents/CommonPagination";
import { ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { CustomSkeleton } from "app/shared/ReuseComponents/StyledComponents";
import { ErpCreateButton, ErpSearchBox } from "app/shared/ReuseComponents/ButtonComponent";


const WorkflowList = ({ scrollHeight }) => {
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


  const CreateWorkFlow = () => {
    setListWorkflow(false);
    setCreateWorkflow(true);
  };

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [10];
  const totalRecords = count;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const visitedPages = page - 1;

  let isMobile = useResponsive("down", "md");


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const listOfWorkflows = async () => {
    setSkeleton(true);
    await axios
      .get(`${BASE_URL}/Erpapp/WorkflowNamelist/`, header)
      .then((res) => {
        console.log("WFNAmes", res?.data?.results);
        setWorkflows(res?.data?.results);
        setCount(res?.data?.count);
        setSkeleton(false);
      }).catch((error) => {
        console.log(error);
        setSkeleton(false);
      });
  };

  useEffect(() => {
    listOfWorkflows();
  }, []);

  const handleEditPopup = (data) => {
    setEditWorkflow(true);
    setListWorkflow(false);
    setCurrentWorkflows({
      id: data?.id,
      WorkflowName_Id: data?.WorkflowName_Id,
      Partner_Id: data?.Partner_Id,
      WorkflowRule_Id: data?.WorkflowRule_Id,
      Rule_Name: data?.Rule_Name,
      Workflow_Name: data?.Workflow_Name,
      Workflow_Basedon: data?.Workflow_Basedon,
      Noof_Level: data?.Noof_Level,
      Created_By: data?.Created_By,
    });
  };

  const handleDeletePopup = (data) => {
    console.log(data)
    setOpenDelete(true);
    setCurrentDeleteId(data?.id);
    setCurrentDeleteWorkflowNo(data?.WorkflowName_Id);
  };

  const deleteData = (e) => {
    e.preventDefault();

    settingServices
      .deleteWorkflowName(currentDeleteWorkflowNo, header)
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

  const handleSearch = (data) => {
    axios
      .get(`${BASE_URL}/Erpapp/workflownamesearch/?search=${data}`, header)
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
            Workflow List - Count : {count || 0}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            User shall use this form to list all the workflows created by
            administrator. Administrator can also edit and remove a workflow.
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

            <Grid item xs={12} md={5} sm={12} lg={4} xl={4} >
              <ErpSearchBox handleChange={handleSearchWorkflows} searchData={searchData} />
            </Grid>

            <Grid item xs={12} md={6} sm={12} lg={5} xl={3} sx={{ display: "flex", justifyContent: "flex-end", mt: { xs: 1, md: 0 } }}>
              <ErpCreateButton handleClick={CreateWorkFlow} name={"Create Workflow"} />
            </Grid>
          </Grid>

          {/* code for workflow list table */}
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
                      <TableCell sx={{ height: "53px" }}>Date</TableCell>
                      <TableCell>Workflow Id</TableCell>
                      <TableCell>
                        Workflow Name
                      </TableCell>
                      <TableCell sx={{ minWidth: "180px !important" }}>
                        Workflow Based On
                      </TableCell>
                      <TableCell>Rule Name</TableCell>
                      <TableCell>Rule Actions</TableCell>
                      <TableCell>No Of Levels</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skeleton ? <CustomSkeleton headCount={8} rowCount={10} />
                      : workflows?.length > 0 ? (
                        workflows
                          .slice(
                            visitedPages * rowsPerPage,
                            visitedPages * rowsPerPage + rowsPerPage
                          )
                          .map((data, index) => {
                            return (
                              <TableRow hover key={index} sx={{ fontSize: 14 }}>
                                <TableCell data-title="Date">
                                  {/* {data.Created_Date.slice(0, 10)} */}
                                  <DateFormatter date={data?.Created_Date} />
                                </TableCell>
                                <TableCell data-title="Workflow Id">
                                  {data.WorkflowName_Id}
                                </TableCell>
                                <TableCell data-title="Workflow Name">
                                  {data.Workflow_Name}
                                </TableCell>
                                <TableCell data-title="Workflow Based On">
                                  {data.Workflow_Basedon}
                                </TableCell>
                                <TableCell data-title="Rule Name">
                                  {data?.WorkflowRule_Id?.Rule_Name}
                                </TableCell>
                                <TableCell data-title="Rule Actions">
                                  {data.WorkflowRule_Id?.Action}
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

                                {/* <Dialog onClose={handleClose} open={open}>
                          <List sx={{ pt: 0 }}>
                            <ListItem button
                            // onClick={() => handleListItemClick()}
                            >
                              <ListItemText>
                                <IconButton
                                  size="small"
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      color: "#00BFFF",
                                    },
                                  }}
                                >
                                  <BiEdit />
                                </IconButton>Edit
                              </ListItemText>
                            </ListItem>
                            <ListItem button
                            // onClick={() => handleListItemClick()}
                            >
                              <ListItemText>
                                <IconButton
                                  size="small"
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      color: "#00BFFF",
                                    },
                                  }}
                                >
                                  <MdDelete />
                                </IconButton> Delete</ListItemText>
                            </ListItem>
                          </List>
                        </Dialog> */}
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
          <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={deleteData} content={"Are you sure you want to delete the workflow"} id={currentDeleteWorkflowNo} />


        </Div>

        <Div sx={{ display: createWorkflow === true ? "block" : "none" }}>
          {/* <Workflow
            setCreateWorkflow={setCreateWorkflow}
            setListWorkflow={setListWorkflow}
          /> */}
          <CreateWorkflow
            setCreateWorkflow={setCreateWorkflow}
            setListWorkflow={setListWorkflow}
            listOfWorkflows={listOfWorkflows}
            workflowsList={workflows}
          />
        </Div>
        <Div sx={{ display: editWorkflow === true ? "block" : "none" }}>
          <EditWorkflow
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

export default WorkflowList;
