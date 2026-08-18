const input = document.querySelector("#search");
const button = document.querySelector("#btn");
const container = document.querySelector("#cont");
const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';

button.addEventListener("click", async () => {
	const message = input.value;
	
	if (!message.trim()) {
		alert("Veuillez entrer un message");
		return;
	}
	
	// Afficher le message de l'utilisateur
	const userMessageDiv = document.createElement("div");
	userMessageDiv.className = "user-message mb-4 p-3 bg-blue-100 rounded-lg max-w-xs ml-auto";
	userMessageDiv.innerHTML = `<strong>Vous:</strong> ${escapeHtml(message)}`;
	container.appendChild(userMessageDiv);
	
	// Nettoyer l'input
	input.value = "";
	
	// Afficher un indicateur de chargement
	const loadingDiv = document.createElement("div");
	loadingDiv.className = "loading-message mb-4 p-3 bg-gray-100 rounded-lg max-w-xs";
	loadingDiv.innerHTML = "<strong>Bot:</strong> <i>Chargement...</i>";
	container.appendChild(loadingDiv);
	
	try {
		const options = {
			method: 'POST',
			headers: {
				'x-rapidapi-key': 'f75ec77504msh22f386205a6277ep10b1a8jsn43bb53591b18',
				'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
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
			})
		};
		
		const response = await fetch(url, options);
		const result = await response.json();
		
		console.log(result);
		
		// Supprimer le message de chargement
		container.removeChild(loadingDiv);
		
		// Afficher la réponse du bot
		let botResponse = "Erreur: Aucune réponse";
		
		if (result.result) {
			botResponse = result.result;
		} else if (result.message) {
			botResponse = result.message;
		} else if (result.response) {
			botResponse = result.response;
		}
		
		const botMessageDiv = document.createElement("div");
		botMessageDiv.className = "bot-message mb-4 p-3 bg-green-100 rounded-lg max-w-xs";
		botMessageDiv.innerHTML = `<strong>Bot:</strong> ${escapeHtml(botResponse)}`;
		container.appendChild(botMessageDiv);
		
		// Scroll vers le bas
		container.scrollTop = container.scrollHeight;
		
	} catch (error) {
		console.error(error);
		container.removeChild(loadingDiv);
		
		const errorDiv = document.createElement("div");
		errorDiv.className = "error-message mb-4 p-3 bg-red-100 rounded-lg max-w-xs";
		errorDiv.innerHTML = `<strong>Erreur:</strong> ${escapeHtml(error.message)}`;
		container.appendChild(errorDiv);
	}
});

function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

