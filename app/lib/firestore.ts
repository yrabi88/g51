import  { Firestore }from '@google-cloud/firestore'
// import { initializeApp } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'

// import { App as FirebaseApp, initializeApp } from 'firebase-admin/app'

// type CustomGlobalKey = string | number | symbol
// type CustomGlobal = Record<CustomGlobalKey, unknown>
// const customGlobal = globalThis as CustomGlobal

// const uniqueKey = Symbol.for('firebaseApp')

// let firebaseApp: FirebaseApp

// export function initFirebaseApp() {
//   console.log('initFirebaseApp: checking')
//   if (!customGlobal[uniqueKey]){
//     console.log('initFirebaseApp: CREATE !!!!!!!!')
//     // customGlobal[uniqueKey] = initializeApp()
//     // initializeApp()
//     customGlobal[uniqueKey] = true
//   }
// }

// initFirebaseApp()

// Create a new client
console.log('creating firestore client')
export const firestore = new Firestore({
    databaseId: 'garage51-db',
});
  // export const firestore = getFirestore();

export async function quickstartFirestore() {
  // Obtain a document reference.
  const document = firestore.doc('posts/intro-to-firestore');

  // Enter new data into the document.
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World',
  });
  console.log('Entered new data into the document');

  // Update an existing document.
  await document.update({
    body: 'My first Firestore app',
  });
  console.log('Updated an existing document');

  // Read the document.
  const doc = await document.get();
  console.log('Read the document');

  // Delete the document.
  await document.delete();
  console.log('Deleted the document');

  return doc
}
