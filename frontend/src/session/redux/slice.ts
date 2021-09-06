import { createSlice } from "@reduxjs/toolkit";
import { fetchSession } from "./actions";

export interface SessionState {
    currentUser: unknown; // TODO
    error: unknown;
}

const initialState: SessionState = {
    currentUser: null,
    error: null,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSession.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
        builder.addCase(fetchSession.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export default sessionSlice.reducer;
