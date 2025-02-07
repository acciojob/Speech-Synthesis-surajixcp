const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speakButton = document.getElementById('speak-button');
const stopButton = document.getElementById('stop-button');
const rateControl = document.getElementById('rate');
const pitchControl = document.getElementById('pitch');

let synth = window.speechSynthesis;
let voices = [];
let utterance;

function populateVoiceList() {
    voices = synth.getVoices();
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

function speak() {
    if (textInput.value === '') {
        alert('Please enter some text to speak.');
        return;
    }

    if (utterance) {
        synth.cancel(); // Stop any ongoing speech
    }

    utterance = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    utterance.voice = selectedVoice;
    utterance.rate = rateControl.value;
    utterance.pitch = pitchControl.value;

    synth.speak(utterance);
}

function stop() {
    synth.cancel();
}

speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
rateControl.addEventListener('input', () => {
    if (utterance) {
        utterance.rate = rateControl.value;
    }
});
pitchControl.addEventListener('input', () => {
    if (utterance) {
        utterance.pitch = pitchControl.value;
    }
});

window.addEventListener('load', () => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    }
});

