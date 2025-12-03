const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors({
  origin: [
    "https://pt-frontend-9153.onrender.com",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Personal Transaction Manager API Running");
});

const PORT = process.env.PORT || 10000; // Render recommends 10000
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
