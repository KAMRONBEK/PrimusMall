'use strict';

import React from 'react';
import colors from '../constants/colors';

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
const RoundButton = ({
  text,
  isFilled,
  backgroundColor,
  borderColor,
  textColor,
  onPress,
  bold,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.buttonWrap,
          {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            borderWidth: isFilled ? 0 : 2,
          },
        ]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
              fontWeight: bold ? '600' : '400',
            },
          ]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    borderRadius: 50,
    width:
      Dimensions.get('window').width / 2 + Dimensions.get('window').width / 8,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default RoundButton;
