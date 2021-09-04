import { createAsyncThunk } from "@reduxjs/toolkit";
import { querySession } from "../api";

export const fetchSession = createAsyncThunk(
    "session/fetchSession",
    async () => {
        const response = await querySession();
        return response.data;
    },
);
