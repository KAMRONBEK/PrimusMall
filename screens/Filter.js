import React, { useReducer, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterItem from '../components/FilterItem';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import api from '../api/api';
import { reducer, SET, SET_MULTIPLE } from '../utils/state';

const Filter = ({ navigation }) => {

  // let filterList = [
  //   {
  //     iconName: 'percent',
  //     text: 'Со скидкой',
  //   },
  //   {
  //     iconName: 'controls',
  //     text: 'Стиль',
  //     subFilterList: [
  //       {
  //         iconName: 'butterfly-tie',
  //         text: 'Классический',
  //       },
  //       {
  //         iconName: 'shoe-woman',
  //         text: 'Романтический',
  //       },
  //       {
  //         iconName: 'shoe_men',
  //         text: 'Деловой',
  //         smallIcon: true,
  //       },
  //       {
  //         iconName: 'shoe_modern',
  //         text: 'Спортивный',
  //       },
  //       {
  //         iconName: 'tshirt',
  //         text: 'Over-size look',
  //       },
  //       {
  //         iconName: 'casual_wear',
  //         text: 'Casual',
  //       },
  //     ],
  //   },
  //   {
  //     iconName: 'tag_m',
  //     text: 'Размер',
  //     subFilterList: [
  //       {
  //         iconName: 'tag_xs',
  //         text: '35',
  //       },
  //       {
  //         iconName: 'tag_xs',
  //         text: '36',
  //       },
  //       {
  //         iconName: 'tag_s',
  //         text: '37',
  //       },
  //       {
  //         iconName: 'tag_m',
  //         text: '38',
  //       },
  //       {
  //         iconName: 'tag_m',
  //         text: '39',
  //       },
  //       {
  //         iconName: 'tag_m',
  //         text: '40',
  //       },
  //     ],
  //   },
  //   {
  //     iconName: 'raindrop',
  //     text: 'Цвет',
  //     subFilterList: [
  //       {
  //         color: 'white',
  //         text: 'Все цвета',
  //       },
  //       {
  //         color: 'green',
  //         text: 'Зеленый',
  //       },
  //       {
  //         color: '#c012ff',
  //         text: 'Фиолетовый',
  //       },
  //       {
  //         color: 'gray',
  //         text: 'Серый',
  //       },
  //     ],
  //   },
  //   {
  //     iconName: 'letter_b',
  //     text: 'Бренд',
  //     subFilterList: [
  //       { imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg' },
  //       {
  //         imageUrl:
  //           'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
  //       },
  //       { imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg' },
  //       {
  //         imageUrl:
  //           'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
  //       },
  //       { imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg' },
  //       {
  //         imageUrl:
  //           'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
  //       },
  //       { imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg' },
  //       {
  //         imageUrl:
  //           'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
  //       },
  //     ],
  //   },
  // ];

  let { id } = navigation.getParam('item') || {};

  const [state, dispatch] = useReducer(reducer, { data: [], initialData: [], header: "Фильтр", isSubCategory: false })
  useEffect(() => {
    api.main.getCategory(id).then(res => {
      dispatch({ type: SET_MULTIPLE, names: ["data", "initialData"], values: [res.data.data.product_filters, res.data.data.product_filters] })
    });
  }, [])
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        navigation.goBack();
      }}>
        <View style={styles.fade} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.contentWrap,
          {
            backgroundColor: colors.white,
          },
        ]}>
        <View style={styles.header}>
          {state.isSubCategory && (
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch({ type: SET_MULTIPLE, names: ['header', 'data', 'isSubCategory'], values: ["Фильтр", state.initialData, false] })
              }}>
              <View style={styles.headerLeft}>
                <Icon name="arrow-back" size={20} style={{ paddingLeft: 20 }} />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>{state.header.toUpperCase()}</Text>
          </View>
          {!state.isSubCategory && (
            <TouchableWithoutFeedback onPress={() => {
              navigation.goBack();
            }}>
              <View style={styles.headerLeft}>
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  style={{ paddingRight: 20 }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <FlatList
          keyExtractor={e => e.text}
          data={state.data}
          renderItem={({ item }) => (
            <FilterItem
              iconName={item.iconName}
              text={state.isSubCategory ? item.value : item.name}
              color={item.color}
              smallIcon={item.smallIcon}
              setData={(data, title, isSubCategory) => {
                dispatch({ type: SET_MULTIPLE, names: ['header', 'data', 'isSubCategory'], values: [title, data, isSubCategory] })
              }}
              subFilterList={item.values}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'transparent',
    flexDirection: 'column',
    flex: 1,
  },
  fade: {
    backgroundColor: 'gray',
    opacity: 0.3,
    flex: 3,
  },
  contentWrap: {
    flex: 7,
  },
  header: {
    height: 50,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  headerRigh: {
    flex: 1,
  },
  headerMiddle: {
    flex: 5,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 50,
  },
});

export default Filter;
