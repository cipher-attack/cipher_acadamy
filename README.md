
# Cipher Academy: Advanced Ethical Hacking Simulation Platform

Cipher Academy is a sophisticated, browser-based educational environment designed to demystify offensive security concepts and Python programming. Built with React and TypeScript, it provides a safe, isolated sandbox where users can practice penetration testing methodologies, analyze vulnerabilities, and execute Python scripts directly in the browser.

## Core Architecture

The platform operates as a **Progressive Web App (PWA)**, ensuring full offline capabilities and native-like performance on mobile devices. It leverages a hybrid execution engine:

*   **Virtual Terminal:** A simulated Kali Linux shell environment.
*   **Python Runtime:** Browser-based Python execution via Web Workers (Pyodide), allowing real-time code analysis without server-side dependencies.
*   **AI Tutor:** Integrated Gemini AI assistance for code auditing and logic explanation.

## Key Features

### 1. Interactive Learning Roadmap
A structured curriculum guiding users from basic Python syntax to advanced exploit development. Content is delivered in Amharic to bridge the language gap in cybersecurity education.

### 2. Capture The Flag (CTF) Arena
Real-world scenario simulations ranging from cryptography puzzles to log analysis and steganography.
*   **Reverse Engineering:** Logic gates and mathematical puzzles.
*   **Cryptography:** Decrypting ciphers and hash cracking.
*   **Forensics:** Analyzing server logs and corrupted files.

### 3. Integrated Development Environment (IDE)
*   **Code Editor:** Syntax highlighting and auto-completion.
*   **Console:** Real-time output visualization.
*   **Security Auditor:** Automated vulnerability scanning for user scripts.

## Technical Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS (Dark Mode optimized)
*   **Runtime:** Web Workers, Pyodide (Python 3.11)
*   **State Management:** IndexedDB (Offline Persistence)
*   **AI Integration:** Google Gemini API

## Installation

This project is designed to be deployed as a static site or installed as a PWA.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

The application is configured for automated deployment via GitHub Actions. Pushing to the `main` branch triggers a build process that generates a production-ready artifact hosted on GitHub Pages.

## License

MIT License. Educational use only.
