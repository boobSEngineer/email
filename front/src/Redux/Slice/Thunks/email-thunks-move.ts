import {createAsyncThunk} from "@reduxjs/toolkit";
import {DeleteLetterResponse} from "../../../Types/typesServerResponse";
import {AxiosError} from "axios";
import {instance} from "../email-slice";


//NEW LETTER
export const setNewLetterThunkCreate = createAsyncThunk<void, {title: string, text : string, sender : string}>('email/setNewLetterThunkCreate', async ({title, text, sender}, {rejectWithValue}) => {
    try {
        const response = await instance.post(`move/new_letter`, {title, text, sender});
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

//DELETE LETTER FOREVER

export const deleteLetterByIdThunkCreate = createAsyncThunk<DeleteLetterResponse, string, { rejectValue: string }>('email/deleteLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`move/delete_letter/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})
