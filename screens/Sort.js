import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import strings from '../localization/strings';
import FilterItem from '../components/FilterItem';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let sortList = [
  {
    iconName: 'percent',
    text: strings.byAscendingPrice,
  },
  {
    iconName: 'controls',
    text: strings.byDescendingPrice,
  },
  {
    iconName: 'tag_m',
    text: strings.byPopularity,
  },
  {
    iconName: 'raindrop',
    text: strings.byLowRating,
  },
  {
    iconName: 'letter_b',
    text: strings.byHighRating,
  },
];

let Sort = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
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
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.headerLeft}>
              <Icon name="arrow-back" size={20} style={{ paddingLeft: 20 }} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>{strings.byPopularity}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
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
        </View>
        <FlatList
          keyExtractor={e => e.text}
          data={sortList}
          renderItem={({ item }) => (
            <FilterItem
              iconName={item.iconName}
              text={item.text}
              color={item.color}
              smallIcon={item.smallIcon}
              subFilterList={[1]}
              setData={({ }) => {
                navigation.navigate("Catalog");
              }}
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

export default Sort;
