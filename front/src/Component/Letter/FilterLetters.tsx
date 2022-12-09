import React, {useEffect, useMemo} from "react";
import {useAppSelector, useAppDispatch} from "../../hook";


import {ListLetters} from "./ListLetters";
import {LetterStateType} from "../../Types/typesServerResponse";
import {getLettersThunkCreate} from "../../Redux/Slice/Thunks/email-thunks-get";
interface IPath {
    linkType: string,
}

const FilterLetters: React.FC<IPath> = ({linkType}:IPath) => {
    const list = useAppSelector(state => state.email.listLetter);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if (linkType.length > 1) {
            dispatch(getLettersThunkCreate(linkType));
        }
    }, [linkType]);

    return (
        <>
            <ListLetters linkType={linkType} filterLetter={list[linkType as LetterStateType] || []}/>
        </>
    )
}

export default React.memo(FilterLetters);
