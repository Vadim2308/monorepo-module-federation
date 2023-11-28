import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
import React, {Suspense} from "react";
import {About} from "@/pages/About";
import {adminRoutes} from "@packages/shared/src/routes/admin";

const NotFound = () => <div>Not Found</div>

const routes = [
    {
        path: "/admin",
        element: <App/>,
        errorElement: <NotFound />,
        children:[
            {
                path:adminRoutes.main,
                element:<Suspense fallback='Loading...'><About/></Suspense>,
            }
        ]
    },
]

export const router = createBrowserRouter(routes);
export default routes
