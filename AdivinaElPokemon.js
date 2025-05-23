document.addEventListener('DOMContentLoaded', () => {

    const CUARTA_GEN_MIN = 387; 
    const CUARTA_GEN_MAX = 493; 
    
    // Variables globales que usaremos durante el juego
    let pokemonActual = null;    
    let nombrePokemon = '';      
    let intentosRestantes = 3;   
    let pistasMostradas = 1;     
    
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
    const imgSiluetas = document.querySelectorAll('img[alt*="Silueta"]'); 
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
                // Ya no usamos la URL de silueta de PokeAPI porque no funciona
                // En su lugar, usaremos la misma imagen con clase especial para CSS
                silueta: data.sprites.front_default 
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
                silueta: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png'
            };
            nombrePokemon = 'Turtwig';
            
            // Actualizamos la interfaz con este Pokémon por defecto
            actualizarImagenes();
            actualizarPistas();
        }
    }
    

    function actualizarImagenes() {
        // Actualizamos todas las imágenes de siluetas en las pantallas de intento
        imgSiluetas.forEach(img => {
            img.src = pokemonActual.silueta;  // Usar la imagen regular
            img.alt = `Silueta de ${nombrePokemon}`; // Actualizamos el texto alternativo
            img.classList.add('silueta-pokemon'); // Añadimos clase para aplicar estilo de silueta en CSS
        });
        
        // Actualizamos la imagen final (la que se muestra cuando termina el juego)
        const imgFinal = document.querySelector('#final img');
        imgFinal.src = pokemonActual.imagen;  // URL de la imagen a color del Pokémon
        imgFinal.alt = nombrePokemon;         // Texto alternativo con el nombre
        imgFinal.classList.remove('silueta-pokemon'); // Nos aseguramos de que no tenga estilo de silueta
        
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


    function comprobarRespuesta(respuesta) {
        // Comparamos la respuesta con el nombre del Pokémon (ignorando mayúsculas/minúsculas)
        return respuesta.toLowerCase() === nombrePokemon.toLowerCase();
    }
    

    function mostrarVictoria() {
        // Cambiamos el título de la pantalla final
        document.querySelector('#final h2').textContent = '¡Juego terminado!';
        
        // Actualizamos el contenido del div de resultado para mostrar victoria
        document.getElementById('derrota').innerHTML = `
            <h3>¡Has ganado!</h3>
            <p>¡Felicidades! Has adivinado correctamente: <strong>${nombrePokemon}</strong></p>
            <img src="${pokemonActual.imagen}" alt="${nombrePokemon}" />
        `;
        
        // Ocultamos todas las pantallas y mostramos solo la final
        ocultarTodo();
        pantallas.final.style.display = 'flex';
    }
    

    function mostrarDerrota() {
        // Cambiamos el título de la pantalla final
        document.querySelector('#final h2').textContent = '¡Juego terminado!';
        
        // Actualizamos el contenido del div de resultado para mostrar derrota
        document.getElementById('derrota').innerHTML = `
            <h3>¡Has perdido!</h3>
            <p>Se te acabaron los intentos. El Pokémon misterioso era: <strong>${nombrePokemon}</strong></p>
            <img src="${pokemonActual.imagen}" alt="${nombrePokemon}" />
        `;
        
        // Ocultamos todas las pantallas y mostramos solo la final
        ocultarTodo();
        pantallas.final.style.display = 'flex';
    }
    

    function ocultarTodo() {
        // Ocultamos todas las pantallas del juego
        for (const key in pantallas) {
            if (pantallas[key]) {
                pantallas[key].style.display = 'none';
            }
        }
        
        // Ocultamos también los botones iniciales y las instrucciones
        botonesIniciales.style.display = 'none';
        instrucciones.style.display = 'none';
    }


    function reiniciarJuego() {
        // Restauramos los contadores a sus valores iniciales
        intentosRestantes = 3;    // Tres intentos disponibles
        pistasMostradas = 1;      // Una letra revelada al inicio
        
        // Ocultamos todo y mostramos solo la pantalla inicial del juego
        ocultarTodo();
        pantallas.inicio.style.display = 'flex';
        
        // Seleccionamos un nuevo Pokémon aleatorio
        seleccionarPokemonAleatorio();
        
        // Limpiamos todos los campos de texto para la nueva partida
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.value = '';
        });
    }
    

    function iniciarJuego() {
        // Simplemente llamamos a reiniciarJuego que configura todo lo necesario
        reiniciarJuego();
    }

    
    botones.comenzar.addEventListener('click', iniciarJuego);
    
    
    formularios.forEach(form => {
        form.addEventListener('submit', (event) => {
            // Evitamos que el formulario recargue la página
            event.preventDefault();
            
            // Obtenemos el campo de texto del formulario
            const input = form.querySelector('input[type="text"]');
            if (!input) return; // Si no hay campo de texto, no hacemos nada
            
            // Obtenemos la respuesta y eliminamos espacios en blanco al inicio y final
            const respuesta = input.value.trim();
            
            // Comprobamos si la respuesta es correcta
            if (comprobarRespuesta(respuesta)) {
                // ¡Victoria! - Terminamos el juego inmediatamente
                mostrarVictoria();
            } else {
                // Respuesta incorrecta - Reducimos intentos y aumentamos pistas
                intentosRestantes--;
                pistasMostradas++;
                
                // Ocultamos todas las pantallas
                ocultarTodo();
                
                // Mostramos la pantalla correspondiente según los intentos restantes
                if (intentosRestantes === 0) {
                    // Sin intentos - Mostramos derrota
                    mostrarDerrota();
                } else if (intentosRestantes === 2) {
                    // Quedan 2 intentos - Mostramos segundo intento (primer fallo)
                    pantallas.intento1.style.display = 'flex';
                } else if (intentosRestantes === 1) {
                    // Queda 1 intento - Mostramos tercer intento (segundo fallo)
                    pantallas.intento2.style.display = 'flex';
                }
            }
        });
    });
    
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-reiniciar')) {
            event.preventDefault(); // Evitamos el comportamiento predeterminado del enlace
            reiniciarJuego();       // Reiniciamos el juego
        }
    });

});