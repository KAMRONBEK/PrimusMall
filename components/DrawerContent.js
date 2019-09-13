import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationServices from '../services/NavigationServices';
import colors from '../constants/colors';
import DrawerMenuItem from '../components/DrawerMenuItem';
import strings from '../localization/strings';
import Header from '../components/Header';

const DrawerContent = ({navigation}) => {
  return (
    <React.Fragment>
      <Header backwardArrow navigation={navigation} />
      <View
        style={[
          styles.top,
          {
            borderBottomColor: colors.lightGray,
          },
        ]}></View>
      <View style={styles.bottom}>
        <DrawerMenuItem
          text={strings.shops}
          iconName="shopping-basket"
          onPress={() => {
            NavigationServices.toggleDrawer();
            NavigationServices.navigate('Shop');
          }}
        />
        <DrawerMenuItem
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
        />
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
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  top: {
    borderBottomWidth: 1,
  },
  bottom: {
    padding: 40,
  },
});

export default DrawerContent;
