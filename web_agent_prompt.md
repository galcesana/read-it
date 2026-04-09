# Web Agent Prompt: Minimalist Boutique Text-to-Speech App

You are a senior web design + front-end engineering agent. Build a **single-page, minimalist, boutique-style text-to-speech (TTS) web app** with a clean, modern, high-tech aesthetic.

## Product Goal
Create a lightweight app where users:
1. Paste or type text into a central text area.
2. Select one of **2–3 simple voice options** from a dropdown.
3. Click a single **"Speak"** button to hear the generated speech.

## Design Direction (must follow)
- Visual tone: minimalist, elegant, premium, high-tech.
- Layout: centered composition with generous spacing and balanced whitespace.
- Typography: sleek sans-serif (modern, refined).
- Color palette: mostly neutral (white/off-white/charcoal) with subtle accent color (electric blue, soft violet, or cyan).
- Components: soft corners, subtle shadows, crisp focus states, smooth micro-interactions.
- Avoid clutter: no unnecessary controls or dense toolbars.

## Functional Requirements
- Large central multiline text box.
- Voice selector dropdown with **only 2–3 curated voices**.
- Primary button labeled **"Speak"**.
- Add a **"Stop"** control if easy, but keep UI simple.
- Basic validation:
  - Disable Speak when text is empty.
  - Gracefully handle unsupported browser audio/TTS cases.
- Accessibility:
  - Proper labels and focus states.
  - Good color contrast.
  - Keyboard-friendly controls.

## TTS Requirements
Use free/reliable TTS options with a pragmatic fallback strategy:
1. **Primary fallback (required): Browser Web Speech API (`speechSynthesis`)** for true client-side operation.
2. **Optional provider adapter:** OpenAI TTS API (limited free-tier usage may apply), Coqui TTS, or Mozilla TTS where feasible.

### Important constraint
- The app should run **client-side for simplicity and low deployment friction**.
- If an external API key is required (e.g., OpenAI), avoid hardcoding secrets. Use a user-entered key field stored only in memory/session (or explain why a backend proxy is safer).
- If pure client-side integration is not safe for a provider, implement browser TTS as the default and document secure upgrade path.

## Technical Requirements
- Use plain HTML/CSS/JS or a lightweight framework (prefer no heavy dependencies).
- Keep code modular and readable.
- Include comments only where they improve clarity.
- Fast startup: no unnecessary packages.
- Mobile-responsive down to small phone widths.

## Deliverables
1. Production-ready front-end code.
2. Short README with:
   - Setup/run instructions.
   - Supported TTS paths (browser + optional provider).
   - Security notes about API keys.
3. A concise section explaining design decisions and fallback behavior.

## Quality Bar
- Polished visual finish.
- Clean spacing, alignment, and typography.
- Smooth button/field interactions.
- No console errors.

## Output Format
Provide:
1. File tree.
2. Full code for each file.
3. Run instructions.
4. Brief rationale for UI + TTS architecture.
