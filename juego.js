

const miModulo = (() => {
    'use strict';

   

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    const btnhit = document.querySelector('#btnhit'),
    btnGive = document.querySelector('#btnGive'),
        btnstart = document.querySelector('#btnstart');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0);

        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnhit.disabled = false;
        btnGive.disabled = false;
    }


    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);

    }


    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

ta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }


    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        let puntosJugador = puntosJugadores[0];

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosJugador > puntosComputadora && puntosJugador <= 21 || puntosComputadora > 21) {
                alert('Jugador gana');
            } else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21) {
                alert('Computadora gana');
            }
        }, 100);
    }


    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1)

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }



    btnhit.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnhit.disabled = true;
            btnGive.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnhit.disabled = true;
            btnGive.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnGive.addEventListener('click', () => {

        btnhit.disabled = true;
        btnGive.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    btnstart.addEventListener('click', () => {

        inicializarJuego(); 

    });

    return {
        nuevoJuego: inicializarJuego
    };

})();