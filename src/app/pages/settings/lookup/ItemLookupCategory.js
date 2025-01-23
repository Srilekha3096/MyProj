import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  lookupValidationSchema,
} from "app/schemas/SettingValidationSchemas";
import { BASE_URL } from "app/services/auth-services";
import itemServices from "app/services/item-master-services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import ScrollToTop from "app/pages/ScrollToTop";
import useResponsive from "app/pages/useResponsive";
import Setting from "../Setting";
import { useQuery } from "react-query";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import CommonPagination from "app/shared/ReuseComponents/CommonPagination";
import { ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { ErpActionButton, ErpCreateButton, ErpSearchBox } from "app/shared/ReuseComponents/ButtonComponent";
import { CustomSkeleton } from "app/shared/ReuseComponents/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";


const ItemLookupCategory = ({ scrollHeight }) => {
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


  const [lookups, setLookups] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      value: "",
    },
  ]);
  const [openLookup, setOpenLookup] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [itemName, setItemName] = useState("");
  const [lookupName, setLookupName] = useState("");
  const [releaseList, setReleaseList] = useState(true);

  const [listItems, setListItems] = useState([]);
  const [searchData, setSearchData] = useState("")


  // skeleton flag
  const [skeleton, setSkeleton] = useState(false);

  const [currentLookups, setCurrentLookups] = useState();
  const defaultLookupName = currentLookups?.itemName;
  useEffect(() => {
    setLookupName(defaultLookupName);
  }, [currentLookups, defaultLookupName]);

  // for pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visitedPages, setVisitedPages] = useState(page - 1);
  const rowsPerPageOptions = [10];
  const totalRecords = count;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  // const visitedPages = page - 1;

  let isMobile = useResponsive("down", "md");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSkeleton(true);

    itemServices.getLookups(newPage, header).then((res) => {
      console.log(res?.results);
      setLookups(res?.results);
      setCount(res?.count);
      setSkeleton(false);
    }).catch((error) => {
      console.log(error);
      setSkeleton(false);
    });


  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value, 10));
    setPage(1);
  };

  const handleAddValue = () => {
    let arr = [];
    items?.map((item, ind) => {
      if (
        item?.id == 0 ||
        item?.value == ""
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      } else if (
        item?.id == undefined ||
        item?.value == undefined
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      }
    });

    if (arr?.length == 0) {
      const newId = items?.length + 1;
      const newItem = {
        id: newId,
        value: "",
      };

      // Add a new empty row to the items state
      const newList = [...items];
      newList.push(newItem);
      setItems(newList);

    }

  };



  const handleAddValueEdit = () => {
    let arr = [];
    listItems?.map((item, ind) => {
      if (
        item?.id == 0 ||
        item?.value == ""
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      } else if (
        item?.id == undefined ||
        item?.value == undefined
      ) {
        toast.error(
          "You cannot add more item without adding information in previous Item."
        );
        arr.push(ind);
      }
    });

    if (arr?.length == 0) {
      const newId = listItems?.length + 1;
      const newItem = {
        id: newId,
        value: "",
      };

      setListItems([...listItems, newItem]);
    }

  };


  const handleValueChange = (event, index) => {
    const { name, value } = event.target;
    const newList = [...items];
    newList[index][name] = value;
    setItems(newList);
  };

  const handleRemoveRow = (index) => {
    const list = [...items];
    if (index !== 0) {
      list.splice(index, 1);
    }
    setItems(list);

    // function for edit lookup
    const list1 = [...listItems];
    if (index !== 0) {
      list1.splice(index, 1);
    }
    setListItems(list1);
  };

  const getLookupLists = async () => {
    setSkeleton(true);
    const res = await itemServices.getLookups(page, header)
    if (res) {
      setSkeleton(false);
    }
    return res;
    // .then((res) => {
    //   console.log(res?.results);
    //   setLookups(res?.results);
    //   setCount(res?.count);
    // }).catch((error) => {
    //   console.log(error);
    // });
  };


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(lookupValidationSchema),
  });

  const checkRowValidity = (items) => {
    return items?.some(item => (
      item?.id === "" || item?.value === "" || item?.id === undefined || item?.value === undefined
    ));
  };


  const handleCreateLookup = async (event) => {
    event.preventDefault();
    var lookuppayload = {
      Lookupname: itemName,
      value: items,
      Created_By: Number(localStorage.getItem("UserId")),
      Updated_By: Number(localStorage.getItem("UserId")),
    };

    const isAnyRowInvalid = checkRowValidity(items);

    const getLookupName = lookups?.find((opt) => opt?.Lookupname === itemName)
    console.log("getLookupName", getLookupName)
    if (getLookupName) {
      toast.error("Lookup is already created for this name");
    } else if (isAnyRowInvalid) {
      toast.error("Please fill in all the required details.");
    } else {
      await axios
        .post(`${BASE_URL}/Erpapp/DropdowntableCRUD/`, lookuppayload, header)
        .then((res) => {
          console.log(res);
          if (res?.status === 201 && res?.data?.id) {
            setOpenLookup(false);
            // getLookupLists();
            lookupListsRefetch();
            setItemName("");
            setItems([
              {
                id: 1,
                value: "",
              },
            ]);
            toast.success("Lookup is created successfully");
            reset();
          } else {
            toast.error("Lookup Matching Query Doesn't Exist.")
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }



  };

  // this is going to use for update a lookup
  const handleEditPopup = (item) => {
    setOpenEdit(true);
    setCurrentLookups({
      id: item?.id,
      Dropdown_Id: item?.Dropdown_Id,
      itemName: item?.Lookupname,
      value: {
        id: item?.id,
        value: item?.value,
      },
    });
    console.log("item", item);
    setListItems(item?.value);
    console.log("currentLookups", currentLookups);
  };


  const handleChangeUpdate = (event, index) => {
    // debugger;
    const { name, value } = event.target;
    // const list = listItems.map((item, i) =>
    //   index === i ? Object.assign(item, { [name]: value }) : item
    // );
    // // list[index][name] = value;
    // setListItems(list);
    const list = [...listItems];
    list[index].value = value;
    setListItems(list);
    console.log(list);
  };

  const handleChangeLookup = (event) => {
    const { name, value } = event.target;
    setCurrentLookups({ ...currentLookups, [name]: value });
  };

  const handleEditLookup = async (event) => {
    // debugger;
    event.preventDefault();
    var lookuppayload = {
      id: currentLookups?.id,
      Dropdown_Id: currentLookups?.Dropdown_Id,
      Lookupname: currentLookups?.itemName,
      value: listItems,
      Created_By: Number(localStorage.getItem("UserId")),
      Updated_By: Number(localStorage.getItem("UserId")),
    };

    const isAnyRowInvalid = checkRowValidity(listItems);

    // if (isAnyRowInvalid) {
    //   toast.error("Please fill in all the required details.");
    // } else {
    await axios
      .put(`${BASE_URL}/Erpapp/DropdowntableCRUD/`, lookuppayload, header)
      .then((res) => {
        if (res?.data?.id) {
          setOpenEdit(false);
          lookupListsRefetch();
          // getLookupLists();
          toast.success("Lookup is updated successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid lookup value");
      });
    // }
  };

  const handleDeletePopup = (item) => {
    setOpenDelete(true);
    setCurrentLookups({
      id: item?.id,
      Dropdown_Id: item?.Dropdown_Id,
      itemName: item?.Lookupname,
      value: [
        {
          id: item?.value?.id,
          value: item?.value?.value,
        },
      ],
    });
  };

  const deleteLookup = (e) => {
    e.preventDefault();
    itemServices
      .deleteLookups(currentLookups?.Dropdown_Id, header)
      .then((res) => {
        console.log(res);
        setOpenDelete(false);
        toast.success(`${currentLookups?.itemName} is Deleted Successfully`);
        lookupListsRefetch();
        // getLookupLists();
      });
  };

  const handleSearch = (data) => {
    setSkeleton(true);
    var searchuserpayload = {
      Search: `${data}`,
      Is_Deleted: false,
    };
    axios
      .put(`${BASE_URL}/Erpapp/Dropdwontablesearch/`, searchuserpayload, header)
      .then((res) => {
        console.log(res?.data);
        setLookups(res?.data);
        setCount(res?.data?.length);
        setSkeleton(false);
      })
      .catch((error) => {
        console.log("ds", error);
        setSkeleton(false);
      });
  };

  const handleSearchItems = (e) => {
    var data = e.target.value;
    setSearchData(data);
    data !== "" ? handleSearch(data) : setReleaseList(!releaseList);
  };



  //Catch Data
  const { data: lookupQueryDatas, isLoading: lookupListsLoading,
    isError: lookupListError, refetch: lookupListsRefetch } = useQuery(
      ['lookupQueryDatas', releaseList],
      getLookupLists,
      { staleTime: Infinity }
    );

  useEffect(() => {

    if (lookupQueryDatas) {
      setLookups(lookupQueryDatas?.results || []);
      setCount(lookupQueryDatas?.count);
    }
  }, [lookupQueryDatas]);


  useEffect(() => {
    dispatch(fetchUserRolePermissions(token))
  }, []);



  return (
    <>
      <JumboContentLayoutMain>
        <Setting />
        <Div>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Lookup Lists - Count : {count || 0}
          </Typography>

          <Div>
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
                <ErpSearchBox handleChange={handleSearchItems} searchData={searchData} />
              </Grid>

              <Grid item xs={12} md={6} sm={12} lg={5} xl={3} sx={{ display: "flex", justifyContent: "flex-end", mt: { xs: 1, md: 0 } }}>
                {Array.isArray(userRolePermissions) && userRolePermissions.includes(661) && (
                  <ErpCreateButton handleClick={() => setOpenLookup(true)} name={"Create Lookup"} />
                )}
              </Grid>
            </Grid>
          </Div>

          <Div sx={{ mt: 1 }}>
            <JumboScrollbar
              autoHeight={true}
              autoHideTimeout={4000}
              autoHeightMin={scrollHeight ? scrollHeight : 370}
              autoHide={true}
              hideTracksWhenNotNeeded
              id="no-more-tables"
            >
              <Table stickyHeader className="table">
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Lookup Id</TableCell>
                    <TableCell>Lookup Name</TableCell>
                    {/* <TableCell sx={{ fontWeight: 600 }}>Lookup Values</TableCell> */}
                    <TableCell sx={{ maxWidth: "80px !important", minWidth: "80px !important", textAlign: "center" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {skeleton ? <CustomSkeleton headCount={4} rowCount={10} />
                    : lookups?.length > 0 ? (
                      lookups?.map((item, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            sx={{ cursor: "pointer", fontSize: 14 }}
                          >
                            <TableCell data-title="Date">
                              <DateFormatter date={item?.Created_Date} />
                            </TableCell>
                            <TableCell data-title="Lookup Id">
                              {item?.Dropdown_Id}
                            </TableCell>
                            <TableCell data-title="Lookup Name">
                              {item?.Lookupname}
                            </TableCell>
                            <TableCell data-title="Action">
                              <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={662} onClickEdit={() => handleEditPopup(item)} onClickDelete={() => handleDeletePopup(item)} />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="col-12 text-center">No Records</TableCell>
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
          </Div>

        </Div>

        <Dialog
          open={openLookup}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleCreateLookup}>
            <DialogContent>
              <Typography variant="h3">Create Lookup</Typography>
              <Grid container>
                <Grid item xs={12} className="row" sx={{ mt: 1 }}>
                  <Typography className="col-12 col-md-4 input-label">
                    Lookup Name <span className="required">*</span>
                  </Typography>
                  <Div className="col-12 col-md-8">
                    <TextField
                      className={`col-12 input-box ${errors.itemName ? "is-invalid" : ""
                        }`}
                      id="outlined-basic"
                      placeholder="Enter the Lookup Name"
                      variant="outlined"
                      name="itemName"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      autoComplete="off"
                    />
                    <Div style={{ color: "red" }}>
                      {errors.itemName?.message}
                    </Div>
                  </Div>
                </Grid>
              </Grid>
              <Div id="no-more-tables">
                <Table className="table table-bordered mt-3">
                  <TableHead className="table-head">
                    <TableRow className="row">
                      {/* <TableCell
                        className="col-sm-12 col-md-1"
                        sx={{ minWidth: "100px" }}
                      >
                        Lookup code
                      </TableCell> */}
                      <TableCell
                        className="col-sm-12 col-md-3"
                        sx={{ minWidth: "250px" }}
                      >
                        Value
                      </TableCell>

                      <TableCell
                        className="col-sm-12 col-md-1"
                        sx={{
                          maxWidth: "150px",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {items?.map((data, index) => {
                      const { id, value } = data;
                      return (
                        <TableRow className="row" key={data.id}>
                          {/* <TableCell className="col-sm-12 col-md-1" data-title="Lookup code">
                            <TextField
                              id="openText"
                              name="id"
                              className="col-md-12 input-box"
                              value={id}
                              autoComplete="off"
                            />
                          </TableCell> */}
                          <TableCell className="col-sm-12 col-md-3" data-title="Value">
                            <TextField
                              className={`col-md-12 input-box ${errors.value ? "is-invalid" : ""
                                }`}
                              id="outlined-basic"
                              placeholder="Enter the value"
                              variant="outlined"
                              name="value"
                              value={value || ""}
                              onChange={(event) =>
                                handleValueChange(event, index)
                              }
                              autoComplete="off"
                            />
                            <Div style={{ color: "red", fontSize: "12px" }}>
                              {errors.value?.message}
                            </Div>
                          </TableCell>

                          <TableCell data-title="Action"
                            className="col-sm-12 col-md-1"
                            sx={{ textAlign: "center" }}
                          >
                            <Button
                              color="error"
                              onClick={() => handleRemoveRow(index)}
                            >
                              <MdDelete size={24} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Div>
              <Button
                onClick={handleAddValue}
                sx={{ textTransform: "capitalize", fontSize: 14 }}
              >
                + Add more
              </Button>
            </DialogContent>

            {/* code for save and cancel button */}
            <DialogActions sx={{ display: "flex", justifyContent: "start" }}>
              <Div className="buttons" sx={{ mt: 3, mb: 3 }}>
                <ButtonGroup
                  type="submit"
                  aria-label="split button"
                  sx={{
                    mt: { xs: 0.5, lg: 0 },
                    mr: { xs: 0, md: 1 }
                  }}
                >
                  <Button className="plus-button" type="submit" sx={{ width: { md: "99px !important" } }}>
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    className="icon-button"
                    type="submit"
                  >
                    <FaSave size={18} />
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  aria-label="split button"
                  onClick={() => {
                    setOpenLookup(false);
                    reset();
                    setLookupName("");
                    setItemName("")
                    setItems([{
                      id: 1,
                      value: "",
                    }])
                  }}
                  sx={{
                    mt: { xs: 0.5, lg: 0 },
                    mr: { xs: 0, md: 1 }
                  }}
                >
                  <Button className="plus-button" sx={{ width: { md: "99px !important" } }}>Cancel</Button>
                  <Button variant="contained" className="icon-button">
                    <TiCancel size={24} />
                  </Button>
                </ButtonGroup>
              </Div>
            </DialogActions>
          </form>
        </Dialog>

        {/* Delete item master popup */}
        <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={deleteLookup} content={"Are you sure you want to delete the lookup name"} id={currentLookups?.itemName} />


        {/* edit popup */}
        <Dialog
          open={openEdit}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleEditLookup}>
            <DialogContent>
              <Typography variant="h3">Edit Lookup</Typography>
              <Grid container>
                <Grid item xs={12} className="row" sx={{ mt: { sm: 0, md: 1 } }}>
                  <Typography variant="h4" className="col-12 col-md-4 input-label">
                    Lookup Name <span className="required">*</span>
                  </Typography>
                  <Div className="col-12 col-md-8">
                    <TextField
                      className="col-12 input-box"
                      id="outlined-basic"
                      placeholder="Enter the Lookup Name"
                      variant="outlined"
                      name="lookupName"
                      value={lookupName}
                      onChange={handleChangeLookup}
                      autoComplete="off"
                      disabled
                    />
                  </Div>
                </Grid>
              </Grid>
              <Div id="no-more-tables">
                <Table className="table table-bordered mt-3">
                  <TableHead className="table-head">
                    <TableRow className="row">
                      {/* <TableCell
                        className="col-sm-12 col-md-1"
                        sx={{ minWidth: "80px" }}
                      >
                        Lookup code
                      </TableCell> */}
                      <TableCell
                        className="col-sm-12 col-md-3"
                        sx={{ minWidth: "250px" }}
                      >
                        Value
                      </TableCell>

                      <TableCell
                        className="col-sm-12 col-md-1"
                        sx={{
                          maxWidth: "150px",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listItems?.map((data, index) => {
                      const { value, id } = data;
                      return (
                        <TableRow className="row" key={id}>
                          {/* <TableCell className="col-sm-12 col-md-1" data-title="Lookup code">
                            <TextField
                              id="openText"
                              name="id"
                              className="col-md-12 input-box"
                              value={id}
                            />
                          </TableCell> */}
                          <TableCell className="col-sm-12 col-md-3" data-title="Value">
                            <TextField
                              className="col-md-12 input-box"
                              id="outlined-basic"
                              placeholder="Enter the value"
                              variant="outlined"
                              name="value"
                              value={value || ""}
                              onChange={(event) =>
                                handleChangeUpdate(event, index)
                              }
                              key={id}
                            />
                          </TableCell>

                          <TableCell data-title="Action"
                            className="col-sm-12 col-md-1"
                            sx={{ textAlign: "center" }}
                          >
                            <Button
                              color="error"
                              onClick={() => handleRemoveRow(index)}
                            >
                              <MdDelete size={24} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Div>
              <Button
                onClick={handleAddValueEdit}
                sx={{ textTransform: "capitalize", fontSize: 14 }}
              >
                + Add more
              </Button>
            </DialogContent>
            {/* code for save and cancel button */}
            <DialogActions sx={{ display: "flex", justifyContent: "start" }}>
              <Div className="buttons" sx={{ mt: 5, mb: 3 }}>
                <ButtonGroup
                  type="submit"
                  aria-label="split button"
                  sx={{
                    mt: { xs: 0.5, lg: 0 },
                    mr: { xs: 0, md: 1 }
                  }}
                >
                  <Button className="plus-button" type="submit" sx={{ width: { md: "99px !important" } }}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    className="icon-button"
                    type="submit"
                  >
                    <FaSave size={18} />
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  aria-label="split button"
                  onClick={() => {
                    setOpenEdit(false);
                  }}
                  sx={{
                    mt: { xs: 0.5, lg: 0 },
                    mr: { xs: 0, md: 1 }
                  }}
                >
                  <Button className="plus-button" sx={{ width: { md: "99px !important" } }}>Cancel</Button>
                  <Button variant="contained" className="icon-button">
                    <TiCancel size={24} />
                  </Button>
                </ButtonGroup>
              </Div>
            </DialogActions>

          </form>
        </Dialog>

        <ScrollToTop Scrollheight={180} />
      </JumboContentLayoutMain>
    </>
  );
};

export default ItemLookupCategory;
