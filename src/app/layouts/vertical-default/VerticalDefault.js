import React from "react";
import JumboLayout from "@jumbo/components/JumboLayout";
import Sidebar from "../shared/sidebars/Sidebar";
import Footer from "../shared/footers/Footer";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import JumboCustomizer from "../../shared/JumboCustomizer/JumboCustomizer";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { SIDEBAR_STYLES } from "@jumbo/utils/constants";
import { headerTheme as theme4 } from "../../themes/header/theme4";
import { headerTheme as defaultTheme } from "../../themes/header/default";
import useApp from "../../hooks/useApp";
import layoutConfig from "./layoutConfig";
import Header from "../shared/headers/Header";


const VerticalDefault = ({ children }) => {

    const token = localStorage.getItem("accesstoken")
    const { setJumboLayoutOptions } = useJumboLayout();
    const { headerTheme, setHeaderTheme } = useJumboHeaderTheme();
    const { theme } = useJumboTheme();
    const appBarBgColor = headerTheme.components?.MuiAppBar?.styleOverrides?.root?.background;
    const { sidebarOptions } = useJumboLayoutSidebar();
    const appData = useApp();


    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig)
    }, []);



    React.useEffect(() => {
        if (appBarBgColor === "#F5F7FA" && sidebarOptions.style === SIDEBAR_STYLES.FULL_HEIGHT) {
            setHeaderTheme({ ...theme, ...theme4 });
            appData.setAppState({
                prevHeaderBgColor: theme?.mode === "dark" ? "#222D45" : "#F5F7FA",
            });
        } else if (appData.prevHeaderBgColor && appData.prevHeaderBgColor === "#F5F7FA") {
            setHeaderTheme({ ...theme, ...defaultTheme });
        }

    }, [sidebarOptions.style]);


    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     }
    // }, [navigate, token]);


    return (
        <JumboLayout
            header={token && <Header />}
            sidebar={token && <Sidebar />}
            footer={<Footer sidebarOptions={sidebarOptions} />}
            headerSx={{
                height: 70,
                backgroundColor: theme?.mode === "dark" ? "#222D45" : "#FFFFFF",
                boxShadow: theme?.mode === "dark" ? "0px 0px 1px #FFFFFF" : "0px 0px 1px #222D45"
            }}
        >
            {children}
            <JumboCustomizer />
        </JumboLayout>
    );
};

export default VerticalDefault;
