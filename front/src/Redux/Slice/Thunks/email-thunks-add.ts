import {createAsyncThunk} from "@reduxjs/toolkit";
import {DataWithMoreIdResponse, ErrorServerResponse} from "../../../Types/typesServerResponse";
import {AxiosError} from "axios";
import {instance} from "../email-slice";

//ALL READ
export const setReadLetterByIdThunkCreate = createAsyncThunk<DataWithMoreIdResponse & ErrorServerResponse, string, { rejectValue: string }>('email/setReadLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`add/read/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

//READ NOT READ
export const setNoReadLetterByIdThunkCreate = createAsyncThunk<DataWithMoreIdResponse & ErrorServerResponse, string, { rejectValue: string }>('email/setNoReadLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`add/no_read/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

//IN FLAG
export const setFlagLetterByIdThunkCreate = createAsyncThunk<DataWithMoreIdResponse & ErrorServerResponse, string, { rejectValue: string }>('email/setFlagLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`add/starred/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

//IN SPAM
export const setSpamLetterByIdThunkCreate = createAsyncThunk<DataWithMoreIdResponse & ErrorServerResponse, string, { rejectValue: string }>('email/setSpamLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`add/spam/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

//IN BIN
export const setTrashLetterByIdThunkCreate = createAsyncThunk<DataWithMoreIdResponse & ErrorServerResponse, string, { rejectValue: string }>('email/setTrashLetterByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await instance.post(`add/trash/${id}`);
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})
