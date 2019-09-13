import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Home from '../screens/Home';
import Main from '../screens/Main';
import Catalog from '../screens/Catalog';
import Profile from '../screens/Profile';
import Favorite from '../screens/Favorite';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Header from '../components/Header';
import Basket from '../screens/Basket';
import Icon from '../constants/icons';
import ProductPage from '../screens/ProductPage';
import Checkout from '../screens/Checkout';
import Checkout_2 from '../screens/Checkout_2';
import Checkout_3 from '../screens/Checkout_3';
import Checkout_4 from '../screens/Checkout_4';
import Checkout_5 from '../screens/Checkout_5';
import Checkout_6 from '../screens/Checkout_6';
import Shop from '../screens/Shop';
import DrawerContent from '../components/DrawerContent';
import Filter from '../screens/Filter';
import ShopPage from '../screens/ShopPage';

import colors from '../constants/colors';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import strings from '../localization/strings';

const MainStack = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
  },
  {},
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="home" size={25} />;
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="user-alternative" size={25} />;
        },
      },
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="heart-empty" size={25} />;
        },
      },
    },
    Catalog: {
      screen: Catalog,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="list-sort" size={25} />;
        },
      },
    },
  },
  {
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: colors.superLightGray,
        elevation: 0,
      },
      tabStyle: {},
      showLabel: false,
      indicatorStyle: {
        top: 0,
        width: 50,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: colors.red,
        height: 3,
      },
    },
    tabBarPosition: 'bottom',
  },
);

const CheckoutStack = createStackNavigator({
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      header: null,
    },
  },
  Checkout_2: {
    screen: Checkout_2,
    navigationOptions: {
      header: null,
    },
  },
  Checkout_3: {
    screen: Checkout_3,
    navigationOptions: {
      header: null,
    },
  },
  Checkout_4: {
    screen: Checkout_4,
    navigationOptions: {
      header: null,
    },
  },
  Checkout_5: {
    screen: Checkout_5,
    navigationOptions: {
      header: null,
    },
  },
  Checkout_6: {
    screen: Checkout_6,
    navigationOptions: {
      header: null,
    },
  },
});

const BasketStack = createStackNavigator(
  {
    Basket: {
      screen: Basket,
      navigationOptions: {
        header: ({navigation}) => (
          <Header backwardArrow rightRender navigation={navigation} />
        ),
      },
    },
    Checkout: {
      screen: CheckoutStack,
    },
  },
  {
    defaultNavigationOptions: {
      header: ({navigation}) => (
        <Header
          simpleTitle={strings.checkout}
          backwardArrow
          navigation={navigation}
        />
      ),
    },
  },
);

const FilterStack = createStackNavigator(
  {
    Filter: {
      screen: Filter,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
);

const ShopStack = createStackNavigator({
  Shop: {
    screen: Shop,
    navigationOptions: {
      header: null,
    },
  },
  ShopPage: {
    screen: ShopPage,
    navigationOptions: {
      header: null,
    },
  },
});

const AuthNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Tabs: {
      screen: TabNavigator,
      navigationOptions: {
        header: () => (
          <Header hasDrawer dropdownTitle={strings.forMen} rightRender />
        ),
      },
    },
    Basket: {
      screen: BasketStack,
      navigationOptions: {
        header: null,
      },
    },
    ProductPage: {
      screen: ProductPage,
      navigationOptions: {
        header: ({navigation}) => (
          <Header backwardArrow rightRender navigation={navigation} />
        ),
      },
    },
    Shop: {
      screen: ShopStack,
      navigationOptions: {
        header: () => <Header hasDrawer rightRender />,
      },
    },
    // Filter: {
    // 	screen: FilterStack,
    // 	navigationOptions: {
    // 		header: null
    // 	}
    // }
  },
  {
    initialRouteName: 'Home',
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    all: createStackNavigator(
      {
        AuthNavigator,
        Filter: {
          screen: FilterStack,
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        headerMode: 'none',
        mode: 'modal',
        transparentCard: true,
        cardStyle: {
          backgroundColor: 'transparent',
          opacity: 1,
        },
      },
    ),
  },
  {
    drawerWidth: 300,
    contentComponent: DrawerContent,
  },
);

// const MainNavigator = createAppContainer(DrawerNavigator);
const MainNavigator = createAppContainer(DrawerNavigator);

export default MainNavigator;
