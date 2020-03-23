import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import api from '../api/api';
import RoundButton from '../components/RoundButton';
import TextInputField from '../components/TextInputField';
import colors from '../constants/colors';
import { userLoaded, userLoggedIn } from '../redux/actions/user';

let SET = 'SET';

const Register = ({ navigation, dispatch }) => {
  const { navigate } = navigation;
  let reducer = (state, { type, value, key }) => {
    switch (type) {
      case SET:
        return { ...state, [key]: value };
      default:
        return state;
    }
  };
  const [state, setState] = useReducer(reducer, {});
  let updateState = (key, value) => {
    setState({ type: SET, value, key });
  };
  let register = () => {
    updateState('loading', true);
    updateState('error', '');
    api.auth
      .register(state)
      .then(res => {
        dispatch(userLoggedIn(res.data));
        navigate('Main');
      })
      .catch(({ response: res }) => {
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
        placeholder={'Введите свое фамилию'}
        iconName={'user'}
        legend={'Фамилия'}
        secondaryIconName={'close'}
        onChangeText={e => updateState('surname', e)}
        value={state.surname}
      />
      <TextInputField
        placeholder={'Введите номер телефона'}
        iconName={'phone'}
        legend={'Номер телефона'}
        secondaryIconName={'close'}
        onChangeText={e => updateState('phone', e)}
        value={state.username}
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
      <TextInputField
        placeholder={'Введите подтверждение пароля'}
        iconName={'lock'}
        legend={'Подтверждение пароля'}
        secondaryIconName={'eye-off'}
        secureTextEntry={true}
        onChangeText={e => updateState('password_confirmation', e)}
        value={state.password_confirmation}
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
