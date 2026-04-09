const textEl = document.getElementById("tts-text");
const voiceSelectEl = document.getElementById("voice-select");
const speakBtnEl = document.getElementById("speak-btn");
const stopBtnEl = document.getElementById("stop-btn");
const rateEl = document.getElementById("rate");
const statusEl = document.getElementById("status");

const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
let voices = [];

function setStatus(message) {
  statusEl.textContent = message;
}

function updateSpeakState() {
  const hasText = textEl.value.trim().length > 0;
  speakBtnEl.disabled = !ttsSupported || !hasText;
}

function selectTopVoices(items) {
  if (!items.length) {
    return [];
  }

  const englishVoices = items.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const source = englishVoices.length ? englishVoices : items;

  const preferredNames = ["Samantha", "Google US English", "Daniel", "Alex", "Serena"];
  const selected = [];

  preferredNames.forEach((name) => {
    const match = source.find((voice) => voice.name.includes(name));
    if (match && !selected.some((item) => item.name === match.name)) {
      selected.push(match);
    }
  });

  source.forEach((voice) => {
    if (selected.length < 3 && !selected.some((item) => item.name === voice.name)) {
      selected.push(voice);
    }
  });

  return selected.slice(0, 3);
}

function populateVoices() {
  voices = selectTopVoices(window.speechSynthesis.getVoices());
  voiceSelectEl.innerHTML = "";

  if (!voices.length) {
    const option = document.createElement("option");
    option.textContent = "No voices available";
    option.value = "";
    voiceSelectEl.append(option);
    voiceSelectEl.disabled = true;
    setStatus("No local voices found in this browser.");
    return;
  }

  voices.forEach((voice, idx) => {
    const option = document.createElement("option");
    option.value = String(idx);
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelectEl.append(option);
  });

  voiceSelectEl.disabled = false;
  setStatus("Ready.");
}

function stopSpeaking() {
  if (!ttsSupported) {
    return;
  }

  window.speechSynthesis.cancel();
  setStatus("Stopped.");
}

function speak() {
  if (!ttsSupported) {
    setStatus("Text-to-speech is not supported in this browser.");
    return;
  }

  const text = textEl.value.trim();
  if (!text) {
    setStatus("Enter text to speak.");
    updateSpeakState();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[Number(voiceSelectEl.value)] || voices[0];

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }

  utterance.rate = Number(rateEl.value);
  utterance.onstart = () => setStatus("Speaking...");
  utterance.onend = () => setStatus("Done.");
  utterance.onerror = () => setStatus("Unable to speak this text in the current browser.");

  window.speechSynthesis.speak(utterance);
}

textEl.addEventListener("input", updateSpeakState);
speakBtnEl.addEventListener("click", speak);
stopBtnEl.addEventListener("click", stopSpeaking);

if (ttsSupported) {
  populateVoices();
  if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
  setStatus("Loading voices...");
} else {
  setStatus("This browser does not support speech synthesis.");
  voiceSelectEl.disabled = true;
  stopBtnEl.disabled = true;
}

updateSpeakState();
