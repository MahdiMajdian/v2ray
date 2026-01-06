// invert Map (key:value -> value:key)
const invertMap = map => {
  const invertedMap = {};

  for (const [key, value] of Object.entries(map)) {
    if (!invertedMap.hasOwnProperty(value)) {
      invertedMap[value] = key;
	}
  }

  return invertedMap;
}

document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tab-button');
	const contents = document.querySelectorAll('.tab-content');

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

	function isUpperCase(char) {
		return char >= 'A' && char <= 'Z';
	}

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

	const toEnMapper = invertMap(toFaMapper);

	// Encode
	const encodeCopyButton = document.getElementById('encode-copy');
	const encodeInput = document.getElementById('encode-input');
	const encodeOutput = document.getElementById('encode-output');

	encodeCopyButton.disabled = true;

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
		encodeCopyButton.disabled = !encodeOutput.textContent;
	});

	encodeCopyButton.addEventListener('click', () => {
		navigator.clipboard
			.writeText(encodeOutput.textContent)
			.then(() => {
				encodeCopyButton.textContent = 'کپی شد !';
				setTimeout(() => {
					encodeCopyButton.textContent = 'کپی';
				}, 3000);
			})
			.catch(() => {
				encodeCopyButton.textContent = 'Error while copying.';
			});
	});

	// Decode
	const decodeCopyButton = document.getElementById('decode-copy');
	const decodeInput = document.getElementById('decode-input');
	const decodeOutput = document.getElementById('decode-output');

	decodeCopyButton.disabled = true;

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
			decodeOutput.textContent = 'Error decoding input';
		}
		decodeCopyButton.disabled = !decodeOutput.textContent;
	});

	decodeCopyButton.addEventListener('click', () => {
		navigator.clipboard
			.writeText(decodeOutput.textContent)
			.then(() => {
				decodeCopyButton.textContent = 'کپی شد !';
				setTimeout(() => {
					decodeCopyButton.textContent = 'کپی';
				}, 3000);
			})
			.catch(() => {
				encodeCopyButton.textContent = 'Error while copying.';
			});
	});

	// PWA Install Button Logic
	const installBtn = document.getElementById('install-btn');
	let deferredPrompt;

	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e;
		installBtn.hidden = false;
	});

	installBtn.addEventListener('click', async () => {
		if (!deferredPrompt) return;
		installBtn.disabled = true;
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			installBtn.textContent = 'برنامه نصب شد!';
			setTimeout(() => {
				installBtn.hidden = true;
			}, 3000);
		} else {
			installBtn.textContent = 'نصب برنامه توسط کاربر رد شد!';
			installBtn.hidden = false;
		}
		deferredPrompt = null;
	});

	// iOS install banner behavior (dismiss persistence)
	const iosBanner = document.getElementById('ios-install-banner');
	const iosClose = document.getElementById('ios-install-close');
	const IOS_BANNER_DISMISSED_KEY = 'iosBannerDismissed';

	if (iosClose) {
		iosClose.addEventListener('click', () => {
			if (iosBanner) iosBanner.hidden = true;
			try {
				localStorage.setItem(IOS_BANNER_DISMISSED_KEY, '1');
			} catch (e) {
				// ignore storage errors
			}
		});
	}

	// iOS detection and banner show logic
	const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
	const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

	// Try to show the banner only if: on iOS, not in standalone mode, and not previously dismissed
	if (isIos && !isInStandaloneMode) {
		try {
			const dismissed = localStorage.getItem(IOS_BANNER_DISMISSED_KEY);
			if (!dismissed && iosBanner) {
				iosBanner.hidden = false;
			}
		} catch (e) {
			// localStorage may be unavailable; still show banner
			if (iosBanner) iosBanner.hidden = false;
		}
	}
});

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js');
}