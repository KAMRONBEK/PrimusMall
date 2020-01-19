import React, { useEffect, useReducer } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import api from '../api/api';
import { reducer, SET } from '../utils/state';
import CategoryItem from '../components/CategoryItem';
import Header from '../components/Header';

const Categories = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, { categories: [] });
  useEffect(() => {
    api.main.getCategories().then(({ data }) => {
      dispatch({ type: SET, name: 'categories', value: data.data });
    });
  }, []);
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <FlatList
        contentContainerStyle={[styles.container,]}
        data={state.categories}
        showsVerticalScrollIndicator={false}
        keyExtractor={e => e.id.toString()}
        renderItem={({ item }) => <CategoryItem {...{ item }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.superLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Categories;
