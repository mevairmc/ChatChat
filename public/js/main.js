const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')

//get username and Room

const {username, room} = Qs.parse(location.search,{
  ignoreQueryPrefix: true
});


const socket = io();
// Join CHatRoom
socket.emit('joinRoom', {username, room});


//Get room and users
socket.on('roomUsers',({room, users})=>{
  outputRoomName(room);
  outputUsers(users);
})

//Message server
socket.on('message', message => {
  outputMessage(message)

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

//Message Subimit:
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to the server
  socket.emit('chatMessage', msg);

  // Clear input and keep writting
  e.target.elements.msg.value = ""
  e.target.elements.msg.focus();
})

//Ouput message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML =`<p class="meta">${message.username}  <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOm

function outputRoomName(room){
  roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users){
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}