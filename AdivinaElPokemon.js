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
    
})