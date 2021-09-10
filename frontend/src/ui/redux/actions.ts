import { createAction } from "@reduxjs/toolkit";
import { START_ACTION, STOP_ACTION } from "./types";

export const startAction = createAction(START_ACTION, (name: string, params?: unknown) => ({
    payload: { name, params },
}));

export const stopAction = createAction(STOP_ACTION, (name: string, params?: unknown) => ({
    payload: { name, params },
}));
