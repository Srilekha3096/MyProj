import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import JumboApp from "@jumbo/components/JumboApp";
import AppLayout from "./AppLayout";
import JumboTheme from "@jumbo/components/JumboTheme";
import AppRoutes from "./AppRoutes";
import configureStore, { history } from './redux/store';
import JumboDialogProvider from "@jumbo/components/JumboDialog/JumboDialogProvider";
import AppProvider from "./AppProvider";
import { config } from "./config/main";
import JumboRTL from "@jumbo/JumboRTL/JumboRTL";
import { fetchDateFormater } from "./redux/actions/fetchDateFormater";
import { fetchUserRolePermissions } from "./redux/actions/fetchUserRolePermissions";
import { ERPCustomLoader } from "./shared/ReuseComponents/StyledComponents";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const store = configureStore();

const token = localStorage.getItem("accesstoken");
const designation = localStorage.getItem("Designation");

store.dispatch(fetchDateFormater());
store.dispatch(fetchUserRolePermissions(token, designation));


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter history={history}>
                    <AppProvider>
                        <JumboApp activeLayout={config.defaultLayout}>
                            <JumboTheme init={config.theme}>
                                <JumboRTL>
                                    <JumboDialogProvider>
                                        {/* <JumboDialog /> */}
                                        <AppLayout>
                                            <Suspense fallback={<ERPCustomLoader />}>
                                                <AppRoutes />
                                            </Suspense>
                                        </AppLayout>
                                    </JumboDialogProvider>
                                </JumboRTL>
                            </JumboTheme>
                        </JumboApp>
                    </AppProvider>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
