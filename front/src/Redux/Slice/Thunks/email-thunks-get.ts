import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorServerResponse, LetterByIdResponse, ListLettersResponse} from "../../../Types/typesServerResponse";
import {AxiosError} from "axios";
import {instance} from "../email-slice";

//GET ALL LETTERS
export const getLettersThunkCreate = createAsyncThunk<ListLettersResponse & ErrorServerResponse, string, { rejectValue: string }>('email/getInputLettersThunkCreate', async (linkType, {rejectWithValue}) => {
    try {
        const response = await instance.get(`get/filter/${linkType}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})
//GET LETTER BY ID
export const getLetterByIdThunkCreate = createAsyncThunk<LetterByIdResponse, string, { rejectValue: string }>('email/getLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.get(`get/letter/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;

    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

export const searchLetterThunkCreate = createAsyncThunk<ListLettersResponse & ErrorServerResponse, string, { rejectValue: string }>('email/searchLetterThunkCreate', async (searchString,{rejectWithValue} ) => {
    try {
        const response = await instance.post(`get/search`, {searchString});
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return  rejectWithValue(err.message);
    }
})
