// Mapeo de IDs personalizados a IDs reales de la API de Pokémon
const pokemonDisponible = {
    "1": "387",
    "2": "388",
    "3": "389",
    "4": "390",
    "5": "391",
    "6": "392",
    "7": "393",
    "8": "394",
    "9": "395",
    "10": "396",
    "11": "397",
    "12": "398",
    "13": "399",
    "14": "400",
    "15": "401",
    "16": "402",
    "17": "403",
    "18": "404",
    "19": "405",
    "20": "63",
    "21": "64",
    "22": "65",
    "23": "129",
    "24": "130",
    "25": "406",
    "26": "315",
    "27": "407",
    "28": "41",
    "29": "42",
    "30": "169",
    "31": "74",
    "32": "75",
    "33": "76",
    "34": "95",
    "35": "208",
    "36": "408",
    "37": "409",
    "38": "410",
    "39": "411",
    "40": "66",
    "41": "67",
    "42": "68",
    "43": "54",
    "44": "55",
    "45": "412",
    "46": "413",
    "47": "414",
    "48": "265",
    "49": "266",
    "50": "267",
    "51": "268",
    "52": "269",
    "53": "415",
    "54": "416",
    "55": "417",
    "56": "418",
    "57": "419",
    "58": "420",
    "59": "421",
    "60": "422",
    "61": "423",
    "62": "214",
    "63": "190",
    "64": "424",
    "65": "425",
    "66": "426",
    "67": "427",
    "68": "428",
    "69": "92",
    "70": "93",
    "71": "94",
    "72": "200",
    "73": "429",
    "74": "198",
    "75": "430",
    "76": "431",
    "77": "432",
    "78": "118",
    "79": "119",
    "80": "339",
    "81": "340",
    "82": "433",
    "83": "358",
    "84": "434",
    "85": "435",
    "86": "307",
    "87": "308",
    "88": "436",
    "89": "437",
    "90": "77",
    "91": "78",
    "92": "438",
    "93": "185",
    "94": "439",
    "95": "122",
    "96": "440",
    "97": "113",
    "98": "242",
    "99": "173",
    "100": "35",
    "101": "36",
    "102": "441",
    "103": "172",
    "104": "25",
    "105": "26",
    "106": "163",
    "107": "164",
    "108": "442",
    "109": "443",
    "110": "444",
    "111": "445",
    "112": "446",
    "113": "143",
    "114": "201",
    "115": "447",
    "116": "448",
    "117": "194",
    "118": "195",
    "119": "278",
    "120": "279",
    "121": "203",
    "122": "449",
    "123": "450",
    "124": "298",
    "125": "183",
    "126": "184",
    "127": "451",
    "128": "452",
    "129": "453",
    "130": "454",
    "131": "455",
    "132": "223",
    "133": "224",
    "134": "456",
    "135": "457",
    "136": "72",
    "137": "73",
    "138": "349",
    "139": "350",
    "140": "458",
    "141": "226",
    "142": "459",
    "143": "460",
    "144": "215",
    "145": "461",
    "146": "480",
    "147": "481",
    "148": "482",
    "149": "483",
    "150": "484",
    "151": "490",
    "152": "479",
    "153": "207",
    "154": "472",
    "155": "299",
    "156": "476",
    "157": "280",
    "158": "281",
    "159": "282",
    "160": "475",
    "161": "108",
    "162": "463",
    "163": "133",
    "164": "134",
    "165": "135",
    "166": "136",
    "167": "196",
    "168": "197",
    "169": "470",
    "170": "471",
    "171": "333",
    "172": "334",
    "173": "175",
    "174": "176",
    "175": "468",
    "176": "228",
    "177": "229",
    "178": "81",
    "179": "82",
    "180": "462",
    "181": "114",
    "182": "465",
    "183": "193",
    "184": "469",
    "185": "357",
    "186": "111",
    "187": "112",
    "188": "464",
    "189": "355",
    "190": "356",
    "191": "477",
    "192": "137",
    "193": "233",
    "194": "474",
    "195": "123",
    "196": "212",
    "197": "239",
    "198": "125",
    "199": "466",
    "200": "240",
    "201": "126",
    "202": "467",
    "203": "220",
    "204": "221",
    "205": "473",
    "206": "361",
    "207": "362",
    "208": "478",
    "209": "359",
    "210": "487"
  };

// Variables globales
let activeSection = "buscar"; // "buscar" o "recomendacion"
let currentPokemonId = "";
let recommendedPokemonId = "";

// Elementos DOM
const seccionBusqueda = document.getElementById("seccion-busqueda");
const seccionRecomendacion = document.getElementById("seccion-recomendacion");
const resultadoPokemon = document.getElementById("resultado-pokemon");
const recomendacionItem = document.getElementById("recomendacion-item");
const panelDescripcion = document.getElementById("panel-descripcion");
const pokemonIdInput = document.getElementById("pokemon-id");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // Configurar eventos
    configurarEventos();
    configurarSelectorTemas();
    
    // Generar recomendación inicial
    recomendarPokemon();
});

// Configurar eventos
function configurarEventos() {
    // Botones direccionales
    document.getElementById("boton-arriba").addEventListener("click", () => navegarPokemon(-1));
    document.getElementById("boton-abajo").addEventListener("click", () => navegarPokemon(1));
    document.getElementById("boton-derecha").addEventListener("click", toggleRecomendacion);
    document.getElementById("boton-izquierda").addEventListener("click", mostrarBusqueda);
    
    // Botón B
    document.getElementById("boton-b").addEventListener("click", () => {
        if (activeSection === "buscar") {
            buscarPokemon(pokemonIdInput.value);
        } else if (activeSection === "recomendacion") {
            // Usar el ID del Pokémon recomendado
            pokemonIdInput.value = recommendedPokemonId;
            buscarPokemon(recommendedPokemonId);
            mostrarBusqueda();
        }
    });
    
    // Botón buscar
    document.getElementById("btn-buscar").addEventListener("click", () => buscarPokemon(pokemonIdInput.value));
    
    // No necesitamos el evento para el botón de lupa en recomendación
    // Ya que ahora usamos el botón B para ver detalles
}

// Configurar selector de temas
function configurarSelectorTemas() {
    const botonTema = document.getElementById("cambiar-tema");
    const listaTemas = document.getElementById("lista-temas");
    const opcionesTema = document.querySelectorAll(".tema-opcion");
    const contenedor = document.querySelector(".poke-contenedor");
    
    // Mostrar/ocultar lista de temas
    botonTema.addEventListener("click", () => {
        listaTemas.classList.toggle("activo");
    });
    
    // Cambiar tema al seleccionar una opción
    opcionesTema.forEach(opcion => {
        opcion.addEventListener("click", () => {
            const nombreTema = opcion.getAttribute("data-tema");
            
            // Quitar todos los temas
            contenedor.classList.remove("rojo-skin", "azul-skin", "verde-skin", "negro-skin", "marron-skin");
            
            // Aplicar el tema seleccionado
            contenedor.classList.add(`${nombreTema}-skin`);
            
            // Cerrar la lista
            listaTemas.classList.remove("activo");
            
            // Actualizar texto del botón
            botonTema.textContent = opcion.textContent;
            
            // Guardar preferencia en almacenamiento local
            localStorage.setItem("miTemaPokedex", nombreTema);
        });
    });
    
    // Cargar tema guardado (si existe)
    const temaGuardado = localStorage.getItem("miTemaPokedex");
    if (temaGuardado) {
        contenedor.classList.remove("rojo-skin", "azul-skin", "verde-skin", "negro-skin", "marron-skin");
        contenedor.classList.add(`${temaGuardado}-skin`);
        
        // Actualizar texto del botón
        const opcionTema = document.querySelector(`.tema-opcion[data-tema="${temaGuardado}"]`);
        if (opcionTema) {
            botonTema.textContent = opcionTema.textContent;
        }
    }
}

// Navegar entre IDs de Pokémon con navegación circular
function navegarPokemon(direccion) {
    if (activeSection === "buscar") {
        const currentId = pokemonIdInput.value === "" ? "1" : pokemonIdInput.value;
        let newId;
        
        // Implementar la navegación circular
        if (parseInt(currentId) === 1 && direccion === -1) {
            newId = 210; // Si estamos en 1 y vamos hacia abajo, ir a 210
        } else if (parseInt(currentId) === 210 && direccion === 1) {
            newId = 1; // Si estamos en 210 y vamos hacia arriba, ir a 1
        } else {
            newId = Math.max(1, Math.min(210, parseInt(currentId) + direccion));
        }
        
        pokemonIdInput.value = newId;
        buscarPokemon(newId.toString());
    }
}

// Alternar entre secciones búsqueda y recomendación
function toggleRecomendacion() {
    if (activeSection === "buscar") {
        activeSection = "recomendacion";
        seccionBusqueda.style.display = "none";
        seccionRecomendacion.style.display = "block";
        panelDescripcion.textContent = "Pokémon recomendado. Pulsa el botón para ver detalles";
    } else {
        mostrarBusqueda();
    }
}

// Mostrar sección de búsqueda
function mostrarBusqueda() {
    activeSection = "buscar";
    seccionRecomendacion.style.display = "none";
    seccionBusqueda.style.display = "block";
    panelDescripcion.textContent = "Busca Pokémon por ID. Usa los botones ↑/↓ para navegar por IDs y el botón → para ver Pokemons recomendados";
}

// Buscar Pokémon por ID
async function buscarPokemon(id) {
    try {
        // Validar ID
        if (!id || id.trim() === "") {
            alert("Ingrese un ID de Pokémon");
            return;
        }

        
        const actualId = pokemonDisponible[id];
        currentPokemonId = id;
        
        console.log("Buscando Pokémon con ID:", id, "API ID:", actualId);
        
        // Fetch de la información del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${actualId}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const data = await response.json();
        
        // Fetch de la especie para obtener el nombre en español
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Buscar nombre en español
        const nombre = speciesData.names.find(n => n.language.name === "es")?.name.toUpperCase() || data.name.toUpperCase();
        
        // Calcular estadísticas
        const stats = {
            hp: data.stats.find(s => s.stat.name === "hp")?.base_stat || "?",
            attack: data.stats.find(s => s.stat.name === "attack")?.base_stat || "?",
            defense: data.stats.find(s => s.stat.name === "defense")?.base_stat || "?",
            speed: data.stats.find(s => s.stat.name === "speed")?.base_stat || "?"
        };
        
        // Actualizar la interfaz con la información del Pokémon
        document.getElementById("pokemon-nombre").textContent = nombre;
        document.getElementById("pokemon-imagen").src = data.sprites.front_default;
        document.getElementById("pokemon-imagen").alt = nombre;
        document.getElementById("pokemon-num").textContent = id;
        document.getElementById("pokemon-tipo").textContent = data.types.map(t => t.type.name).join(", ");
        document.getElementById("pokemon-altura").textContent = (data.height / 10).toFixed(1);
        document.getElementById("pokemon-peso").textContent = (data.weight / 10).toFixed(1);
        
        // Actualizar estadísticas
        document.getElementById("stat-hp").textContent = stats.hp;
        document.getElementById("stat-atk").textContent = stats.attack;
        document.getElementById("stat-def").textContent = stats.defense;
        document.getElementById("stat-spd").textContent = stats.speed;
        
        // Mostrar el resultado
        resultadoPokemon.style.display = "block";
        
    } catch (error) {
        console.error("Error buscando Pokémon:", error);
        alert("Error al buscar el Pokémon: " + error.message);
    }
}

// Recomendar un Pokémon aleatorio
async function recomendarPokemon() {
    try {
        // Genera un ID aleatorio para demo
        const availableIds = Object.keys(pokemonDisponible);
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        const randomId = availableIds[randomIndex];
        recommendedPokemonId = randomId;
        
        const actualId = pokemonDisponible[randomId];
        
        if (!actualId) {
            console.error("ID no encontrado en el mapeo");
            return;
        }
        
        // Fetch de la información del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${actualId}`);
        const data = await response.json();
        
        // Fetch de la especie para obtener el nombre en español
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Buscar nombre en español
        const nombre = speciesData.names.find(n => n.language.name === "es")?.name || data.name;
        
        // Calcular estadísticas simples
        const hp = data.stats.find(s => s.stat.name === "hp")?.base_stat || "?";
        const attack = data.stats.find(s => s.stat.name === "attack")?.base_stat || "?";
        
        // Actualizar la interfaz con la recomendación
        document.getElementById("recomendacion-id-nombre").textContent = `#${randomId} - ${nombre}`;
        document.getElementById("recomendacion-imagen").src = data.sprites.front_default;
        document.getElementById("recomendacion-imagen").alt = nombre;
        document.getElementById("recomendacion-tipo").textContent = data.types.map(t => t.type.name).join(", ");
        document.getElementById("recomendacion-hp").textContent = hp;
        document.getElementById("recomendacion-atk").textContent = attack;
        
        // Mostrar la recomendación
        recomendacionItem.style.display = "block";
        
    } catch (error) {
        console.error("Error recomendando Pokémon:", error);
    }
}

// Manejar eventos de teclado
document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            navegarPokemon(-1);
            break;
        case "ArrowDown":
            navegarPokemon(1);
            break;
        case "ArrowRight":
            toggleRecomendacion();
            break;
        case "ArrowLeft":
            mostrarBusqueda();
            break;
        case "Enter":
        case "b":
        case "B":
            if (activeSection === "buscar") {
                buscarPokemon(pokemonIdInput.value);
            } else if (activeSection === "recomendacion") {
                // También manejar la tecla B para recomendaciones
                pokemonIdInput.value = recommendedPokemonId;
                buscarPokemon(recommendedPokemonId);
                mostrarBusqueda();
            }
            break;
    }
});

// También permitir que al presionar Enter en el campo de entrada se busque el Pokémon
pokemonIdInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscarPokemon(this.value);
    }
});