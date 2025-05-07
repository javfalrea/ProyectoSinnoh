function mostrarPokemon() {

    // Obtener todos los valores de las respuestas
    const formulario = document.getElementById("formulario");
    const respuestas = new FormData(formulario);

    // Crear un contador para cada Pokémon
    const conteo = { chimchar: 0, piplup: 0, turtwig: 0 };

    // Contar las respuestas seleccionadas
    respuestas.forEach(value => {
        conteo[value]++;
    });

    // Determinar cuál es el Pokémon con más respuestas
    let resultado = "";
    if (conteo.chimchar > conteo.piplup && conteo.chimchar > conteo.turtwig) {
        resultado = "🔥 ¡Escoge a Chimchar! Impulsivo, valiente y lleno de energía.";
        imagen = `<img alt="Chimchar" src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9f/latest/20200827204158/Chimchar.png/800px-Chimchar.png">`

    } else if (conteo.piplup > conteo.chimchar && conteo.piplup > conteo.turtwig) {
        resultado = "💧 ¡Escoge a Piplup! Elegante, inteligente y con mucha gracia.";
        imagen = `<img alt="Piplup" src="https://w7.pngwing.com/pngs/394/68/png-transparent-pokemon-ranger-shadows-of-almia-pikachu-piplup-art-pikachu-vertebrate-bird-pokemon.png">`
    } else if (conteo.turtwig > conteo.chimchar && conteo.turtwig > conteo.piplup) {
        resultado = "🌿 ¡Escoge a Turtwig! Tranquilo, leal y resistente como la naturaleza.";
        imagen = `<img alt="Turtwig" src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c8/latest/20151017105732/Turtwig.png/800px-Turtwig.png">`
    } else if (conteo.piplup == conteo.chimchar) {
        resultado = "🤔 ¡Parece que hay un empate! Tu compañero ideal debería ser Piplup, o quizás Chimchar. Deberías volver a realizar el test.";
    } else if (conteo.piplup == conteo.turtwig) {
        resultado = "🤔 ¡Parece que hay un empate! Tu compañero ideal debería ser Turtwig, o quizás Piplup. Deberías volver a realizar el test.";
    } else {
        resultado = "🤔 ¡Parece que hay un empate! Tu compañero ideal debería ser Chimchar, o quizás Turtwig. Deberías volver a realizar el test.";
    }

    // Mostrar el resultado en el div con id "resultado"
    const divResultado = document.getElementById("resultado");
    divResultado.innerHTML = resultado;

    const divImg = document.getElementById("imgPokemonInicial");
    divImg.innerHTML = imagen;  
}
