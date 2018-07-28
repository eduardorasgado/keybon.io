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
	setTimeout(function() {
		deactivate(element)
	}, 500);
}

function deactivate(element) {
	element.className = 'key'
}

function listener() {
	document.addEventListener('keydown', function(event) {
		activate(event.keyCode, { success: true, fail: false })
	} )
}
listener()