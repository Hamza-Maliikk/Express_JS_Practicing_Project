function ReqResLogger(req, res, next) {
  fs.appendFile(
    "log.txt",
    `\n ${new Date().toLocaleString()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    },
  )};