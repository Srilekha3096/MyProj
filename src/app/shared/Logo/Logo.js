import React from "react";
import "./Logo.css";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { ASSET_IMAGES } from "../../utils/constants/paths";

const Logo = ({ mini, mode, sx }) => {

  const getImageSrc = (isMini, themeMode) => {
    if (isMini) {
      return themeMode === "light"
        ? `${ASSET_IMAGES}/test1.jpg`
        : `${ASSET_IMAGES}/mainlogo-icon-white.jpg`;
    } else {
      return themeMode === "light"
        // ? `${ASSET_IMAGES}/test1.png`
        ? `${ASSET_IMAGES}/test1.jpg`  // Public=>images=>BoltLogo.png
        : `${ASSET_IMAGES}/test1.jpg`; // Public=>images=>BoltLogo.png
        // ? `${ASSET_IMAGES}/BoltLogo.png`  // Public=>images=>BoltLogo.png
        // : `${ASSET_IMAGES}/BoltLogo.png`; // Public=>images=>BoltLogo.png
    }
  };

  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link href="/home">
        <img
          className={mini ? "short-logo" : "full-logo"}
          src={getImageSrc(mini, mode)}
          width={mini ? 50 : 140}
          height={mini ? 60 : 80}
          alt="ABC logo"
        />
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
