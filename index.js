// Variables globales
let indiceMenuActual = 0;                             // Índice de la opción seleccionada
const opcionesMenu = document.querySelectorAll('.menu-item');  // Lista de opciones
const panelDescripcion = document.getElementById('descripcion-seccion');  // Panel de datos

// Función de inicialización
function inicializar() {
    actualizarOpcionActiva();  // Resaltar opción activa
    configurarEventos();       // Configurar eventos de botones
    configurarSelectorTemas(); // Configurar selector de temas
    actualizarDescripcion();   // Actualizar descripción mostrada
}

// Función para resaltar la opción activa
function actualizarOpcionActiva() {
    opcionesMenu.forEach((opcion, indice) => {
        if (indice === indiceMenuActual) {
            opcion.classList.add('activo');
        } else {
            opcion.classList.remove('activo');
        }
    });
    
    // Actualizar la descripción
    actualizarDescripcion();
}

// Configurar eventos de los botones
function configurarEventos() {
    // Botones direccionales
    document.getElementById('boton-arriba').addEventListener('click', () => navegarMenu(-1));
    document.getElementById('boton-abajo').addEventListener('click', () => navegarMenu(1));
    document.getElementById('boton-b').addEventListener('click', seleccionarOpcion);
}

// Configurar selector de temas
function configurarSelectorTemas() {
    const botonTema = document.getElementById('cambiar-tema');
    const listaTemas = document.getElementById('lista-temas');
    const opcionesTema = document.querySelectorAll('.tema-opcion');
    const contenedor = document.querySelector('.poke-contenedor');
    
    // Mostrar/ocultar lista de temas
    botonTema.addEventListener('click', () => {
        listaTemas.classList.toggle('activo');
    });
    
    // Cambiar tema al seleccionar una opción
    opcionesTema.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const nombreTema = opcion.getAttribute('data-tema');
            
            // Quitar todos los temas
            contenedor.classList.remove('rojo-skin', 'fuego-skin', 'azul-skin', 'verde-skin', 'negro-skin', 'marron-skin');
            
            // Aplicar el tema seleccionado
            contenedor.classList.add(`${nombreTema}-skin`);
            
            // Cerrar la lista
            listaTemas.classList.remove('activo');
            
            // Actualizar texto del botón
            const textoTema = opcion.textContent;
            botonTema.textContent = textoTema;
            
            // Guardar preferencia en almacenamiento local
            localStorage.setItem('miTemaPokedex', nombreTema);
        });
    });
    
    // Cargar tema guardado (si existe)
    const temaGuardado = localStorage.getItem('miTemaPokedex');
    if (temaGuardado) {
        contenedor.classList.remove('rojo-skin', 'fuego-skin', 'azul-skin', 'verde-skin', 'negro-skin', 'marron-skin');
        contenedor.classList.add(`${temaGuardado}-skin`);
        
        // Actualizar texto del botón
        const opcionTema = document.querySelector(`.tema-opcion[data-tema="${temaGuardado}"]`);
        if (opcionTema) {
            botonTema.textContent = opcionTema.textContent;
        }
    }
}

// Navegar por el menú con botones arriba/abajo
function navegarMenu(direccion) {
    // Calcular nuevo índice (con bucle circular)
    indiceMenuActual = (indiceMenuActual + direccion + opcionesMenu.length) % opcionesMenu.length;
    actualizarOpcionActiva();
}

// Actualizar la descripción según la opción seleccionada
function actualizarDescripcion() {
    const opcionSeleccionada = opcionesMenu[indiceMenuActual];
    const descripcion = opcionSeleccionada.getAttribute('data-info');
    const nombrePagina = opcionSeleccionada.textContent;
    
    // Mostrar descripción en el panel de datos
    panelDescripcion.innerHTML = descripcion || `Sección de<br>${nombrePagina}`;
}

// Seleccionar opción actual (con botón B) - Navega a una nueva página
function seleccionarOpcion() {
    const opcionSeleccionada = opcionesMenu[indiceMenuActual];
    const rutaPagina = opcionSeleccionada.getAttribute('data-pagina');
    
    // Navegar a la página seleccionada
    window.location.href = rutaPagina;
}

// Iniciar aplicación cuando el DOM esté cargado
window.addEventListener('DOMContentLoaded', inicializar);