import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD8S6yf4K-5FVaWf-B24Udi58vBr1OUHjk",
    authDomain: "experimentalchat-b216c.firebaseapp.com",
    databaseURL: "https://experimentalchat-b216c.firebaseio.com",
    projectId: "experimentalchat-b216c",
    storageBucket: "",
    messagingSenderId: "673601040990"
  };

 export const firebaseApp=firebase.initializeApp(config);
 export const messagesRef=firebase.database().ref('messages');