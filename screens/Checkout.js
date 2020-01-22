import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import strings from '../localization/strings';
import TextInputField from '../components/TextInputField';
import RoundButton from '../components/RoundButton';
import colors from '../constants/colors';
import { connect } from 'react-redux';

const Checkout = ({ navigation, user }) => {
  const { navigate } = navigation;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{strings.yourData}</Text>
        <TextInputField
          iconName="user"
          textValue={user.name}
          legend={strings.name}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="user"
          textValue={user.surname}
          legend={strings.familyName}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="phone"
          textValue={user.username}
          legend={strings.phoneNumber}
          secondaryIconName="close"
        />
        <TextInputField
          iconName="e-mail"
          textValue={user.email}
          legend="Email"
          secondaryIconName="close"
        />
        <View style={{ margin: 25 }} />
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

let mapStateToProps = ({ user }) => ({ user: user.data })

export default connect(mapStateToProps)(Checkout);
