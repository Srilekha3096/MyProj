import { ASSET_AVATARS } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";

// export const authUser = {
//     email: localStorage.getItem("UserDetails"),
//     name: localStorage.getItem("Username"),
//     profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, `60x60`),
//     handle: localStorage.getItem("Username"),
//     job_title: localStorage.getItem("Designation")
// };

export const authUser = {
  email: JSON.parse(localStorage.getItem("UserDetails"))?.email,
  name: JSON.parse(localStorage.getItem("UserDetails"))?.username,
  profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, `60x60`),
  handle: JSON.parse(localStorage.getItem("UserDetails"))?.email,
  job_title: localStorage.getItem("Designation"),
};
