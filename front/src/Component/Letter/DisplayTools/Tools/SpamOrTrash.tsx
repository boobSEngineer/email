import React from "react";
import {useAppDispatch} from "../../../../hook";
import {
    removeLetterFromState

} from "../../../../Redux/Slice/email-slice";
import {setReadLetterByIdThunkCreate, setSpamLetterByIdThunkCreate} from "../../../../Redux/Slice/Thunks/email-thunks-add";
import {deleteLetterByIdThunkCreate} from "../../../../Redux/Slice/Thunks/email-thunks-move";

interface ISpamData {
    arraySelectId: string[],
    linkType: string
}
interface INameButtons {
    spam: string,
}

const SpamOrTrashTools: React.FC<ISpamData & INameButtons> = ({arraySelectId, linkType, spam}:ISpamData & INameButtons) => {
    const dispatch = useAppDispatch();
    const stringSelectId = arraySelectId.join();

    return (
        <>
            <a onClick={()=>{
                dispatch(setSpamLetterByIdThunkCreate(stringSelectId));
                dispatch(removeLetterFromState({type: linkType, arrayId: arraySelectId}))
            }}>{spam}</a>
            <a onClick={()=>{
                dispatch(deleteLetterByIdThunkCreate(stringSelectId));
                dispatch(removeLetterFromState({type: linkType, arrayId: arraySelectId}))
            }}>Delete forever</a>
            <a onClick={()=>{
                dispatch(setReadLetterByIdThunkCreate(stringSelectId));
            }}>✉</a>
        </>
    )
}

export {SpamOrTrashTools}
