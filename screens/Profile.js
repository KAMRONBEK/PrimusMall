import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import TextInputField from '../components/TextInputField';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Order from '../components/Order';
import strings from '../localization/strings';
import {connect} from 'react-redux';
import placeholder from '../assets/black-profile.png';
import {reducer, SET} from '../utils/state';
import ImagePicker from 'react-native-image-picker';
import requests from '../api/api';
import {userLoaded} from '../redux/actions';
import RoundButton from '../components/RoundButton';

const Profile = ({user, dispatch, isAuthorized, navigation}) => {
  let {data: initial, token, orders} = user;
  const [data, dispatcher] = useReducer(reducer, {...initial, editing: true});
  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    console.log(token);
    requests.user
      .getOrders(token)
      .then(res => {
        dispatch(userLoaded({...user, orders: res.data}));
        console.warn(data);
      })
      .catch(e => {
        console.warn(e.response);

        navigation.navigate('Login');
      });
  }, []); // eslint-disable-line
  let updateState = (name, value) => {
    dispatcher({type: SET, name, value});
  };
  let pickImage = () => {
    const options = {
      title: 'Select Avatar',
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        updateState('image', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
      }
    });
  };
  let applyChanges = () => {
    let {image: avatar, name, phone, user_address = ''} = data;
    let newState = {name, phone, user_address};
    if (avatar) {
      newState.avatar = avatar;
    }
    requests.user
      .updateUser(newState, token)
      .then(res => {
        dispatch(userLoaded({...user, data: res.data.data}));
      })
      .catch(res => {
        console.warn(res.response);
      });
  };
  if (!initial || !token) {
    return (
      <View style={styles.centeredContainer}>
        <RoundButton
          isFilled
          backgroundColor={colors.red}
          text={'РЕГИСТРАЦИЯ'}
          textColor={colors.white}
          onPress={() => navigation.navigate('Login', {})}
        />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{data.surname}</Text>
            <Text style={styles.name}>{data.name}</Text>
          </View>
          <TouchableWithoutFeedback onPress={pickImage}>
            <View style={styles.imageWithIcon}>
              <View style={styles.imageWrap}>
                <Image
                  style={{
                    width: 84,
                    borderRadius: 84,
                    height: 84,
                  }}
                  source={
                    data.avatar
                      ? {
                          uri: data.avatar.path,
                        }
                      : data.image
                      ? data.image
                      : placeholder
                  }
                />
              </View>
              {!data.editing && (
                <View
                  style={[
                    styles.plusIcon,
                    {
                      backgroundColor: colors.superLightGray,
                    },
                  ]}>
                  <Feather name="plus" />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.infoWrap}>
          <TextInputField
            notEntry={data.editing}
            textValue={data.phone}
            legend="Номер телефона"
            iconName="phone"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => {
              updateState('phone', e);
            }}
          />
          <TextInputField
            notEntry={data.editing}
            textValue={data.email}
            legend="Email"
            iconName="e-mail"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => {
              updateState('email', e);
            }}
          />
          <TextInputField
            notEntry={data.editing}
            textValue={data.user_address}
            legend="Город"
            iconName="compass"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => {
              updateState('user_address', e);
            }}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              updateState('editing', !data.editing);
              if (!data.editing) {
                applyChanges();
                return;
              }
            }}>
            <Text
              style={[
                styles.change,
                {
                  color: data.editing ? colors.blue : colors.orange,
                },
              ]}>
              {data.editing ? 'Изменить' : 'Сохранить'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {orders && orders.length > 0 ? (
          <View style={styles.orderWrap}>
            <Text style={styles.order}>{strings.orders}</Text>
            <FlatList
              keyExtractor={(e, index) => index.toString()}
              data={orders}
              renderItem={Order}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({user}) => ({
  user,
  isAuthorized: !!user.token,
});

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  bigText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
  container: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  top: {
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
    fontWeight: 'bold',
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
