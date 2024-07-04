// ==UserScript==
// @name         Steam Multisell Delay
// @namespace    https://github.com/Sadzurami
// @version      0.0.1
// @description  Adds delay between sells for Steam multisell
// @author       Sadzurami
// @match        https://steamcommunity.com/market/multisell*
// @grant        unsafeWindow
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepageURL  https://github.com/Sadzurami/steam-multisell-delay-userscript
// @supportURL   https://github.com/Sadzurami/steam-multisell-delay-userscript
// @downloadURL  https://github.com/Sadzurami/steam-multisell-delay-userscript/raw/main/main.js
// @updateURL    https://github.com/Sadzurami/steam-multisell-delay-userscript/raw/main/main.js
// ==/UserScript==

(async function () {
	'use strict';

	const container = await new Promise((resolve) => {
		const interval = setInterval(() => {
			const el = document.querySelector('#market_multi_accept_ssa_container')?.parentElement;
			if (!el) return;

			clearInterval(interval);
			resolve(el);
		}, 500);
	});

	let sellDelaySeconds = 1;

	const originalSellNextItem = unsafeWindow.SellNextItem;
	const customSellNextItem = (...args) => setTimeout(() => originalSellNextItem(...args), sellDelaySeconds * 1000);

	unsafeWindow.SellNextItem = customSellNextItem;

	const div = document.createElement('div');
	div.style = 'margin-bottom: 1em';
	div.innerText = 'Delay between sells (seconds):';

	const input = document.createElement('input');
	input.type = 'number';
	input.style = 'margin-left: 1em; width: 50px';
	input.value = sellDelaySeconds;
	input.addEventListener('change', () => (sellDelaySeconds = input.value));

	div.append(input);
	container.prepend(div);
})();
