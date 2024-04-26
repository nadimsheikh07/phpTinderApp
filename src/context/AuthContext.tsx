import {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import * as React from 'react';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthStateType {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
}

export type AuthContextType = {
  authState: AuthStateType;
  setAuthState: (authState: AuthStateType) => void;
  getAccessToken: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const {Provider} = AuthContext;

const AuthProvider = ({children}: AuthProviderProps) => {
  const [authState, setAuthState] = useState({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
