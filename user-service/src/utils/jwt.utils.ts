import { SignOptions, sign, verify } from "jsonwebtoken";
import config from "../config/default";
// import config from "config";
// import crypto from "crypto";
// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048, // Key size in bits (adjust as needed)
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });

// const privateKey = config.get<string>("privateKey");
// const publicKey = config.get<string>("publicKey");
const privateKey = config.privateKey;
const publicKey = config.publicKey;
export async function signJwt(
  payload: Object,
  options?: SignOptions | undefined
) {
  const tok = sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
  return tok;
}
export async function verifyJwt(token: string) {
  try {
    const decoded = verify(token, publicKey);
    return { valid: true, expired: false, decoded };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message.includes("expired"),
      decoded: null,
    };
  }
}
