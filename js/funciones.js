'use strict';

const	ciudades = {
			'Madrid': '+2',
			'Londres': '+1',
			'Los Ángeles': '-7',
			'Nueva York': '-4',
			'Sídney': '+10'
		},
		obtenerHoraCiudad = (diferenciaHoraria) => {
			let fecha = new Date (),
				fechaEstandar = fecha.getTime () + (fecha.getTimezoneOffset () * 60000),
				fechaConOffset = new Date (fechaEstandar + (3600000 * diferenciaHoraria)),
				datos = {
					hora: `${('0'+fechaConOffset.getHours ()).slice (-2)}:${('0' + fechaConOffset.getMinutes ()).slice (-2)}`,
					queDia: fecha.getDay()>fechaConOffset.getDay() ? 'ayer' : fecha.getDay()<fechaConOffset.getDay() ? 'mañana' : 'hoy'
				};
				return datos;
		},
		insertarDatos = (ciudad) => {
			if (ciudad in ciudades) {
				const datosReloj = obtenerHoraCiudad (ciudades[ciudad]),
				elementos = {
					base: document.querySelector('.msr-relojMundial tbody'),
					nuevaHora: document.createElement ('tr'),
					plantilla: () => {
						elementos.nuevaHora.innerHTML = `<tr class="msr-entradaReloj"><td><h2 class="subtitle is-capitalized msr-husoHorario">${datosReloj.queDia}, ${ciudades[ciudad]}H</h2>`+
						`<h1 class="title msr-Ciudad has-text-white">${ciudad}</h1>`+
						`</td><td><h1 class="is-size-1 has-text-right has-text-white msr-horaReloj">${datosReloj.hora}</h1>`+
						`</td></tr>`;
						elementos.base.appendChild(elementos.nuevaHora);
					},
					test: 0
				}
				return elementos.plantilla()
			} else {
				console.error ('Ciudad no válida')
			}
		};

for (let [key] of Object.entries(ciudades)) {
	insertarDatos (key);
}
