import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import strings from '../localization/strings';
import TextInputField from '../components/TextInputField';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';

const Checkout = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.yourData}</Text>
        <TextInputField
          iconName="user"
          textValue="Андрей"
          legend={strings.name}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="user"
          textValue="Ким"
          legend={strings.name}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="phone"
          textValue="998 (90) 999-99-99"
          legend={strings.phoneNumber}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="e-mail"
          textValue="info@mail.ru"
          legend="Email"
          secondaryIconName="close"
        />
        <View style={{margin: 25}} />
        <RoundButton
          borderColor={colors.red}
          backgroundColor={colors.red}
          text={strings.next}
          textColor={colors.white}
          bold
          onPress={() => navigate('Checkout_2', {})}
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

export default Checkout;
