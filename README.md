# Vox Minimal

A boutique-style, minimalist text-to-speech single-page web app.

## Features

- Clean, high-tech UI with ample white space.
- Central text area for pasted text.
- Simple voice selector with 2-3 curated local voices.
- Single-click **Speak** action plus **Stop**.
- Client-side execution with the browser Web Speech API (`speechSynthesis`).

## Run locally

No build step required.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## TTS model approach

This app is client-side first and currently uses browser-native speech synthesis for free and reliable usage without external keys.

### Optional provider expansion (OpenAI / Coqui / Mozilla)

If you add remote provider support:

- Do **not** hardcode API keys in front-end code.
- Prefer a backend proxy for secret management.
- Keep browser TTS as graceful fallback when remote APIs are unavailable.

## Accessibility

- Semantic labels for all controls.
- Keyboard navigable form fields and buttons.
- Clear focus and status messaging.
