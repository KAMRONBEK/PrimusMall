import React, {useState} from 'react';
import TextInputField from '../components/TextInputField';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
} from 'react-native';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';
import BlackButton from '../components/BlackButton';
import api from '../api/api';
import {userLoaded} from '../redux/actions/user';
import {connect} from 'react-redux';
import manager from '../oauth/OAuthManager';
import {userLoggedIn} from '../redux/actions/user';

const Login = ({navigation, dispatch}) => {
  const [state, setState] = useState({username: '+998'});
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const {navigate} = navigation;
  let login = () => {
    setloading(true);
    api.auth
      .login(state)
      .then(res => {
        dispatch(userLoggedIn(res.data));
        navigate('Main');
      })
      .catch(({response: res}) => {
        setError(res.data.error);
      })
      .finally(e => {
        setloading(false);
      });
  };
  let updateState = (key, value) => {
    setState({...state, [key]: value});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <View>
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <TextInputField
          placeholder={'Phone number'}
          iconName={'phone'}
          secondaryIconName={'close'}
          legend={'Номер телефона'}
          value={state.username}
          onChangeText={data => updateState('username', data)}
        />
        <TextInputField
          placeholder={'Password'}
          iconName={'lock'}
          secondaryIconName={'eye-off'}
          legend={'Пароль'}
          secureTextEntry={true}
          value={state.password}
          onChangeText={text => updateState('password', text)}
        />
      </View>
      <View style={styles.mt50}>
        <RoundButton
          isFilled
          backgroundColor={colors.red}
          text={'ВОЙТИ'}
          textColor={colors.white}
          onPress={login}
          loading={loading}
        />
      </View>
      <View style={styles.mt}>
        <RoundButton
          isFilled
          backgroundColor={colors.white}
          text={'РЕГИСТРАЦИЯ'}
          textColor={colors.black}
          onPress={() => navigate('Register', {})}
        />
      </View>
      <View style={styles.footer}>
        <Text>ВОЙТИ ЧЕРЕЗ:</Text>
        <View style={styles.iconsWrapper}>
          <TouchableWithoutFeedback
            onPress={() => {
              manager
                .authorize('google', {scopes: 'email'})
                .then(response => {
                  console.warn(response);
                })
                .catch(error => {
                  console.warn(error);
                });
              // .finally(res => {
              //   console.warn(res);
              // });
            }}>
            <View>
              <BlackButton iconName="google-plus" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              manager
                .authorize('facebook', {scopes: 'profile,email'})
                .then(response => {
                  console.warn(response);
                })
                .catch(error => {
                  console.warn(error);
                })
                .finally(res => {
                  console.warn(res);
                });
            }}>
            <View>
              <BlackButton iconName="facebook" />
            </View>
          </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width / 3,
  },
  mt4: {
    marginTop: 10,
  },
  mt50: {
    marginTop: 50,
  },
  error: {
    padding: 15,
  },
  errorText: {
    fontSize: 18,
    color: colors.red,
  },
});

export default connect()(Login);
