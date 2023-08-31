// Generate random quote

const quoteElement = document.querySelector('.quote');
const quoterElement = document.querySelector('.quoter span:last-child');
const newQuoteButton = document.querySelector('.new-quote-button');
const speakButton = document.querySelector('.feature-icon');

// Function to fetch a new quote from the API
async function fetchNewQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteElement.textContent = data.content;
        quoterElement.textContent = data.author;
    } catch (error) {
        console.error('Error fetching new quote:', error);
    }
}

// Function to speak the quote and quoter
function speakText() {
    const textToSpeak = `${quoteElement.textContent} by ${quoterElement.textContent}`;
    const speechInstance = new SpeechSynthesisUtterance(textToSpeak);
    speechInstance.lang = 'en-US';
    speechSynthesis.speak(speechInstance);
}

// Event listener for the "New Quote" button
newQuoteButton.addEventListener('click', async () => {
    await fetchNewQuote();
});

// Event listener for the "Speak" button
speakButton.addEventListener('click', () => {
    speakText();
});



// To Copy quote to clipboard
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', copyText);
    });

    function copyText(event) {
        const targetSelector = event.currentTarget.getAttribute('data-copy-target');
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            const quote = document.querySelector('.quote').textContent;
            const quoter = document.querySelector('.quoter span:last-child').textContent;
            const textToCopy = `"${quote}" by ${quoter}`;

            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;

            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

});

//text to speech
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');
    const speakerIcons = document.querySelectorAll('.features img[data-action="speak"]');

    copyButtons.forEach(button => {
        button.addEventListener('click', copyText);
    });

    speakerIcons.forEach(icon => {
        icon.addEventListener('click', speakText);
    });

    function copyText(event) {
        // Copy text logic (as shown earlier)
    }

    function speakText(event) {
        const quote = document.querySelector('.quote').textContent;
        const quoter = document.querySelector('.quoter span:last-child').textContent;
        const textToSpeak = `${quote} by ${quoter}`;

        const speech = new SpeechSynthesisUtterance(textToSpeak);
        speech.lang = 'en-US';

        speechSynthesis.speak(speech);
    }

});
