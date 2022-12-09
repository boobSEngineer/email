import React from "react";
import s from "./Navbar.module.css";
import {Link, NavLink} from "react-router-dom";


let setActive = ({isActive} : {isActive : boolean}) => isActive ? activeNav : {};
let activeNav = {
    'borderTopRightRadius': '15px',
    'borderBottomRightRadius': '15px',
    'backgroundColor': '#e5e5e5',
}

const Navbar: React.FC = () => {

    return (
        <div className={s.settings_box}>
            <div className={s.block}>
                <NavLink to="/inbox" style={setActive}>⇨ Input</NavLink>
                <NavLink to="/sent" style={setActive}>⇦ Output</NavLink>
                <NavLink to="/spam" style={setActive}>⚠ Spam</NavLink>
                <NavLink to="/starred" style={setActive}>☆ Flag</NavLink>
                <NavLink to="/trash" style={setActive}>🗑 Bin</NavLink>
            </div>
        </div>
    )
}
export {Navbar};
