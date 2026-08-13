#!/usr/bin/env node
// Mini chat CLI Node.js utilisant l'API RapidAPI fournie.
// Usage: définir la variable d'environnement RAPIDAPI_KEY puis lancer `node script.js`

const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';

async function callConversationGPT(messages, apiKey) {
	const body = {
		messages,
		system_prompt: '',
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	};

	const headers = {
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'x-rapidapi-key': apiKey,
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	});

	const text = await res.text();
	// L'API peut renvoyer JSON ou texte; on essaie de parser en JSON sinon on renvoie le texte brut
	try {
		return JSON.parse(text);
	} catch (e) {
		return text;
	}
}

async function main() {
	const apiKey = process.env.RAPIDAPI_KEY;
	if (!apiKey) {
		console.error('Erreur: définissez la variable d\'environnement RAPIDAPI_KEY.');
		console.error('Windows CMD: set RAPIDAPI_KEY=VOTRE_CLE');
		console.error('PowerShell: $env:RAPIDAPI_KEY="VOTRE_CLE"; node script.js');
		process.exit(1);
	}

	const readline = require('readline');
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });

	const messages = [];
	console.log('Mini chat CLI - tapez votre message, `exit` pour quitter.');
	rl.prompt();

	rl.on('line', async (line) => {
		const input = line.trim();
		if (!input) { rl.prompt(); return; }
		if (input.toLowerCase() === 'exit') { rl.close(); return; }

		messages.push({ role: 'user', content: input });

		try {
			const resp = await callConversationGPT(messages, apiKey);
			// Affiche la réponse brute; l'utilisateur peut adapter selon la structure renvoyée par l'API
			if (typeof resp === 'string') {
				console.log(resp);
			} else {
				console.log(JSON.stringify(resp, null, 2));
			}
		} catch (err) {
			console.error('Erreur lors de l\'appel API:', err.message || err);
		}

		rl.prompt();
	}).on('close', () => {
		console.log('Au revoir.');
		process.exit(0);
	});
}

// Démarrage
main();

// Export pour tests ou importation
if (typeof module !== 'undefined' && module.exports) module.exports = { callConversationGPT };

// --- Code pour navigateur: fonction testAPI() utilisée par index.html ---
if (typeof window !== 'undefined') {
	/**
	 * Appelé depuis la page HTML pour tester l'API et afficher la réponse.
	 * Lit la valeur de l'input `#apiInput` et affiche le résultat dans `#result`.
	 */
	window.testAPI = async function testAPI() {
		const inputEl = document.getElementById('apiInput');
		const resultEl = document.getElementById('result');
		if (!inputEl || !resultEl) {
			console.error('Éléments #apiInput ou #result introuvables dans le DOM.');
			return;
		}

		const message = inputEl.value.trim();
		if (!message) {
			resultEl.textContent = 'Entrez un message.';
			return;
		}

		// Récupère la clé RapidAPI: variable globale `RAPIDAPI_KEY` ou prompt utilisateur
		const apiKey = window.RAPIDAPI_KEY || window.localStorage.getItem('RAPIDAPI_KEY') || prompt('Entrez votre clé RapidAPI (x-rapidapi-key) :');
		if (!apiKey) {
			resultEl.textContent = 'Clé RapidAPI requise.';
			return;
		}

		// Sauvegarde optionnelle en localStorage pour éviter de retaper
		try { window.localStorage.setItem('RAPIDAPI_KEY', apiKey); } catch (e) { /* ignore */ }

		resultEl.textContent = 'Envoi en cours...';

		try {
			const resp = await fetch(url, {
				method: 'POST',
				headers: {
					'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
					'x-rapidapi-key': apiKey,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					messages: [{ role: 'user', content: message }],
					system_prompt: '',
					temperature: 0.9,
					top_k: 5,
					top_p: 0.9,
					max_tokens: 256,
					web_access: false
				})
			});

			const text = await resp.text();
			// Essaie de parser en JSON, sinon affiche le texte brut
			try {
				const json = JSON.parse(text);
				resultEl.textContent = '';
				const pre = document.createElement('pre');
				pre.textContent = JSON.stringify(json, null, 2);
				resultEl.appendChild(pre);
			} catch (e) {
				resultEl.textContent = text;
			}
		} catch (err) {
			resultEl.textContent = 'Erreur: ' + (err.message || err);
			console.error(err);
		}
	};
}