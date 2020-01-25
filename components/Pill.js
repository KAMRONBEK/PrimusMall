import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import colors from '../constants/colors';
import strings from '../localization/strings';
import Icon from '../constants/icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Pill = ({
  iconName,
  title,
  deliveryPeriod,
  shippingPrice,
  currency,
  headerCenter,
  onPress,
  image
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: colors.lightGray,
            // height: shippingPrice ? 120 : 90
          },
        ]}>
        <View style={[styles.top, {}]}>
          <View
            style={
              headerCenter
                ? {
                  flex: 2,
                  alignItems: 'flex-start',
                  paddingRight: 20,
                }
                : {
                  flex: 1,
                  alignItems: 'center',
                }
            }>
            {image !== null ? <Image style={{ width: 80, height: 25 }} source={image} /> : <Icon name={iconName} size={25} />}
          </View>
          <Text
            style={[
              styles.title,
              {
                flex: headerCenter ? 4 : 5,
                alignItems: 'flex-start',
              },
            ]}>
            {title}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            {deliveryPeriod ? (
              <React.Fragment>
                <View
                  style={{
                    color: colors.gray,
                  }}>
                  <EvilIcons name="calendar" size={18} />
                </View>
                <Text
                  style={{
                    color: colors.gray,
                  }}>
                  {deliveryPeriod}
                </Text>
                <Text
                  style={{
                    color: colors.gray,
                  }}>
                  {strings.days}
                </Text>
              </React.Fragment>
            ) : (
                <View />
              )}
          </View>
          {shippingPrice ? (
            <View style={styles.bottomItem}>
              <View
                style={{
                  color: colors.gray,
                }}>
                <EvilIcons name="calendar" size={18} />
              </View>
              <Text
                style={{
                  color: colors.gray,
                }}>
                {shippingPrice}
              </Text>
              <Text
                style={{
                  color: colors.gray,
                }}>
                {currency}
              </Text>
            </View>
          ) : (
              <View />
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  top: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingLeft: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
  },
  bottom: {
    paddingLeft: 83,
  },
  bottomItem: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Pill;
