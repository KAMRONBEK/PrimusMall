import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import strings from '../localization/strings';

const Order = ({item}) => {
  let backgroundColor = colors.white;
  let textColor = colors.black;
  let status = item.status.name;

  switch (item.status_id) {
    case '3': {
      backgroundColor = colors.superLightOrange;
      textColor = colors.orange;
      // status = 'Ожидается доставка';
      break;
    }
    case '4': {
      backgroundColor = colors.superLightGreen;
      textColor = colors.green;
      // status = 'Доставлено';
      break;
    }
    case '5': {
      backgroundColor = colors.superLightRed;
      textColor = colors.red;
      // status = 'Отменен';
      break;
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text style={styles.orderNumber}>Заказ #{item.order_number}</Text>
      <Text
        style={[
          styles.status,
          {
            color: textColor,
          },
        ]}>
        {status}
      </Text>
      <View style={styles.row}>
        <Text style={styles.price}>
          Общая сумма: {item.total_price_value} +{' '}
        </Text>
        <Text style={styles.highlightText}>
          {strings.delivery} {item.shipping_price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    borderRadius: 30,
    padding: 20,
    marginBottom: 10,
    elevation: 1,
  },
  orderNumber: {
    marginTop: 10,
  },
  status: {
    marginTop: 10,
  },
  price: {
    marginTop: 10,
  },
  highlightText: {
    color: colors.orange,
    marginTop: 10,
  },
});

export default Order;
