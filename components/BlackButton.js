import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BlackButton = ({iconName}) => (
  <View style={styles.container}>
    <MaterialCommunityIcons
      name={iconName}
      color={colors.white}
      size={30}></MaterialCommunityIcons>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
});

export default BlackButton;
