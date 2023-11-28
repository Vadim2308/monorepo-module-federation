import React, {FC, useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import AvatarPng from '@/assets/avatar.png'
import AvatarJpg from '@/assets/avatar.jpg'
import AvatarSVG from '@/assets/app-image.svg'
import {shopRoutes} from "@packages/shared/src/routes/shop";

export const App: FC = () => {
    return (
        <>
            <div>This is shop</div>
            <Link to={shopRoutes.basket}>Go to Basket</Link>
            <Outlet/>
        </>
    );
};