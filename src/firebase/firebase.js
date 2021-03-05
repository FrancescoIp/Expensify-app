import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
// // child_removed

// database.ref('expenses').on('child_removed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val())
// });

// //child_changes

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// });

// //child_added

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// });

// database.ref('expenses')
//  .once('value')
//  .then((snapshot) => {
//    const expenses = []

//    snapshot.forEach((childSnapshot) => {
//      expenses.push({
//        id: childSnapshot.key,
//        ...childSnapshot.val()
//      });
//    }); 
//    console.log(expenses)
//   });

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
  
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id:childSnapshot.key,
//       ...childSnapshot.val() 
//     });
//   });
//   console.log(expenses)
// })

// database.ref('expenses').push({
//   description:'dignitò',
//   amount: 3,
//   createdAt: 9375221,
//   note: 'assai'
// });

// database.ref('notes/-MUnvxk5LubJ4MwY8Rl3').remove()

// database.ref('notes').push({
//   title: 'Courses',
//   body:'React, pyton'
// });

// const onValueChange = database.ref().on('value', (snapshot) =>{
//   const userData = snapshot.val()
//   // {Name} is {job.title} at {job.company}
//   console.log(`${userData.name} is ${userData.job.title} at ${userData.job.company}`);
// },(e) => {
//   console.log('Error', e)
// });

// setTimeout(() => {
//   database.ref().update({
//     name: 'Luca'
//   })
// }, 2000) 



// database.ref('location/city')
//  .once('value')
//  .then((snapshot) => {
//    const val = snapshot.val();
//    console.log(val)
//  })
//  .catch((e) => {
//    console.log('Error fetching data', e)
//  });

// database.ref().set({
//   name: 'Fra Ippo',
//   age: 28,
//   stressLevel: 6,
//   job: {
//     title: 'pazzo',
//     company: 'Cocacola'
//   },
//   location: {
//     city: 'Philadelphia',
//     country: 'USA'
//   }
// }).then(() => {
//   console.log('data is saved!');
// }).catch((e) => {
//   console.log('this failed', e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Siattle'
// });

// database.ref('isSingle').set(null);

// database.ref('is single')
//   .remove()
//   .then(() => {
//     console.log('data been deleted')
//   })
//   .catch(() => {
//     console.log('Error: data not removed')
//   });




