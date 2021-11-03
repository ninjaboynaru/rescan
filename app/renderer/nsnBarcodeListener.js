export default new function nsnBarcodeListener() {
	const listeners = [];
	let initialized = false;

	const maxInputDelay = 250;
	let lastInputTime;
	let inputBuffer = '';

	function validKey(value) {
		if (value.length !== 1) {
			return false;
		}

		const isLetter = (/[a-z]/i).test(value);
		const isNumber = Number.isNaN(parseInt(value, 10)) === false;

		if (isLetter === false && isNumber === false) {
			return false;
		}

		return true;
	}

	function validNSN(value) {
		return value.length === 13;
	}

	function onKeyDown(event) {
		const key = event.key;

		if (validKey(key) === false) {
			return;
		}

		const currentInputTime = Date.now();

		if (currentInputTime - lastInputTime > maxInputDelay) {
			inputBuffer = key;
		}
		else {
			inputBuffer += key;
		}

		if (validNSN(inputBuffer) === true) {
			listeners.forEach((fn) => fn(inputBuffer));
			inputBuffer = '';
		}

		lastInputTime = currentInputTime;
	}

	this.init = function init() {
		if (initialized === true) {
			return;
		}

		initialized = true;

		document.addEventListener('keydown', onKeyDown);
	};

	this.addAddListener = function addAddListener(fn) {
		if (typeof fn !== 'function') {
			return;
		}

		listeners.push(fn);
	};

	this.removeListener = function removeListener(fn) {
		const listenerIndex = listeners.indexOf(fn);

		if (listenerIndex === -1) {
			return;
		}

		listeners.splice(listenerIndex, 1);
	};
}();
