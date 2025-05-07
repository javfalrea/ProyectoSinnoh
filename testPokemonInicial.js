let preguntaActual = 1; // Iniciar con la primera pregunta

// Función para mostrar la siguiente pregunta
function mostrarSiguientePregunta() {
    const preguntas = document.querySelectorAll('.question');
    
    // Ocultar todas las preguntas
    preguntas.forEach(pregunta => {
        pregunta.style.display = 'none';
    });
    
    // Mostrar la pregunta actual
    const pregunta = document.getElementById(`pregunta-${preguntaActual}`);
    if (pregunta) {
        pregunta.style.display = 'block';
    }
}

// Función para avanzar a la siguiente pregunta
function avanzarPregunta() {
    preguntaActual++;
    if (preguntaActual <= 10) {
        mostrarSiguientePregunta();
    } else {
        mostrarResultado();
    }
}

// Función para mostrar el resultado
function mostrarResultado() {
    const respuestas = new FormData(document.getElementById('formulario'));
    
    const conteo = { chimchar: 0, piplup: 0, turtwig: 0 };

    respuestas.forEach(value => {
        conteo[value]++;
    });

    let resultado = "";
    let imagen = "";
    if (conteo.chimchar > conteo.piplup && conteo.chimchar > conteo.turtwig) {
        resultado = "🔥 ¡Escoge a Chimchar! Impulsivo, valiente y lleno de energía.";
        imagen = `<img alt="Chimchar" src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/9f/latest/20200827204158/Chimchar.png/800px-Chimchar.png" />`;
    } else if (conteo.piplup > conteo.chimchar && conteo.piplup > conteo.turtwig) {
        resultado = "💧 ¡Escoge a Piplup! Elegante, inteligente y con mucha gracia.";
        imagen = `<img alt="Piplup" src="https://w7.pngwing.com/pngs/394/68/png-transparent-pokemon-ranger-shadows-of-almia-pikachu-piplup-art-pikachu-vertebrate-bird-pokemon.png" />`;
    } else if (conteo.turtwig > conteo.chimchar && conteo.turtwig > conteo.piplup) {
        resultado = "🌿 ¡Escoge a Turtwig! Tranquilo, leal y resistente como la naturaleza.";
        imagen = `<img alt="Turtwig" src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c8/latest/20151017105732/Turtwig.png/800px-Turtwig.png" />`;
    } else {
        resultado = "🤔 ¡Parece que hay un empate! Deberías volver a realizar el test.";
    }

    // Mostrar el resultado y la imagen
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("imgPokemonInicial").innerHTML = imagen;

    // Ocultar todas las preguntas
    const preguntas = document.querySelectorAll('.question');
    preguntas.forEach(pregunta => {
        pregunta.style.display = 'none';
    });

    // Mostrar el resultado
    document.getElementById("resultado").style.display = 'block';
    document.getElementById("imgPokemonInicial").style.display = 'block';
}

document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', avanzarPregunta);
});
