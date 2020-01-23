import React, {useState} from 'react';
import {Text, View, Picker, StyleSheet} from 'react-native';
import strings from '../localization/strings';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';
import WheelPicker from '../components/WheelPicker';

const Checkout_4 = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={{flex: 1, paddingBottom: 20}}>
      <WheelPicker type="date" />
      <WheelPicker type="time" />
      <RoundButton
        backgroundColor={colors.red}
        text={strings.next}
        textColor={colors.white}
        borderColor={colors.red}
        onPress={() => navigate('Checkout_5', {})}
      />
    </View>
  );
};

export default Checkout_4;
