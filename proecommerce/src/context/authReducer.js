export const initialState = {
    currentUser: null,
    loading: true,
    error: null,
  };
  
  export const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return { 
                ...state, 
                currentUser: action.payload, 
                loading: false 
                };
        case 'REGISTER_ERROR':
           return {
             ...state, 
             error: action.payload, 
             loading: false 
            };
        case 'LOGIN_SUCCESS':
            return {
            ...state,
            currentUser: action.payload,
            loading: false,
            };
        case 'LOGOUT':
            return {
            ...state,
            currentUser: null,
            };
        case 'AUTH_LOADING':
            return {
            ...state,
            loading: true,
            };
        case 'AUTH_ERROR':
            return {
            ...state,
            error: action.payload,
            loading: false,
            };
        default:
            return state;
    }
  };
