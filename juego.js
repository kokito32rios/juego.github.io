const casillas = 10;
let posicionJugador = 0;
let tiempoMaximo = 15; // Ajustado el tiempo máximo a 10 segundos
let temporizador;
let nombreJugador = '';
let cargoJugador = '';
let puntuacion = 0; // Variable para almacenar la puntuación del usuario

let preguntas = [
    {
        pregunta: '¿Qué problemas puede causar la mala calidad de datos?',
        respuestas: ['Errores en informes', 'Decisiones incorrectas', 'Pérdida de clientes', 'Todas las anteriores'],
        respuestaCorrecta: 'Todas las anteriores'
    },
    {
        pregunta: '¿Cuál es el objetivo principal de la calidad de datos en una empresa?',
        respuestas: ['Incrementar costos', 'Mejorar la toma de decisiones', 'Generar más errores', 'Ninguna de las anteriores'],
        respuestaCorrecta: 'Mejorar la toma de decisiones'
    },
    {
        pregunta: '¿Qué aspecto de la calidad de datos se refiere a la precisión y exactitud de la información?',
        respuestas: ['Integridad', 'Consistencia', 'Validez', 'Exactitud'],
        respuestaCorrecta: 'Exactitud'
    },
    {
        pregunta: '¿Cuál es uno de los beneficios de mantener una buena calidad de datos en una empresa?',
        respuestas: ['Pérdida de clientes', 'Decisiones basadas en datos incorrectos', 'Mejora en la satisfacción del cliente', 'Incremento de errores'],
        respuestaCorrecta: 'Mejora en la satisfacción del cliente'
    },
    {
        pregunta: '¿Qué factor de calidad de datos se refiere a la uniformidad y coherencia de los datos a lo largo del tiempo?',
        respuestas: ['Integridad', 'Consistencia', 'Validez', 'Exactitud'],
        respuestaCorrecta: 'Consistencia'
    },
    {
        pregunta: '¿Cuál es uno de los riesgos asociados con la mala calidad de datos?',
        respuestas: ['Mejora en la toma de decisiones', 'Menor eficiencia operativa', 'Incremento en la satisfacción del cliente', 'Ninguno de los anteriores'],
        respuestaCorrecta: 'Menor eficiencia operativa'
    },
    {
        pregunta: '¿Qué aspecto de la calidad de datos se relaciona con la integridad y completitud de la información?',
        respuestas: ['Integridad', 'Consistencia', 'Validez', 'Exactitud'],
        respuestaCorrecta: 'Integridad'
    },
    {
        pregunta: '¿Qué problemas puede causar la falta de calidad de datos en informes y análisis empresariales?',
        respuestas: ['Mejora en la precisión de los informes', 'Decisión de marketing más efectivas', 'Pérdida de oportunidades de negocio', 'Incremento en la satisfacción del cliente'],
        respuestaCorrecta: 'Pérdida de oportunidades de negocio'
    },
    {
        pregunta: '¿Qué aspecto de la calidad de datos se refiere a la validez y corrección de la información?',
        respuestas: ['Integridad', 'Consistencia', 'Validez', 'Exactitud'],
        respuestaCorrecta: 'Validez'
    },
    {
        pregunta: '¿Qué beneficio proporciona la calidad de datos en la toma de decisiones empresariales?',
        respuestas: ['Decisiones basadas en datos incorrectos', 'Incremento en los costos operativos', 'Mejora en la precisión de las decisiones', 'Menor eficiencia operativa'],
        respuestaCorrecta: 'Mejora en la precisión de las decisiones'
    }
];


function iniciarJuego() {
    nombreJugador = document.getElementById('nombre').value.trim();
    cargoJugador = document.getElementById('cargo').value.trim();

    // Verificar si se ingresaron datos
    if (nombreJugador === '' || cargoJugador === '') {
        alert('Por favor, ingrese su nombre y cargo.');
        return;
    }

    // Ocultar pantalla de inicio y mostrar pantalla de juego
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('juego-container').style.display = 'block';
    document.getElementById('tablero').textContent = `Jugador: ${nombreJugador} (${cargoJugador})`;

    generarTablero();
}

function generarTablero() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    for (let i = 0; i < casillas; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'casilla';
        casilla.textContent = i + 1;
        if (i === posicionJugador) {
            casilla.classList.add('jugador');
        }
        tablero.appendChild(casilla);
    }
}

function iniciarTemporizador() {
    let tiempoRestante = tiempoMaximo;
    const tiempoElemento = document.getElementById('tiempo-restante');
    tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
    temporizador = setInterval(() => {
        tiempoRestante--;
        tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
        if (tiempoRestante === 0 && posicionJugador < casillas - 1) {
            clearInterval(temporizador);
            mostrarMensajeTiempoAgotado();
            avanzarCasillas();
        } else if (tiempoRestante === 0 && posicionJugador === casillas - 1) {
            clearInterval(temporizador);
            mostrarMensajeTiempoAgotado();
            finalizarDesafio();
        }
    }, 1000);
}

function habilitarRespuestas() {
    document.getElementById('verificarRespuesta').disabled = false;
}

function deshabilitarRespuestas() {
    document.getElementById('verificarRespuesta').disabled = true;
}

function verDesafio() {
    habilitarRespuestas();
    mostrarPregunta(posicionJugador);
    iniciarTemporizador();
}

function mostrarPregunta(indice) {
    const preguntaElemento = document.getElementById('pregunta');
    const respuestasContainer = document.getElementById('respuestas-container');
    preguntaElemento.textContent = preguntas[indice].pregunta;
    respuestasContainer.innerHTML = '';
    preguntas[indice].respuestas.forEach(respuesta => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'respuesta';
        input.value = respuesta;
        const label = document.createElement('label');
        label.textContent = respuesta;
        const div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(label);
        respuestasContainer.appendChild(div);
    });
}

function verificarRespuesta() {
    const tiempoRestante = parseInt(document.getElementById('tiempo-restante').textContent.split(' ')[2]);
    const botonVerificar = document.getElementById('verificarRespuesta');

    if (tiempoRestante === tiempoMaximo && posicionJugador < casillas - 1) {
        alert('Debes iniciar el temporizador antes de enviar tu respuesta.');
        return;
    }

    clearInterval(temporizador);
    botonVerificar.disabled = true; // Deshabilitar botón de verificar
    const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');

    if (respuestaSeleccionada) {
        const respuesta = respuestaSeleccionada.value.toLowerCase();
        const respuestaCorrecta = preguntas[posicionJugador].respuestaCorrecta.toLowerCase();

        if (respuesta === respuestaCorrecta) {
            const bonoRapidez = tiempoRestante;
            puntuacion += 5 + bonoRapidez;
            document.getElementById('resultado').textContent = '¡Respuesta Correcta!';
            document.getElementById('puntuacion-usuario').textContent = puntuacion + ' puntos';
            avanzarCasillas();
        } else {
            document.getElementById('resultado').textContent = 'Respuesta Incorrecta. Avanzando a la siguiente pregunta.';
            setTimeout(() => {
                document.getElementById('resultado').textContent = '';
                avanzarCasillas();
                iniciarTemporizador();
                botonVerificar.disabled = false; // Habilitar botón de verificar nuevamente
            }, 2000);
        }
    } else {
        alert('Por favor, selecciona una respuesta antes de verificar.');
        botonVerificar.disabled = false; // Habilitar botón de verificar nuevamente
    }
}


function avanzarCasillas() {
    if (posicionJugador < casillas - 1) {
        posicionJugador++;
        generarTablero();
        mostrarPregunta(posicionJugador);
    } else {
        finalizarDesafio();
    }
}

function mostrarMensajeFinal() {
    const resultado = document.getElementById('resultado');
    resultado.textContent = '¡Desafío completado!';
}

function mostrarMensajeTiempoAgotado() {
    const resultado = document.getElementById('resultado');
    resultado.textContent = '¡Tiempo agotado!';

    setTimeout(() => {
        resultado.textContent = '';
    }, 2000);
}

function finalizarDesafio() {
    document.getElementById('juego-container').style.display = 'none';
    const finalizacionContainer = document.getElementById('finalizacion-container');
    finalizacionContainer.style.display = 'block';
    
    const mensajeFinal = document.getElementById('mensaje-final');
    mensajeFinal.textContent = `¡Felicitaciones, ${nombreJugador}! Has completado con éxito el desafío. Tu puntuación final es de ${puntuacion} puntos.`;
}

generarTablero();
