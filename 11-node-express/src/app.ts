import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { router as todosRouter } from "./routes/todos";

const app = express();
app.use(json());
app.use("/todos", todosRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
