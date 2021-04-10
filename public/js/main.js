const chatForm = document.getElementById('chat-form');

const socket = io();

//Message server
socket.on('message', message => {
  console.log(message)
  outputMessage(message)
})

//Message Subimit:
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to the server
  socket.emit('chatMessage', msg);
})

//Ouput message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML =`<p class="meta">Evair <span>9:15pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}