const serverURL = 'http://localhost:3000';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyAo6s5MzR7MTHPg9CLYcLwqV6me0ExR5dY',
    authDomain: 'angularshopzpw.firebaseapp.com',
    databaseURL: 'https://angularshopzpw.firebaseio.com',
    projectId: 'angularshopzpw',
    storageBucket: 'angularshopzpw.appspot.com',
    messagingSenderId: '1051710357965'
  },
  apiRoot: `${serverURL}/api`,
  serverURL: serverURL
};
