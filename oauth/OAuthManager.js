import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('Pmall');
manager.configure({
  facebook: {
    client_id: '815499772252584',
    client_secret: '26fda0e65ec1d5c97071afa44e8bdd85',
    callback_url: 'https://pmall.uz/flynsarmy/sociallogin/Facebook/callback',
  },
  google: {
    callback_url: 'https://pmall.uz/flynsarmy/sociallogin/Google/callback',
    client_id:
      '432695160617-8ma9b580hufpbgsafmkdfj2d5u099toi.apps.googleusercontent.com',
    client_secret: 'BI_RuvkGOwCZ_gY6Av7wJSLl',
  },
});

export default manager;
