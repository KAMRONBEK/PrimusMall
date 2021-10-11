import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import api from '../api/api';
import BannerItem from '../components/BannerItem';
import ProductCart from '../components/ProductCart';

const ShopContent = ({navigation}) => {
  let item = navigation.getParam('item');
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    api.main.getStore(item.id).then(({data}) => {
      setShop(data.data);
      api.main.getStoreProducts(item.id).then(({data: res}) => {
        setProducts(res.data);
      });
    });
  }, [item.id]);
  let fetchProducts = () => {
    api.main.getStoreProducts(item.id, pageIndex + 1).then(({data: res}) => {
      setProducts([...products, ...res.data]);
      setPageIndex(pageIndex + 1);
    });
  };
  let {header_image: header, banners} = shop;
  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          {header && <Image style={styles.image} source={{uri: header.path}} />}
          {banners && (
            <FlatList
              keyExtractor={e => e.id}
              data={banners}
              numColumns={2}
              renderItem={itemProps => <BannerItem {...itemProps} />}
            />
          )}
        </>
      )}
      extraData={[header, banners]}
      keyExtractor={e => e.id}
      data={products}
      numColumns={2}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.1}
      renderItem={itemProps => <ProductCart {...itemProps} />}
    />
  );
};

let {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  image: {
    width,
    height: width / 2.466,
  },
});

export default ShopContent;
