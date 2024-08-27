document.addEventListener("DOMContentLoaded", documentOnLoad);

// ARRAY INGREDIENTES SELECCIONADOS
const INGREDIENTES_SELECCIONADOS = {};

// CUANDO CARGA LA PAGINA
function documentOnLoad() {

    document.getElementById("boton-finalizar")
    .addEventListener("click", onClickBotonFinalizar);


    // CUANTOS SELECT X TARJETA
    configurarSeleccionTarjetas('.card[data-vino]', 1);
    configurarSeleccionTarjetas('.card[data-fruta]', 3);
    configurarSeleccionTarjetas('.card[data-edulcorante]', 1);
    configurarSeleccionTarjetas('.card[data-licor]', 1);
    configurarSeleccionTarjetas('.card[data-especia]', 3);

    //  CARGAR VISTA PREVIA
    actualizarVistaPrevia();
}

// SELECCION DE TARJETAS
function configurarSeleccionTarjetas(selector, max) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
        card.addEventListener('click', function() {
            manejarSeleccionTarjeta(card, selector, max);
        });
    });
}

function manejarSeleccionTarjeta(card, selector, max) {
    const nombre = card.querySelector('.card-title').textContent;
    if (!card.classList.contains('selected')) {
        const selectedCards = document.querySelectorAll(`${selector}.selected`);
        if (selectedCards.length >= max) {
            alert(`Puedes seleccionar hasta ${max} opciones.`);
            return;
        }
        card.classList.add('selected');
        INGREDIENTES_SELECCIONADOS[nombre] = 1;
    } else {
        card.classList.remove('selected');
        delete INGREDIENTES_SELECCIONADOS[nombre];
    }
    actualizarVistaPrevia();
}

// FUNCION ACTUALIZAR VISTA PREVIA
function actualizarVistaPrevia() {
    const listaIngredientes = document.getElementById('listaIngredientes');
    listaIngredientes.innerHTML = '';
    for (const [ingrediente, cantidad] of Object.entries(INGREDIENTES_SELECCIONADOS)) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = ingrediente;

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.value = cantidad;
        inputCantidad.min = 1;
        inputCantidad.className = 'form-control';
        inputCantidad.style.maxWidth = '80px';
        inputCantidad.addEventListener('input', function () {
            INGREDIENTES_SELECCIONADOS[ingrediente] = this.value;
        });

        li.appendChild(inputCantidad);
        listaIngredientes.appendChild(li);
    }
}


function onClickBotonFinalizar(evento) {
    alert("Gracias por Su Compra!")
}