// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

