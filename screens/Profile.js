import React, { useState, useEffect, useReducer } from 'react';
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
import { TouchableWithoutFeedback, FlatList } from 'react-native';
import Order from '../components/Order';
import strings from '../localization/strings';
import { connect } from 'react-redux'
import placeholder from '../assets/black-profile.png'
import { reducer, SET } from '../utils/state';
import ImagePicker from 'react-native-image-picker';
import requests from '../api/api';


const Profile = ({ user, }) => {
  let { data: initial, token } = user;
  const [data, dispatcher] = useReducer(reducer, { ...initial, editing: true });
  let updateState = (name, value) => {
    dispatcher({ type: SET, name, value });
  }
  let pickImage = () => {
    const options = {
      title: 'Select Avatar',
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        updateState('image', { uri: response.uri, type: response.type, name: response.fileName })
      }
    });
  }
  let applyChanges = () => {
    let { image: avatar, name, username, user_address, } = data;
    let newState = { name, username, user_address };
    if (avatar) {
      newState.avatar = avatar
    }
    requests.user.updateUser(newState, token).then(res => {
      console.warn(res.data)
    }).catch(res => {
      console.warn(res.response)
    })
  }
  if (!initial || !token) {
    return <View style={styles.centeredContainer}>
      <Text style={styles.bigText}>{strings.pleaseLogin}</Text>
    </View>
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
                  source={data.avatar ? {
                    uri:
                      data.avatar.path,
                  } : data.image ? data.image : placeholder}
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
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.infoWrap}>
          <TextInputField
            notEntry={data.editing}
            textValue={data.username}
            legend="Номер телефона"
            iconName="phone"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => { updateState('username', e) }}
          />
          <TextInputField
            notEntry={data.editing}
            textValue={data.email}
            legend="Email"
            iconName="e-mail"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => { updateState('email', e) }}
          />
          <TextInputField
            notEntry={data.editing}
            textValue={data.user_address}
            legend="Город"
            iconName="compass"
            textWeight="bold"
            fontSize={18}
            noBorder={data.editing}
            onChangeText={e => { updateState('user_address', e) }}
          />

          <TouchableWithoutFeedback onPress={() => {
            if (!data.editing) {
              updateState('editing', !data.editing)
              applyChanges()
              return;
            }
            updateState('editing', !data.editing)
          }}>
            <Text
              style={[
                styles.change,
                {
                  color: data.editing ? colors.blue : colors.orange,
                },
              ]}>
              {data.editing ? "Изменить" : "Сохранить"}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.orderWrap}>
          <Text style={styles.order}>{strings.orders}</Text>
          <FlatList
            keyExtractor={(e, index) => index.toString()}
            data={[]}
            renderItem={Order}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              // console.warn('otahon huyet qimang');
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

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
  bigText: { fontSize: 19, fontWeight: 'bold', color: colors.black,textAlign:'center' },
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
    alignItems: 'center'
  }
});
