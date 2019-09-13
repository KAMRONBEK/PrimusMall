import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import strings from '../localization/strings';
import ColorDemo from './ColorDemo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../constants/colors';

const SingleProductInBasket = ({item}) => {
  let [amount, setAmount] = useState(item.amount);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
        },
      ]}>
      <View
        style={[
          styles.top,
          {
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
          },
        ]}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.nameOfProduct}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.text}>
              {strings.article}
              {item.articleNumber}
            </Text>
            <Text style={styles.text}>
              {strings.size}
              {': '}
              {item.size}
            </Text>
            <View
              style={[
                styles.text,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text
                style={{
                  paddingBottom: 4,
                  paddingRight: 5,
                }}>
                {strings.color}
                {': '}
              </Text>
              <ColorDemo
                style={{
                  borderWidth: 1,
                }}
                color={item.color}
              />
            </View>
          </View>
          <View style={styles.trash}>
            <EvilIcons name="trash" color={colors.red} size={25} />
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <TouchableWithoutFeedback
            onPress={() => {
              amount > 1 ? setAmount(amount - 1) : setAmount(1);
            }}>
            <AntDesign
              name="minus"
              size={20}
              color={amount > 1 ? colors.red : colors.lightGray}
              style={{
                marginRight: 10,
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.backRound,
              {
                backgroundColor: colors.black,
              },
            ]}>
            <Text
              style={{
                color: colors.white,
                fontSize: 17,
                fontWeight: '500',
              }}>
              {amount}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setAmount(amount + 1);
            }}>
            <AntDesign
              name="plus"
              size={20}
              color={colors.red}
              style={{
                marginLeft: 10,
                marginRight: 10,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>{parseInt(item.price, 10) * amount}</Text>
          <Text
            style={{
              color: colors.darkGray,
              paddingTop: 5,
            }}>
            {item.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  top: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  image: {
    height: 100,
    width: Dimensions.get('window').width / 3,
  },
  infoWrap: {
    flex: 5,
    flexDirection: 'row',
  },
  info: {},
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  type: {
    fontSize: 15,
  },
  text: {
    marginTop: 10,
    fontSize: 13,
  },
  trash: {
    marginTop: 4,
    paddingRight: 20,
    paddingLeft: 20,
  },
  bottom: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  backRound: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default SingleProductInBasket;
