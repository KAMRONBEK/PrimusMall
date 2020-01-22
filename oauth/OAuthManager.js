import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('firestackexample');
manager.configure({
  facebook: {
    client_id: '2338841292888111',
    client_secret: '235c84be2069a051ea2cfee5ab2aa3ef',
    callback_url: 'https://pmall.uz/flynsarmy/sociallogin/Facebook/callback',
  },
  google: {
    callback_url: `https://pmall.uz/flynsarmy/sociallogin/Google/callback`,
    client_id:
      '900520287266-2vkskr7fa34584db2vqdnovgottg9n4c.apps.googleusercontent.com',
    client_secret: 'qPPas-tA6DSa5OR47_JbJhaS',
  },
});

export default manager;
