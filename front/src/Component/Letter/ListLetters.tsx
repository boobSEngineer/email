import React from "react";


import {Letter} from "./Letter";
import e from "./Letter.module.css";
import {LetterItem} from "../../Types/typesState";
import {LetterSettings} from "./DisplayTools/LetterSettings";

interface IListLetter {
    filterLetter: LetterItem[];
    linkType: string,
}

const ListLetters: React.FC<IListLetter> = ({filterLetter, linkType}: IListLetter) => {


    return (
        <div className={e.main_letter_box}>
            <LetterSettings linkType={linkType}/>
            <div className={e.letter_scroll}>
                {filterLetter.length > 0 && filterLetter.map(l => {
                        return <Letter key={l.id} {...l}/>
                    }
                )}
            </div>
        </div>
    )
};

export {ListLetters};
