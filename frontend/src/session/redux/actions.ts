import { startAction, stopAction } from "@/ui/redux/actions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { querySession } from "../api";
import { FETCH_SESSION } from "./types";

type Session = unknown;

export const fetchSession = createAsyncThunk<Session>(
    FETCH_SESSION,
    async (payload, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        try {
            dispatch(startAction(FETCH_SESSION));
            const response = await querySession();
            return response.data;
        } catch (error) {
            rejectWithValue(error);
        } finally {
            dispatch(stopAction(FETCH_SESSION));
        }
    },
);
