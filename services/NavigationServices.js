import React from 'react';
import {NavigationActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack() {
  console.warn(_navigator);
}

function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

// add other navigation functions that you need and export them

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  toggleDrawer,
  getActiveRouteName,
};
