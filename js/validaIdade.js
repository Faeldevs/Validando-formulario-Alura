export default function maiorDeIdade(campo){
    // New date recebe o valor da data de nascimento e vai enviar pro js da forma q ele entenda
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)){
        campo.setCustomValidity('O usuário não tem a idade apropriada!')
    }
}

function validaIdade(data){
    const dataAtual = new Date();
    // Variavel para saber a data que foi colocado, a pessoa tem 18 ou + anos
    const dataMaiordeDezoito = new Date(data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMaiordeDezoito;
    // retorna true or false
}