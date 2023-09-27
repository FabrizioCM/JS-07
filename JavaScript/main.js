async function f() {
    console.log('Inicio de funcion asincrona');
    await solicitud(2000);
    console.log('Final de funcion asincrona');
}
function solicitud(datos) {
    console.log('Inicio de funcion no asincrona');
    return new Promise(resolve => setTimeout(resolve, datos));
}

function bigFunction() {
    console.log('Funcion normal ejecutada');
    let result = 0;

    for (let i = 0; i < 1e7; i++) {
        result += i;
    }
    console.log('Funcion normal terminada en', result);
}


f();
bigFunction();


const COUNTER_P = document.getElementById('counter');
let counter = 0;

document.getElementById('btn-counter')
    .addEventListener('click', async (e) => {
        await setTimeout(() => {
            counter++;
            COUNTER_P.textContent = counter;
        }, 2000);
    })

