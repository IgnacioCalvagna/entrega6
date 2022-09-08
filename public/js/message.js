const socket = io.connect();
const button = document.getElementById("submit");

button?.addEventListener("click", () => {
  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const eValidator = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (eValidator.test(message.email)) {
    if (!message.email ) {
      alert("Debes ingresar un email");
    }else if(!message.message){
      alert("Debes ingresar un mensaje ")
    } 
    else {
      socket.emit("new-message", message);
    }
  } else {
    alert("La dirección de email no es valida");
  }
});

socket.on("new-chat-message", (messages) => {
  // const date = ;
  const dateFormat = new Date().toLocaleString();

  const html = messages
    .map((message) => {
      let msjContent = `<div><span class="has-text-link has-text-weight-bold	" >${message.email}</span>`;
      msjContent += `[<span style="color:#805000"> ${dateFormat}</span>]`;
      msjContent += `:<em> <span class="is-italic	has-text-success	"> ${message.message} </span></em></div>`;
      return msjContent;
    })
    .join(" ");

  document.getElementById("chat").innerHTML = html;
});
