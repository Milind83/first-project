import Actions from "./action";

const initialState = {
  loading: false,
  users: [],
  error: "",
  data: {},
  addResponse: {},
  roles: [],
  user: [],
  role: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case Actions.FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case Actions.LOGIN_USERS_REQUEST:
      console.log("enter");
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.LOGIN_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case Actions.LOGIN_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    case Actions.ADD_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.ADD_USERS_SUCCESS:
      return {
        loading: false,
        addResponse: action.payload,
        error: "",
      };
    case Actions.ADD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        addResponse: {},
        error: action.payload,
      };

    case Actions.EDIT_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.EDIT_USERS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case Actions.EDIT_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };
    case Actions.FETCH_USERS_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.FETCH_USERS_ROLE_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
        error: "",
      };
    case Actions.FETCH_USERS_ROLE_FAILURE:
      return {
        loading: false,
        roles: [],
        error: action.payload,
      };
    case Actions.ADD_ROLE_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.ADD_ROLE_USERS_SUCCESS:
      return {
        loading: false,
        addResponse: action.payload,
        error: "",
      };
    case Actions.ADD_ROLE_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        addResponse: {},
        error: action.payload,
      };
    case Actions.EDIT_ROLE_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case Actions.EDIT_ROLE_USERS_SUCCESS:
      return {
        loading: false,
        role: action.payload,
        error: "",
      };
    case Actions.EDIT_ROLE_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        role: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
