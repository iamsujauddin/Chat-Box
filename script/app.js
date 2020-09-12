//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-room");
//add new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateNmae(newName);
  newNameForm.reset();
  //show and then hide the msg
  updateMsg.innerText = `your name is updated to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

//update the chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

//check local storage for a anme
const username = localStorage.username ? localStorage.username : "annonymus";

//create instances of class
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);
//get chats
chatroom.getChats((data) => {
  chatUI.render(data);
});
