document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tab-button');
	const contents = document.querySelectorAll('.tab-content');

	function isUpperCase(char) {
		return char >= 'A' && char <= 'Z';
	}

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			tabs.forEach((t) => t.classList.remove('active'));
			tab.classList.add('active');

			const target = tab.getAttribute('data-tab');
			contents.forEach((content) => {
				if (content.id === target) {
					content.classList.add('active');
				} else {
					content.classList.remove('active');
				}
			});
		});
	});
	const capitalIndicator = 'ه';

	const toFaMapper = {
		a: 'ش',
		b: 'ل',
		c: 'ض',
		d: 'ب',
		e: 'ع',
		f: 'گ',
		g: 'و',
		h: 'ظ',
		i: 'س',
		j: 'ژ',
		k: 'ک',
		l: 'م',
		m: 'ن',
		n: 'پ',
		o: 'غ',
		p: 'ح',
		q: 'ز',
		r: 'ط',
		s: 'ر',
		t: 'ق',
		u: 'ث',
		v: 'ف',
		w: 'ی',
		x: 'د',
		y: 'ذ',
		z: 'خ',
		0: '۰',
		1: '۱',
		2: '۲',
		3: '۳',
		4: '۴',
		5: '۵',
		6: '۶',
		7: '۷',
		8: '۸',
		9: '۹',
		' ': ' ',
		':': ':',
		'/': 'ت',
		'!': '!',
		'@': '@',
		'#': '#',
		$: '$',
		'%': '%',
		'^': '^',
		'&': 'ا',
		'*': '*',
		'(': '(',
		')': ')',
		'-': '-',
		_: '_',
		'+': '+',
		'?': '?',
		'=': 'چ',
		'#': '#',
		$: '$',
		'%': 'ص',
		'.': '.',
		',': ',',
		';': ';',
		':': ':',
		'|': '|',
		'~': '~',
		'`': '`',
	};

	const toEnMapper = {
		ش: 'a',
		ل: 'b',
		ض: 'c',
		ب: 'd',
		ع: 'e',
		گ: 'f',
		و: 'g',
		ظ: 'h',
		س: 'i',
		ژ: 'j',
		ک: 'k',
		م: 'l',
		ن: 'm',
		پ: 'n',
		غ: 'o',
		ح: 'p',
		ز: 'q',
		ط: 'r',
		ر: 's',
		ق: 't',
		ث: 'u',
		ف: 'v',
		ی: 'w',
		د: 'x',
		ذ: 'y',
		خ: 'z',
		'۰': '0',
		'۱': '1',
		'۲': '2',
		'۳': '3',
		'۴': '4',
		'۵': '5',
		'۶': '6',
		'۷': '7',
		'۸': '8',
		'۹': '9',
		' ': ' ',
		':': ':',
		ت: '/',
		'!': '!',
		'@': '@',
		'#': '#',
		$: '$',
		'%': '%',
		'^': '^',
		ا: '&',
		'*': '*',
		'(': '(',
		')': ')',
		'-': '-',
		_: '_',
		'+': '+',
		'?': '?',
		چ: '=',
		'#': '#',
		$: '$',
		ص: '%',
		'.': '.',
		',': ',',
		';': ';',
		':': ':',
		'|': '|',
		'~': '~',
		'`': '`',
	};

	// Encode
	const encodeButton = document.getElementById('encode-button');
	const encodeInput = document.getElementById('encode-input');
	const encodeOutput = document.getElementById('encode-output');

	encodeButton.disabled = true;

	encodeInput.addEventListener('input', () => {
		try {
			const encoded = encodeInput.value
				.split('')
				.map((letter) => {
					const prefix = isUpperCase(letter) ? capitalIndicator : '';
					return prefix + toFaMapper[letter.toLowerCase()];
				})
				.join('');
			encodeOutput.textContent = encoded;
		} catch (e) {
			encodeOutput.textContent = 'Error encoding input: ' + e.message;
		}
		encodeButton.disabled = !encodeOutput.textContent;
	});

	encodeButton.addEventListener('click', () => {
		navigator.clipboard.writeText(encodeOutput.textContent).then(() => {
			encodeButton.textContent = 'کپی شد !';
			setTimeout(() => {
				encodeButton.textContent = 'کپی';
			}, 3000);
		});
	});

	// Decode
	const decodeButton = document.getElementById('decode-button');
	const decodeInput = document.getElementById('decode-input');
	const decodeOutput = document.getElementById('decode-output');

	decodeButton.disabled = true;

	decodeInput.addEventListener('input', () => {
		try {
			let input = decodeInput.value;
			let isNextCapital = false;
			const decoded = input
				.split('')
				.map((letter) => {
					if (letter === capitalIndicator) {
						isNextCapital = true;
						return '';
					}

					const res = isNextCapital
						? toEnMapper[letter].toUpperCase()
						: toEnMapper[letter];
					isNextCapital = false;
					return res;
				})
				.join('');
			decodeOutput.textContent = decoded;
		} catch (e) {
			decodeOutput.textContent = 'Error decoding input: ' + e.message;
		}
		decodeButton.disabled = !decodeOutput.textContent;
	});

	decodeButton.addEventListener('click', () => {
		navigator.clipboard.writeText(decodeOutput.textContent).then(() => {
			decodeButton.textContent = 'کپی شد !';
			setTimeout(() => {
				decodeButton.textContent = 'کپی';
			}, 3000);
		});
	});
});
