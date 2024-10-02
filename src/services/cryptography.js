import CryptoJS from 'crypto-js';

export const encryptEmail = (email, firstName, lastName, dateOfBirth) => {
  return CryptoJS.AES.encrypt(
    email || '',
    `${firstName || ''} ${lastName || ''}` + dateOfBirth
  ).toString();
};

export const encryptDescriptors = (descriptors, firstName, lastName, dateOfBirth) => {
  return descriptors.map((descriptor) =>
    CryptoJS.AES.encrypt(JSON.stringify(descriptor), `${firstName || ''} ${lastName || ''}` + dateOfBirth).toString()
  );
};

export const decryptEmail = (encryptedEmail, userDetails) => {
  return CryptoJS.AES.decrypt(
    encryptedEmail,
    userDetails.name + userDetails.DOB
  ).toString(CryptoJS.enc.Utf8);
};

export const decryptDescriptors = (userDetails) => {
  return Object.keys(userDetails)
    .filter((key) => key.startsWith('descriptors_'))
    .map((key) =>
      JSON.parse(
        CryptoJS.AES.decrypt(userDetails[key], userDetails.name + userDetails.DOB).toString(
          CryptoJS.enc.Utf8
        )
      )
    );
};