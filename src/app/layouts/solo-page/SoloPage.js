import React from "react";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import layoutConfig from "./layoutConfig";
import JumboLayoutProvider from "@jumbo/components/JumboLayout/JumboLayoutProvider";

const SoloPage = ({ children }) => {
  const { setJumboLayoutOptions } = useJumboLayout();
  console.log("PPPPPPPPPPP", localStorage.getItem("accesstoken"))
 
  React.useEffect(() => {
    setJumboLayoutOptions(layoutConfig);
  }, []);

  return (
    <JumboLayoutProvider>
      {children}
    </JumboLayoutProvider>
  );
};

export default SoloPage;
