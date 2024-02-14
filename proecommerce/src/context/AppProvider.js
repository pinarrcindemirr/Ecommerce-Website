import React, { createContext, useReducer, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const AuthProvider = createContext();

export const AppProvider = ({ children, reducer, initialState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider.Provider value={useReducer(reducer, initialState)}>
        {children}
      </AuthProvider.Provider>
    </QueryClientProvider>
  );
};

export const useGlobalState =()=> useContext(AuthProvider);