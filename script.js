document.addEventListener("DOMContentLoaded", function() {
    const agregarNotaBtn = document.getElementById("agregar-nota");
    const notasContainer = document.querySelector('.notas-container');
    const mensajeEmergente = document.getElementById("mensaje-emergente");
    const mensajeTexto = document.getElementById("mensaje-texto");
    const closeButton = document.getElementById("close-button");

    agregarNotaBtn.addEventListener("click", function() {
        agregarNota();
    });

    function crearBoton(texto, clase, callback) {
        const boton = document.createElement('button');
        boton.textContent = texto;
        boton.classList.add('button', clase);
        boton.addEventListener('click', callback);
        return boton;
    }

    function agregarNota() {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Escribe tu nota aquí...';
        textarea.maxLength = 560;

        const botonGuardar = crearBoton('Guardar', 'boton-guardar', function() {
            const contenido = textarea.value;
            textarea.value = contenido;
            textarea.disabled = true;
            mostrarMensaje("Nota guardada con éxito", 'success');
        });

        const botonEditar = crearBoton('Editar', 'boton-editar', function() {
            if (confirm("¿Estás seguro de que deseas editar esta nota?")) {
                textarea.disabled = false;
                textarea.focus();
            }
        });

        const botonBorrar = crearBoton('Borrar', 'boton-borrar', function() {
            if (confirm("¿Estás seguro de que deseas borrar esta nota?")) {
                notasContainer.removeChild(notaDiv);
                mostrarMensaje("Nota borrada con éxito", 'success');
            }
        });

        textarea.addEventListener('input', function() {
            if (textarea.value.length > 560) {
                textarea.value = textarea.value.slice(0, 560);
            }
        });

        notaDiv.appendChild(textarea);
        notaDiv.appendChild(botonGuardar);
        notaDiv.appendChild(botonEditar);
        notaDiv.appendChild(botonBorrar);
        notasContainer.appendChild(notaDiv);
    }

    function mostrarMensaje(mensaje, tipo) {
        mensajeTexto.textContent = mensaje;
        mensajeEmergente.classList.remove('success', 'error');
        mensajeEmergente.classList.add(tipo === 'success' ? 'success' : 'error');
        mensajeEmergente.style.display = "block";
        setTimeout(() => {
            mensajeEmergente.style.display = "none";
        }, 2000);
    }

    closeButton.addEventListener("click", function() {
        mensajeEmergente.style.display = "none";
    });
});
