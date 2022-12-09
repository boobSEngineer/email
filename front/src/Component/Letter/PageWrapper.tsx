import React from "react";
import {useAppSelector} from "../../hook";
import {useParams} from "react-router-dom";
import {LetterStateType} from "../../Types/typesServerResponse";
import {Page} from "./Page";
import p from "./Letter.module.css";

interface IPageWrapper {
    linkType: string
}

const PageWrapper: React.FC<IPageWrapper> = ({linkType}: IPageWrapper) => {
    const list = useAppSelector(state => state.email.listLetter);
    const {id} = useParams();


    return (
        <>
            {
                list[linkType as LetterStateType].length > 0 ?
                    list[linkType as LetterStateType].map(w => {
                    if (w.id == id) return <Page linkType={linkType} {...w} />
                })
                    : <div className={p.main_letter_box}> <p className={p.not_found}>not found</p></div>
            }
        </>
    )
};
export {PageWrapper}
