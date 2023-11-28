import React from 'react'
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "@/router/Router";

const container = createRoot(document.getElementById('root'))

container.render( <RouterProvider router={router} />)