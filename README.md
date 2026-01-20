
# Cipher Academy

Browser-based offensive security sandbox. Runs Python 3.11 entirely client-side using WebAssembly (Pyodide).

## Architecture Reference

| Component | Implementation | Notes |
| :--- | :--- | :--- |
| **Runtime** | Pyodide / Web Workers | Isolates code execution from the main thread |
| **Shell** | Virtualized Terminal | Simulates Kali Linux environment commands |
| **Storage** | IndexedDB | Offline persistence for user progress |
| **Content** | Static Modules | Dual-language (Amharic/English) curriculum |

## Core Modules

1.  **Curriculum**
    *   Python Syntax & Logic
    *   Network Reconnaissance (Socket programming)
    *   Exploit Development (Keyloggers, ARP logic)

2.  **CTF Arena**
    *   **Cryptography:** XOR, Base64, RSA, Hashing
    *   **Forensics:** Log analysis, Hex dumps, Metadata extraction
    *   **Web:** SQLi logic, Header manipulation, Cookie tampering

3.  **IDE**
    *   In-browser code editor
    *   Real-time syntax highlighting
    *   Vulnerability scanning simulation

## Setup

Standard Vite project structure.

```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Build for production
npm run build
```

## Deployment

Configured for GitHub Pages. Pushing to `main` triggers the build workflow via GitHub Actions.

## License

MIT.