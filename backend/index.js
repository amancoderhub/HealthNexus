require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("node:path");

const adminRoute = require("./Route/adminRoute");
const doctorRoute = require("./Route/doctorRoute");
const patientRoute = require("./Route/patientRoute");
const appRoute = require("./Route/appRoute");
const newsRoute = require("./Route/newsRoute");
const feedRoute = require("./Route/feedRout");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);
app.use("/api/app", appRoute);
app.use("/api/news", newsRoute);
app.use("/api/feed", feedRoute);

const dbUrl = process.env.ATLASDB_SECRET;
mongoose
    .connect(dbUrl)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.log(`❌ Database Connection Error: ${err}`));

    const _dirname = path.resolve();

    if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "../frontend/build")));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "../frontend/build", "index.html"));
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
