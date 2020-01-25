import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import strings from '../localization/strings';
import ColorDemo from './ColorDemo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';
import { connect } from 'react-redux';
import { decrementCartItemCount, incrementCartItemCount, removeFromCart } from '../redux/actions';

const SingleProductInBasket = ({ item, dispatch, index }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
        },
      ]}>
      <View
        style={[
          styles.top,
          {
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
          },
        ]}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{
              uri: item.preview_image,
            }}
          />
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{typeof item.category === 'object' ? item.category.name : item.category_name}</Text>
            <Text style={styles.text}>
              {strings.article}
              {item.code}
            </Text>
            <Text style={styles.text}>
              {strings.size}
              {': '}
              {item.offer[item.offerIndex].name}
            </Text>
            {/* <View
              style={[
                styles.text,
                { flexDirection: 'row', alignItems: 'center' },
              ]}>
              <Text
                style={{
                  paddingBottom: 4,
                  paddingRight: 5,
                }}>
                {strings.color}
                {': '}
              </Text>
              <ColorDemo
                style={{
                  borderWidth: 1,
                }}
                color={item.color}
              />
            </View> */}
          </View>
        </View>
        <View style={styles.flex}>
          <TouchableWithoutFeedback onPress={() => {
            dispatch(removeFromCart(index))
          }}>
            <View style={styles.trash}>
              <EvilIcons name="trash" color={colors.red} size={35} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (item.count > 1)
                dispatch(decrementCartItemCount(index))
            }}>
            <AntDesign
              name="minus"
              size={20}
              color={item.count > 1 ? colors.red : colors.lightGray}
              style={{
                marginRight: 10,
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.backRound,
              {
                backgroundColor: colors.black,
              },
            ]}>
            <Text
              style={{
                color: colors.white,
                fontSize: 17,
                fontWeight: '500',
              }}>
              {item.count}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(incrementCartItemCount(index))
            }}>
            <AntDesign
              name="plus"
              size={20}
              color={colors.red}
              style={{
                marginLeft: 10,
                marginRight: 10,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>{item.price.price_value * item.count}</Text>
          <Text
            style={{
              color: colors.darkGray,
              paddingTop: 5,
            }}>
            {/* {item.currency} */}
            сум
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  image: {
    height: 100,
    width: Dimensions.get('window').width / 3,
  },
  infoWrap: {
    flex: 5,
    flexDirection: 'row',
  },
  info: {},
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  type: {
    fontSize: 15,
  },
  text: {
    marginTop: 10,
    fontSize: 13,
  },
  trash: {
    // marginTop: 4,
    // paddingRight: 20,
    // paddingLeft: 20,
    // marginLeft: -15
    // marginVertical: 15,
    // marginHorizontal: 15
  },
  bottom: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  backRound: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default connect(null)(SingleProductInBasket);
