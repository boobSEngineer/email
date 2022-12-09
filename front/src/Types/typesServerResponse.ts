import {LetterItem} from "./typesState";

export type ListLettersResponse = {
    //[key in LetterStateType]? : LetterItem[]
    inbox?: LetterItem[],
    sent?: LetterItem[],
    starred?: LetterItem[],
    trash?: LetterItem[],
    spam?: LetterItem[],
    search?: LetterItem[],

}

export type DeleteLetterResponse = {
    success: boolean,
    message: string,
}

export type DataWithMoreIdResponse = {
    dataIdSuccess: {
        [k: string]: {
            success: boolean,
            message: string,
            is_trash?: boolean,
            is_spam?: boolean,
            is_flag?: boolean,
            is_read?: boolean,
        }
    }
}


export type LetterByIdResponse = {
    inbox: LetterItem,
    is_read: boolean,
}

export type ErrorServerResponse = {
    success?: boolean,
    message?: string,
}


export type LetterStateType = "inbox" | "sent" | "starred" | "trash" | "spam"
