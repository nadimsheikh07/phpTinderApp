import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {theme} from './theme';
import {TabNavigator} from './src/navigation/TabNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosProvider';

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <AxiosProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </AxiosProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}

export default App;
