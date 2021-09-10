import { createSlice } from "@reduxjs/toolkit";
import { fetchSession } from "./actions";

export interface SessionState {
    currentUser: unknown; // TODO
    error: unknown;
    isWaitingForSession: boolean;
}

const initialState: SessionState = {
    currentUser: null,
    error: null,
    isWaitingForSession: true,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSession.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.isWaitingForSession = false;
        });

        builder.addCase(fetchSession.rejected, (state, action) => {
            state.error = action.payload;
            state.isWaitingForSession = false;
        });
    },
});

export default sessionSlice.reducer;
