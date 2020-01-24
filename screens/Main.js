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
import { normalizeFilters } from '../utils/object';
import { reducer, MERGE_LIST } from '../utils/state';

// const SliderImageList = [
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
// ];

let SET = 'SET';

export default function Main({ navigation }) {
  // let reducer = (state, { type, key, value }) => {
  //   switch (type) {
  //     case SET:
  //       return { ...state, [key]: value };
  //     default:
  //       return state;
  //   }
  // };
  const [state, setState] = useReducer(reducer, { loading: true, banner: [], products: [] });
  const { navigate } = navigation;
  let updateState = (name, value) => {
    setState({ type: SET, value, name });
  };
  let filters = { sort: 'new', perpage: 20, page: 1 };
  let populateProducts = () => {
    api.main
      .filterProducts(normalizeFilters(filters))
      .then(res => {
        setState({ type: MERGE_LIST, name: 'products', value: res.data.data });
      })
      .catch(({ response: res }) => {
        console.warn(res);
      })
      .finally(() => {
        if (filters.page !== 1) {
          return
        }
        api.main.getBanner().then(res => {
          updateState('banner', res.data.data)
        }).catch(res => {
          console.warn(res.response)
        }).finally(() => {
          updateState('loading', false);
        })
      });
  }
  useEffect(() => {
    populateProducts();
  }, []);
  if (state.loading) {
    return (
      <View style={styles.centerdContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  let onEndReach = () => {
    filters.page = filters.page + 1;
    populateProducts();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header hasDrawer dropdown rightRender navigation={navigation} />
      <Slider images={state.banner} imagePath={'image.path'} flex animated />
      <View
        style={[
          styles.titleWrap,
          {
            backgroundColor: colors.superLightGray,
          },
        ]}>
        <Text style={styles.title}>{strings.newItems}</Text>
      </View>
      <View style={{ flex: 1.2 }}>
        <FlatList
          keyExtractor={(e, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          data={state.products}
          horizontal={true}
          renderItem={({ item }) => <ProductCart item={item} />}
          contentContainerStyle={styles.flatList}
          onEndReachedThreshold={.5}
          onEndReached={onEndReach}
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
