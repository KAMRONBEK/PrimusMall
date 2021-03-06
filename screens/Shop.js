import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import api from '../api/api';
import ShopItem from '../components/ShopItem';
import colors from '../constants/colors';
import { normalizeFilters } from '../utils/object';

const Shop = ({ }) => {
  const [shops, setShops] = useState([]);
  let defaultFilters = { perpage: 20, page: 1 }
  const [filters, setFilters] = useState(defaultFilters)
  let populateShops = () => {
    api.main.filterStores(normalizeFilters(filters)).then(res => {
      setShops([...shops, ...res.data.data]);
    });
  }
  useEffect(() => {
    populateShops();
  }, [filters]);
  let onEndReach = () => {
    setFilters({ ...filters, page: filters.page + 1 })
  }
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(e, index) => index.toString()}
        numColumns={2}
        data={shops}
        renderItem={({ item }) => <ShopItem {...{ item }} />}
        onEndReachedThreshold={.5}
        onEndReached={onEndReach}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
});

export default Shop;
