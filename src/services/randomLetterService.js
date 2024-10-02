const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateRandomLetter = () => {
  const randomIndex = Math.floor(Math.random() * ALPHABETS.length);
  return ALPHABETS[randomIndex];
};