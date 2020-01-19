import React, { useEffect, useReducer } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import api from '../api/api';
import Header from '../components/Header';
import ProductCart from '../components/ProductCart';
import Slider from '../components/Slider';
import colors from '../constants/colors';
import strings from '../localization/strings';

const SliderImageList = [
  'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
  'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
  'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
  'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
  'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
];

let SET = 'SET';

export default function Main({ navigation }) {
  let reducer = (state, { type, key, value }) => {
    switch (type) {
      case SET:
        return { ...state, [key]: value };
      default:
        return state;
    }
  };
  const [state, setState] = useReducer(reducer, { loading: true });
  const { navigate } = navigation;
  let updateState = (key, value) => {
    setState({ type: SET, value, key });
  };
  useEffect(() => {
    api.main
      .getProducts()
      .then(res => {
        updateState('products', res.data.data);
      })
      .catch(({ response: res }) => {
        alert(res.data.error);
      })
      .finally(() => {
        updateState('loading', false);
      });
  }, []);
  if (state.loading) {
    return (
      <View style={styles.centerdContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header hasDrawer rightRender navigation={navigation} />
      <Slider images={SliderImageList} flex animated />
      <View
        style={[
          styles.titleWrap,
          {
            backgroundColor: colors.superLightGray,
          },
        ]}>
        <Text style={styles.title}>{strings.newItems}</Text>
        <View
          style={{
            padding: 5,
          }}>
          <Text style={styles.link}>{strings.viewAll}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(e, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          data={state.products}
          horizontal={true}
          renderItem={({ item }) => <ProductCart item={item} />}
          contentContainerStyle={styles.flatList}
          style={{
            backgroundColor: colors.superLightGray,
          }}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.superLightGray, flex: 1 },
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
    paddingTop: 10,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20,
  },
  link: {
    fontSize: 10,
  },
  flatList: {
    // paddingBottom: 10,
  },
  centerdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
