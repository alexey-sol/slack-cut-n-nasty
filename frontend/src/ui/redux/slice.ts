import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import { startAction, stopAction } from "./actions";

export interface Action {
    name: string;
    params?: unknown;
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
        builder.addCase(startAction, (state, { payload }: PayloadAction<Action>) => {
            state.loader.actions.push(payload);
        });

        builder.addCase(stopAction, (state, { payload }: PayloadAction<Action>) => {
            state.loader.actions = state.loader.actions.filter((currentAction) => {
                if (currentAction.name !== payload.name) {
                    return true;
                } else if (!isEqual(currentAction.params, payload.params)) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    },
});

export default uiSlice.reducer;
