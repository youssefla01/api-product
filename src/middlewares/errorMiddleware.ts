import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
};

export { errorHandler };
