import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {theme} from './theme';
import {TabNavigator} from './src/navigation/TabNavigator';

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
