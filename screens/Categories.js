import React, {useEffect, useReducer} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import api from '../api/api';
import {reducer, SET} from '../utils/state';
import CategoryItem from '../components/CategoryItem';
import {connect} from 'react-redux';

const Categories = ({navigation, selected, items}) => {
  const [state, dispatch] = useReducer(reducer, {categories: []});
  useEffect(() => {
    api.main.getCategoryChilds(selected).then(({data}) => {
      dispatch({type: SET, name: 'categories', value: data.data});
    });
  }, [selected]);
  return (
    <View style={[styles.container, {flex: 1}]}>
      <FlatList
        contentContainerStyle={[styles.container]}
        data={state.categories}
        showsVerticalScrollIndicator={false}
        keyExtractor={e => e.id.toString()}
        renderItem={({item}) => <CategoryItem {...{item}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({category: {selected, items}}) => ({
  selected,
  items,
});

export default connect(mapStateToProps)(Categories);
