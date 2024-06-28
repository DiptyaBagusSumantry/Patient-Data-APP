require("dotenv").config();
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");

const clientCertPath = path.resolve(__dirname, "postman.pem");
const clientKeyPath = path.resolve(__dirname, "csrprivatekey.key");
// const caCertPath = path.resolve(__dirname, "postman.pem");

const clientCert = fs.readFileSync(clientCertPath);
const clientKey = fs.readFileSync(clientKeyPath);

const crypto = require("crypto");

// // Fungsi untuk mendekripsi teks terenkripsi
// function decrypt(encryptedText, encryptionKeyString, encryptionIVString) {
//   const encryptionKey = Buffer.from(`${encryptionKeyString}`, "base64");
//   const encryptionIV = Buffer.from(`${encryptionIVString}`, "base64");

//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     encryptionKey,
//     encryptionIV
//   );
//   let decrypted = decipher.update(encryptedText, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// }

//terdapat 3 parameter url,body,option(header dll)
const axiosInstance = axios.create({
  baseURL: process.env.URL_SGKMS,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    cert: clientCert,
    key: clientKey,
    // ca: [caCert],
    rejectUnauthorized: false,
  }),
});

class SGKMS {
  static async sendLogin() {
    try {
      const response = await axiosInstance.post("/v1.0/agent/login", {
        slotId: 1,
        password: process.env.PASSWORD_SGKMS,
      });
      // console.log(response)
      return response.data;
    } catch (err) {
      console.error("error login:", err.response.data);
      return err.response.data;
    }
  }

  static async encryptData(sessionToken, plaintext) {
    try {
      const response = await axiosInstance.post("/v1.0/encrypt", {
        sessionToken: sessionToken,
        slotId: parseInt(process.env.SLOT_ID),
        keyId: process.env.KEY_ID,
        plaintext: plaintext,
      });
      return response.data;
    } catch (err) {
      console.error("error Encrypt:", err.response.data);
      return err.response.data;
    }
  }

  static async decryptData(sessionToken, ciphertext) {
    const response = await axiosInstance.post("/v1.0/decrypt", {
      sessionToken: sessionToken,
      slotId: parseInt(process.env.SLOT_ID),
      keyId: process.env.KEY_ID,
      keyVersion: ciphertext[0].keyVersion,
      ciphertext: ciphertext,
    });
    // console.log(response);
    return response.data;
  }

  //seal wity syncmetric (publickey and privatekey)
  static async seal(sessionToken, plaintext) {
    // const response = await axiosInstance.post("/v1.0/seal", {
    //   sessionToken: sessionToken,
    //   slotId: parseInt(process.env.SLOT_ID),
    //   keyId: process.env.KEY_ID,
    //   plaintext: plaintext,
    // });
    // // console.log(plaintext)
    // return response.data;
  }

  //unseal wity syncmetric (publickey and privatekey)
  static async unseal(sessionToken, ciphertext) {
    // const response = await axiosInstance.post("/v1.0/unseal", {
    //   sessionToken: sessionToken,
    //   slotId: parseInt(process.env.SLOT_ID),
    //   ciphertext: ciphertext,
    // });
    // // console.log(plaintext)
    // return response.data;
  }

  static async refreshSession(sessionToken) {
    try {
      const payload = {
        slotId: parseInt(process.env.SLOT_ID),
        sessionToken: sessionToken,
      };

      const response = await axiosInstance.post(
        "/agent/refreshSession",
        payload
      );

      return response.result;
    } catch (error) {
      console.error("Kesalahan login:", err);
    }
  }

  static async getSecret(sessionToken, secretId) {
    const payload = {
      sessionToken,
      slotId: 1,
      secretId,
    };

    const response = await axiosInstance.post("/secret/get", payload);
    return response.result;
  }
}

module.exports = SGKMS;

// sendLogin()
// async function createPatient() {
//   try {
//     const accesToken = await sendLogin();
//     const options = {
//       headers: {
//         Authorization: `Bearer ${accesToken}`, // Menggunakan accessToken dalam header
//       }
//     };
//     const body = {
//       fullname: "Patient 1",
//       place_birth: "Patient 1",
//       date_birth: "2024-03-12",
//       gender: "Patient 1",
//       address: "Patient 1",
//       work: "Patient 1",
//       phone: "08123456721",
//       username: "patient4",
//       password: "User1234!",
//       fullname: "patient1",
//       email: "user2@gmail.com",
//     };

//     // console.log(options);
//     const response = await axiosInstance.post("/patient",body, options);
//     console.log(response.data);
//     return response.data;
//   } catch (err) {
//     console.error("Kesalahan create patient:", err.response.data);
//   }
// }

// createPatient();
