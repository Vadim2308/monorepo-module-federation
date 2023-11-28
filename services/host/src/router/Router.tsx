import {App} from "@/components/App/App";
import React from "react";
import {createBrowserRouter} from "react-router-dom";
// @ts-ignore
import shopRoutes from 'shop/Router'  // cм.конфиг вебпака в каждом микрофронте. shop - name, Routes - exposes
// @ts-ignore
import adminRoutes from 'admin/Router' // cм.конфиг вебпака в каждом микрофронте. shop - name, Routes - exposes
const NotFound = () => <div>Not Found</div>

const routes:Parameters<typeof createBrowserRouter>[number] = [
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound />,
        children:[
            ...shopRoutes,
            ...adminRoutes
        ]
    },
]

export const router = createBrowserRouter(routes);