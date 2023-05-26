import { app } from "./app";
// import colors from "colors";
// import { configuration } from "./config/config";

const port = 6000;

app.listen(port, () => {
  console.log(`Connected to port:${port}`);
});
