require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const socketIo = require("socket.io");
const http = require("http");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());




app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes)
app.use('/api/v1/order', orderRoutes)

server.listen(process.env.PORT, () => {
  console.log(`server is listing on port ${process.env.PORT} `);
});
