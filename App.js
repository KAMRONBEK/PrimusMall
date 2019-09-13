/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Navigation from './navigation/AppNavigator';
import NavigationService from './services/NavigationServices';

const App = () => {
  return (
    <Navigation
      ref={ref => {
        NavigationService.setTopLevelNavigator(ref);
      }}
    />
  );
};

export default App;
