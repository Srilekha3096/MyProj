import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { ImHome } from "react-icons/im";

const homemenu = [
  {
    uri: "/home",
    label: "HOME",
    type: "nav-item",
    icon: <ImHome style={{ fontSize: 18, marginLeft: "-15px"}} />,
    // children: [
    //   {
    //     uri: "/home",
    //     label: "Home",
    //     type: "nav-item",
    //     icon: <HomeIcon sx={{ fontSize: 18 }} />,
    //   },
    // ],
  },
];
export default homemenu;
