import axios from "axios";

const Actions = {
  FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",

  LOGIN_USERS_REQUEST: "LOGIN_USERS_REQUEST",
  LOGIN_USERS_SUCCESS: "LOGIN_USERS_SUCCESS",
  LOGIN_USERS_FAILURE: "LOGIN_USERS_FAILURE",

  ADD_USERS_REQUEST: "ADD_USERS_REQUEST",
  ADD_USERS_SUCCESS: "ADD_USERS_SUCCESS",
  ADD_USERS_FAILURE: "ADD_USERS_FAILURE",

  EDIT_USERS_REQUEST: "EDIT_USERS_REQUEST",
  EDIT_USERS_SUCCESS: "EDIT_USERS_SUCCESS",
  EDIT_USERS_FAILURE: "EDIT_USERS_FAILURE",

  //USER ROLE
  FETCH_USERS_ROLE_REQUEST: "FETCH_USERS_ROLE_REQUEST",
  FETCH_USERS_ROLE_SUCCESS: "FETCH_USERS_ROLE_SUCCESS",
  FETCH_USERS_ROLE_FAILURE: "FETCH_USERS_ROLE_FAILURE",

  ADD_ROLE_USERS_REQUEST: "ADD_ROLE_USERS_REQUEST",
  ADD_ROLE_USERS_SUCCESS: "ADD_ROLE_USERS_SUCCESS",
  ADD_ROLE_USERS_FAILURE: "ADD_ROLE_USERS_FAILURE",

  EDIT_ROLE_USERS_REQUEST: "EDIT_ROLE_USERS_REQUEST",
  EDIT_ROLE_USERS_SUCCESS: "EDIT_ROLE_USERS_SUCCESS",
  EDIT_ROLE_USERS_FAILURE: "EDIT_ROLE_USERS_FAILURE",
};

export const fetchUsers = (currentPage, itemPerPage) => {
  console.log(currentPage);
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    await axios
      .post(
        "http://devapi.azaonline.in/api/clients/get_all_users",
        {
          offset: currentPage,
          limit: itemPerPage,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        // response.data is the users
        const users = response.data;
        dispatch(fetchUsersSuccess(users.results));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const searchAdminUser = (data, offset, limit) => {
  const requestdata = {
    id: data.id,
    userType: data.userType,
    fullName: data.fullName,
    email: data.email,
    loginName: "",
    offset: offset,
    limit: limit,
  };
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    await axios
      .post(`http://devapi.azaonline.in/api/clients/user_search`, requestdata, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const users = response.data;
        dispatch(fetchUsersSuccess(users.results));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const loginUsers = (email, password) => {
  return async (dispatch) => {
    dispatch(loginUsersRequest());
    await axios
      .post("http://devapi.azaonline.in/api/clients/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // response.data is the users
        const users = response.data?.results;
        if (users) {
          localStorage.setItem("accessToken", users?.token);
          localStorage.setItem("fullName", users?.data?.fullName);
          localStorage.setItem("email", users?.data?.email);
          localStorage.setItem("userType", users?.data?.userType);
          dispatch(loginUsersSuccess(users));
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        // error.message is the error message
        if (error.response?.data) {
          dispatch(loginUsersFailure(error.response?.data?.message));
        } else {
          dispatch(loginUsersFailure("Something went wrong please try again."));
        }
      });
  };
};

export const addUser = (data) => {
  return async (dispatch) => {
    dispatch(addUsersRequest());
    await axios
      .post("http://devapi.azaonline.in/api/clients/create_admin_user", data, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(addUsersSuccess(res));
      })
      .catch((error) => {
        // error.message is the error
        if (error.response?.data) {
          dispatch(addUsersFailure(error.response?.data?.message));
        } else {
          dispatch(addUsersFailure("Something went wrong please try again."));
        }
      });
  };
};

export const editUser = (id, data) => {
  return async (dispatch) => {
    dispatch(addUsersRequest());
    await axios
      .put("http://devapi.azaonline.in/api/clients/edit_user?userId=" + id, data, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(addUsersSuccess(res));
      })
      .catch((error) => {
        // error.message is the error
        if (error.response?.data) {
          dispatch(addUsersFailure(error.response?.data?.message));
        } else {
          dispatch(addUsersFailure("Something went wrong please try again."));
        }
      });
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch(editUsersRequest());
    await axios
      .get("http://devapi.azaonline.in/api/clients/get_user_by_id?id=" + id, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(editUsersSuccess(res));
      })
      .catch((error) => {
        // error.message is the error
        if (error.response?.data) {
          dispatch(editUsersFailure(users.results));
        } else {
          dispatch(editUsersFailure(error.message));
        }
      });
  };
};

export const fetchUserRoles = (offset, limit) => {
  return (dispatch) => {
    dispatch(fetchUserRoleRequest());
    axios
      .post(
        "http://devapi.azaonline.in/api/clients/get_all_usertype",
        {
          offset: offset,
          limit: limit,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        // response.data is the users
        const users = response.data.results;
        dispatch(fetchUserRoleSuccess(users));
      })
      .catch((error) => {
        // error.message is the error message
        if (error.response?.data) {
          dispatch(fetchUserRoleFailure(error.response?.data?.message));
        } else {
          dispatch(fetchUserRoleFailure("Something went wrong please try again."));
        }
      });
  };
};

export const addUserRole = (data) => {
  return async (dispatch) => {
    dispatch(addUserRoleRequest());
    await axios
      .post("http://devapi.azaonline.in/api/clients/add_user_role", data, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(addUserRoleSuccess(res));
      })
      .catch((error) => {
        console.log(error);
        // error.message is the error message
        if (error && error?.response?.data) {
          dispatch(addUserRoleFailure(error.response?.data?.message));
        } else {
          dispatch(addUserRoleFailure("Something went wrong please try again."));
        }
      });
  };
};

export const editUserRole = (id, data) => {
  return async (dispatch) => {
    dispatch(addUserRoleRequest());
    await axios
      .put("http://devapi.azaonline.in/api/clients/edit_user_role?roleAID=" + id, data, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(addUserRoleSuccess(res));
      })
      .catch((error) => {
        console.log(error);
        // error.message is the error message
        if (error && error?.response?.data) {
          dispatch(addUserRoleFailure(error.response?.data?.message));
        } else {
          dispatch(addUserRoleFailure("Something went wrong please try again."));
        }
      });
  };
};

export const getUserRoleById = (id) => {
  return async (dispatch) => {
    dispatch(editUserRoleRequest());
    await axios
      .get("http://devapi.azaonline.in/api/clients/get_user_role_by_id?roleAID=" + id, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const res = response.data;
        dispatch(editUserRoleSuccess(res));
      })
      .catch((error) => {
        // error.message is the error
        if (error.response?.data) {
          dispatch(editUserRoleFailure(users.results));
        } else {
          dispatch(editUserRoleFailure(error.message));
        }
      });
  };
};

export const searchUserRoles = (data, offset, limit) => {
  const requestdata = {
    roleAID: data.id,
    roleName: data.roleName,
    offset: offset,
    limit: limit,
  };
  return (dispatch) => {
    dispatch(fetchUserRoleRequest());
    axios
      .post(`http://devapi.azaonline.in/api/clients/usertype_search`, requestdata, {
        headers: { "x-auth-token": localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // response.data is the users
        const users = response.data.results;
        dispatch(fetchUserRoleSuccess(users));
      })
      .catch((error) => {
        // error.message is the error message
        if (error.response?.data) {
          dispatch(fetchUserRoleFailure(error.response?.data?.message));
        } else {
          dispatch(fetchUserRoleFailure("Something went wrong please try again."));
        }
      });
  };
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  localStorage.removeItem("userType");
};

export const fetchUsersRequest = () => {
  return {
    type: Actions.FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: Actions.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: Actions.FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const loginUsersRequest = () => {
  return {
    type: Actions.LOGIN_USERS_REQUEST,
  };
};

export const loginUsersSuccess = (user) => {
  return {
    type: Actions.LOGIN_USERS_SUCCESS,
    payload: user,
  };
};

export const loginUsersFailure = (error) => {
  return {
    type: Actions.LOGIN_USERS_FAILURE,
    payload: error,
  };
};

export const addUsersRequest = () => {
  return {
    type: Actions.ADD_USERS_REQUEST,
  };
};

export const addUsersSuccess = (res) => {
  return {
    type: Actions.ADD_USERS_SUCCESS,
    payload: res,
  };
};

export const addUsersFailure = (error) => {
  return {
    type: Actions.ADD_USERS_FAILURE,
    payload: error,
  };
};

export const editUsersRequest = () => {
  return {
    type: Actions.EDIT_USERS_REQUEST,
  };
};

export const editUsersSuccess = (res) => {
  return {
    type: Actions.EDIT_USERS_SUCCESS,
    payload: res,
  };
};

export const editUsersFailure = (error) => {
  return {
    type: Actions.EDIT_USERS_FAILURE,
    payload: error,
  };
};

// user roles

export const fetchUserRoleRequest = () => {
  return {
    type: Actions.FETCH_USERS_ROLE_REQUEST,
  };
};

export const fetchUserRoleSuccess = (roles) => {
  return {
    type: Actions.FETCH_USERS_ROLE_SUCCESS,
    payload: roles,
  };
};

export const fetchUserRoleFailure = (error) => {
  return {
    type: Actions.FETCH_USERS_ROLE_FAILURE,
    payload: error,
  };
};

export const addUserRoleRequest = () => {
  return {
    type: Actions.ADD_ROLE_USERS_REQUEST,
  };
};

export const addUserRoleSuccess = (res) => {
  return {
    type: Actions.ADD_ROLE_USERS_SUCCESS,
    payload: res,
  };
};

export const addUserRoleFailure = (error) => {
  return {
    type: Actions.ADD_ROLE_USERS_FAILURE,
    payload: error,
  };
};

export const editUserRoleRequest = () => {
  return {
    type: Actions.EDIT_ROLE_USERS_REQUEST,
  };
};

export const editUserRoleSuccess = (res) => {
  return {
    type: Actions.EDIT_ROLE_USERS_SUCCESS,
    payload: res,
  };
};

export const editUserRoleFailure = (error) => {
  return {
    type: Actions.EDIT_ROLE_USERS_FAILURE,
    payload: error,
  };
};
export default Actions;
