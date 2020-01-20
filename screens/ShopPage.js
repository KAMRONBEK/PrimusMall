import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet } from 'react-native';
import api from '../api/api';
import BannerItem from '../components/BannerItem';
import ProductCart from '../components/ProductCart';

const ShopContent = ({ navigation }) => {
  let item = navigation.getParam("item");
  const [shop, setShop] = useState({})
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.main.getStore(item.id).then(({ data }) => {
      setShop(data.data);
      api.main.getStoreProducts(item.id).then(({ data: res }) => {
        setProducts(res.data)
      })
    })
  }, [])
  let { header_image: header, banners } = shop;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {header && <Image style={styles.image} source={{ uri: header.path }} />}
      {banners && <FlatList keyExtractor={e => e.id} data={banners} numColumns={2} renderItem={(itemProps) => <BannerItem {...itemProps} />} />}
      {products && <FlatList keyExtractor={e => e.id} data={products} numColumns={2} renderItem={(itemProps) => <ProductCart {...itemProps} />} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300
  }
});

export default ShopContent;
