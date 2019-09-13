import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import TextInputFiled from '../components/TextInputField';
import colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import TextInputField from '../components/TextInputField';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Order from '../components/Order';
import strings from '../localization/strings';

export default function Profile() {
  const orderList = [
    {
      orderNumber: '65998',
      status: 'waiting',
      price: '400 000',
      currency: ' сум',
    },
    {
      orderNumber: '65998',
      status: 'delivered',
      price: '400 000',
      currency: ' сум',
    },
    {
      orderNumber: '65998',
      status: 'canceled',
      price: '400 000',
      currency: ' сум',
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.nameWrap}>
            <Text style={styles.name}>АНДРЕЙ</Text>
            <Text style={styles.name}>КИМ</Text>
          </View>
          <View style={styles.imageWithIcon}>
            <View style={styles.imageWrap}>
              <Image
                style={{
                  width: 84,
                  borderRadius: 84,
                  height: 84,
                }}
                source={{
                  uri:
                    'https://www.menshairstylestoday.com/wp-content/uploads/2018/10/Triangle-Face-Shape-Hairstyles-Men.jpg',
                }}
              />
            </View>
            <View
              style={[
                styles.plusIcon,
                {
                  backgroundColor: colors.superLightGray,
                },
              ]}>
              <Feather name="plus" />
            </View>
          </View>
        </View>
        <View style={styles.infoWrap}>
          <TextInputField
            notEntry
            textValue="+998 (90) 999-99-99"
            legend="Номер телефона"
            iconName="phone"
            noBorder
            textWeight="600"
          />
          <TextInputField
            notEntry
            textValue="INFO@MAIL.RU"
            legend="Email"
            iconName="e-mail"
            textWeight="600"
            noBorder
          />
          <TextInputField
            notEntry
            textValue="ТАШКЕНТ"
            legend="Город"
            iconName="compass"
            textWeight="600"
            noBorder
          />

          <TouchableWithoutFeedback onPress={() => {}}>
            <Text
              style={[
                styles.change,
                {
                  color: colors.blue,
                },
              ]}>
              Изменить
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.orderWrap}>
          <Text style={styles.order}>{strings.order}</Text>
          <FlatList
            keyExtractor={(e, index) => index.toString()}
            data={orderList}
            renderItem={Order}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              console.warn('otahon huyet qimang');
            }}>
            <Text
              style={[
                styles.change,
                {
                  color: colors.blue,
                },
              ]}>
              История заказов
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  top: {
    // width: Dimensions.get("window").width - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameWrap: {
    marginLeft: 0,
    flexDirection: 'column',
  },
  name: {
    fontSize: 23,
    fontWeight: '400',
  },
  infoWrap: {
    width: Dimensions.get('window').width - 40,
  },
  change: {
    paddingTop: 10,
    fontSize: 18,
  },
  orderWrap: {},
  order: {
    marginLeft: 10,
    marginTop: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  imageWithIcon: {
    flexDirection: 'row',
  },
  imageWrap: {
    borderRadius: 80,
    borderWidth: 5,
  },
  plusIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -70,
    marginLeft: -26,
    height: 26,
    width: 26,
    borderRadius: 18,
  },
});
