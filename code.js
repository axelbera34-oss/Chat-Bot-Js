const inputText = document.getElementById("search");
const processBtn = document.getElementById("btn");
const responseDiv = document.getElementById("cont");

processBtn.addEventListener("click", oneCall);

async function oneCall() {
    const message = input.value.trim();

    if (!message) {
        responseDiv.textContent = "Please enter a message.";
        return;
    }

    responseDiv.textContent = "Processing...";

    const url = "https://open-ai21.p.rapidapi.com/conversationllama";

    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
            "x-rapidapi-host": "open-ai21.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: message
                }
            ],
            web_access: false
        })
    };

    try {
        const response = await fetch(url, options);

        const data = await response.json();

        console.log(data);

        // Display the response
        responseDiv.textContent =
            data.result ||
            data.response ||
            JSON.stringify(data, null, 2);

    } catch (error) {
        console.error(error);
        responseDiv.textContent = "Error: " + error.message;
    }
}