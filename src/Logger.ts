import { createLogger, transports, format } from "winston"

const Logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "logs",
      filename: "whatzup.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
})

export default Logger