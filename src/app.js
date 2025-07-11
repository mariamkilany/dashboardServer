require("dotenv").config({ path: __dirname + "/../.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/AuthRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
