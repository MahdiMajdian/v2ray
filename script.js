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
		'/': '/',
		'!': '!',
		'@': '@',
		'#': '#',
		$: '$',
		'%': '%',
		'^': '^',
		'&': '&',
		'*': '*',
		'(': '(',
		')': ')',
		'-': '-',
		_: '_',
		'+': '+',
		'?': '?',
		'=': '=',
		'&': '&',
		'#': '#',
		$: '$',
		'%': '%',
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
		'/': '/',
		'!': '!',
		'@': '@',
		'#': '#',
		$: '$',
		'%': '%',
		'^': '^',
		'&': '&',
		'*': '*',
		'(': '(',
		')': ')',
		'-': '-',
		_: '_',
		'+': '+',
		'?': '?',
		'=': '=',
		'&': '&',
		'#': '#',
		$: '$',
		'%': '%',
		'.': '.',
		',': ',',
		';': ';',
		':': ':',
		'|': '|',
		'~': '~',
		'`': '`',
	};

	// Encode
	const encodeInput = document.getElementById('encode-input');
	const encodeOutput = document.getElementById('encode-output');
	const copyEncodeOutput = document.getElementById('copy-encode-output');

	encodeInput.addEventListener('input', () => {
		try {
			const encoded = encodeInput.value
				.split('')
				.map((letter) => {
					return toFaMapper[letter];
				})
				.join('');
			encodeOutput.textContent = encoded;
		} catch (e) {
			encodeOutput.textContent = 'Error encoding input: ' + e.message;
		}
	});

	copyEncodeOutput.addEventListener('click', () => {
		navigator.clipboard.writeText(encodeOutput.textContent).then(() => {
			copyEncodeOutput.textContent = 'Copied!';
			setTimeout(() => {
				copyEncodeOutput.textContent = 'Copy';
			}, 2000);
		});
	});

	// Decode
	const decodeInput = document.getElementById('decode-input');
	const decodeOutput = document.getElementById('decode-output');
	const copyDecodeOutput = document.getElementById('copy-decode-output');

	decodeInput.addEventListener('input', () => {
		try {
			let input = decodeInput.value;
			const decoded = input
				.split('')
				.map((letter) => toEnMapper[letter])
				.join('');
			decodeOutput.textContent = decoded;
		} catch (e) {
			decodeOutput.textContent = 'Error decoding input: ' + e.message;
		}
	});

	copyDecodeOutput.addEventListener('click', () => {
		navigator.clipboard.writeText(decodeOutput.textContent).then(() => {
			copyDecodeOutput.textContent = 'Copied!';
			setTimeout(() => {
				copyDecodeOutput.textContent = 'Copy';
			}, 2000);
		});
	});
});
