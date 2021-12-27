import express, { Request, Response } from "express";

const app = express();
const port = 9000;

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.listen(port, () => console.log(`listening on localhost:${port}`));
