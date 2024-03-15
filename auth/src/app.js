const express = require("express");
const cookieSession = require("cookie-session");
const { router: authRouter } = require("./routes/auth-routes");

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/users", authRouter);

module.exports={app};
