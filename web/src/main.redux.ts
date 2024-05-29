type ToastData = {
  id: string;
  severity: "success" | "error";
  summary: string;
};
export type MainState = {
  toasts: ToastData[];
};
export const initialMainState: MainState = {
  toasts: [],
};

export enum MainActionType {
  ADD_TOAST,
}

export type MainAction = {
  type: MainActionType.ADD_TOAST;
  payload: ToastData;
};

export function mainReducer(
  state: MainState = initialMainState,
  action: MainAction
): MainState {
  switch (action.type) {
    case MainActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    default:
      return state;
  }
}
