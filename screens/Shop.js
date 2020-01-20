import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import api from '../api/api';
import ShopItem from '../components/ShopItem';
import colors from '../constants/colors';

const Shop = ({ params }) => {
  const [shops, setShops] = useState([]);
  useEffect(() => {
    api.main.getStores().then(res => {
      setShops(res.data.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(e, index) => index.toString()}
        numColumns={2}
        data={shops}
        renderItem={({ item }) => <ShopItem {...{ item }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.superLightGray
  },
});

export default Shop;
