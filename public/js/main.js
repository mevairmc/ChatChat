const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//get username and Room

const {username, room} = Qs.parse(location.search,{
  ignoreQueryPrefix: true
});


const socket = io();

//Message server
socket.on('message', message => {
  console.log(message)
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
  div.innerHTML =`<p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}