import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Order = ({item}) => {
  let backgroundColor = '';
  let textColor = '';
  let status = '';

  switch (item.status) {
    case 'waiting': {
      backgroundColor = colors.superLightOrange;
      textColor = colors.orange;
      status = 'Ожидается доставка';
      break;
    }
    case 'delivered': {
      backgroundColor = colors.superLightGreen;
      textColor = colors.green;
      status = 'Доставлено';
      break;
    }
    case 'canceled': {
      backgroundColor = colors.superLightRed;
      textColor = colors.red;
      status = 'Отменен';
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
      <Text style={styles.orderNumber}>Заказ #{item.orderNumber}</Text>
      <Text
        style={[
          styles.status,
          {
            color: textColor,
          },
        ]}>
        {status}
      </Text>
      <Text style={styles.price}>
        Общая сумма: {item.price}
        {item.currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Order;
