
let tempo = 0
//startShow = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,79,76,80]

const intervalo = setInterval(() => {
	if (tempo <=25){
		activate(65+tempo, { success: false, fail: false })
		tempo++
	}
}, 20)

//-------------------------

const niveles = 15
let keys = generateKeys(niveles)

function generateKeys() {
	return new Array(niveles).fill(0).map(generateRandomKey)
}

function generateRandomKey() {
	const min = 65
	const max = 90
	//tecla aleatoria
	return Math.round(Math.random() * (max - min) + min)
}

function nextLevel(nivelActual) {
	//si se llega al ultimo nivel y pasa la ronda
	if(nivelActual == niveles) {
		return swal({
			title: "Ganaste todas campeón! / You won like a boss!",
			type: "success",
			icon: "success"
		})
	}
	//cada nivel	
	swal(`Nivel actual: ${nivelActual+1}`, {
	  icon: "success",
	  buttons: {
	    cancel: "Adios! / Run away!",
	    catch: {
	      text: "Vamos! / Go ahead!",
	      value: "catch",
	    }
	  },
	})
	.then((value) => {
	  switch (value) {
	    case "catch":
	    	//mostrar las keys que debe tocar el usuario
			for(let i = 0; i <= nivelActual; i++){
				setTimeout(() => activate(keys[i]),1000*(i+1))
			}

			//dejar al usuario que comience a tocar las teclas(mimic)
			let i = 0
			let teclaActual = keys[i]

			window.addEventListener('keydown', onkeyDown)

			function onkeyDown(event) {
				//en caso de acertar la tecla debida
				if (event.keyCode == teclaActual) {
					//activar la tecla en verde
					activate(teclaActual, { success:true, fail: false})
					//incrementa la flag para analizar la siguiente techa
					i++
					//si ya termina de poner todas las teclas en el nivel debido
					if (i > nivelActual) {
						//quitar la escucha
						window.removeEventListener('keydown', onkeyDown)
						//llamar al nivel siguiente
						setTimeout(() => nextLevel(i), 1500)
					}
					//cambiar la tecla actual aqui porque no hay un ciclo para iterar
					teclaActual = keys[i]
				} 
				//el caso erroneo de apretar la tecla
				else {
					//activar tecla erronea y tecla que debia ser apretada
					activate(event.keyCode, {success: false, fail: true });
				    activate(teclaActual, {});
				    //apagar escucha
				    window.removeEventListener('keydown', onkeyDown);
				    //alerta de fallo
					setTimeout(() => {
						swal({
							title: "Has perdido! / You totally lose!",
							icon: "warning"
						})
					}, 1000)
					return false
				}
			}
	      break;
	  }
	});

	
}

function getkeyCode(key) {
	//entre corchetes para indicar que es un atributo
	return document.querySelector(`[data-key="${key}"]`)
}

function activate(key, opts= {}) {
	const element = getkeyCode(key)
	element.classList.add('active')
	//se filtra si fue presionada la tecla correcta
	if(opts.success) element.classList.add('success')
	else if(opts.fail) element.classList.add('fail')
	//desactivar la tecla presionada
	setTimeout(() => deactivate(element), 500);
}

function deactivate(element) {
	element.className = 'key'
}

function main() {
		
	//parar la animacion de presentacion
	setTimeout(() => {
		if (tempo > 26){
			clearInterval(intervalo)
		}
		//confirmacion, si no hay juego entonces no hace nada
		//const play = confirm("Vas a jugar?/ Are you ready?")

		swal("Listo para jugar?/ Are you ready?", {
		  buttons: {
		    cancel: "Adios! / Run away!",
		    catch: {
		      text: "Si / Go!",
		      value: "catch",
		    }
		  },
		})
		.then((value) => {
		  switch (value) {
		    case "catch":
		      setTimeout(() => nextLevel(0),1000)
		      break;
		  }
		});

	}, 1000)
	
	///setTimeout(() => nextLevel(0), 5000)

}

//iniciar secuencia de juego luego de presentacion
setTimeout(() => {
	main()
}, 2000)
