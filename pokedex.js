/*  Constante de las id cambiadas (personalizadas) Este objeto mapea IDs personalizados a IDs reales de la API de Pokémon */

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
    // Genera un ID aleatorio entre 1 y 210 (número total de Pokémon)
    const randomId = Math.floor(Math.random() * 210) + 1;                                         /*CAMBIAR EL RANGO*/
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

