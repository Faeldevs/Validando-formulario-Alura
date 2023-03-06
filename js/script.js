import umCPF from "./cpfValidacao.js";
import maiorDeIdade from "./validaIdade.js";

const camposDoFormualrio = document.querySelectorAll("[required]");
// todos documentos com o Required (CPF, Nome, Email...)
const formulario = document.querySelector("[data-formulario]");
// Cadastrando em localStorage 
formulario.addEventListener("submit" , (e) =>{
    //preventDefault() impede que o evento padrão ocorra
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem('cadastro' , JSON.stringify(listaRespostas));

    window.location.href = '/pages/abrir-conta-form-2.html';
});



camposDoFormualrio.forEach((campo) =>{
        // blur - tira o foco do input
    campo.addEventListener("blur" , () => verificaCampo(campo));
        // tira a mensagem de Preencher o campo a fim de personalizar da sua forma
    campo.addEventListener("invalid" , evento => evento.preventDefault());
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    rg: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = "";
    // Faz o erro sumir após colocar o item certo
    campo.setCustomValidity('');
    // Se o nome do campo for "cpf" e o valor for >=  , chamar a função
    if (campo.name == "cpf" && campo.value.length >= 11){
        umCPF(campo);
    }
    // Se o campo for "aniversario" e o campo n tiver "vazio", chamar a função: 
    if (campo.name == "aniversario" && campo.value != ""){
        maiorDeIdade(campo);
    }
    // Ve se em cada item ocorre algum erro, 
    // se ocorrer, a variavel "mensagens" será chamada e enviarar tal mensagem de tal erro
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })
    // class definida em cada <span></span> do HTML
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    // checa se ta valido
    const validadorDeInput = campo.checkValidity();
    // Se não tiver valido, ele vai imprimir esse <span></span> com mensagem de erro da variavel "mensagens"
    if (!validadorDeInput){
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

}