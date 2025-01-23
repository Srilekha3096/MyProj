import React, { useCallback } from "react";
import "./ThemeSetting.css";
import ReactDOM from "react-dom";
import Fab from "@mui/material/Fab";
import useApp from "../../hooks/useApp";

const JumboCustomizerButton = () => {
  const { customizerVisibility, setCustomizerVisibility } = useApp();

  const toggleCustomizerVisibility = useCallback(() => {
    setCustomizerVisibility(!customizerVisibility);
  }, [setCustomizerVisibility, customizerVisibility]);

  return ReactDOM.createPortal(
    <Fab
      size={"medium"}
      color="primary"
      aria-label="add"
      onClick={toggleCustomizerVisibility}
      sx={{
        position: "fixed",
        // top: 130, //change 150px to 130px 
        top: 75,    // change 130 to 80 on 22-07-2023
        right: 0,
        zIndex: 101,
        width: 50,
        height: 44,
        p: (theme) => theme.spacing(1, 1, 1, 1.5),
        border: "1px solid #2A2C2D",
        // boxShadow: "inset 0px 0px 1px 1px #00BFFF",
        borderRight: "none",
        borderRadius: "24px 0 0 24px",
        backgroundImage: (theme) =>
          `linear-gradient(-135deg, #FFFFFF, #FFFFFF )`,

        "&:hover": {
          border: "none",
          backgroundImage: (theme) =>
            `linear-gradient(-135deg, #7352C7 , #2E86C1  )`,
        },

        // backgroundImage: (theme) =>
        //   `linear-gradient(-135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

        // "&:hover": {
        //   backgroundImage: (theme) =>
        //     `linear-gradient(-135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        // },
      }}
    >
      <img
        className="rotate-img"
        src="./../../../../images/test1.jpg"
        alt="ABC"
        width={23}
        height={23}
        sx={{
          animation: "move 2s infinite linear",

          "@keyframes move": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      />

      {/* <img
        className="main-logo-icon"
        sx={{
          animation: "move 2s infinite linear",

          "@keyframes move": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      /> */}
    </Fab>,
    document.getElementsByTagName("body")[0]
  );
};

export default JumboCustomizerButton;
