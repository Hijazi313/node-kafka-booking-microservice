// import { createClient } from "redis";
// // import config from "config";
// // import redisStore from "connect-redis";

// export default async function connectToRedis() {
//   const client = await createClient({
//     url: `redis://user-session-redis:${config.get<number>("redisPort")}`,
//   })
//     .on("error", (err) => console.log("Redis Client Error", err))
//     .on("connection", (stream) => {
//       console.log("someone connected!");
//     })
//     .connect();
// }
