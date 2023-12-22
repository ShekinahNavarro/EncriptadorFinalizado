/*let esBinario = false;

function cambiarTituloABinario() {
    let titulo = document.querySelector('.titulo h1');
    let textoOriginal = titulo.getAttribute('data-original-text');
    let textoBinario = '';

    if (!esBinario) {
        // Almacena el texto original en un atributo de datos
        titulo.setAttribute('data-original-text', textoOriginal);

        // Convierte cada carácter a su representación binaria
        for (let i = 0; i < textoOriginal.length; i++) {
            let charCode = textoOriginal.charCodeAt(i);
            let binaryRepresentation = charCode.toString(2).padStart(8, '0');
            textoBinario += binaryRepresentation + ' ';
        }

        esBinario = true;
    } else {
        // Restaura el texto original desde el atributo de datos
        textoBinario = titulo.getAttribute('data-original-text');
        esBinario = false;
    }

    // Actualiza el contenido del título
    titulo.innerText = textoBinario.trim();
}
*/
document.addEventListener('DOMContentLoaded', function () {
    const titulo = document.querySelector('.titulo h1');

    titulo.addEventListener('mouseover', function () {
        const binario = "01000101 01101110 01100011 01110010 01101001 01110000 01110100 01100001 01100100 01101111 01110010";
        titulo.textContent = binario;
    });

    titulo.addEventListener('mouseout', function () {
        const original = "Encriptador";
        titulo.textContent = original;
    });
});

function encrypt() {
    let inputText = document.getElementById('inputText').value;
    let desplazamiento = parseInt(document.getElementById('desplazamiento').value, 10);
    let encriptarText = '';

    for (let i = 0; i < inputText.length; i++) {
        let ascii = inputText.charCodeAt(i);

        if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
            // Letras del alfabeto
            let base = (ascii >= 65 && ascii <= 90) ? 65 : 97;
            encriptarText += String.fromCharCode((ascii - base + desplazamiento) % 26 + base);
        } else if (ascii === 209 || ascii === 241) {
            // Letras "Ñ" y "ñ"
            let base = (ascii === 209) ? 65 : 97; // Para la letra "Ñ"
            encriptarText += String.fromCharCode((ascii - base + desplazamiento) % 27 + base);
        } else if (ascii >= 48 && ascii <= 57) {
            // Números
            encriptarText += String.fromCharCode((ascii - 48 + desplazamiento) % 10 + 48);
        } else {
            // Otros caracteres
            encriptarText += inputText.charAt(i);
        }
    }

    document.getElementById('result').value = encriptarText;
}

function decrypt() {
    let encriptarText = document.getElementById('inputText').value;
    let desplazamiento = parseInt(document.getElementById('desplazamiento').value, 10);
    let desencriptarText = '';

    for (let i = 0; i < encriptarText.length; i++) {
        let ascii = encriptarText.charCodeAt(i);

        if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
            // Letras del alfabeto
            let base = (ascii >= 65 && ascii <= 90) ? 65 : 97;
            desencriptarText += String.fromCharCode((ascii - base - desplazamiento + 26) % 26 + base);
        } else if (ascii === 209 || ascii === 241) {
            // Letras "Ñ" y "ñ"
            let base = (ascii === 209) ? 65 : 97; // Para la letra "Ñ"
            desencriptarText += String.fromCharCode((ascii - base - desplazamiento + 27) % 27 + base);
        } else if (ascii >= 48 && ascii <= 57) {
            // Números
            desencriptarText += String.fromCharCode((ascii - 48 - desplazamiento + 10) % 10 + 48);
        } else {
            // Otros caracteres
            desencriptarText += encriptarText.charAt(i);
        }
    }

    document.getElementById('result').value = desencriptarText;
}

function copyToClipboard() {
    /* Obtén el campo de resultado */
    let resultadoFinal = document.getElementById('result');

    /* Selecciona el contenido del campo de resultado */
    resultadoFinal.select();
    resultadoFinal.setSelectionRange(0, 99999); /* Para dispositivos móviles */

    /* Copia el contenido al portapapeles */
    document.execCommand('copy');

    /* Deselecciona el campo */
    resultadoFinal.setSelectionRange(0, 0);

    /* Puedes agregar una alerta u otro tipo de feedback si lo deseas */
    alert('Texto copiado al portapapeles');
}