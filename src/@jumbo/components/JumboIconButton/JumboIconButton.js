import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { alpha } from "@mui/material/styles";

const JumboIconButton = ({ children, filterItems, elevation, badge, ...restProps }) => {
  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
        // backgroundColor: "#7DCEA0",
        // color: "#FFFFFF",
        background: "white",
        color: "#000000",
        // boxShadow: elevation,
        // boxShadow: "0 5px 10px rgb(0 0 0 / 9%) !important",
        padding: 1.25,
      }}
      {...restProps}
    >
      {badge ? (
        <Badge
          variant={badge.variant}
          badgeContent={filterItems ? filterItems : 0}
          sx={{
            "& .MuiBadge-badge": {
              top: -5,
              right: -5,
              width: 10,
              height: 20,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
              fontWeight: 700,
              color: "#ffffff",
              boxShadow: (theme) =>
                `0 0.5rem 1.25rem ${alpha(theme.palette.primary.main, 0.7)}`,
            //   backgroundColor: "#7DCEA0",
            backgroundColor: "#000000"
              //    backgroundImage: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          {children}
        </Badge>
      ) : (
        children
      )}
    </IconButton>
  );
};

export default JumboIconButton;
