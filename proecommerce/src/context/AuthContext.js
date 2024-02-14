import React, { createContext, useContext, useReducer } from 'react';
//import { authReducer,initialState } from './authReducer';

const AuthContext = createContext();

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children}) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//export const useAuth = () => useContext(AuthContext);

/*
  const register = async ({ email, username, password, image }) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await fetch("http://10.28.60.29:9091/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          image
        }),
      });
  
      if (!response.ok) {
        // Response'tan gelen hata mesajını kullanabilirsiniz
        const errorText = await response.text();
        throw new Error(errorText || 'Register failed');
      }
  
      const data = await response.json();
      console.log('User registered:', data); // Bu satırı ekleyin ve backend'den gelen yanıtı kontrol edin
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.message });
    }
  };

  const login = async (username, password) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const response = await fetch("http://10.28.60.29:9091/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(state.currentUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data});
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };
*/
/*


  const logout = () => {
    // Logout işlemi için örnek:
    dispatch({ type: 'LOGOUT' });
    // Burada token'ı localStorage'dan silmek gibi işlemler yapılabilir
  };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

case 'REGISTER_SUCCESS':
      return { ...state, currentUser: action.payload, loading: false };
    case 'REGISTER_ERROR':
      return { ...state,  error: action.payload, loading: false };
    case 'AUTH_LOADING':
      return { ...state, loading: true, error: null };
*/