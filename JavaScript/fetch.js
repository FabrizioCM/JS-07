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
        localStorage.setItem('currentPokeID', pokemon.id); //almaceno en el local storage
        //console.log(pokemon.id); // imprimimos pokemon
        console.log(pokemon.name);
        tarjetaPokemon(pokemon);// llamo a la funcion tarjetaPokemon para que haga una tarjeta
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


document.getElementById('previous-btn') // obtenemos info del elemento previous-btn
    .addEventListener('click', async () => { //añadimos un evento asincrono mediante un click
        const currentPokeID = parseInt(localStorage.getItem('currentPokeID'));
        const newID = (currentPokeID -1);//retrocedo un lugar en el ID
        const pokemon = await fetchPokemon(newID);  //espera la promesa 
        console.log(pokemon.name); //imprimo en consola el nombre del pokemon
        localStorage.setItem('currentPokeID', newID); //Actualiza el local storage
        tarjetaPokemon(pokemon);   // llamo a la funcion tarjetaPokemon para que haga una tarjeta
    });

    document.getElementById('next-btn')
    .addEventListener('click', async ()=>{
        const currentPokeID = parseInt(localStorage.getItem('currentPokeID'));
        const newID =currentPokeID +1; //retrocedo un lugar en el ID
        const pokemon = await fetchPokemon(newID); //espera la promesa 
        console.log(pokemon.name);//imprimo en consola el nombre del pokemon
        localStorage.setItem('currentPokeID', newID); //Actualiza el local storage
        tarjetaPokemon(pokemon); // llamo a la funcion tarjetaPokemon para que haga una tarjeta
    })


///////

function tarjetaPokemon(pokemon) { // creo funcion tarjetaPokemon
    const card = document.getElementById('perfilPokemon'); // obtengo el elemento desde el div perfilPokemon del HTML

    while (card.firstChild) { //con un while reviso si el elemento tarjeta tiene un hijo usando el first child 
        card.removeChild(card.firstChild); // si en efecto tiene un hijo lo borra (aqui tengo un error bueno no es error ya que hace lo que pido que es borrar todo así que si se das dos clicks se borra hasta el almacenamiento local )
    }
    //Aqui me traigo todos los elementos desde el nombre, id y el peso
    const nombrePokemon = document.createElement('h2');
    nombrePokemon.textContent = `Nombre: ${pokemon.name}`;
    const idPokemon = document.createElement('p');
    idPokemon.textContent = `ID: ${pokemon.id}`;
    const pesoPokemon = document.createElement('p');
    pesoPokemon.textContent = `Peso: ${pokemon.weight}`;
//los almaceno localmente para cuando refrescas la pagina no hacer dos veces ppr que el while lo elimina :) lo voy a corregir 
    localStorage.setItem('currentPokemonName', pokemon.name);
    localStorage.setItem('currentPokemonID', pokemon.id);
    localStorage.setItem('currentPokemonWeight', pokemon.weight);
//agrego nuevos elementos a la tarjeta
    card.appendChild(nombrePokemon);
    card.appendChild(idPokemon);
    card.appendChild(pesoPokemon);
    
}
document.addEventListener('DOMContentLoaded', async () => { //Abro una funcion asincrona para cuando el 
    const pokemon = {
        id: parseInt(localStorage.getItem('currentPokemonID')) || 1, //Obtengo la informacion del localStorage
        name: localStorage.getItem('currentPokemonName') || '', //Obtengo la informacion del localStorage
        weight: localStorage.getItem('currentPokemonWeight') || '' //Obtengo la informacion del localStorage
    };
    tarjetaPokemon(pokemon);  // con esto llamo a la funcion para mostrar la targeta desde el almacenamiento  
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