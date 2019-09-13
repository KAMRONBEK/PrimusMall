'use strict';

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from '../constants/icons';
import NavigationService from '../services/NavigationServices';
// import SafeAreaView from 'react-native-safe-area-view';

import {Text, StyleSheet, View, StatusBar, Platform} from 'react-native';
import colors from '../constants/colors';
import {TouchableWithoutFeedback} from 'react-native';

const Header = ({
  hasDrawer,
  backwardArrow,
  simpleTitle,
  dropdownTitle,
  rightRender,
  navigation,
}) => {
  const renderLeft = () => {
    return (
      <View style={styles.left}>
        {hasDrawer ? (
          <TouchableWithoutFeedback onPress={NavigationService.toggleDrawer}>
            <View>
              <SimpleLineIcons name="menu" size={25} />
            </View>
          </TouchableWithoutFeedback>
        ) : backwardArrow ? (
          <TouchableWithoutFeedback
            onPress={() => {
              if (navigation) {
                console.warn(navigation);
                // navigation.goBack();
                NavigationService.goBack();
                return;
              }
            }}>
            <View>
              <Icon name="arrow-back" size={22} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
      </View>
    );
  };
  const renderMiddle = () => {
    return (
      <View style={styles.middle}>
        {dropdownTitle ? (
          <React.Fragment>
            <Text
              style={[
                styles.title,
                {
                  fontWeight: '500',
                },
              ]}>
              {dropdownTitle}
            </Text>
            <Icon name="angle-down" size={25} />
          </React.Fragment>
        ) : simpleTitle ? (
          <Text
            style={[
              styles.title,
              {
                fontWeight: '100',
              },
            ]}>
            {simpleTitle}
          </Text>
        ) : (
          <React.Fragment />
        )}
      </View>
    );
  };
  const renderRight = () => {
    return (
      <React.Fragment>
        {rightRender ? (
          <View style={styles.right}>
            <AntDesign name="search1" size={25} />
            <TouchableWithoutFeedback
              onPress={() => {
                NavigationService.navigate('Basket', {});
              }}>
              <View style={styles.bagIcon}>
                <Icon name="bag" size={25} />
                <View
                  style={[
                    styles.notification,
                    {
                      backgroundColor: colors.red,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.notificationText,
                      {
                        color: colors.white,
                      },
                    ]}>
                    4
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View />
        )}
      </React.Fragment>
    );
  };
  return (
    <View
      style={[
        styles.headerWrapper,
        {
          backgroundColor: colors.superLightGray,
        },
      ]}>
      {renderLeft()}
      {renderMiddle()}
      {renderRight()}
    </View>
  );
};

const styles = StyleSheet.create({
  left: {
    flex: 1,
    marginLeft: 30,
    marginTop: 20,
  },
  middle: {
    flex: 5,
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  right: {
    flex: 2,
    flexDirection: 'row',
    marginRight: 30,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  bagIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notification: {
    borderRadius: 10,
    width: 12,
    height: 12,
    left: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    fontWeight: '600',
  },
  headerWrapper: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-evenly',
  },
});

export default Header;
