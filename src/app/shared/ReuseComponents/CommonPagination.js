import { useJumboLayoutSidebar } from "@jumbo/hooks";
import { Grid, MenuItem, Pagination, Select } from "@mui/material";
import useResponsive from "app/pages/useResponsive";
import React, { memo } from "react";

const CommonPagination = ({
  totalPages,
  page = 1,
  handleChangePage = () => { },
  rowsPerPageOptions,
  rowsPerPage,
  handleChangeRowsPerPage = () => { }
}) => {

  let isMobile = useResponsive("down", "md");
  let isTabOnly = useResponsive("down", "lg");

  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();

  console.log("sidebarOptions from pagination", sidebarOptions?.open);

  return (
    <Grid container spacing={1} sx={{ mt: 2, display: "flex", alignItems: "center" }}>
      <Grid item xs={12} md={0} lg={sidebarOptions?.open ? 1.5 : 3} xl={4.5}></Grid>
      <Grid item xs={12} md={sidebarOptions?.open ? 5 : 4} lg={sidebarOptions?.open ? 4 : 4} xl={3.5} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, alignItems: "center", gap: "10px !important" }}>
        {/* <label className="input-label">Rows per page</label>
        <Select
          className="input-pagination-select"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          variant="outlined"
          sx={{ minWidth: "60px !important" }}
        >
          {rowsPerPageOptions?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select> */}
      </Grid>
      <Grid item xs={12} md={sidebarOptions?.open ? 7 : 8} lg={sidebarOptions?.open ? 6.5 : 5} xl={4} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, alignItems: "center", gap: "10px !important" }}>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={(e, newValue) => handleChangePage(e, newValue)}
          variant="outlined"
          shape="rounded"
          showFirstButton={Boolean(isMobile || isTabOnly) ? Boolean(sidebarOptions?.open || isMobile) ? false : true : true}
          showLastButton={Boolean(isMobile || isTabOnly) ? Boolean(sidebarOptions?.open || isMobile) ? false : true : true}
          siblingCount={0}
        />
      </Grid>
    </Grid>
  );
};

export default memo(CommonPagination);
