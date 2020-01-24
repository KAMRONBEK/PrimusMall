'use strict';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, LayoutAnimation, Picker } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { withNavigation } from 'react-navigation';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import NavigationService from '../services/NavigationServices';
import { connect } from 'react-redux';
import requests from '../api/api';
import { setCategory, categoriesLoaded } from '../redux/actions/category';

const Header = ({
  hasDrawer,
  backwardArrow,
  simpleTitle,
  dropdown,
  rightRender,
  navigation,
  cart,
  selectedItem,
  items,
  dispatch
}) => {
  useEffect(() => {
    requests.main.getCategories().then(res => {
      dispatch(categoriesLoaded(res.data.data));
      dispatch(setCategory(res.data.data && res.data.data.length > 0 ? res.data.data[0].id : 0))
    })
  }, [])
  let renderPicker = () => {
    return <View style={{ flex: 1 }}>
      <Picker
        style={{ marginTop: -10, fontSize: 18, fontWeight: 'bold' }}
        itemStyle={{ fontSize: 18, fontWeight: 'bold' }}
        selectedValue={selectedItem}
        onValueChange={(val) => {
          dispatch(setCategory(val))
        }}>
        {items && items.map((el, i) => {
          return <Picker.Item style={{ fontSize: 18, fontWeight: 'bold' }} key={el.id} label={el.name} value={el.id} />
        })}
      </Picker>
    </View>
  }
  const renderLeft = () => {
    return (
      <View style={styles.left}>
        {hasDrawer ? (
          <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
            <View>
              <SimpleLineIcons name="menu" size={25} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
            backwardArrow && (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (navigation) {
                    navigation.goBack();
                    return;
                  }
                }}>
                <View>
                  <Icon name="arrow-back" size={22} />
                </View>
              </TouchableWithoutFeedback>
            )
          )}
      </View>
    );
  };
  const renderMiddle = () => {
    return (
      <View style={styles.middle}>
        {dropdown ? renderPicker() : simpleTitle ? (
          <Text
            style={[
              styles.title,
              {
                fontWeight: '500',
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
        {rightRender && (
          <View style={styles.right}>
            <AntDesign name="search1" size={25} />
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Basket', {});
              }}>
              <View style={styles.bagIcon}>
                <Icon name="bag" size={25} />
                {cart.items && cart.items.length > 0 && <View
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
                    {cart.items.length}
                  </Text>
                </View>
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
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

const mapStateToProps = ({ cart, category }) => ({
  cart, selectedItem: category.selected, items: category.items
})


export default connect(mapStateToProps)(withNavigation(Header));
