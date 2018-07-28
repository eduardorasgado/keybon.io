
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
let keys = generateKeys()

function generateKeys() {

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

function listener() {
	document.addEventListener('keydown', function(event) {
		activate(event.keyCode, { success: true, fail: false })
		//parar la animacion de presentacion
		if (tempo > 26){
			clearInterval(intervalo)
		}
	 } )

}
listener()
