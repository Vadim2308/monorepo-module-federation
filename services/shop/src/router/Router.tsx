import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
import React, {Suspense} from "react";
import {Shop} from "@/pages/Shop";
import {shopRoutes} from "@packages/shared/src/routes/shop";
import {UserCard} from "@packages/shared/src/components/UserCard/UserCard";

const NotFound = () => <div>Not Found</div>

const routes = [
    {
        path: "/shop",
        element: <App/>,
        errorElement: <NotFound />,
        children:[
            {
                path:shopRoutes.main,
                element:<Suspense fallback='Loading...'><Shop/></Suspense>,
            },
            {
                path:shopRoutes.basket,
                element:<Suspense fallback='Loading...'>
                    <div style={{marginLeft:'100px'}}>
                      Basket:<UserCard/>
                    </div>
                </Suspense>,
            }
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes;