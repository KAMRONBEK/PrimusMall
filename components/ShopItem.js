import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import colors from '../constants/colors';
import { withNavigation } from 'react-navigation';

const ShopItem = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("ShopPage", { item })}>
      <View style={[styles.container]}>
        <Image
          source={{
            uri: item.logo && item.logo.path,
          }}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.white
  },
  image: {
    height: 100,
    width: Dimensions.get('window').width / 2 - 30
  }
});

export default withNavigation(ShopItem);
