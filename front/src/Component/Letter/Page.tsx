import React, {useState} from "react";
import p from "./Letter.module.css";
import {LetterSettings} from "./DisplayTools/LetterSettings";
import {ILetter} from "./Letter";
import l from "./Letter.module.css";
import {setFlagLetterByIdThunkCreate} from "../../Redux/Slice/Thunks/email-thunks-add";
import {useAppDispatch} from "../../hook";
import {LetterSettingsPage} from "./DisplayTools/LetterSettingsPage";

interface IPage {
    linkType :string
}

const Page: React.FC<IPage & ILetter> = ({linkType, title, data, text, is_flag, sender, id}: IPage & ILetter) => {
    const [flag, setFlag] = useState(is_flag);
    const dispatch = useAppDispatch();

    return (
        <div className={p.main_letter_box}>
            <LetterSettingsPage linkType={linkType}/>
            <div className={p.page_wrapper}>
                <div className={p.title_letter_page}>
                    <h2>{title}</h2>
                    <p className={flag? l.flag: l.no_flag} onClick={()=>{
                        setFlag(!flag);
                        dispatch(setFlagLetterByIdThunkCreate(id))}
                    }>{is_flag}</p>
                </div>
                <div className={p.sender}>
                    <span>from <h3>{sender}</h3></span>
                    <p>{data}</p>
                    <span>to <h3>YOU</h3></span>
                </div>
                <div className={p.letter_text}>
                    <p>{text}</p>
                   </div>
            </div>
        </div>
    )
}
export {Page};
