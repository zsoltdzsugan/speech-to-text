// Get references to HTML elements
const startButton = document.getElementById("startButton");
const output = document.getElementById("output");
const oldResult = [];

// Initialize the SpeechRecognition object
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
// recognition.interimResults = true;
recognition.lang = 'hu-HU';

// Event listener for the start button
startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startButton.textContent = "Figyelek...";
    output.innerHTML = "";

    // Start speech recognition
    recognition.start();
    document.querySelector('.circle').classList.remove('hidden');
});

// Event listener for speech recognition results
recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    output.innerHTML += `<p>- ${result}</p>`;
    oldResult.push(result);
};

// Event listener for speech recognition errors
recognition.onerror = (event) => {
    console.error("Hangfelismerési hiba:", event.error);
    startButton.disabled = false;
    startButton.textContent = "Hangfelismerés kezdése";
};

// Event listener for when speech recognition ends
recognition.onend = () => {
    startButton.disabled = false;
    startButton.textContent = "Hangfelismerés kezdése";
    document.querySelector('.circle').classList.add('hidden');
    output.innerHTML = '';
    document.querySelector('.last-output').innerHTML = `${oldResult.map(item => `<p>- ${item}</p>`).join('')}`;
};
