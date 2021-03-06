import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView, FlatList} from 'react-native';
import SingleProductInBasket from '../components/SingleProductInBasket';
import colors from '../constants/colors';
import BlurFooter from '../components/BlurFooter';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import strings from '../localization/strings';
import {warnUser} from '../utils/warn';

const Basket = ({navigation, style, cart, isAuthorized}) => {
  let {navigate} = navigation;

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
          {cart && cart.items.length === 0 ? (
            <View
              style={{
                backgroundColor: colors.white,
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={{paddingVertical: 20}}>{strings.noItems}</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(e, index) => index.toString()}
              data={cart.items}
              renderItem={itemProps => <SingleProductInBasket {...itemProps} />}
            />
          )}
        </View>
      </ScrollView>
      <BlurFooter
        price={
          cart.items &&
          cart.items.reduce(
            (prev, current) => prev + current.price.price_value * current.count,
            0,
          )
        }
        currency=" сум"
        buttonText="Оформить"
        onPress={() => {
          if (!isAuthorized) {
            navigate('Login');
            return;
          }
          if (cart && cart.items.length > 0) {
            navigate('Checkout', {});
            return;
          }
          warnUser(strings.noItems);
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

const mapStateToProps = ({cart, user}) => ({
  cart,
  user,
  isAuthorized: !!user.token,
});

export default connect(mapStateToProps)(Basket);
