document.addEventListener('DOMContentLoaded', () => {

    const CUARTA_GEN_MIN = 387; 
    const CUARTA_GEN_MAX = 493; 
    
    // Variables globales que usaremos durante el juego
    let pokemonActual = null;    
    let nombrePokemon = '';      
    let intentosRestantes = 3;   
    let pistasMostradas = 1;     
    
    // ===== REFERENCIAS A ELEMENTOS DEL DOM =====
    // Estas constantes nos permiten acceder a los elementos HTML más fácilmente
    
    // Objeto con referencias a todas las pantallas del juego
    const pantallas = {
        inicio: document.getElementById('pantalla-inicio'),  
        intento1: document.getElementById('intento1'),       
        intento2: document.getElementById('intento2'),       
        final: document.getElementById('final')              
    };
    
    // Objeto con referencias a los botones principales
    const botones = {
        comenzar: document.getElementById('btn-comenzar')    
    };
    
    // Otras referencias útiles a elementos del DOM
    const instrucciones = document.querySelector('.instrucciones');      
    const formularios = document.querySelectorAll('form');               
    const imgSiluetas = document.querySelectorAll('img[src*="silhouettes"]'); 
    const botonesIniciales = document.querySelector('.botones-principales'); 
    
    async function seleccionarPokemonAleatorio() {
        // Generamos un ID aleatorio entre los límites de la 4ª generación
        const id = Math.floor(Math.random() * (CUARTA_GEN_MAX - CUARTA_GEN_MIN + 1)) + CUARTA_GEN_MIN;
        
        try {
            // Hacemos una petición a la PokeAPI para obtener los datos del Pokémon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            
            // Construimos el objeto con la información que necesitamos del Pokémon
            pokemonActual = {
                id: data.id,             
                nombre: data.name,       
                imagen: data.sprites.front_default,  
                silueta: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/silhouettes/${data.id}.png` 
            };
            
            // Capitalizamos la primera letra del nombre para mostrarlo correctamente
            nombrePokemon = pokemonActual.nombre.charAt(0).toUpperCase() + pokemonActual.nombre.slice(1);
            
            // Actualizamos las imágenes y pistas en la interfaz
            actualizarImagenes();
            actualizarPistas();
            
            // Mostramos en consola el Pokémon seleccionado (para depuración)
            console.log(`Pokémon seleccionado: ${nombrePokemon} (ID: ${pokemonActual.id})`);
            
        } catch (error) {
            // Si hay un error en la petición, mostramos el error en consola
            console.error('Error al obtener el Pokémon:', error);
            
            // Y usamos un Pokémon por defecto (Turtwig) para que el juego pueda continuar
            pokemonActual = {
                id: 387,
                nombre: 'turtwig',
                imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png',
                silueta: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/silhouettes/387.png'
            };
            nombrePokemon = 'Turtwig';
            
            // Actualizamos la interfaz con este Pokémon por defecto
            actualizarImagenes();
            actualizarPistas();
        }
    }
    
      /**
     * Actualiza todas las imágenes del juego con la información del Pokémon actual
     * Se llama después de seleccionar un nuevo Pokémon
     */
    function actualizarImagenes() {
        // Actualizamos todas las imágenes de siluetas en las pantallas de intento
        imgSiluetas.forEach(img => {
            img.src = pokemonActual.silueta;  // Cambiamos la URL a la silueta del Pokémon actual
            img.alt = `Silueta de ${nombrePokemon}`; // Actualizamos el texto alternativo
        });
        
        // Actualizamos la imagen final (la que se muestra cuando termina el juego)
        const imgFinal = document.querySelector('#final img');
        imgFinal.src = pokemonActual.imagen;  // URL de la imagen a color del Pokémon
        imgFinal.alt = nombrePokemon;         // Texto alternativo con el nombre
        
        // Actualizamos el texto del resultado que muestra el nombre del Pokémon
        const textoResultado = document.querySelector('#derrota p strong');
        textoResultado.textContent = nombrePokemon;
    }
    
    function actualizarPistas() {
        // Obtenemos el nombre completo del Pokémon actual
        const nombreCompleto = nombrePokemon;
        
        // Actualizamos la pista en la pantalla inicial
        const pistaInicial = document.querySelector('#pantalla-inicio p:nth-of-type(2)');
        
        // Construimos el texto de la pista: primera letra en negrita + guiones bajos
        let pistaTexto = `Pista inicial: <strong>${nombreCompleto.charAt(0)}</strong>`;
        for (let i = 1; i < nombreCompleto.length; i++) {
            pistaTexto += '_ '; // Añadimos un guión bajo por cada letra restante
        }
        pistaInicial.innerHTML = pistaTexto; // Insertamos el HTML con la pista
        
        const pistaIntento1 = document.querySelector('#intento1 p:nth-of-type(1)');
        
        // Construimos el texto con las dos primeras letras en negrita + guiones
        pistaTexto = `Pista actual: <strong>${nombreCompleto.substring(0, 2)}</strong>`;
        for (let i = 2; i < nombreCompleto.length; i++) {
            pistaTexto += '_ ';
        }
        pistaIntento1.innerHTML = pistaTexto;
        
        const pistaIntento2 = document.querySelector('#intento2 p:nth-of-type(1)');
        
        // Construimos el texto con las tres primeras letras en negrita + guiones
        pistaTexto = `Pista actual: <strong>${nombreCompleto.substring(0, 3)}</strong>`;
        for (let i = 3; i < nombreCompleto.length; i++) {
            pistaTexto += '_ ';
        }
        pistaIntento2.innerHTML = pistaTexto;
    }
})