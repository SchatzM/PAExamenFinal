'use strict';

const	ciudades = { // Objeto con las ciudades válidas y sus correspondientes horas de diferencia respecto UTC
			defecto : ['Madrid','Londres','Los Ángeles', 'Nueva York', 'Sídney'], // Ciudades mostradas por defecto
			lista: { // Ciudades válidas
				'Madrid': '+2',
				'Londres': '+1',
				'Los Ángeles': '-7',
				'Nueva York': '-4',
				'Sídney': '+10',
				'París': '+2',
				'Dubai': '+4',
				'Toronto' : '-4',
				'Bogota': '-5',
				'Tokyo': '+9'
			}
		},
		obtenerHoraCiudad = (diferenciaHoraria) => { // Nos devuelve un objeto con la hora y el día de diferencia
			let fecha = new Date (), // Instancia con la fecha actual
				fechaEstandar = fecha.getTime () + (fecha.getTimezoneOffset () * 60000), // Con este cálculo obtenemos la hora actual en formato UTC
				fechaConOffset = new Date (fechaEstandar + (3600000 * diferenciaHoraria)), // Aquí aplicamos la diferencia horaria para así obtener la hora de la ciudad especificada
				datos = { // Objeto que devolveremos
					hora: `${('0'+fechaConOffset.getHours ()).slice (-2)}:${('0' + fechaConOffset.getMinutes ()).slice (-2)}`, // Contiene la hora calculada de la ciudad proporcionada
					queDia: fecha.getDay()>fechaConOffset.getDay() ? 'ayer' : fecha.getDay()<fechaConOffset.getDay() ? 'mañana' : 'hoy' // Nos dice si la hora corresponde al día anterior, al siguiente o al mismo respecto a la del usuario
				};
				return datos; // Devolvemos objeto
		},
		insertarDatosReloj = (ciudad) => { // Con esta función insertaremos un nuevo elemento a la interfaz visible en pantalla
			if (ciudad in ciudades.lista) { // Comprobamos que la ciudad especificada sea válida
				const datosReloj = obtenerHoraCiudad (ciudades.lista[ciudad]), // Obtenemos datos de la ciudad especificada
				elementos = { // Objeto con los diferentes objetos que usaremos
					base: document.querySelector('.msr-relojMundial tbody'), // Especificamos el elemento base donde irá la información de cada ciudad
					nuevaHora: document.createElement ('tr'), // Creamos un nuevo elemento que insertaremos
					plantilla: () => { // Inserta los datos obtenidos de la ciudad en la plantilla e inserta en el elemento principal de la interfaz en pantalla
						elementos.nuevaHora.innerHTML = `<tr class="msr-entradaReloj"><td><h2 class="subtitle is-capitalized msr-husoHorario">${datosReloj.queDia}, ${ciudades.lista[ciudad]}H</h2>`+
						`<h1 class="title msr-Ciudad has-text-white">${ciudad}</h1>`+
						`</td><td><h1 class="is-size-1 has-text-right has-text-white msr-horaReloj">${datosReloj.hora}</h1>`+
						`</td></tr>`; // Plantilla HTMl
						elementos.base.appendChild(elementos.nuevaHora); // Insertamos nuestra plantilla rellenada a la interfaz en pantalla
					}
				}
				return elementos.plantilla() // Ejecutamos la función para insertar los nuevos elementos
			} else {
				console.error ('Ciudad no válida'); // Avisamos por consola si la ciudad proporcionada no es válida
			};
		},
		insertarOpcionesMenu = () => { // Función que añade las demás ciudades a elegir en el menú desplegable
			const elemento = document.querySelector ('.ciudadesDisponiblesMenu'); // Elemento del menú
			for (let [ciudad] of Object.entries(ciudades.lista)) { // Iteramos el objeto ciudades, procesamos la correspondiente información horaria de cada ciudad y mostramos en pantalla
				if (!ciudades.defecto.includes(ciudad)) {
					let opcionCiudad = document.createElement ('a'),
					ciudadNombre = document.createTextNode (ciudad);

					opcionCiudad.classList.add ('navbar-item');
					opcionCiudad.appendChild (ciudadNombre);
					elemento.appendChild (opcionCiudad);
					console.info (ciudad)
				}
			}
			elemento.querySelectorAll ('a').forEach ((opcion) => {
				opcion.addEventListener ('click', () => {
					insertarDatosReloj (opcion.textContent)
				})
			})
		};

// for (let [key] of Object.entries(ciudades)) { // Iteramos el objeto ciudades, procesamos la correspondiente información horaria de cada ciudad y mostramos en pantalla
// 	insertarDatos (key); // Llamada a función principal
// }

insertarOpcionesMenu ();

ciudades.defecto.forEach ((ciudad) => { // Mostramos la ciudades por defecto
	insertarDatosReloj (ciudad);
})
