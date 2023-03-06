// Exportada como padrao
export default function umCPF(campo) {
    //Substitui os caracteres especial por "vazio"
    const cpf = campo.value.replace(/\.| /g, "");
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)){
        campo.setCustomValidity('Esse cpf não é válido')
       
    } 
}

// Funcao para evitar que se repita tais numeros
function validaNumerosRepetidos(cpf){
    const numeroRepetido = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    // retorna true or false
    return numeroRepetido.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0
    let multiplicador = 10
    // cpf base da funcao 937.777.040-83  
    // Essa estrutura valida o primeiro digito do cpf
    for(let tamanho = 0; tamanho < 9; tamanho++){
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;
    
    for(let tamanho = 0; tamanho < 10; tamanho++){
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 1){
        soma = 0;
    }

    return soma != cpf[10];
}



// COMO FUNCIONA A VALIDAÇÃO:
/* 

-Para descobrir o primeiro dígito você precisará recolher os 9 primeiros dígitos do CPF -e multiplicar por números de 10 a 2, sequencialmente.
-------------------------------------------------
Valor do CPF	4	5	1	0	5	5	0	4	0
Sequência	    10	9	8	7	6	5	4	3	2
-------------------------------------------------
Resultado	    40	45	8	0	30	25	0	12	0

Depois, precisamos somar todos os valores gerados nas multiplicações entre eles. 
Nesse caso, a soma resultou em 160. Em seguida, será necessário multiplicar essa soma por 10, que gerou o número 1600. 
Por fim, devemos considerar o módulo da divisão desse número com 11: 5.

Antes de decidirmos que esse é o primeiro dígito verificador, precisamos testar uma condição: 
Se o resultado for 10 ou 11, precisaremos zera-lo. 
Como não é o caso, podemos confirmar que 5 realmente é o primeiro dígito verificador do CPF base.

*/