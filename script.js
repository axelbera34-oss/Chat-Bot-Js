
// Wrapper async pour l'API fournie (JavaScript uniquement)
const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';

/**
 * Appelle l'API conversationgpt4-2.
 * @param {string} message Texte utilisateur à envoyer.
 * @param {{apiKey?: string}} [opts] Options (optionnel: apiKey pour RapidAPI).
 * @returns {Promise<string>} Réponse texte brute de l'API.
 */
async function callConversationGPT(message = 'hello', opts = {}) {
	const { apiKey } = opts;

	const body = {
		messages: [
			{
				role: 'user',
				content: message
			}
		],
		system_prompt: '',
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	};

	const headers = {
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'Content-Type': 'application/json'
	};
	if (apiKey) headers['x-rapidapi-key'] = apiKey;

	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		return result;
	} catch (error) {
		// Remonte l'erreur pour que l'appelant puisse la gérer
		throw error;
	}
}

// Exemple d'utilisation (commenté) — sans HTML
/*
(async () => {
	try {
		const res = await callConversationGPT('hello', { apiKey: 'VOTRE_CLE_RAPIDAPI' });
		console.log(res);
	} catch (e) {
		console.error(e);
	}
})();
*/

// Export pour Node.js (si besoin)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { callConversationGPT };
}

