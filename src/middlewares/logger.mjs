export function requestLogger(req, res, next) {
  const timestamp = new Date();
  console.log(
    `[${timestamp.toLocaleDateString()}][${timestamp.toLocaleTimeString()}] ${req.method} request made to: ${req.originalUrl}`
  );
  next();
}
