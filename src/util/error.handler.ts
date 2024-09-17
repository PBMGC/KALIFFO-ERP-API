import { Response } from "express";

const handleHttp = (res: Response, error: string, status: number = 500) => {
  res.status(status);
  res.json({
    success: false,
    message: error,
    status,
  });
};

export { handleHttp };
