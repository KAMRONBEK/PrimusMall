'use strict';

import React, {useState} from 'react';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import NavigationService from '../services/NavigationServices';

import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const ProductCart = ({item}) => {
  let [favIcon, setFavIcon] = useState('heart-empty');

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        NavigationService.navigate('ProductPage');
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
          },
        ]}>
        <View style={styles.top}>
          <View
            style={[
              styles.brand,
              {
                backgroundColor: colors.red,
              },
            ]}>
            <Text
              style={[
                styles.brandText,
                {
                  color: colors.white,
                },
              ]}>
              {item.brand}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              let active = setFavIcon(
                favIcon == 'heart' ? 'heart-empty' : 'heart',
              );
            }}>
            <Icon style={styles.favorite} name={favIcon} size={25} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.image}>
          <Image
            style={{
              height: 100,
              width: (Dimensions.get('window').width - 30) / 2 - 20,
            }}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.titleWrap}>
            <Text style={styles.modelName}>{item.name}</Text>
            <Text style={styles.type}>{item.brand}</Text>
          </View>
          <View style={styles.priceWrap}>
            <View style={styles.prices}>
              <Text style={styles.prevPrice}>
                {item.prevPrice}
                {item.priceType}
              </Text>
              <Text
                style={[
                  styles.currentPrice,
                  {
                    color: colors.red,
                  },
                ]}>
                {item.price}
                {item.priceType}
              </Text>
            </View>
            <Icon
              name="bag"
              size={30}
              style={{
                marginRight: 20,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - 30) / 2,
    marginLeft: 10,
    marginTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  top: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: (Dimensions.get('window').width - 30) / 2 - 20,
    margin: 10,
    borderColor: 'red',
  },
  bottom: {},
  brand: {
    marginTop: 20,
    marginRight: 10,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    left: -5,
  },
  brandText: {
    fontSize: 15,
    paddingRight: 25,
    paddingLeft: 25,
    fontWeight: '200',
  },
  favorite: {
    marginTop: 20,
    marginRight: 20,
  },
  titleWrap: {
    marginLeft: 15,
    marginBottom: 20,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '600',
  },
  type: {
    fontSize: 14,
    fontWeight: '200',
  },
  priceWrap: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  prevPrice: {
    fontSize: 12,
    opacity: 0.3,
    fontWeight: '600',
    marginBottom: 0,
    paddingBottom: 0,
  },
  currentPrice: {
    marginTop: 0,
    paddingTop: 0,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductCart;
