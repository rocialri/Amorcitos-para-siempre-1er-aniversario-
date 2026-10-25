"use strict";

// =========================================
// ELEMENTOS DE LA PÁGINA
// =========================================

const pregunta = document.getElementById("pregunta");
const respuesta = document.getElementById("respuesta");

const botonSi = document.getElementById("si");
const botonNo = document.getElementById("no");

const botonSiempre = document.getElementById("siempre-pulsable");
const fotosRecuerdos = document.getElementById("fotos-recuerdos");

const botonCentro = document.getElementById("corazon-centro");
const mensajeAniversario = document.getElementById("aniversario");

let temporizadorFotos = null;
let temporizadorAniversario = null;


// =========================================
// BOTÓN SÍ: MOSTRAR LA ILUSTRACIÓN
// =========================================

botonSi.addEventListener("click", function () {
    pregunta.classList.add("hidden");
    respuesta.classList.remove("hidden");
});


// =========================================
// BOTÓN NO: SE MUEVE AL INTENTAR PULSARLO
// =========================================

function moverBotonNo() {
    const movimientoX = Math.random() * 180 - 90;
    const movimientoY = Math.random() * 100 - 50;

    botonNo.style.transform =
        `translate(${movimientoX}px, ${movimientoY}px)`;

    botonNo.textContent = "¿Seguro? ♥";
}

botonNo.addEventListener("click", moverBotonNo);


// =========================================
// BOCADILLOS: LLUVIA DE CORAZONES
// SOLO AL PULSAR UNO DE LOS DOS BOCADILLOS
// =========================================

document.querySelectorAll(".corazon-uno, .corazon-dos")
    .forEach(function (bocadillo) {

        bocadillo.addEventListener("click", function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            lluviaCorazones(100);
        });
    });


// =========================================
// CREAR LA LLUVIA DE CORAZONES
// =========================================

function lluviaCorazones(cantidad) {
    const simbolos = ["❤️", "💗", "💕", "💖", "♥"];

    for (let i = 0; i < cantidad; i++) {
        const corazon = document.createElement("span");

        corazon.className = "corazon-volador";

        corazon.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        // Posición inicial aleatoria en la ventana
        corazon.style.left = `${Math.random() * 100}vw`;
        corazon.style.top = `${Math.random() * 25}vh`;

        // Tamaño aleatorio
        corazon.style.fontSize =
            `${24 + Math.random() * 42}px`;

        // Duración de caída aleatoria
        corazon.style.animationDuration =
            `${2.5 + Math.random() * 2.5}s`;

        document.body.appendChild(corazon);

        // Eliminar el corazón cuando termine su animación
        corazon.addEventListener("animationend", function () {
            corazon.remove();
        });
    }
}


// =========================================
// SIEMPRE: MOSTRAR Y OCULTAR LAS FOTOS
// CON ANIMACIÓN DE ENTRADA Y SALIDA
// =========================================

botonSiempre.addEventListener("click", function (evento) {
    evento.preventDefault();
    evento.stopPropagation();

    // Cancelar el temporizador de salida anterior
    if (temporizadorFotos !== null) {
        clearTimeout(temporizadorFotos);
        temporizadorFotos = null;
    }

    // Si las fotos están visibles, ocultarlas
    if (fotosRecuerdos.classList.contains("visible")) {
        fotosRecuerdos.classList.remove("visible");
        fotosRecuerdos.classList.add("ocultando");

        temporizadorFotos = setTimeout(function () {
            fotosRecuerdos.classList.remove("ocultando");
            temporizadorFotos = null;
        }, 500);

    } else {
        // Mostrar las fotos con animación de entrada
        fotosRecuerdos.classList.remove("ocultando");

        // Registrar el estado inicial para activar la transición
        void fotosRecuerdos.offsetWidth;

        fotosRecuerdos.classList.add("visible");
    }
});


// =========================================
// CORAZÓN CENTRAL: MENSAJE DE ANIVERSARIO
// =========================================

botonCentro.addEventListener("click", function (evento) {
    evento.preventDefault();
    evento.stopPropagation();

    // Evitar que se acumulen temporizadores
    if (temporizadorAniversario !== null) {
        clearTimeout(temporizadorAniversario);
        temporizadorAniversario = null;
    }

    // Reiniciar el mensaje antes de volver a mostrarlo
    mensajeAniversario.classList.add("hidden");
    mensajeAniversario.style.animation = "none";

    // Forzar el reinicio de la animación
    void mensajeAniversario.offsetWidth;

    // Mostrar el mensaje
    mensajeAniversario.classList.remove("hidden");

    // Hacer que la tarjeta cruce la pantalla en 9 segundos
    mensajeAniversario.style.animation =
        "cruzar-pantalla 9s ease-in-out forwards";

    // Ocultarla cuando termine el recorrido
    temporizadorAniversario = setTimeout(function () {
        mensajeAniversario.classList.add("hidden");
        mensajeAniversario.style.animation = "";
        temporizadorAniversario = null;
    }, 9100);
});