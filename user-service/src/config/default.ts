import dotenv from "dotenv";
import zod from "zod";

dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  saltWorkFactor: number;
  // redisPort: number;
  publicKey: string;
  privateKey: string;
  accessTokenTTL: string;
  refreshTokenTTL: string;
}

const config: Config = {
  port: parseInt(process.env.PORT ?? "3000", 10) ?? 3000,
  // mongoUri: "mongodb://user-mongodb:27017/Users",
  mongoUri: process.env.MONGO_URI ?? "",
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR ?? "10", 10) ?? 10,
  // redisPort:proc
  // redisUrl: process.env.REDIS_URL || ,
  // redisPort: process.env.REDIS_PORT || 6379,
  publicKey: `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo7uUJxka5cGp550DaytI
ko32dD3fMtOXliPxecHtR53ipTHE2XW7bm9wlpmhoKVBk98PizGtYIAJNz8GNHMQ
3Ab3uk+LeSGOnhtNhtOn/zhKCa280fFR68oneivznrd7UzgNZ8fk3UKJBoFJ/EGp
9olCKLbXVV1LSE6H0N7kZ7vkehoS1beYdGi0+0tM/PHQufSA8YC4m5z8wtkpf9v/
EQb7wvUMzm71BYtiRoPgg5nySkb8g8nzp+3Hqno07Mqtb9PluQ1CWHKNRUQ0jmle
wcXTYXK0xFJGxekRPwldm/Pw0rvUUNqnUA2TBWPQq/N3J+ylRtG7+0Ho9DTvSTtt
tQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCju5QnGRrlwann
nQNrK0iSjfZ0Pd8y05eWI/F5we1HneKlMcTZdbtub3CWmaGgpUGT3w+LMa1ggAk3
PwY0cxDcBve6T4t5IY6eG02G06f/OEoJrbzR8VHryid6K/Oet3tTOA1nx+TdQokG
gUn8Qan2iUIottdVXUtITofQ3uRnu+R6GhLVt5h0aLT7S0z88dC59IDxgLibnPzC
2Sl/2/8RBvvC9QzObvUFi2JGg+CDmfJKRvyDyfOn7ceqejTsyq1v0+W5DUJYco1F
RDSOaV7BxdNhcrTEUkbF6RE/CV2b8/DSu9RQ2qdQDZMFY9Cr83cn7KVG0bv7Qej0
NO9JO221AgMBAAECggEABa9lyPLB9erYJFrrFg2fcY6c2V3sR1aaAO8Cu4x8hEaq
6pCpv2GWDmhaWNxWRJ6gV4sAqOpiv62fxEuRAqwL0JFXCODUsgd0goW7rCa4GAWj
anvIyThkyg1k+q9r1YhqROeMGEepqSDI4xEvrrg1TNe+FJhUA0U1RTo21I2SEY5M
zcJsACDaws4PVpi8XDz/FmK/WdeRHpLtgLTUA26UokyCAj1jK7MgMyz6L2iLF51/
vVMc0XOxtKd/0my6Qi2XJvrNrqnYVw5a1N2/ap19n1U8Fr4oKpnpTdn+iEcewWdM
K7OaZJ+HGAv2uZ1q4YeSSZHegV8Jrz3cGc4JR+LX2QKBgQDWaFNlTCSkgrx21jWN
14OKIN0dhf3IrymoPcei3EkSr+DDyQwACc5ZKW0DWk/UXst88NEG2JTxN9nOFyoW
52mk+xWALD7xIDbat0uJ83ZaeTVGTsxdKDMrviBE1QC+x3BE9Qpx/Uh2bibn54BK
n47kISZJ/ENCVaJfdGghGL9wCQKBgQDDfrI9UHqBm9Z4Sf6y29EIG+FVkpOU+xRT
aGjib8uT50wdZg+0BmV27400+6CeL8iYwAd/gB5jkb0qh7+Gy8TDbiOxXlJ5gVqo
GHBaFyYaFMZtjph6RJRW/aA8r3JpimZgOFrQq+j/KLZio9lmMtEGW/JhygM7rPfW
j55oqwmjTQKBgQC4g+/BLVYbfadTXeWYu++n38Bqt/U/z/65mvFDZvA79MApvctl
/QpoEQ6P5BjvWuUkENrSWXFUZgw7IBRIwb5ZDPvj4jAIswCCGVwYzDz+f3EpoIaf
ZQkki+qZUfXiOSCVN4xVrPO/d+xjhwcRMV93VE/vO/lmDOw/2Z4DXZjigQKBgQCr
PAJral6jwBhvbIDHsXq6m5EYHzdduz7mgAG+tSWf+2zUI12F1kRxlQoeankZlcki
4rCuoU388N68rgK40ysZ8xMYfQHIo+EAc8eVYclh9uiHdetgzUkRmT4Naa/RegSK
K1KAjNOdC9AVPmdh+QjVhRwdQ5DpaGv9Z/bcv1PF0QKBgGDsLGuW9i4NlcSMAZ7x
sDCVzkM1PJg1jlXPu6iozBFCsy2JGc4vnP1gVVKc6PCzkolvvV0MjyqevI2IBYbc
ciAMbhWNk9/HPjNo7DEKOTT2WlKo8xzZVw8Rvg4U2X8fakeiQXVodpO/MggVcIX3
b/50on3mLz7+Ru/jcCdkLvkz
-----END PRIVATE KEY-----`,
  accessTokenTTL: "5s",
  refreshTokenTTL: "1y",
};

export default config;
export const envSchema = zod.object({
  PORT: zod.number(),
  MONGO_URI: zod.string().nonempty(),
});
// export default {
//   port: process.env.PORT ?? 3000,
//   // mongoUri: "mongodb://user-mongodb:27017/Users",
//   mongoUri: process.env.MONGO_URI ?? "",
//   saltWorkFactor: process.env.SALT_WORK_FACTOR ?? 10,
//   // redisPort:proc
//   // redisUrl: process.env.REDIS_URL || ,
//   redisPort: process.env.REDIS_PORT || 6379,
//   publicKey: `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo7uUJxka5cGp550DaytI
// ko32dD3fMtOXliPxecHtR53ipTHE2XW7bm9wlpmhoKVBk98PizGtYIAJNz8GNHMQ
// 3Ab3uk+LeSGOnhtNhtOn/zhKCa280fFR68oneivznrd7UzgNZ8fk3UKJBoFJ/EGp
// 9olCKLbXVV1LSE6H0N7kZ7vkehoS1beYdGi0+0tM/PHQufSA8YC4m5z8wtkpf9v/
// EQb7wvUMzm71BYtiRoPgg5nySkb8g8nzp+3Hqno07Mqtb9PluQ1CWHKNRUQ0jmle
// wcXTYXK0xFJGxekRPwldm/Pw0rvUUNqnUA2TBWPQq/N3J+ylRtG7+0Ho9DTvSTtt
// tQIDAQAB
// -----END PUBLIC KEY-----`,
//   privateKey: `
// -----BEGIN PRIVATE KEY-----
// MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCju5QnGRrlwann
// nQNrK0iSjfZ0Pd8y05eWI/F5we1HneKlMcTZdbtub3CWmaGgpUGT3w+LMa1ggAk3
// PwY0cxDcBve6T4t5IY6eG02G06f/OEoJrbzR8VHryid6K/Oet3tTOA1nx+TdQokG
// gUn8Qan2iUIottdVXUtITofQ3uRnu+R6GhLVt5h0aLT7S0z88dC59IDxgLibnPzC
// 2Sl/2/8RBvvC9QzObvUFi2JGg+CDmfJKRvyDyfOn7ceqejTsyq1v0+W5DUJYco1F
// RDSOaV7BxdNhcrTEUkbF6RE/CV2b8/DSu9RQ2qdQDZMFY9Cr83cn7KVG0bv7Qej0
// NO9JO221AgMBAAECggEABa9lyPLB9erYJFrrFg2fcY6c2V3sR1aaAO8Cu4x8hEaq
// 6pCpv2GWDmhaWNxWRJ6gV4sAqOpiv62fxEuRAqwL0JFXCODUsgd0goW7rCa4GAWj
// anvIyThkyg1k+q9r1YhqROeMGEepqSDI4xEvrrg1TNe+FJhUA0U1RTo21I2SEY5M
// zcJsACDaws4PVpi8XDz/FmK/WdeRHpLtgLTUA26UokyCAj1jK7MgMyz6L2iLF51/
// vVMc0XOxtKd/0my6Qi2XJvrNrqnYVw5a1N2/ap19n1U8Fr4oKpnpTdn+iEcewWdM
// K7OaZJ+HGAv2uZ1q4YeSSZHegV8Jrz3cGc4JR+LX2QKBgQDWaFNlTCSkgrx21jWN
// 14OKIN0dhf3IrymoPcei3EkSr+DDyQwACc5ZKW0DWk/UXst88NEG2JTxN9nOFyoW
// 52mk+xWALD7xIDbat0uJ83ZaeTVGTsxdKDMrviBE1QC+x3BE9Qpx/Uh2bibn54BK
// n47kISZJ/ENCVaJfdGghGL9wCQKBgQDDfrI9UHqBm9Z4Sf6y29EIG+FVkpOU+xRT
// aGjib8uT50wdZg+0BmV27400+6CeL8iYwAd/gB5jkb0qh7+Gy8TDbiOxXlJ5gVqo
// GHBaFyYaFMZtjph6RJRW/aA8r3JpimZgOFrQq+j/KLZio9lmMtEGW/JhygM7rPfW
// j55oqwmjTQKBgQC4g+/BLVYbfadTXeWYu++n38Bqt/U/z/65mvFDZvA79MApvctl
// /QpoEQ6P5BjvWuUkENrSWXFUZgw7IBRIwb5ZDPvj4jAIswCCGVwYzDz+f3EpoIaf
// ZQkki+qZUfXiOSCVN4xVrPO/d+xjhwcRMV93VE/vO/lmDOw/2Z4DXZjigQKBgQCr
// PAJral6jwBhvbIDHsXq6m5EYHzdduz7mgAG+tSWf+2zUI12F1kRxlQoeankZlcki
// 4rCuoU388N68rgK40ysZ8xMYfQHIo+EAc8eVYclh9uiHdetgzUkRmT4Naa/RegSK
// K1KAjNOdC9AVPmdh+QjVhRwdQ5DpaGv9Z/bcv1PF0QKBgGDsLGuW9i4NlcSMAZ7x
// sDCVzkM1PJg1jlXPu6iozBFCsy2JGc4vnP1gVVKc6PCzkolvvV0MjyqevI2IBYbc
// ciAMbhWNk9/HPjNo7DEKOTT2WlKo8xzZVw8Rvg4U2X8fakeiQXVodpO/MggVcIX3
// b/50on3mLz7+Ru/jcCdkLvkz
// -----END PRIVATE KEY-----`,
//   accessTokenTTL: "5s",
//   refreshTokenTTL: "1y",
// };
