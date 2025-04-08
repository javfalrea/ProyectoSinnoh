/*  Constante de las id cambiadas (personalizadas) Este objeto mapea IDs personalizados a IDs reales de la API de Pokémon */
const pokemonDisponible = {
    "1":"300" // El ID personalizado 1 corresponde al Pokémon con ID 300 en la API
}

/* Función para buscar un Pokémon 
   Esta función asíncrona busca información de un Pokémon usando su ID */
async function buscarPokemon(id = null) {
    // Obtiene el ID del parámetro o del campo de entrada del formulario
    let pokemonId = id || document.getElementById("pokemonId").value;
    // Verifica si se proporcionó un ID
    if (!pokemonId) return alert("Ingrese un ID de Pokémon");
    // Verifica si el ID está en la lista de IDs personalizados disponibles
    if (!pokemonDisponible[pokemonId]) return alert("ID de Pokémon invalida");
    // Convierte el ID personalizado al ID real para la API
    pokemonId=pokemonDisponible[pokemonId];

    // Realiza una solicitud a la API de Pokémon para obtener los datos del Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    // Verifica si la respuesta fue exitosa
    if (!response.ok) return alert("Pokémon no encontrado");
    // Convierte la respuesta a formato JSON
    const data = await response.json();

    // Realiza una solicitud adicional para obtener información de la especie del Pokémon
    const speciesResponse = await fetch(data.species.url);
    // Convierte la respuesta a formato JSON
    const speciesData = await speciesResponse.json();

    // Busca el nombre del Pokémon en español y lo convierte a mayúsculas
    const nombre = speciesData.names.find(n => n.language.name === "es").name.toUpperCase();
    // Actualiza el elemento HTML que muestra el nombre del Pokémon
    document.getElementById("pokemonNombre").textContent = nombre;

    // Obtiene y configura la imagen del Pokémon
    const imagen = document.getElementById("pokemonImagen");
    imagen.src = data.sprites.front_default; // Establece la URL de la imagen
    imagen.style.display = "block"; // Hace visible la imagen

    // Actualiza el elemento que muestra los tipos del Pokémon
    document.getElementById("pokemonTipo").textContent = "Tipo: " + data.types.map(t => t.type.name).join(", ");
}

/* Función para recomendar un Pokémon aleatorio 
   Esta función selecciona un Pokémon aleatorio y muestra información básica */
async function recomendarPokemon() {
    // Genera un ID aleatorio entre 1 y 898 (número total de Pokémon)
    const randomId = Math.floor(Math.random() * 898) + 1;                                         /*CAMBIAR EL RANGO*/
    // Realiza una solicitud a la API para obtener datos del Pokémon aleatorio
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    // Obtiene información adicional de la especie del Pokémon
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    // Obtiene el nombre en español del Pokémon
    const nombre = speciesData.names.find(n => n.language.name === "es").name;
    // Actualiza la lista de recomendaciones en el HTML
    const recomendacionLista = document.getElementById("recomendacionLista");
    // Crea un elemento HTML con la información del Pokémon recomendado
    recomendacionLista.innerHTML = `<div class="recomendacion-item">
        <span>#${randomId} - ${nombre}</span>
        <img src="${data.sprites.front_default}" alt="Imagen de ${nombre}" width="50">
        <button onclick="buscarPokemon(${randomId})">🔍</button>
    </div>`;
}

// Configura un temporizador para recomendar un nuevo Pokémon cada 60 segundos
setInterval(recomendarPokemon, 60000);

