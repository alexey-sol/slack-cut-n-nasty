import { createSlice } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import { startAction, stopAction } from "./actions";

export interface Action {
    name: string;
    params: unknown;
}

export interface UiState {
    loader: {
        actions: Action[];
        refreshing: unknown[];
    }
}

const initialState: UiState = {
    loader: {
        actions: [],
        refreshing: [],
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startAction, (state, { payload }) => {
            state.loader.actions.push(payload.action);
        });
        builder.addCase(stopAction, (state, { payload }) => {
            state.loader.actions = state.loader.actions.filter((currentAction) => {
                if (currentAction.name !== payload.action.name) {
                    return true;
                } else if (!isEqual(currentAction.params, payload.action.params)) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    },
});

export default uiSlice.reducer;
