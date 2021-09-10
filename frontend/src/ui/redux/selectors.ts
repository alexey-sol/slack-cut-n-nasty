import { RootState } from "@/app/store";

export const checkIfLoading = (state: RootState, ...actionNamesToCheck: string[]): boolean => state
    .ui.loader.actions.some((action) => actionNamesToCheck.includes(action.name));

export const checkIfRefreshing = (state: RootState, actionNameToCheck: string): boolean => state
    .ui.loader.refreshing.some((action) => action === actionNameToCheck);
