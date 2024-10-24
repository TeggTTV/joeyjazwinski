import CryptoJS from "crypto-js";

function encrypt(plainText: string, secretKey: string): string {
    const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return cipherText;
}

function decrypt(cipherText: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export { encrypt, decrypt };