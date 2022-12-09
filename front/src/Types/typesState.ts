export type LetterItem = {
    id: string,
    title: string,
    text: string,
    data: string,
    is_flag: boolean,
    is_read: boolean,
    sender: string,
}
/*-------------------------initial state-----------------------------*/

export type DataForMoreId = { [k: string]: { success: boolean, is_read: boolean, message: string } }

export type LetterState = {
    letter: LetterItem | null,
    listLetter: {
        // [key in LetterStateType] : LetterItem[]
        inbox: LetterItem[],
        sent: LetterItem[],
        starred: LetterItem[],
        trash: LetterItem[],
        spam: LetterItem[],
        search:LetterItem[],
    },
    selectId: string[],
    dataIdSuccess: DataForMoreId,
}
export type ServerState = {
    linkType: string,
    status: string,
    error: string | undefined,
    fetching: boolean,
}

