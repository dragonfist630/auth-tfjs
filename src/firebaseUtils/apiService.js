import { addDoc, collection, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const uploadImageAndSendEmail = async (to, emailContent, selectedHandSign, startCountdown) => {
  try {
    await addDoc(collection(db, 'mail'), {
      to: [to],
      message: {
        subject: `Instructions: You have to draw ${selectedHandSign} in American Sign Language`,
        html: emailContent,
      },
    });
    console.log('Image uploaded and email sent successfully');
    startCountdown();
  } catch (error) {
    console.error('Error uploading image or sending email: ', error);
  }
};

export const fetchUserData = async (userId) => {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap;
};

export const addUserData = async (userDetails) => {
  const docRef = await addDoc(collection(db, 'users'), userDetails);
  return docRef;
};

export const deleteUserData = async (userId) => {
  const userDocRef = doc(db, 'users', userId);
  await deleteDoc(userDocRef);
};