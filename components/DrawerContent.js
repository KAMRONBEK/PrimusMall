import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import NavigationServices from '../services/NavigationServices';
import colors from '../constants/colors';
import DrawerMenuItem from '../components/DrawerMenuItem';
import strings from '../localization/strings';
import Header from '../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import placeholder from '../assets/black-profile.png';
import {connect} from 'react-redux';
import {userLoggedOut} from '../redux/actions';

const DrawerContent = ({navigation, user: parent, dispatch}) => {
  let {data: user, token} = parent;
  let renderAccount = () => {
    let shouldRender = user && token;
    if (!shouldRender) {
      return null;
    }
    return (
      <View
        style={[
          styles.top,
          {
            borderBottomColor: colors.lightGray,
            backgroundColor: colors.superLightGray,
          },
        ]}>
        <View style={styles.nameWrap}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.name}>{user.surname}</Text>
        </View>
        <View style={styles.imageWithIcon}>
          <View style={styles.imageWrap}>
            <Image
              style={{
                width: 84,
                borderRadius: 84,
                height: 84,
              }}
              source={
                user.avatar
                  ? {
                      uri: user.avatar.path,
                    }
                  : placeholder
              }
            />
          </View>
          {/* <View
            style={[
              styles.plusIcon,
              {
                backgroundColor: colors.superLightGray,
              },
            ]}>
            <Feather name="plus" />
          </View> */}
        </View>
      </View>
    );
  };
  return (
    <React.Fragment>
      <Header backwardArrow navigation={navigation} />
      {renderAccount()}
      <View style={styles.bottom}>
        <DrawerMenuItem
          text={strings.shops}
          iconName="shopping-basket"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Shop');
          }}
        />
        {/* <DrawerMenuItem
          text={strings.forMen}
          iconName="shoe_men"
          small
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Shop');
          }}
        />
        <DrawerMenuItem
          text={strings.forWomen}
          iconName="shoe-woman"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Shop');
          }}
        />
        <DrawerMenuItem
          text={strings.forKids}
          iconName="shoe_modern"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Shop');
          }}
        /> */}
        <DrawerMenuItem
          text={strings.favorite}
          iconName="heart-empty"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Favorite');
          }}
        />
        <DrawerMenuItem
          iconName="user-alternative"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Profile');
          }}
          text={strings.myProfile}
        />
      </View>
      <View style={styles.logoutContainer}>
        <DrawerMenuItem
          iconName="logout"
          custom
          onPress={() => {
            navigation.toggleDrawer();
            navigation.navigate('Login');
            dispatch(userLoggedOut());
          }}
          text={strings.logout}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 30,
  },
  nameWrap: {
    marginLeft: 0,
    flexDirection: 'column',
  },
  name: {
    fontSize: 23,
    fontWeight: '400',
  },
  bottom: {
    padding: 40,
  },
  imageWithIcon: {
    flexDirection: 'row',
  },
  imageWrap: {
    borderRadius: 80,
    borderWidth: 5,
  },
  plusIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -70,
    marginLeft: -26,
    height: 26,
    width: 26,
    borderRadius: 18,
  },
});

export default connect(({user}) => ({user: user}))(DrawerContent);
