const input =
document.getElementById("apiInput");
const button =
document.getElementById("testAPI");

button.addEventListener("click", async()=>{
	const message = input.value;
	console.log(message);

const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
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

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
});

