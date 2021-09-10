import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import sessionReducer from "@/session/redux/slice";
import uiReducer from "@/ui/redux/slice";
import { Env } from "@/utils/wrappers/Env";

const env = new Env();

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => ((!env.isProduction())
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
