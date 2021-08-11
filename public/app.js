// Para rodar o projeto no terminal: npm run dev

const socket = io();
const msgText = document.querySelector('#msg')
const btnEnviar = document.querySelector('#btn-enviar')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector( '.message' )

let nome;

do {
    nome = prompt('Qual é seu nome?')
}
while ( !nome ) // enquanto nome digitado for falso ele mostra o prompt

document.querySelector( '#seu-nome' ).textContent = nome;
msgText.focus();

btnEnviar.addEventListener( 'click', (e) => {
    e.preventDefault()
    enviarMsg( msgText.value )
    msgText.value = '';
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
})
const enviarMsg = mensagem => {
    let msg = {
        user: nome,
        mensagem: mensagem.trim()
    }

    display(msg,'voce-mensagem')

    socket.emit('enviarMensagem', msg)
}

socket.on( 'enviarParaTodos', msg => {
    display( msg, 'outraPessoa' )
    chatBox.scrollTop = chatBox.scrollHeight;
} )

const display = (msg, type) => {
    const msgDiv = document.createElement( 'div' );
    let className = type
    msgDiv.classList.add( className, 'linha-mensagem' )
    let times = new Date().toLocaleTimeString();

    let innerText = `
    <div class="mensagem-titulo">
   👻<span>${msg.user}</span>
     </div>
    <div class="mensagem-text">
     ${msg.mensagem}
    </div>
    <div class="mensagem-timer">
    ${times}
    </div> 
    `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild( msgDiv )
    
}