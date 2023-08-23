// Get references to HTML elements
const startButton = document.getElementById("startButton");
const output = document.getElementById("output");

// Initialize the SpeechRecognition object
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
// recognition.interimResults = true;
recognition.lang = 'hu-HU';

// Event listener for the start button
startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startButton.textContent = "Figyelek...";
    output.textContent = "";

    // Start speech recognition
    recognition.start();
});

// Event listener for speech recognition results
recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    output.textContent += result;
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
};
