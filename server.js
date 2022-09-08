const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { engine } = require("express-handlebars");

app.use("/public", express.static("./public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

const messages = [];
const products = [];
//READ MESSAGES

const fs = require("fs");

fs.promises
  .readFile("./messages.text", "utf-8")
  .then((fileData) => {
    const array = JSON.parse(fileData);
    array.map((message) => {
      messages.push(message);
    });

  })
  .catch((err) => console.log(err));

//SAVE MESSAGES
const save = (messages) => {
  const fs = require("fs");
  fs.promises
    .writeFile("./messages.text", JSON.stringify(messages))
    .then((data) => {
      return console.log(`Mensaje enviado exitosamente `);
    })
    .catch((error) => console.log(error));
};

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("new-chat-message", messages);
  socket.emit("new-product-table", products);

  socket.on("new-message", (message) => {
    messages.push(message);
    save(messages);
    io.sockets.emit("new-chat-message", messages);
  });

  socket.on("new-product", (product) => {
    products.push(product);
    io.sockets.emit("new-product-table", products);
  });
});

const connectedServer = httpServer.listen(8080, () => {
  console.log("Servidor http con web sockets listo");
});

connectedServer.on("error", (error) => console.log);