import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView, FlatList} from 'react-native';
import SingleProductInBasket from '../components/SingleProductInBasket';
import colors from '../constants/colors';
import BlurFooter from '../components/BlurFooter';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';

const Basket = ({navigation, style, cart}) => {
  let {navigate} = navigation;
  // const ProductListInBasket = [
  //   {
  //     image:
  //       'https://cdn.shopify.com/s/files/1/0347/5017/products/aj1_top3.png?v=1494457361',
  //     nameOfProduct: 'TERRA PRO-DUNK',
  //     type: 'Кроссовки',
  //     articleNumber: '689fkjri569',
  //     size: '48',
  //     color: '#EC8151',
  //     price: '200000',
  //     currency: ' сум',
  //     amount: 1,
  //   },
  //   {
  //     image:
  //       'https://cdn.shopify.com/s/files/1/0347/5017/products/aj1_top3.png?v=1494457361',
  //     nameOfProduct: 'TERRA PRO-DUNK',
  //     type: 'Кроссовки',
  //     articleNumber: '689fkjri569',
  //     size: '48',
  //     color: '#EC8151',
  //     price: '200000',
  //     currency: ' сум',
  //     amount: 1,
  //   },
  //   {
  //     image:
  //       'https://cdn.shopify.com/s/files/1/0347/5017/products/aj1_top3.png?v=1494457361',
  //     nameOfProduct: 'TERRA PRO-DUNK',
  //     type: 'Кроссовки',
  //     articleNumber: '689fkjri569',
  //     size: '48',
  //     color: '#EC8151',
  //     price: '200000',
  //     currency: ' сум',
  //     amount: 1,
  //   },
  //   {
  //     image:
  //       'https://cdn.shopify.com/s/files/1/0347/5017/products/aj1_top3.png?v=1494457361',
  //     nameOfProduct: 'TERRA PRO-DUNK',
  //     type: 'Кроссовки',
  //     articleNumber: '689fkjri569',
  //     size: '48',
  //     color: '#EC8151',
  //     price: '200000',
  //     currency: ' сум',
  //     amount: 1,
  //   },
  // ];

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.superLightGray,
            },
          ]}>
          {cart.items != null ? (
            <FlatList
              keyExtractor={(e, index) => index.toString()}
              data={cart.items}
              renderItem={itemProps => <SingleProductInBasket {...itemProps} />}
            />
          ) : (
            <View>
              <Text>No item</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <BlurFooter
        price={
          cart.items &&
          cart.items.reduce(
            (prev, current) => prev + current.price.price_value,
            0,
          )
        }
        currency=" сум"
        buttonText="Оформить"
        onPress={() => {
          navigate('Checkout', {});
        }}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
});

const mapStateToProps = ({cart}) => ({
  cart,
});

export default connect(mapStateToProps)(Basket);
