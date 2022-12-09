import React from "react";
import {Link, Navigation, useParams} from "react-router-dom";

import e from "../Letter.module.css";
import {addAllIdLetter, removeAllId} from "../../../Redux/Slice/email-slice";
import {ClassicTools} from "./Tools/Classic";
import {SpamOrTrashTools} from "./Tools/SpamOrTrash";
import {getLettersThunkCreate} from "../../../Redux/Slice/Thunks/email-thunks-get";
import {useAppDispatch, useAppSelector} from "../../../hook";
import {LetterItem} from "../../../Types/typesState";

interface IListSettings {
    linkType: string,
}

const LetterSettingsPage: React.FC<IListSettings> = ({linkType}: IListSettings) => {
    const dispatch = useAppDispatch()
    const arraySelectId = useAppSelector(state => state.email.selectId);


    return (

        <div className={e.letter_settings}>

            <Link to={`/${linkType}`} onClick={() => {
                dispatch(removeAllId());
                dispatch(getLettersThunkCreate(linkType))
            }}>🡄</Link>

            {(linkType != 'trash' && linkType != 'spam') &&
            <ClassicTools arraySelectId={arraySelectId} linkType={linkType}/>}
            {linkType == 'trash' &&
            <SpamOrTrashTools arraySelectId={arraySelectId} linkType={linkType} spam={"⚠"}/>}
            {linkType == 'spam' &&
            <SpamOrTrashTools arraySelectId={arraySelectId} linkType={linkType} spam={"No spam"}/>}

            <a onClick={() => {
                dispatch(getLettersThunkCreate(linkType));
            }}>⟳</a>

            <a>...</a>
        </div>

    )
};

export {LetterSettingsPage};
