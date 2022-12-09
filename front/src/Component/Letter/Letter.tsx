import React, {useState} from "react";
import l from "./Letter.module.css";
import {useAppDispatch, useAppSelector} from "../../hook";
import {addIdLetter} from "../../Redux/Slice/email-slice";
import {getLetterByIdThunkCreate} from "../../Redux/Slice/Thunks/email-thunks-get";
import {setFlagLetterByIdThunkCreate} from "../../Redux/Slice/Thunks/email-thunks-add";
import {Link} from "react-router-dom";

export interface ILetter {
    id: string,
    title: string,
    text: string,
    data: string,
    is_read: boolean,
    is_flag: boolean,
    sender: string
}

const Letter: React.FC<ILetter> = ({id, title, data, text, is_read, is_flag}) => {
    const [flag, setFlag] = useState(is_flag);
    const [read, setRead] = useState(is_read);



    const dispatch = useAppDispatch();
    const arraySelectId = useAppSelector(state => state.email.selectId);

    const addId = (id: string, variant: string) => {
        dispatch(addIdLetter({id: id, variant: variant}));
    }

    return (
        <div className={read? l.letter_box + ' ' + l.read:l.letter_box} onClick={()=>{
            !read && setRead(true);
            dispatch(getLetterByIdThunkCreate(id))
        }}>
            <div className={l.first}>
                <input style={{cursor: 'pointer'}} type='checkbox' defaultChecked={arraySelectId.indexOf(id) != -1} onClick={()=>{
                    arraySelectId.indexOf(id) != -1 ?  addId(id, 'remove'): addId(id, 'add')
                }}/>
                <button className={flag? l.flag: l.no_flag} onClick={()=>{
                    setFlag(!flag);
                    dispatch(setFlagLetterByIdThunkCreate(id))}
                }/>
            </div>
            <Link to={`${id}`} className={l.second} onClick={()=>{dispatch(addIdLetter({id: id, variant:'add'}))}}>
                <h2 className={read? l.first_title_read + ' ' + l.first_title:l.first_title}>{title}</h2>
                <p className={l.text}>{text}</p>
                <p className={l.data}>{data}</p>
            </Link>
        </div>

    )
}

export {Letter};



