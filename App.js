/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigation from './navigation/AppNavigator';
import NavigationService from './services/NavigationServices';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';
import {SafeAreaView} from 'react-navigation';
import colors from './constants/colors';
import {configureAxios} from './api/api';
import {Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// FBSDK.sdkInitialize();

const App = () => {
  let store = configureStore();
  configureAxios(store);
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.superLightGray}}>
        <Navigation
          ref={ref => {
            NavigationService.setTopLevelNavigator(ref);
          }}
        />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
