import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import FilterItem from '../components/FilterItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import strings from '../localization/strings';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import NavigationServices from '../services/NavigationServices';

const Filter = ({navigation}) => {
  let [header, setHeader] = useState('Фильтр');
  let [isSubCategory, setSubCategory] = useState(false);
  let filterList = [
    {
      iconName: 'percent',
      text: 'Со скидкой',
    },
    {
      iconName: 'controls',
      text: 'Стиль',
      subFilterList: [
        {
          iconName: 'butterfly-tie',
          text: 'Классический',
        },
        {
          iconName: 'shoe-woman',
          text: 'Романтический',
        },
        {
          iconName: 'shoe_men',
          text: 'Деловой',
          smallIcon: true,
        },
        {
          iconName: 'shoe_modern',
          text: 'Спортивный',
        },
        {
          iconName: 'tshirt',
          text: 'Over-size look',
        },
        {
          iconName: 'casual_wear',
          text: 'Casual',
        },
      ],
    },
    {
      iconName: 'tag_m',
      text: 'Размер',
      subFilterList: [
        {
          iconName: 'tag_xs',
          text: '35',
        },
        {
          iconName: 'tag_xs',
          text: '36',
        },
        {
          iconName: 'tag_s',
          text: '37',
        },
        {
          iconName: 'tag_m',
          text: '38',
        },
        {
          iconName: 'tag_m',
          text: '39',
        },
        {
          iconName: 'tag_m',
          text: '40',
        },
      ],
    },
    {
      iconName: 'raindrop',
      text: 'Цвет',
      subFilterList: [
        {
          color: 'white',
          text: 'Все цвета',
        },
        {
          color: 'green',
          text: 'Зеленый',
        },
        {
          color: '#c012ff',
          text: 'Фиолетовый',
        },
        {
          color: 'gray',
          text: 'Серый',
        },
      ],
    },
    {
      iconName: 'letter_b',
      text: 'Бренд',
      subFilterList: [
        {imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg'},
        {
          imageUrl:
            'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
        },
        {imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg'},
        {
          imageUrl:
            'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
        },
        {imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg'},
        {
          imageUrl:
            'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
        },
        {imageUrl: 'https://wallpapercave.com/wp/1BdLvHd.jpg'},
        {
          imageUrl:
            'https://i.pinimg.com/originals/b1/9d/e8/b19de82158b79691efb1641e48a4bcf0.jpg',
        },
      ],
    },
  ];
  let [data, setData] = useState(filterList);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigation.goBack}>
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
          {isSubCategory && (
            <TouchableWithoutFeedback
              onPress={() => {
                setData(filterList);
                setHeader('Фильтр');
                setSubCategory(false);
              }}>
              <View style={styles.headerLeft}>
                <Icon name="arrow-back" size={20} style={{paddingLeft: 20}} />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>{header.toUpperCase()}</Text>
          </View>
          {!isSubCategory && (
            <TouchableWithoutFeedback onPress={NavigationServices.goBack}>
              <View style={styles.headerLeft}>
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  style={{paddingRight: 20}}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <FlatList
          keyExtractor={e => e.text}
          data={data}
          renderItem={({item}) => (
            <FilterItem
              iconName={item.iconName}
              text={item.text}
              color={item.color}
              smallIcon={item.smallIcon}
              setData={(data, title, isSubCategory) => {
                setData(data);
                setHeader(title);
                setSubCategory(isSubCategory);
              }}
              subFilterList={item.subFilterList}
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
