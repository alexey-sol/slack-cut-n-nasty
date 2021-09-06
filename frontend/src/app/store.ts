import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@/session/redux/slice";
import uiReducer from "@/ui/redux/slice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// TODO: https://redux.js.org/usage/configuring-your-store#simplifying-setup-with-redux-toolkit
