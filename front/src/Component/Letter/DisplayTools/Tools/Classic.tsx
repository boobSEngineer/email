import React from "react";
import {useAppDispatch} from "../../../../hook";
import {
    removeLetterFromState

} from "../../../../Redux/Slice/email-slice";
import {
    setReadLetterByIdThunkCreate,
    setSpamLetterByIdThunkCreate,
    setTrashLetterByIdThunkCreate
} from "../../../../Redux/Slice/Thunks/email-thunks-add";


interface IClassicData {
    arraySelectId: string[],
    linkType: string
}

const ClassicTools: React.FC<IClassicData> = ({arraySelectId, linkType}: IClassicData) => {
    const dispatch = useAppDispatch();
    const stringSelectId = arraySelectId.join();
    return (
        <>
            <a onClick={() => {
                dispatch(setSpamLetterByIdThunkCreate(stringSelectId));
                dispatch(removeLetterFromState({type: linkType, arrayId: arraySelectId}))
            }}>⚠</a>
            <a onClick={()=>{
                dispatch(setTrashLetterByIdThunkCreate(stringSelectId));
                dispatch(removeLetterFromState({type: linkType, arrayId: arraySelectId}))
            }}>🗑</a>
            <a onClick={()=>{
                dispatch(setReadLetterByIdThunkCreate(stringSelectId));
            }}>✉</a>
        </>
    )
}

export {ClassicTools}
