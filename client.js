// WE HAVE TO JOIN CLIENT.JS WITH OUR INDEX.JS so we wrote this in html:
//     <script defer src="http://localhost:80/socket.io/socket.io.js"></script>

//GET ALL ELEMENTS BY ID/CLASS
const socket=io ("http://localhost:80");
const form=document.getElementById('sendmsg');
const msgInput=document.getElementById('message');

//NOW USING QUERY SELECTOR WE WANT OUR container SO THAT MESSAGES R DISPLAYED THERE
const msgContainer= document.querySelector('.container');

//GETTING A PROMPT WINDOW TO ENTER OUR NAME
const username=prompt("Enter your name to join iChat with your friends");

//ALSO GIVE THAT NAME TO new_user_joins SO THAT WE GET OUR NAME
socket.emit('new_user_joins',username);


//CREATING AN APPEND FNC
const append=(message,classtoadd)=>{
    
    msgElement=document.createElement('div'); 
    msgElement.innerText=message;
    msgElement.classList.add('msg');
    msgElement.classList.add(classtoadd);
    msgContainer.append(msgElement);
    var d=new Date().toLocaleTimeString();
    
}

//WHEN NEW USER JOINS: MESSAGE TO BE APPENDED ---user_joined
socket.on('user_joined',username=>{
    
    // msgElement.classList.add('centermsg');
    // msgElement.classList.remove('right');
    // msgElement.classList.remove('left');
    append(`${username} joined the chat`,'centermsg');

});

//WHEN WE RECEIVE A MESSAGE- receive
socket.on('receive',data=>{
    audio.play();
    // msgElement.classList.add('left');
    // msgElement.classList.remove('centermsg');
    // msgElement.classList.remove('right');
    append(`${data.username}: ${data.message}`,'left');

});

//WHEN SOME1 LEAVES THE CHAT- userleft
socket.on('userleft',username=>{
    
    // msgElement.classList.add('centermsg');
    // msgElement.classList.remove('right');
    // msgElement.classList.remove('left');
    append(`${username} left the chat`,'centermsg');
});

//RINGTONE ON EACH TIME A NEW MESSAGE: 
var audio= new Audio('audio.mp3');


//FOR SUBMITTING THE FORM
form.addEventListener('submit',(fnc)=>{

    //so that page does not reload after submitting
    fnc.preventDefault();
    const message=msgInput.value;
    
    // msgElement.classList.add('right');
    // msgElement.classList.remove('centermsg');
    // msgElement.classList.remove('left')
    append(`You: ${message}`,'right');
    socket.emit('sentmsg',message);
    msgInput.value='';
});

