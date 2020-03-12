import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import DrawerContent from '../components/DrawerContent';
import Header from '../components/Header';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import strings from '../localization/strings';
import Basket from '../screens/Basket';
import Catalog from '../screens/Catalog';
import Checkout from '../screens/Checkout';
import Checkout_2 from '../screens/Checkout_2';
import Checkout_3 from '../screens/Checkout_3';
import Checkout_4 from '../screens/Checkout_4';
import Checkout_5 from '../screens/Checkout_5';
import Checkout_6 from '../screens/Checkout_6';
import Favorite from '../screens/Favorite';
import Filter from '../screens/Filter';
import Sort from '../screens/Sort';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Main from '../screens/Main';
import ProductPage from '../screens/ProductPage';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Shop from '../screens/Shop';
import ShopPage from '../screens/ShopPage';
import Categories from '../screens/Categories';
import Loader from '../screens/Loader';

// const MainHeader = createStackNavigator(
//   {
//     Main: {
//       screen: Main,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       header: ({ navigation }) => (
//         <Header hasDrawer rightRender navigation={navigation} />
//       ),
//     },
//   },
// );

// const MainStack = createStackNavigator({
//   ProductPage: {
//     screen: ProductPage,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

const CheckoutStack = createStackNavigator(
  {
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
  },
  {},
);
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
      navigationOptions: {
        header: () => <Header backwardArrow />,
      },
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

// const FilterStack = createStackNavigator(
//   {
//     Filter: {
//       screen: Filter,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   },
//   {
//     headerMode: 'none',
//     mode: 'modal',
//     transparentCard: true,
//     cardStyle: {
//       backgroundColor: 'transparent',
//       opacity: 1,
//     },
//     navigationOptions: {
//       mode: 'modal',
//     },
//   },
// );

const ShopStack = createStackNavigator({
  Shop: {
    screen: Shop,
    navigationOptions: {
      header: ({navigation}) => <Header hasDrawer rightRender />,
    },
  },
  ShopPage: {
    screen: ShopPage,
    navigationOptions: {
      header: ({navigation}) => <Header backwardArrow rightRender />,
    },
  },
});

const ProfileStack = createStackNavigator(
  {
    screen: Profile,
  },
  {
    defaultNavigationOptions: {
      header: ({navigation}) => (
        <Header hasDrawer rightRender navigation={navigation} />
      ),
    },
  },
);

// const RestOfStackNavigator = createStackNavigator({
//   Main: {
//     screen: MainStack,
//     navigationOptions: {
//       header: null,
//     },
//   },
//   Checkout: {
//     screen: CheckoutStack,
//     navigationOptions: {
//       header: null,
//     },
//   },
//   BasketStack: {
//     screen: BasketStack,
//     navigationOptions: {
//       header: null,
//     },
//   },
//   Shop: {
//     screen: ShopStack,
//     navigationOptions: {
//       header: null,
//     },
//   },
//   Filter: {
//     screen: FilterStack,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

let CategoriesStack = createStackNavigator(
  {
    Categories: {
      screen: Categories,
      navigationOptions: {
        header: ({navigation}) => (
          <Header hasDrawer dropdown rightRender navigation={navigation} />
        ),
      },
    },
    Catalog,
    Filter,
    Sort,
  },
  {
    mode: 'modal',
    transparentCard: true,
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
    navigationOptions: {
      mode: 'modal',
    },
    defaultNavigationOptions: {
      header: null,
    },
  },
);

let FavoritesStack = createStackNavigator(
  {
    Favorite,
  },
  {
    defaultNavigationOptions: {
      header: ({navigation}) => (
        <Header hasDrawer dropdown rightRender navigation={navigation} />
      ),
    },
  },
);

let MainStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: () => <Header hasDrawer rightRender />,
    },
  },
});

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
    Categories: {
      screen: CategoriesStack,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="list-sort" size={20} />;
        },
      },
    },
    Favorite: {
      screen: FavoritesStack,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="heart-empty" size={22} />;
        },
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="user-alternative" size={22} />;
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

let ProductStack = createStackNavigator({
  ProductPage: {
    screen: ProductPage,
    navigationOptions: {
      header: ({navigation}) => (
        <Header backwardArrow rightRender navigation={navigation} />
      ),
    },
  },
});

// Drawer
const DrawerNavigator = createDrawerNavigator(
  {
    all: createStackNavigator(
      {
        TabNavigator,
        ProductStack,
        ShopStack,
        BasketStack,
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
    contentComponent: DrawerContent,
  },
);

const AuthNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
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
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    // initialRouteName: 'Login',
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    Loader,
    AuthNavigator,
    DrawerNavigator,
  },
  {initialRouteName: 'DrawerNavigator'},
);

const MainNavigator = createAppContainer(SwitchNavigator);

export default MainNavigator;
