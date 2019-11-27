import React from 'react';
import TextInputField from '../components/TextInputField';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';
import BlackButton from '../components/BlackButton';

const Login = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.title}>Вход</Text>
      <View style={{}}>
        <TextInputField
          placeholder={'Username'}
          iconName={'user'}
          secondaryIconName={'close'}
          legend={'Имя'}
        />
        <TextInputField
          placeholder={'Password'}
          iconName={'lock'}
          secondaryIconName={'eye-off'}
          legend={'Пароль'}
          secureTextEntry={true}
        />
      </View>
      <View
        style={{
          marginTop: 50,
        }}>
        <RoundButton
          isFilled
          backgroundColor={colors.red}
          text={'ВОЙТИ'}
          textColor={colors.white}
          onPress={() => navigate('Main', {})}></RoundButton>
      </View>
      <View
        style={{
          marginTop: 10,
        }}>
        <RoundButton
          isFilled
          backgroundColor={colors.white}
          text={'РЕГИСТРАЦИЯ'}
          textColor={colors.black}
          onPress={() => navigate('Register', {})}></RoundButton>
      </View>
      <View style={styles.footer}>
        <Text>ВОЙТИ ЧЕРЕЗ:</Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: Dimensions.get('window').width / 3,
          }}>
          <BlackButton iconName="google-plus" />
          <BlackButton iconName="facebook" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 25,
    fontWeight: '600',
    fontSize: 30,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default Login;
