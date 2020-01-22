import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from '../constants/icons';
import Simple from 'react-native-vector-icons/SimpleLineIcons'

const DrawerMenuItem = ({ iconName, text, small, onPress, custom }) => {
  // const { navigate } = navigation;
  return (
    <React.Fragment>
      {/* <TouchableWithoutFeedback onPress={() => navigate(redirectTo, {})}> */}
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.icon}>
            {custom ? <Simple name={iconName} size={!small ? 30 : 15} /> : <Icon name={iconName} size={!small ? 30 : 15} />}
          </View>
          <Text>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  icon: {
    flexBasis: 50,
    alignItems: 'center',
  },
});

export default DrawerMenuItem;
