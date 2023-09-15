import { SignOptions, sign, verify } from "jsonwebtoken";
import config from "config";
// const publicKey = config.get<string>("publicKey");
// const privateKey = config.get<string>("privateKey");
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQB1MAXK0LUoDzPoqM/vASpS7Y2ufSs+I4Av3wKGA2WPw8DhEjIg
DFTrIAFnBr8fdZqDM1YpYbswy6uNQCbioUYnocBHehizLJ9St48zL7rSqcjFQRPS
9kjm0TN4buZReEBOVpTd5RPaWnnpuOTzLP6AhR7bOPN2VtNUQiLyxTcocYTuZj0u
E5VRrVnoCRPqLKzPZUF2+q4sMVC3n2mDof5Fr4VlrID4+0BWtBNZt6QCvU3Y2yTh
DPE2HzohE6aueYvczVa95jYjOM3fFP81SlIC6hbuTRjNNgPuSwE3TqocjPrRp/i/
vWJKZuRzNVPf2NZfBVZEGUIl8zHbY1szXA/fAgMBAAECggEAT5OPq1y0V4KTVj8k
DAF3kx6bIkz/C1AiIN/IH+a4lbpxBKVNgnO9SnjOWv661AsRJFy8+pbR/V2gnedd
QHIRaKIvJppjoXAAtLPPOwwDSkBfBIufgZcahBq1X+e24MXOrSOgLVn8dD8SIEMc
vYDlRbKf9G+k68wj70iF4ONJBF2+XVv2soCWsX4BvLBBoTF4JNsh2Do1C5on90Zd
CZXUV7KQZ4EQ/FRoC649ZsURU7ZML49VzlJwGSKnYlDcQq2TgGUA7/UIVdoN521u
eFIqV+/EcFf+Z02TjuXGteHMQZYJfPiEPg37+s7NODGbeTxDpKSJrJL22Tj84fP+
83rk+QKBgQC0m16ktwkbjQ5czItYZt3JDhkaz3OECQczfNVW8Oh+UAjqfSVHVGSf
oYrhOHApx2Yme6QnUZcHeXf06I8/HegPExgD0DK9Afa13LJodep6THn+ebLPLkkv
SNFMydYhcQ+sUCHq095IazqCg8yXdbXuSUc4Golmqj5iOLBqIyKj0wKBgQCmG1JC
/LJgTq/HWNXCi6j85xy/PD1BhCwUB2+CqMwjWqQOY0VLOc3O/zRWeUbst76VOAug
adUlz9nEldZbIXGohJt4fH5cABTr4q58pP1472dJUlgzEFiBWT4N7/BGhUTJ6CcO
w4Fk2CI3xpXO4XpDd+sNzUQ0cAYpRSXngvl4RQKBgQCcspT5+ming8nrT/iyeYWB
9H5pmYYTD7Y0wOFkrl45gX1K3cujSKCJM6KIZ+xBA2UojGvPRWXxMT2XutLWIz99
HMbgQBpVjMed4F7WbUBEXegWl0ZBpVoP8XDO2+uyViMQEPJsiOg6EvbP2ESBQLrZ
hLCLB9MgxSKdG6xMWjGqywKBgEKonC59sier7CaXo9DaswoqxQKJbhuoqveutDU/
AA0ABu4vMFOr8seq6pn5OVkts7G2OBQ75Gm0K7QUXV1c4nu6G5oSe7L35W10Homu
vHmXuV9XSEXVvW7LHXgCXe4u9RgBrgrisj6B7dlsPBo1qhcBPLbhNQnGGvLc6QUr
LmnxAoGAFmzjkzAcsV09vz6u6V/sk7t3g01Hh/RiMSzzwnkOdS4vjkfFBLZ066oX
V+aA4ZjlVuuIk569TNEEcP4Z+JIWg5YA/IkCdShl11V5B9n7IAZ32iMcyeTMhfi2
45q3jDIid2/jvJUpEE5qPEu94G1U16W9FAaUoQatfFQheAvmzJM=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQB1MAXK0LUoDzPoqM/vASpS7Y2ufSs+I4Av3wKGA2WPw8DhEjIg
DFTrIAFnBr8fdZqDM1YpYbswy6uNQCbioUYnocBHehizLJ9St48zL7rSqcjFQRPS
9kjm0TN4buZReEBOVpTd5RPaWnnpuOTzLP6AhR7bOPN2VtNUQiLyxTcocYTuZj0u
E5VRrVnoCRPqLKzPZUF2+q4sMVC3n2mDof5Fr4VlrID4+0BWtBNZt6QCvU3Y2yTh
DPE2HzohE6aueYvczVa95jYjOM3fFP81SlIC6hbuTRjNNgPuSwE3TqocjPrRp/i/
vWJKZuRzNVPf2NZfBVZEGUIl8zHbY1szXA/fAgMBAAECggEAT5OPq1y0V4KTVj8k
DAF3kx6bIkz/C1AiIN/IH+a4lbpxBKVNgnO9SnjOWv661AsRJFy8+pbR/V2gnedd
QHIRaKIvJppjoXAAtLPPOwwDSkBfBIufgZcahBq1X+e24MXOrSOgLVn8dD8SIEMc
vYDlRbKf9G+k68wj70iF4ONJBF2+XVv2soCWsX4BvLBBoTF4JNsh2Do1C5on90Zd
CZXUV7KQZ4EQ/FRoC649ZsURU7ZML49VzlJwGSKnYlDcQq2TgGUA7/UIVdoN521u
eFIqV+/EcFf+Z02TjuXGteHMQZYJfPiEPg37+s7NODGbeTxDpKSJrJL22Tj84fP+
83rk+QKBgQC0m16ktwkbjQ5czItYZt3JDhkaz3OECQczfNVW8Oh+UAjqfSVHVGSf
oYrhOHApx2Yme6QnUZcHeXf06I8/HegPExgD0DK9Afa13LJodep6THn+ebLPLkkv
SNFMydYhcQ+sUCHq095IazqCg8yXdbXuSUc4Golmqj5iOLBqIyKj0wKBgQCmG1JC
/LJgTq/HWNXCi6j85xy/PD1BhCwUB2+CqMwjWqQOY0VLOc3O/zRWeUbst76VOAug
adUlz9nEldZbIXGohJt4fH5cABTr4q58pP1472dJUlgzEFiBWT4N7/BGhUTJ6CcO
w4Fk2CI3xpXO4XpDd+sNzUQ0cAYpRSXngvl4RQKBgQCcspT5+ming8nrT/iyeYWB
9H5pmYYTD7Y0wOFkrl45gX1K3cujSKCJM6KIZ+xBA2UojGvPRWXxMT2XutLWIz99
HMbgQBpVjMed4F7WbUBEXegWl0ZBpVoP8XDO2+uyViMQEPJsiOg6EvbP2ESBQLrZ
hLCLB9MgxSKdG6xMWjGqywKBgEKonC59sier7CaXo9DaswoqxQKJbhuoqveutDU/
AA0ABu4vMFOr8seq6pn5OVkts7G2OBQ75Gm0K7QUXV1c4nu6G5oSe7L35W10Homu
vHmXuV9XSEXVvW7LHXgCXe4u9RgBrgrisj6B7dlsPBo1qhcBPLbhNQnGGvLc6QUr
LmnxAoGAFmzjkzAcsV09vz6u6V/sk7t3g01Hh/RiMSzzwnkOdS4vjkfFBLZ066oX
V+aA4ZjlVuuIk569TNEEcP4Z+JIWg5YA/IkCdShl11V5B9n7IAZ32iMcyeTMhfi2
45q3jDIid2/jvJUpEE5qPEu94G1U16W9FAaUoQatfFQheAvmzJM=
-----END RSA PRIVATE KEY-----`;
export async function signJwt(
  object: Object,
  options?: SignOptions | undefined
) {
  const tok = sign(object, privateKey, {
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
    return { valid: false, expired: err.message === "expired", decoded: null };
  }
}