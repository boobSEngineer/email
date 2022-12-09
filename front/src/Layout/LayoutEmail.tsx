import React from "react";
import {Link, Outlet} from "react-router-dom";

import l from "./Layout.module.css";

import {Header} from "../Component/Header/Header";
import {Navbar} from "../Component/Navbar/Navbar";

import NewLetter from "../Component/Letter/NewLetter/NewLetter";

const LayoutEmail = () => {

    return (
        <div className={l.main}>
            <Header/>
            <div className={l.wrapper}>
                <Navbar/>
                <Outlet/>
            </div>
            <NewLetter/>
            {/*<footer></footer>*/}
        </div>
    )
}
export {LayoutEmail};
