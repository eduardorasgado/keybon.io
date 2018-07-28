function getkeyCode(key) {
	//entre corchetes para indicar que es un atributo
	return document.querySelector(`[data-key="${key}"]`)
}

function activate(key, opts= {}) {
	const element = getkeyCode(key)
	element.classList.add('active')
	if(opts.success) element.clasList.add('success')
	else if(opts.fail) element.classList.add('fail')
}

function listener() {
	document.addEventListener('keydown', function(event) {
		activate(event.keyCode, { success: true, fail: false })
	} )
}
listener()