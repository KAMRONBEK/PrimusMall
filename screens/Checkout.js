import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import strings from '../localization/strings';
import TextInputField from '../components/TextInputField';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';
import {connect} from 'react-redux';
import {userLoaded} from '../redux/actions';
import requests from '../api/api';

const Checkout = ({navigation, user, dispatch}) => {
  const {navigate} = navigation;
  const [data, setData] = useState(user.data);
  let submitUserInfo = () => {
    if (!data.email || !data.phone) {
      alert(strings.provideValidData);
      return;
    }
    requests.user
      .updateUser({email: data.email, phone: data.phone}, user.token)
      .then(res => {
        dispatch(userLoaded({...user, data: res.data.data}));
      })
      .catch(err => {
        console.warn(err.response);
      });
    navigate('Checkout_2', {});
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.yourData}</Text>
        <TextInputField
          iconName="user"
          textValue={data.name}
          legend={strings.name}
          secondaryIconName="close"
          onChangeText={e => setData({...data, name: e})}
        />
        <TextInputField
          iconName="user"
          textValue={data.surname}
          legend={strings.familyName}
          secondaryIconName="close"
          onChangeText={e => setData({...data, surname: e})}
        />
        <TextInputField
          iconName="phone"
          textValue={data.phone}
          legend={strings.phoneNumber}
          secondaryIconName="close"
          onChangeText={e => setData({...data, phone: e})}
        />
        <TextInputField
          iconName="e-mail"
          textValue={data.email}
          legend="Email"
          secondaryIconName="close"
          onChangeText={e => setData({...data, email: e})}
        />
        <View style={{margin: 25}} />
        <RoundButton
          borderColor={colors.red}
          backgroundColor={colors.red}
          text={strings.next}
          textColor={colors.white}
          bold
          onPress={submitUserInfo}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    padding: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 30,
  },
});

let mapStateToProps = ({user}) => ({user: user});

export default connect(mapStateToProps)(Checkout);
