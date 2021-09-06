import { RootState } from "@/app/store";

export const checkIfLoading = (state: RootState, ...actionsToCheck: any) => state
    .ui.loader.actions.some((action) => actionsToCheck.includes(action.name));

export const checkIfRefreshing = (state: RootState, actionToCheck: any) => state
    .ui.loader.refreshing.some((action) => action === actionToCheck);
