const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:your_frontend_port",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const http = require("http");
const { Server } = require("socket.io");

const db = require("./models");

const postRouter = require("./routes/Posts.routes");
app.use("/posts", postRouter);
const productRouter = require("./routes/Products.routes");
app.use("/products", productRouter);
const typeRouter = require("./routes/Types.routes");
app.use("/types", typeRouter);
const userRouter = require("./routes/Users.routes");
app.use("/users", userRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    chatNamespace.to(data.room).emit("receive_message", data);
  });
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    try {
      socket.join(data);
    } catch (error) {
      console.error("Error joining room:", error.message);
    }
  });

  socket.on("send_message", (data) => {
    try {
      socket.to(data.room).emit("receive_message", data);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });
});

db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
