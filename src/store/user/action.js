import { apiCallBegan } from "../api";
import { uiAction } from "../user/reducer";

const url = "/clients/login";

export const login = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "POST",
      data: {
        email: "client@mail.com",
        password: "client@123",
      },
      onStart: uiAction.apiRequested.type,
      onSuccess: uiAction.apiReceived.type,
      onError: uiAction.apiRequestFailed.type,
    })
  );
};
