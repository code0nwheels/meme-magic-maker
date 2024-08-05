const installed = document.createElement('div');
installed.setAttribute('id', 'meme-magic-installed');
document.head.appendChild(installed);

browser.storage.local.get(["cors_reject"]).then((result) => {
	if (result.cors_reject === 'true') {
		console.log('enabled');
		const enabled = document.createElement('div');
		enabled.setAttribute('id', 'meme-magic-enabled');
		document.head.appendChild(enabled);
	}
	else {
		// check if div exists; if so, remove it
		const enabled = document.getElementById('meme-magic-enabled');
		if (enabled) {
			enabled.remove();
		}
	}
})