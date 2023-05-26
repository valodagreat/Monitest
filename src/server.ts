import { app } from "./app";
// import colors from "colors";
// import { configuration } from "./config/config";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Connected to port:${port}`);
});
