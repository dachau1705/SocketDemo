const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./models");

const port = 4000;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

const postRouter = require("./routes/Posts.routes");
app.use("/posts", postRouter);

const productRouter = require("./routes/Products.routes");
app.use("/products", productRouter);

const typeRouter = require("./routes/Types.routes");
app.use("/types", typeRouter);

const userRouter = require("./routes/Users.routes");
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
