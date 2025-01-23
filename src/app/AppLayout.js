import React from 'react';
import JumboLayoutProvider from "@jumbo/components/JumboLayout/JumboLayoutProvider";
import JumboContentLayoutProvider from "@jumbo/components/JumboContentLayout/JumboContentLayoutProvider";
import useJumboApp from "@jumbo/hooks/useJumboApp";
import { LAYOUTS } from "./utils/constants/layouts";
import { config } from "./config/main";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { ERPCustomLoader } from './shared/ReuseComponents/StyledComponents';

const AppLayout = (props) => {
    const { activeLayout } = useJumboApp();
    const { isLoading } = useJumboAuth();

    if (!activeLayout) {
        throw Error("AppLayout > No activeLayout is set.");
    }

    const LayoutComponent = React.useMemo(() => {
        const layoutIndex = LAYOUTS.findIndex(layout => layout.name === activeLayout);

        if (layoutIndex >= 0) {
            return LAYOUTS[layoutIndex].component;
        }

        throw Error("No activeLayout is set yet.");
    }, [activeLayout]);

    return (
        <JumboLayoutProvider>
            {
                isLoading
                    ?
                    <ERPCustomLoader />
                    :
                    <LayoutComponent>
                        <JumboContentLayoutProvider
                            layoutOptions={config.defaultContentLayout}
                        >
                            {props.children}
                        </JumboContentLayoutProvider>
                    </LayoutComponent>
            }

        </JumboLayoutProvider>
    );
};

export default AppLayout;
