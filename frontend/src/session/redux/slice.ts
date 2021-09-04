import { createSlice } from "@reduxjs/toolkit";
import { fetchSession } from "./actions";

enum LoadingStatuses {
    Idle = "idle",
    Pending = "pending",
    Succeeded = "succeeded",
    Failed = "failed",
}

export interface SessionState {
    currentUser: unknown; // TODO
    error: unknown;
    loading: LoadingStatuses;
}

const initialState: SessionState = {
    currentUser: null,
    error: null,
    loading: LoadingStatuses.Idle,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSession.pending, (state) => {
            state.loading = LoadingStatuses.Pending;
        });
        builder.addCase(fetchSession.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = LoadingStatuses.Succeeded;
        });
        builder.addCase(fetchSession.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = LoadingStatuses.Failed;
        });
    },
});

export default sessionSlice.reducer;
