import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import BlurFooter from '../components/BlurFooter';
import colors from '../constants/colors';
import strings from '../localization/strings';


const ProductPage = ({ navigation }) => {
  return (
    <React.Fragment>
      <ScrollView>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.superLightGray,
            },
          ]}>
          <View
            style={[
              styles.banner,
              {
                backgroundColor: colors.white,
              },
            ]}>
            <View style={styles.newTag}>
              <View style={styles.whiteDot} />
              <Text style={styles.tagText}>New!</Text>
            </View>
            <Image
              source={{
                uri:
                  'http://www.af-usa.org/seeimg/big/4/43369_jordan-sneaker-wallpaper.jpg',
              }}
              resizeMode={'cover'}
              style={{
                height: 300,
                width: Dimensions.get('window').width - 60,
              }}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>TERRA PRO-DUNK </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 12,
              }}>
              Кроссовки
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 12,
              }}>
              Артикул: 2655kjhdfi
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text
                style={[
                  styles.price,
                  {
                    color: colors.red,
                  },
                ]}>
                200 000
              </Text>
              <Text
                style={[
                  styles.currency,
                  {
                    color: colors.red,
                  },
                ]}>
                {' '}
                сум
              </Text>
            </View>
            <Text
              style={[
                styles.selectSize,
                {
                  color: colors.blue,
                },
              ]}>
              Выбрать размер
            </Text>
          </View>
          <View style={styles.about}>
            <Text style={styles.title}>{strings.aboutProduct}</Text>
            <Text style={styles.up}>{strings.upperMaterial}</Text>
            <Text style={styles.down}>{strings.fauxLeather}</Text>
            <Text style={styles.up}>{strings.innerMaterial}</Text>
            <Text style={styles.down}>{strings.fauxFur}</Text>
            <Text style={styles.up}>{strings.outsoleMaterial}</Text>
            <Text style={styles.down}>{strings.thermoplasticRubber}</Text>
            <Text
              style={[
                styles.selectSize,
                {
                  color: colors.blue,
                },
              ]}>
              Подробнее
            </Text>
          </View>
          <View style={styles.shop}>
            <Text style={styles.title}>{strings.shop}</Text>
            <View style={styles.nikeWrap}>
              <Text style={styles.nike}>{strings.nike}</Text>
              <Image
                source={{
                  uri:
                    'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4f3.png',
                }}
                style={{
                  width: 100,
                  height: 53,
                }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[
                styles.paragraph,
                {
                  marginBottom: 10,
                },
              ]}>
              {strings.nikeDescription}
            </Text>
            <Text style={styles.shopTitle}>{strings.address}</Text>
            <Text style={styles.paragraph}>
              ул. Амира Темура, 60 (Юнус-Абадский р-н). Метро: Абдулла Кодирий.
            </Text>
            <Text style={styles.shopTitle}>{strings.phone}</Text>
            <Text style={styles.paragraph}>(+998) 71-235-0999</Text>
            <Text style={styles.shopTitle}>{strings.workingHours}</Text>
            <Text style={styles.paragraph}>с 10:00 до 22:00 (без обеда).</Text>
          </View>
        </View>
      </ScrollView>
      <BlurFooter favIcon="heart-empty" buttonText="В корзину" />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  newTag: {
    padding: 5,
    backgroundColor: 'red',
    width: 80,
    height: 33,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginRight: 20,
  },
  whiteDot: {
    backgroundColor: 'white',
    height: 5,
    width: 5,
    left: -6,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 20,
    color: 'white',
  },
  banner: {
    paddingTop: 30,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 60,
  },
  name: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    marginTop: 12,
    fontWeight: '500',
  },
  selectSize: {
    fontSize: 15,
    fontWeight: '900',
    marginTop: 12,
  },
  about: {
    marginTop: 50,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  up: {
    fontSize: 17,
    marginTop: 10,
  },
  down: {
    fontSize: 17,
    fontWeight: '800',
  },
  shop: {
    marginTop: 50,
    paddingBottom: 100,
  },
  nikeWrap: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nike: {
    fontSize: 32,
    fontWeight: '600',
    flex: 1,
  },
  shopTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 20,
  },
  paragraph: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '200',
    opacity: 0.6,
  },
});

export default ProductPage;
