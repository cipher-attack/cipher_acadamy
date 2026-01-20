
import { simulateCodeExecution } from './geminiService';

// --- PYODIDE WORKER CODE ---
// This code runs in a separate background thread
const PYODIDE_WORKER_CODE = `
importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;

async function loadPyodideEngine() {
  try {
    pyodide = await loadPyodide();
    self.postMessage({ type: 'STATUS', msg: 'READY' });
  } catch (e) {
    self.postMessage({ type: 'STATUS', msg: 'ERROR', error: e.toString() });
  }
}

loadPyodideEngine();

self.onmessage = async (event) => {
  const { id, code } = event.data;
  
  if (!pyodide) {
    self.postMessage({ id, error: "System Initializing..." });
    return;
  }

  try {
    // Redirect stdout/stderr to capture output
    pyodide.runPython(\`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    \`);
    
    // Auto-install packages if needed (simple check)
    await pyodide.loadPackagesFromImports(code);
    
    // Run async
    await pyodide.runPythonAsync(code);
    
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");
    
    self.postMessage({ id, results: (stdout + stderr) || "[No Output]" });
  } catch (error) {
    self.postMessage({ id, error: error.toString() });
  }
};
`;

// --- WORKER STATE ---
let worker: Worker | null = null;
let workerStatus = 'loading';
const pendingPromises = new Map<string, { resolve: (val: string) => void, reject: (err: any) => void }>();

// --- VIRTUAL FILE SYSTEM STATE (Mocked for context) ---
interface VirtualFile {
  name: string;
  content: string;
  type: 'file' | 'dir';
}

let currentPath = '/home/root';
const fileSystem: Record<string, VirtualFile[]> = {
  '/home/root': [
    { name: 'readme.txt', content: 'Welcome to EthicalCode OS v3.0\nSystem is Online and Ready.\nTarget IP: 192.168.1.50', type: 'file' },
    { name: 'passwords.txt', content: 'admin:password123\nroot:toor', type: 'file' },
    { name: 'tools', content: '', type: 'dir' }
  ],
  '/home/root/tools': [
    { name: 'nmap.py', content: '# Nmap Clone script', type: 'file' },
    { name: 'exploit.sh', content: '#!/bin/bash\necho "Exploiting..."', type: 'file' }
  ]
};

// --- INITIALIZE WORKER ENGINE ---
export const initPythonEngine = async () => {
  if (worker) return;

  // Create Worker from Blob (No external file needed)
  const blob = new Blob([PYODIDE_WORKER_CODE], { type: 'application/javascript' });
  worker = new Worker(URL.createObjectURL(blob));

  worker.onmessage = (e) => {
    const { type, id, results, error, msg } = e.data;

    // Handle Status Updates
    if (type === 'STATUS') {
      if (msg === 'READY') {
        console.log("EthicalCode Engine: Online");
        workerStatus = 'ready';
      }
      return;
    }

    // Handle Execution Responses
    if (id && pendingPromises.has(id)) {
      const { resolve, reject } = pendingPromises.get(id)!;
      if (error) reject(new Error(error));
      else resolve(results);
      pendingPromises.delete(id);
    }
  };
};

/**
 * Executes Python code using the Background Worker
 */
const executeRealPython = async (code: string): Promise<string> => {
   if (!worker) await initPythonEngine();
   
   // Create a unique ID for this execution request
   const id = Math.random().toString(36).substring(7);
   
   return new Promise((resolve, reject) => {
      pendingPromises.set(id, { resolve, reject });
      
      // Send code to worker
      worker?.postMessage({ id, code });
      
      // Timeout safety (15 seconds)
      setTimeout(() => {
        if (pendingPromises.has(id)) {
            pendingPromises.delete(id);
            reject(new Error("Execution Timed Out (Process Hung)"));
        }
      }, 15000);
   });
};

// --- CORE EXECUTION LOGIC ---

export const executeCommand = async (cmdStr: string, editorCode: string, ctfId?: string): Promise<string> => {
  const parts = cmdStr.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // 1. LINUX COMMANDS (Local Simulation - INSTANT)
  switch (cmd) {
    case 'help':
      return `
EthicalCode OS v4.0 (Powered by Hybrid Engine)
Available Commands:
  ls           - List files
  cat [file]   - Read file content
  pwd          - Print working directory
  whoami       - Current user
  clear        - Clear terminal
  python3      - Run code (Real Python Engine)
  hint         - Show hint
      `;

    case 'ls':
      if (ctfId === 'ctf-beg-7') return ".hidden_file  .bash_history  config.txt  notes.md"; 
      const files = fileSystem[currentPath] || [];
      if (files.length === 0) return "(empty directory)";
      return files.map(f => f.type === 'dir' ? `\x1b[1;34m${f.name}/\x1b[0m` : f.name).join('  ');

    case 'pwd':
      return currentPath;

    case 'whoami':
      if (ctfId === 'ctf-beg-9') return "root"; 
      return 'root';

    case 'cat':
      if (!args[0]) return "cat: missing filename";
      if (ctfId === 'ctf-beg-7' && args[0] === '.hidden_file') return "FLAG: CIPHER-CTF{ls_-la}";
      const fileToRead = (fileSystem[currentPath] || []).find(f => f.name === args[0]);
      if (!fileToRead) return `cat: ${args[0]}: No such file or directory`;
      if (fileToRead.type === 'dir') return `cat: ${args[0]}: Is a directory`;
      return fileToRead.content;

    case 'mkdir':
      if (!args[0]) return "mkdir: missing operand";
      if (!fileSystem[currentPath]) fileSystem[currentPath] = [];
      if (fileSystem[currentPath].find(f => f.name === args[0])) return `mkdir: cannot create directory '${args[0]}': File exists`;
      fileSystem[currentPath].push({ name: args[0], content: '', type: 'dir' });
      fileSystem[`${currentPath}/${args[0]}`] = [];
      return "";

    case 'rm':
      if (!args[0]) return "rm: missing operand";
      const idx = (fileSystem[currentPath] || []).findIndex(f => f.name === args[0]);
      if (idx === -1) return `rm: cannot remove '${args[0]}': No such file or directory`;
      fileSystem[currentPath].splice(idx, 1);
      return "";

    case 'cd':
        if (!args[0]) {
            currentPath = '/home/root';
            return "";
        }
        if (args[0] === '..') {
            const parts = currentPath.split('/');
            parts.pop();
            currentPath = parts.join('/') || '/';
            return "";
        }
        const targetDir = (fileSystem[currentPath] || []).find(f => f.name === args[0] && f.type === 'dir');
        if (targetDir) {
            currentPath = `${currentPath}/${args[0]}`.replace('//', '/');
            return "";
        }
        return `bash: cd: ${args[0]}: No such file or directory`;

    case 'pip':
        if (args[0] === 'install') {
            return `Collecting ${args[1] || 'package'}...\nDownloading ${args[1] || 'package'} (100%)\nInstalling collected packages: ${args[1] || 'package'}\nSuccessfully installed ${args[1] || 'package'}-1.0.0`;
        }
        return "Usage: pip install [package_name]";

    case 'sudo':
        return "Usage: sudo [command]. But here, you are already simulated root.";

    case 'ping':
        if (ctfId === 'ctf-beg-14') return "PING google.com (142.250.181.238): 56 data bytes\n64 bytes from 142.250.181.238: icmp_seq=0 ttl=115 time=12.5 ms\n--- google.com ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss\n\nFLAG: CIPHER-CTF{ping}";
        return "PING 127.0.0.1 (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.034 ms";

    // 2. PYTHON EXECUTION
    case 'python':
    case 'python3':
      if (!editorCode.trim()) return "Error: Code Editor is empty. Write some python code first.";
      
      // Try to use Worker Engine first
      if (worker) {
          try {
             return await executeRealPython(editorCode);
          } catch (e: any) {
             // Fallback if worker fails or is initializing
             if (workerStatus !== 'ready') return "System is booting up core modules... Try again in 5 seconds.";
             return `Runtime Error: ${e.message}`;
          }
      }
      
      // Fallback to Gemini if Worker is dead (rare)
      if (process.env.API_KEY) {
         return await simulateCodeExecution(editorCode, 'python');
      } else {
         return "Python Engine initializing... Check console for errors.";
      }

    default:
      try {
          if (/^[\d\s+\-*/%.()]+$/.test(cmdStr)) {
              return String(eval(cmdStr));
          }
      } catch (e) {}
      
      return `bash: ${cmd}: command not found`;
  }
};

export const executePythonLocally = async (code: string) => { return executeCommand('python3', code); };
export const executeShellCommand = async (cmd: string) => { return executeCommand(cmd, ""); };
export const getEngineStatus = () => workerStatus;
