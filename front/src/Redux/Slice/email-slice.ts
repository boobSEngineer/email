import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

import {
    DataWithMoreIdResponse,
    DeleteLetterResponse,
    ErrorServerResponse,
    LetterByIdResponse,
    LetterStateType,
    ListLettersResponse
} from "../../Types/typesServerResponse";
import {DataForMoreId, LetterState, ServerState} from "../../Types/typesState";
import {getLetterByIdThunkCreate, getLettersThunkCreate, searchLetterThunkCreate} from "./Thunks/email-thunks-get";
import {deleteLetterByIdThunkCreate} from "./Thunks/email-thunks-move";
import {
    setFlagLetterByIdThunkCreate,
    setNoReadLetterByIdThunkCreate,
    setReadLetterByIdThunkCreate,
    setSpamLetterByIdThunkCreate, setTrashLetterByIdThunkCreate
} from "./Thunks/email-thunks-add";

const initialState: LetterState & ServerState = {
    letter: null,
    listLetter: {
        inbox: [],
        spam: [],
        sent: [],
        starred: [],
        trash: [],
        search: []
    },
    selectId: [],
    dataIdSuccess: {},
    linkType: '',
    status: '',
    error: '',
    fetching: false,
};


/*-------------------------API for Thunk-----------------------------*/

export const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:4004/api/`,
});


/*-------------------------SLIcE----------------------------*/

export const EmailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        addIdLetter: (state, action: PayloadAction<{ id: string, variant: string }>) => {
            if (action.payload.variant === 'add') {
                state.selectId.push(action.payload.id);
            } else if (action.payload.variant === 'remove') {
                state.selectId = state.selectId.filter(s => s !== action.payload.id)
            }
        },
        addAllIdLetter: (state, action: PayloadAction<string>) => {
            let array = state.listLetter[`${action.payload as LetterStateType}`].map(c => {
                return c.id
            })
            state.selectId = [...array];
        },
        removeAllId: (state,) => {
            state.selectId = [];
        },
        removeLetterFromState: (state, action: PayloadAction<{ type: string, arrayId: string[] }>) => {
            state.listLetter[`${action.payload.type as LetterStateType}`] = state.listLetter[`${action.payload.type as LetterStateType}`].filter(c => {
                for (let id of action.payload.arrayId) {
                    if (c.id == id) {
                        return false
                    }
                }
                return true;
            })
        },
        removeSearch: (state,) => {
            state.listLetter.search = [];
        },
    },

    extraReducers: builder => {
        builder
            .addCase(getLettersThunkCreate.pending, (state, action) => {
                state.status = 'pending';
                state.fetching = true;
            })
            .addCase(getLettersThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.fetching = false;
                state.selectId = [];
                state.listLetter = {...state.listLetter, ...action.payload};
                state.error = action.payload.message;

            })
            .addCase(getLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.letter = {
                    id: action.payload.inbox.id,
                    title: action.payload.inbox.title,
                    text: action.payload.inbox.text,
                    data: action.payload.inbox.data,
                    is_read: action.payload.inbox.is_read,
                    is_flag: action.payload.inbox.is_flag,
                    sender: action.payload.inbox.sender
                }

            })
            .addCase(deleteLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(deleteLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = action.payload.message;
            })
            .addCase(setNoReadLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(setNoReadLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.dataIdSuccess = action.payload.dataIdSuccess as DataForMoreId;
            })
            .addCase(setReadLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(setReadLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.dataIdSuccess = action.payload.dataIdSuccess as DataForMoreId;
            })
            .addCase(setSpamLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(setSpamLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.dataIdSuccess = action.payload.dataIdSuccess as DataForMoreId;
            })
            .addCase(setFlagLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(setFlagLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.dataIdSuccess = action.payload.dataIdSuccess as DataForMoreId;
            })
            .addCase(setTrashLetterByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(setTrashLetterByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.dataIdSuccess = action.payload.dataIdSuccess as DataForMoreId;
            })
            .addCase(searchLetterThunkCreate.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(searchLetterThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.listLetter = {...state.listLetter, ...action.payload};
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.status = 'rejected';
                state.error = action.payload;
            })

    }
});


export const {addIdLetter, addAllIdLetter, removeAllId, removeLetterFromState, removeSearch} = EmailSlice.actions;
export default EmailSlice.reducer;


const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}
