const CryptoJS = require("crypto-js");

export const encryptAES = (seedPhrase: any, password: any) => {
    const encrypted = CryptoJS.AES.encrypt(seedPhrase, password);
    return encrypted.toString();
};
