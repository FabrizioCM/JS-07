console.log("Conectao")
//Metodo Fetch no async
// Realiza una solicitud GET a la API para obtener información sobre el Pokémon "Ditto".
const BASE_URL = 'https://pokeapi.co/api/v2/';
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())// Cuando la solicitud del fetch se completa, convierte la respuesta res a res.json
    .then(data => console.log(data));//una vez que se convierte muestra los datos en consola 
    
//////////////////////////////////////////////////////////////////////////////////////////////
//Fetch async 
//const fetchPokemon = async () => {
//    try {
//       const response = await fetch(BASE_URL + 'pokemon/ditto'); // Realiza una solicitud HTTP GET a la URL Base URL + "pokemon/ditto".
//       const parsedResponse = await response.json(); //esperamos con await a que la respuesta se convierta en json        return parsedResponse; // Devuelve los datos del Pokémon/ditto
//   } catch (err) {
//        console.log(err); //Si pasa algun error lo muestra en cosnsola
//    }
//}
const fetchPokemon = async (pokemon) => {
    try {
        // const response = await fetch(BASE_URL + 'pokemon/ditto'); // Realiza una solicitud HTTP GET a la URL Base URL + "pokemon/ditto".
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`); // Realiza una solicitud a la URL y el nombre del Pokémon especificado en el identificador Pokemon
        const parsedResponse = await response.json(); //esperamos con await a que la respuesta se convierta en json
        return parsedResponse; 
    } catch (err) {
        console.log(err); //Si pasa algun error lo muestra en cosnsola
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////
//Obtener Pokemon

document.getElementById('get-btn') //Obtenemos la info del id del boton
    .addEventListener('click', async ()=> { // ponemos un evento que escuchara el click y ejecutara una funcion async 
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text); // definimos const pokemon y esperamos al fetchPokemon
        localStorage.setItem('currentPokeID', pokemon.id);
        //console.log(pokemon.id); // imprimimos pokemon
        console.log(pokemon.name);
        tarjetaPokemon(pokemon);
    })

    
//Almacenar el en local Storage
document.addEventListener('DOMcontentLoaded', async ()=> {
    const storeID = localStorage.getItem('currentPokeID'); //el objeto que este actualmente lo almacena en el almacenamientp
    const initialId= storeID ? parseInt(storeID) : currentPokeID; // le da un valor entero al elemento 
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
});


// Obtener el anterior 
//
//Obtener el siguiente


document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeID = parseInt(localStorage.getItem('currentPokeID'));
        const newID = (currentPokeID -1);
        const pokemon = await fetchPokemon(newID);
        console.log(pokemon.name);
        localStorage.setItem('currentPokeID', newID);
        tarjetaPokemon(pokemon);
    });

    document.getElementById('next-btn')
    .addEventListener('click', async ()=>{
        const currentPokeID = parseInt(localStorage.getItem('currentPokeID'));
        const newID =currentPokeID +1;
        const pokemon = await fetchPokemon(newID);
        console.log(pokemon.name);
        localStorage.setItem('currentPokeID', newID); 
        tarjetaPokemon(pokemon);
    })


///////

function tarjetaPokemon(pokemon) {
    const card = document.getElementById('perfilPokemon');

    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }


    const nombrePokemon = document.createElement('h2');
    nombrePokemon.textContent = `Nombre: ${pokemon.name}`;
    const idPokemon = document.createElement('p');
    idPokemon.textContent = `ID: ${pokemon.id}`;
    const pesoPokemon = document.createElement('p');
    pesoPokemon.textContent = `Peso: ${pokemon.weight}`;

    localStorage.setItem('currentPokemonName', pokemon.name);
    localStorage.setItem('currentPokemonID', pokemon.id);
    localStorage.setItem('currentPokemonWeight', pokemon.weight);

    card.appendChild(nombrePokemon);
    card.appendChild(idPokemon);
    card.appendChild(pesoPokemon);
    
}
document.addEventListener('DOMContentLoaded', async () => {
    const pokemon = {
        id: parseInt(localStorage.getItem('currentPokemonID')) || 1,
        name: localStorage.getItem('currentPokemonName') || '',
        weight: localStorage.getItem('currentPokemonWeight') || ''
    };
    tarjetaPokemon(pokemon);
});


///Metodo Post

fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      body: JSON.stringify({
        title: 'title1',
        body: 'lorem ipsum dolor sit',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/jason; charset=UTF-8,'
      }
     }) .then(res => res.json())
        .then(json => console.log(json))

///EJERCICIO
//Arreglar el pokemon en local storage
//Manipular el DOM y agregar una tarjeta del POKEMON
//El tamaño es a consideracion personal
// La tarjeta debe de mantenerse en la pantalla
// Jalar la info del local storage