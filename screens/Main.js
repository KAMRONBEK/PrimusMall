import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  View,
  Image,
} from 'react-native';
import Slider from '../components/Slider';
import ProductCart from '../components/ProductCart';
import colors from '../constants/colors';
import strings from '../localization/strings';

import {TouchableWithoutFeedback} from 'react-native';

export default function Main({navigation}) {
  let [name, setName] = useState('Product list');

  const {navigate} = navigation;
  const ProductListData = [
    {
      brand: 'NIKE',
      image:
        'https://wallsheaven.com/photos/A11859449/400/pair-of-red-sneakers-on-a-white-background.jpg',
      name: 'TERRA DUNK ',
      type: 'Кроссовки',
      priceType: ' сум',
      prevPrice: '350 000',
      price: '200 000',
    },
    {
      brand: 'NIKE UNK',
      image:
        'https://hdwallpaperim.com/wp-content/uploads/2017/09/16/56586-shoes-748x445.jpg',
      name: 'TERRA PRO-DUNK ',
      type: 'Кроссовки',
      priceType: ' сум',
      prevPrice: '350000',
      price: '200000',
    },
    {
      brand: 'NiKe',
      image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      name: 'TERRA PRO-DUNK ',
      type: 'Кроссовки',
      priceType: ' сум',
      prevPrice: '350000',
      price: '200000',
    },
    {
      brand: 'Nive',
      image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      name: 'TERRA PRO-DUNK ',
      type: 'Кроссовки',
      priceType: ' сум',
      prevPrice: '350000',
      price: '200000',
    },
    {
      brand: 'Nive',
      image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      name: 'TERRA PRO-DUNK ',
      type: 'Кроссовки',
      priceType: ' сум',
      prevPrice: '350 000',
      price: '200 000',
    },
  ];

  const SliderImageList = [
    'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
    'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
  ];
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => navigate('Shop', {})}>
        <Slider images={SliderImageList} animated />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.titleWrap,
          {
            backgroundColor: colors.superLightGray,
          },
        ]}>
        <Text style={styles.title}>{strings.newItems}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            console.warn('nope');
          }}>
          <Text style={styles.link}>{strings.viewAll}</Text>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigate('ProductPage', {});
        }}>
        <FlatList
          keyExtractor={(e, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ProductListData}
          renderItem={({item}) => <ProductCart item={item} />}
          contentContainerStyle={{
            paddingRight: 10,
          }}
          style={{
            backgroundColor: colors.superLightGray,
          }}
        />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
  },
  link: {
    fontSize: 10,
  },
});
