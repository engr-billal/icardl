import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectDB from "./db.js";
import slug from "mongoose-slug-generator";
import sgMail from "@sendgrid/mail";
import UserRouter from "./routes/UserRoutes.js";
import RegistrationRouter from "./routes/RegistrationRoutes.js";
import SummaryRouter from "./routes//SummaryRoutes.js";
import EventRouter from "./routes/EventRoutes.js";
import mongoose from "mongoose";

dotenv.config();
await connectDB();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
mongoose.plugin(slug);

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URLS.split(" "),
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "189765324812567846256bc459753648125c354c",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 10,
    },
  })
);

app.use("/media", express.static("./media"));
app.use("/users", UserRouter);
app.use("/summary", SummaryRouter);
app.use("/registrations", RegistrationRouter);
app.use("/events", EventRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started at ${process.env.HOST}`);
});
