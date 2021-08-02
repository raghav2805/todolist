
  import firebase from "firebase"

  const firebaseApp = firebase.initializeApp(
      {
        apiKey: "AIzaSyAZjEn61pIc-UYOQXlqhT7R-EutVClLVqU",
        authDomain: "todo-app-48bc9.firebaseapp.com",
        projectId: "todo-app-48bc9",
        storageBucket: "todo-app-48bc9.appspot.com",
        messagingSenderId: "348891897703",
        appId: "1:348891897703:web:984313251122ea577c19c2",
        measurementId: "G-Q49XWHVZPT"
      }
  )

  const db = firebaseApp.firestore();

  export default db;
