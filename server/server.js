require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDatabase } = require("./utils/connectDatabase");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { commonRouter } = require("./routes/commonRoutes");
const { userRouter } = require("./routes/userRoutes");
const app = express();
const { PORT, ALLOWED_ORIGINS } = process.env;

const origins = ALLOWED_ORIGINS.split(",").filter((origin) => origin !== " ");
app.use(
    cors({
        origin: origins,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
connectDatabase();
app.use("/assets", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", commonRouter);
app.use("/api/user", userRouter);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running at port ${PORT}.`));
