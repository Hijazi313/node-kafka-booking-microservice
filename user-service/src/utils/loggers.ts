import logger from "pino";
import dayjs from "dayjs";
const log = logger({
  enabled: true,
  timestamp: () => `, "time":"${dayjs().format()}`,
});
export default log;
