// Abrir video para a preparação da captura
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

// Capturar a foto
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
let imagemURL = "";

// Enviar imagem
const botaoEnviarFoto = document.querySelector("[data-enviar]");


// navigator.mediaDevices inicia a camera
// foi usado assincrono pois precisa esperar o usuario aceitar a ativação da camera
botaoIniciarCamera.addEventListener('click' , async function (){
    const iniciarVideo = await navigator.mediaDevices
    // video sim, audio não 
    .getUserMedia({video: true, audio: false})

    botaoIniciarCamera.style.display = 'none';
    campoCamera.style.display = 'block';
    // recebe como origem o navigator
    video.srcObject = iniciarVideo;
})

// Função para capturar a foto
botaoTirarFoto.addEventListener('click' , function(){
    canvas.getContext('2d').drawImage(video , 0 , 0 ,canvas.width, canvas.height)
    // transforma imagem em uma url
    imagemURL = canvas.toDataURL("imagem/jpeg");

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})

// Função enviar foto

botaoEnviarFoto.addEventListener('click', () =>{
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converterRetorno = JSON.parse(receberDadosExistentes);

    converterRetorno.imagem = imagemURL;
    // informações de cadastro atualizada (adicionado a imagem)
    localStorage.setItem('cadastro' , JSON.stringify(converterRetorno));

    window.location.href = "../pages/abrir-conta-form-3.html";
})