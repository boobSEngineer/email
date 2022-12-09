import React, {useState} from "react";
import h from "./Header.module.css";
import {useAppDispatch, useAppSelector} from "../../hook";
import {searchLetterThunkCreate} from "../../Redux/Slice/Thunks/email-thunks-get";
import {removeSearch} from "../../Redux/Slice/email-slice";

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();
    const searchList = useAppSelector(state => state.email.listLetter.search);


    return (
        <header className={h.header}>
            <div className={h.logo}>
                <button className={h.logo_button}>≡</button>
                <h1>Email</h1>
            </div>
            <div className={h.search}>
                <div className={h.input_with_img}>
                    <p>🔍</p>
                    <input onBlur={()=> {
                        setOpen(false)
                        dispatch(removeSearch())
                    } } onClick={()=>setOpen(true)} onChange={(e)=>{
                        dispatch(searchLetterThunkCreate(e.target.value))
                    }} placeholder="search..."/>
                    <p className={h.input_with_img_close}>✖</p>
                </div>
            </div>
            <div className={h.person}>
                <p>☻</p>
                <p>User</p>
            </div>
            <div className={h.popup_search + (open ? " " + h.open : "")}>
                {searchList.length > 0 ? searchList.map(s => (
                    <div className={h.popup_search_line}>
                        <p className={h.convert}>✉</p>
                        <div className={h.search_box}>
                            <div className={h.search_up}>
                                <h2>{s.title}</h2>
                                <p>{s.data}</p>
                            </div>
                            <p className={h.sender}>{s.sender}</p>
                        </div>


                    </div>
                ))
                    : <div className={h.popup_warning}><p>Input word for searching</p></div>
                }
            </div>
        </header>
    )
}
export {Header};
