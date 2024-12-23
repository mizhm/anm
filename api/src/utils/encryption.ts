import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'abc1234abc1234';

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptFieldInObject(object: any): any {
  const encryptedObject = { ...object };
  for (const key in encryptedObject) {
    if (!['id', 'createdAt', 'updatedAt'].includes(key))
      encryptedObject[key] = encrypt(encryptedObject[key].toString());
  }
  return encryptedObject;
}

export function decryptFieldInObject(object: any): any {
  const decryptedObject = { ...object };
  for (const key in decryptedObject) {
    if (!['id', 'createdAt', 'updatedAt'].includes(key))
      decryptedObject[key] = decrypt(decryptedObject[key].toString());
  }
  return decryptedObject;
}
