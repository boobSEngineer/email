import React from "react";
import {Link, Navigation} from "react-router-dom";

import e from "../Letter.module.css";
import {addAllIdLetter, removeAllId} from "../../../Redux/Slice/email-slice";
import {ClassicTools} from "./Tools/Classic";
import {SpamOrTrashTools} from "./Tools/SpamOrTrash";
import {getLettersThunkCreate} from "../../../Redux/Slice/Thunks/email-thunks-get";
import {useAppDispatch, useAppSelector} from "../../../hook";

interface IListSettings {
    linkType: string,
}

const LetterSettings: React.FC<IListSettings> = ({linkType}: IListSettings) => {
    const dispatch = useAppDispatch();
    const arraySelectId = useAppSelector(state => state.email.selectId);

    return (
        <div className={e.letter_settings}>
            {arraySelectId.length > 0 ?
                <>
                    <a onClick={() => {
                        dispatch(removeAllId());
                    }}>☒</a>
                    {(linkType != 'trash' && linkType != 'spam') &&
                    <ClassicTools arraySelectId={arraySelectId} linkType={linkType}/>}
                    {linkType == 'trash' &&
                    <SpamOrTrashTools arraySelectId={arraySelectId} linkType={linkType} spam={"⚠"}/>}
                    {linkType == 'spam' &&
                    <SpamOrTrashTools arraySelectId={arraySelectId} linkType={linkType} spam={"No spam"}/>}
                </>
                : <a onClick={() => {
                        dispatch(addAllIdLetter(`${linkType}`));
                    }}>☐</a>
            }
            <a onClick={() => {
                dispatch(getLettersThunkCreate(linkType));
            }}>⟳</a>
            <a>...</a>
        </div>

    )
};

export {LetterSettings};
