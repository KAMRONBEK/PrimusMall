import React, {useEffect, useReducer, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-navigation';
import api from '../api/api';
import Header from '../components/Header';
import ProductCart from '../components/ProductCart';
import Slider from '../components/Slider';
import colors from '../constants/colors';
import strings from '../localization/strings';
import {normalizeFilters} from '../utils/object';
import {reducer, MERGE_LIST, SET_MULTIPLE} from '../utils/state';
import {connect} from 'react-redux';

// const SliderImageList = [
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
//   'https://www.wallpaperflare.com/static/981/34/558/air-force-nike-sneakers-unpaired-wallpaper.jpg',
// ];

let SET = 'SET';

function Main({navigation, category}) {
  // let reducer = (state, { type, key, value }) => {
  //   switch (type) {
  //     case SET:
  //       return { ...state, [key]: value };
  //     default:
  //       return state;
  //   }
  // };
  const [state, setState] = useReducer(reducer, {
    loading: true,
    banner: [],
    products: [],
  });
  const {navigate} = navigation;
  let updateState = (name, value) => {
    setState({type: SET, value, name});
  };
  let defaultFilters = {
    sort: 'new',
    perpage: 20,
    page: 1,
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [endReached, setEndReached] = useState(false);
  //eslint-disable-next-line
  let populateProducts = () => {
    api.main
      .filterProducts(normalizeFilters(filters))
      .then(res => {
        if (res.data.data && res.data.data.length > 0)
          setState({type: MERGE_LIST, name: 'products', value: res.data.data});
      })
      .catch(({response: res}) => {
        console.warn(res);
      })
      .finally(() => {
        updateState('loading', false);
      });
  };
  let getBanner = () => {
    if (filters.page !== 1) {
      return;
    }
    api.main
      .getBanner()
      .then(res => {
        updateState('banner', res.data.data);
      })
      .catch(res => {
        console.warn(res.response);
      })
      .finally(() => {});
  };
  useEffect(() => {
    setFilters({...defaultFilters, page: 1});
    getBanner();
  }, []); //eslint-disable-line

  useEffect(() => {
    console.warn('FILTERING');
    populateProducts();
  }, [filters]); //eslint-disable-line

  let onEndReach = () => {
    console.warn('END REACHED');

    setFilters({...filters, page: filters.page + 1});
    // populateProducts();
  };

  return (
    <SafeAreaView forceInset={'bottom-only'} style={styles.safeArea}>
      <FlatList
        extraData={state.banner}
        ListHeaderComponent={() => (
          <>
            <Slider images={state.banner} imagePath={'image.path'} animated />
            <View
              style={[
                styles.titleWrap,
                {
                  backgroundColor: colors.superLightGray,
                },
              ]}>
              <Text style={styles.title}>{strings.newItems}</Text>
            </View>
          </>
        )}
        keyExtractor={(e, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={state.products}
        renderItem={({item}) => <ProductCart item={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReach}
        bounces={false}
        numColumns={2}
        style={{
          backgroundColor: colors.superLightGray,
        }}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = ({category}) => ({category});

export default connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
  safeArea: {backgroundColor: colors.superLightGray, flex: 1},
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  link: {
    fontSize: 10,
  },
  flatList: {
    // paddingBottom: 10,
    flex: 1,
  },
  centerdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
