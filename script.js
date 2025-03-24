//Speech recognition setup
const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
recognition.lang = "en-US";
const btn = document.querySelector("#listen-btn");

//Attach click event listener to the button 
btn.addEventListener("click", function () {

    //Function to convert text to speech
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    // Function to handle recognized commands
    function handleCommand(command) {
        if (command.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://www.youtube.com");
        } else if (command.includes("open facebook")) {
            speak("Opening Facebook...");
            window.open("https://www.facebook.com");
        } else if (command.includes("open google")) {
            speak("Opening Google...");
            window.open("https://www.google.com");
        } else if (command.includes("open instagram")) {
            speak("Opening Instagram...");
            window.open("https://www.instagram.com");
        } else if (command.includes("open whatsapp")) {
            speak("Opening Whatsapp...");
            window.open("https://www.web.whatsapp.com");
        } else {
            // Perform a Google search if command not recognized
            speak("Searching Google for " + command);
            window.open (
                `https://www.google.com/search?q=${encodeURIComponent(command)}`,
            );
        }
    }

    // Greet the user and then start listening
    speak("Hello, I'm Your virtual Ai assistant. how can I help you?");

    //Delay to ensuregreeting completes before strating recognition
    setTimeout(() => {
        btn.innerHTML = "Searchng...";
        btn.classList.add("listening");
        recognition.start();
    }, 2500);

    // When a result is received
    recognition.onresult = (event) => {
        console.log(event);
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommand(command);
    };

    // When recognitio ends 
    recognition.onend = () => {
        btn.innerHTML = "Strat Listening";
        btn.classList.remove("listening");
    };
});