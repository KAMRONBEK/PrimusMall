import React, {useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import api from '../api/api';
import RoundButton from '../components/RoundButton';
import TextInputField from '../components/TextInputField';
import colors from '../constants/colors';
import {userLoaded} from '../redux/actions/user';

let SET = 'SET';

const Register = ({navigation, dispatch}) => {
  const {navigate} = navigation;
  let reducer = (state, {type, value, key}) => {
    switch (type) {
      case SET:
        return {...state, [key]: value};
      default:
        return state;
    }
  };
  const [state, setState] = useReducer(reducer, {});
  let updateState = (key, value) => {
    setState({type: SET, value, key});
  };
  let register = () => {
    updateState('loading', true);
    updateState('error', '');
    let {email, password} = state;
    console.warn(email);
    api.auth
      .register({email, password, password_confirmation: state.password})
      .then(res => {
        dispatch(userLoaded(res.data));
        navigate('Main');
      })
      .catch(({response: res}) => {
        updateState('error', res.data.error);
      })
      .finally(() => {
        updateState('loading', false);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.error}>{state.error}</Text>
      <TextInputField
        placeholder={'Email'}
        iconName={'e-mail'}
        legend={'Email'}
        secondaryIconName={'close'}
        onChangeText={e => updateState('email', e)}
        value={state.email}
      />
      <TextInputField
        placeholder={'Введите свое имя'}
        iconName={'user'}
        legend={'Имя'}
        secondaryIconName={'close'}
        onChangeText={e => updateState('name', e)}
        value={state.name}
      />
      <TextInputField
        placeholder={'Введите номер телефона'}
        iconName={'phone'}
        legend={'Номер телефона'}
        secondaryIconName={'close'}
        onChangeText={e => updateState('phone', e)}
        value={state.phone}
      />
      <TextInputField
        placeholder={'Введите пароль'}
        iconName={'lock'}
        legend={'Пароль'}
        secondaryIconName={'eye-off'}
        secureTextEntry={true}
        onChangeText={e => updateState('password', e)}
        value={state.password}
      />
      <View
        style={{
          marginTop: 20,
        }}>
        <RoundButton
          isFilled
          backgroundColor={colors.red}
          textColor={colors.white}
          text={'Далее'}
          onPress={register}
          loading={state.loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    fontWeight: '400',
    fontSize: 30,
  },
  error: {
    fontSize: 18,
    color: colors.red,
  },
});

export default connect()(Register);
