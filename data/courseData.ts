
import { Lesson, SyllabusItem, Language, QuizQuestion } from "../types";

// =====================================================================
//  MASTER COURSE DATABASE (RE-ENGINEERED FOR DEPTH)
//  Content Strategy: Deep Theory -> Practical Code -> Hacker Context
// =====================================================================

// --- HELPERS ---
const createPlaceholder = (id: string, cat: string, title: string, level: any, desc: string = "Advanced topic."): Lesson => ({
    id, category: cat, title, level, description: desc,
    content: `# ${title}\n\n## 🚧 Advanced Module Locked\n\nይህ ክፍል የሚከፈተው የቀድሞዎቹን ትምህርቶች በብቃት ሲያጠናቅቁ ነው። የ Cipher Academy ስርዓት የእርስዎን ብቃት እየተከታተለ ነው።\n\n### Upcoming Content:\n* Advanced Red Teaming\n* Custom Exploit Development\n* Binary Reverse Engineering\n* Zero-Day Research`,
    starterCode: "# Access Denied\nprint('System: Complete previous modules first.')",
    quiz: []
});

// =====================================================================
// 1. BEGINNER TRACK (ZERO TO HERO) - DEEP DIVE EDITION
// =====================================================================
const PYTHON_BEGINNER_LESSONS: Lesson[] = [
  // --- MODULE 1: THE FOUNDATION (The Philosophy) ---
  {
    id: "b-01",
    category: "01. The Foundation",
    title: "1.1 The Hacker's Mindset & Ethics",
    description: "Hacking is not about tools. It's a philosophy.",
    level: "Beginner",
    content: `# The Hacker's Mindset (የሃከር አስተሳሰብ)

Hacking ማለት የኮምፒውተር ስክሪን ላይ አረንጓዴ ጽሁፍ እያዘነቡ "Access Granted" የሚል ድምጽ መስማት አይደለም። Hacking ማለት **"የማወቅ ጉጉት" (Curiosity)**፣ **"ፅናት" (Persistence)** እና **"ከሳጥን ውጪ ማሰብ" (Out of the box thinking)** ነው።

አንድ ፕሮግራም "A" ከተባለ "B"ን ይሰራል ተብሎ ከተሰራ፣ ሃከር "C" ብዬ ብጠይቀውስ? ብሎ ያስባል።

## 1. The 5 Phases of Hacking (የሃኪንግ 5 ደረጃዎች)
ማንኛውም ፕሮፌሽናል ሃከር (Penetration Tester) የሚከተለውን ቅደም ተከተል ይከተላል፡

1.  **Reconnaissance (መረጃ ማሰባሰብ):** ስለ ኢላማው (Target) ምንም ሳይነኩ መረጃ መሰብሰብ። (IP Address, Email, Tech Stack).
2.  **Scanning (መፈተሽ):** ኢላማው ላይ ክፍት በሮች (Ports) እና ድክመቶች (Vulnerabilities) መፈለግ። (Nmap, Nessus).
3.  **Gaining Access (ሰርጎ መግባት):** በተገኘው ድክመት ተጠቅሞ ወደ ሲስተሙ መግባት። (Metasploit, Python Scripts).
4.  **Maintaining Access (ቦታን ማመቻቸት):** ሲስተሙ ቢዘጋም ወይም ፓስዎርድ ቢቀየርም ተመልሶ መግቢያ መንገድ (Backdoor) ማበጀት።
5.  **Clearing Tracks (ዱካን ማጥፋት):** እንደገባህ የሚያሳዩ መረጃዎችን (Logs) ማጥፋት።

---

## 2. The CIA Triad (የደህንነት መሰረት)
በ Ethical Hacking አለም ውስጥ፣ ማንኛውም የደህንነት ስራ እና ጥቃት በዚህ ሶስት ማዘን ላይ ይሽከረከራል፡

*   **Confidentiality (ሚስጥራዊነት):** መረጃን ስልጣን ላለው ሰው ብቻ መፍቀድ። ይህ ሲሰበር **Data Leak** ይፈጠራል። (Example: የ Credit Card መረጃ መሰረቅ).
*   **Integrity (ትክክለኛነት):** መረጃው በጉዞ ላይ ወይም ሲቀመጥ እንደማይቀየር፣ እንደማይሰረዝ እና እንደማይበላሽ ማረጋገጥ። (Example: አንድ ሃከር የባንክ ሂሳብን ከ $10 ወደ $1,000,000 ቢቀይር Integrity ተሰበረ).
*   **Availability (ተደራሽነት):** መረጃው ወይም ሲስተሙ በሚፈለግበት ጊዜ መገኘቱን ማረጋገጥ። (Example: DoS Attack ሰርቨሩን ሲያጨናንቀው Availability ይጣሳል).

---

## 3. ህግ እና ስነ-ምግባር (Ethics)
"Ethical Hacker" የሚለውን ስም የያዝነው ለወግ አይደለም። ያለ ፍቃድ የሰውን ሲስተም መንካት **ወንጀል** ነው።

*   **White Hat:** ፍቃድ ጠይቆ፣ ደህንነትን ለመጠበቅ የሚሰራ። (እኛ ነን)።
*   **Black Hat:** ለግል ጥቅም፣ ለመጉዳት ወይም ለመስረቅ የሚሰራ ወንጀለኛ።
*   **Grey Hat:** ያለ ፍቃድ የሚሰርግ ግን ለመጉዳት የማያስብ (ይህም ቢሆን ህገ-ወጥ ነው)።

> **Rule #1:** የራስህ ካልሆነ ወይም የጽሁፍ ፍቃድ ከሌለህ **በፍፁም** አትንካ።

\`\`\`python
# የ Ethical Hacker መሃላ
hacker_type = "White Hat"
permission = True

if hacker_type == "White Hat" and permission:
    print("Authorized to Hack. Proceed with caution.")
else:
    print("STOP! This is illegal.")
\`\`\`
`,
    starterCode: "print('I pledge to hack ethically.')",
    quiz: [
        { id: "q1", question: "ሃኪንግን ከወንጀል የሚለየው ዋናው ነገር ምንድነው?", options: [{id: "a", text: "የምንጠቀመው ኮምፒውተር"}, {id: "b", text: "የባለቤቱ ፍቃድ (Permission)"}, {id: "c", text: "የምንጽፈው ኮድ ፍጥነት"}], correctOptionId: "b", explanation: "ያለ ባለቤቱ ፍቃድ የሚደረግ ማንኛውም ሙከራ ወንጀል ነው።" },
        { id: "q2", question: "አንድ ሃከር የባንክ ሂሳብ ቁጥሮችን ቀይሮ ቢገኝ፣ የትኛውን የ CIA Triad ክፍል ጣሰ?", options: [{id: "a", text: "Confidentiality"}, {id: "b", text: "Integrity"}, {id: "c", text: "Availability"}], correctOptionId: "b", explanation: "Integrity ማለት የመረጃን ትክክለኛነት መጠበቅ ነው። መረጃው ከተቀየረ Integrity ተጥሷል።" },
        { id: "q3", question: "ከመግባት (Gaining Access) በፊት የሚቀድመው ደረጃ የቱ ነው?", options: [{id: "a", text: "Clearing Tracks"}, {id: "b", text: "Scanning"}, {id: "c", text: "Maintaining Access"}], correctOptionId: "b", explanation: "መጀመሪያ መረጃ ይሰበሰባል (Recon)፣ ቀጥሎ ይፈተሻል (Scanning)፣ ከዚያ ይገባል (Access)።" }
    ]
  },
  {
    id: "b-02",
    category: "01. The Foundation",
    title: "1.2 The Lab: Kali Linux & Terminal",
    description: "Why hackers use Linux and how to survive in the terminal.",
    level: "Beginner",
    content: `# The Hacker's OS: Kali Linux

ለምንድነው ሃከሮች ፊልም ላይ ሁሌም ጥቁር ስክሪን ላይ የሚጽፉት? ለምንድነው Windows የማይጠቀሙት?

### 1. ሙሉ ቁጥጥር (Full Control)
Windows እና macOS ተጠቃሚውን "ለመጠበቅ" ሲሉ ብዙ ነገሮችን ይደብቃሉ። Linux ግን የኮምፒውተሩን እያንዳንዱን ክፍል (Kernel, Network Stack, Memory) እንድታዝ ይፈቅድልሃል። ሃኪንግ ደግሞ ኮምፒውተሩን እሱ ከማያውቀው መንገድ ውጪ ማዘዝ ነው።

### 2. Kali Linux ምንድነው?
Kali Linux ለ **Penetration Testing** ተብሎ የተሰራ የ Linux ስሪት (Distro) ነው።
*   ከ 600 በላይ የሃኪንግ መሳሪያዎች (Tools) ተጭነው ይመጣሉ።
*   ለኔትወርክ ጥቃት የተመቻቸ Driver አለው።
*   Open Source (ነጻ) ነው።

---

## The Terminal (ትዕዛዝ መስጫ)
Terminal ማለት ከኮምፒውተሩ ጋር በቀጥታ የምናወራበት ቋንቋ ነው። Mouse መጠቀም ለተራ ተጠቃሚ ነው፤ ሃከር ኪቦርድ ብቻ ነው የሚጠቀመው።

### መሰረታዊ ትዕዛዞች (Basic Commands):

1.  **\`pwd\` (Print Working Directory):** አሁን የት ፎልደር ውስጥ እንዳለሁ ንገረኝ።
    *   *Example Output:* \`/home/kali\`
2.  **\`ls\` (List):** በዚህ ፎልደር ውስጥ ያሉ ፋይሎችን ዘርዝር።
    *   \`ls -a\`: የተደበቁ ፋይሎችንም አሳይ (.hidden)።
3.  **\`cd\` (Change Directory):** ወደ ሌላ ፎልደር ግባ።
    *   \`cd Desktop\`: ወደ ዴስክቶፕ ግባ።
    *   \`cd ..\`: አንድ ደረጃ ወደ ኋላ ተመለስ።
4.  **\`cat\` (Concatenate):** የፋይልን ይዘት አንብብ።
    *   \`cat password.txt\`
5.  **\`sudo\` (SuperUser Do):** እንደ አስተዳዳሪ (Admin/Root) እዘዝ።
    *   በሊኑክስ ውስጥ ለደህንነት ሲባል ማንኛውንም ከባድ ትዕዛዝ ስንሰጥ \`sudo\` ማስቀደም አለብን።

### Python በ Kali ላይ
Kali ላይ Python በነባሪ (Default) ተጭኖ ይመጣል። እኛ የምንጽፈው ስክሪፕት በሙሉ የሚሮጠው በዚህ ላይ ነው።

\`\`\`python
import os

# Python ተጠቅመን የሊኑክስ ትዕዛዝ ማዘዝ እንችላለን
print("Current Directory is:")
os.system("pwd")

print("\\nListing files:")
os.system("ls -la")
\`\`\`
`,
    starterCode: "import os\n# በ Python ውስጥ የ Linux ትዕዛዝ እስኪ ላክ\nos.system('whoami')",
    quiz: [
        { id: "q1", question: "የተደበቁ ፋይሎችን (Hidden Files) ለማየት የሚጠቅመው ትዕዛዝ?", options: [{id: "a", text: "ls"}, {id: "b", text: "ls -a"}, {id: "c", text: "show all"}], correctOptionId: "b", explanation: "Linux ላይ በ (.) የሚጀምሩ ፋይሎች የተደበቁ ናቸው። እነሱን ለማየት -a (all) flag ያስፈልጋል።" },
        { id: "q2", question: "አንድ ደረጃ ወደ ኋላ ለመመለስ (Back) የምንጠቀመው?", options: [{id: "a", text: "cd back"}, {id: "b", text: "cd .."}, {id: "c", text: "back"}], correctOptionId: "b", explanation: "cd .. (ሁለት ነጥብ) ወደ እናት ፎልደር ይመልሳል።" },
        { id: "q3", question: "ሱፐር ዩዘር (Administrator) ሆኖ ለማዘዝ?", options: [{id: "a", text: "admin"}, {id: "b", text: "root"}, {id: "c", text: "sudo"}], correctOptionId: "c", explanation: "Sudo (Super User Do) ማለት እንደ አለቃ ሆነህ ፈጽም ማለት ነው።" }
    ]
  },

  // --- MODULE 2: PYTHON CORE FOR HACKERS (The Weaponization) ---
  {
    id: "b-03",
    category: "02. Python Core",
    title: "2.1 Variables & Memory",
    description: "Not just storing data. Understanding payloads.",
    level: "Beginner",
    content: `# Variables in a Hacker's Context

በተራ ፕሮግራሚንግ \`x = 10\` ይባላል። በ Hacking ግን Variable ማለት **Payload Container** ነው። የምንልከውን ቫይረስ፣ የምንሰርቀውን ፓስዎርድ፣ ወይም የምናጠቃውን IP የምናስቀምጥበት ሳጥን ነው።

### 1. Data Types Matter
Python "Dynamically Typed" ነው፣ ማለትም የዳታውን አይነት (Type) መናገር አይጠበቅብንም። ግን ለሃኪንግ ግዴታ ማወቅ አለብን።

*   **String (str):** ጽሁፍ። ለ Payloads, URLs, Passwords.
    *   \`target = "192.168.1.5"\`
*   **Integer (int):** ቁጥር። ለ Ports, Threads, Buffer size.
    *   \`port = 80\`
*   **Boolean (bool):** ሁኔታ። Exploit ተሳክቷል?
    *   \`is_root = False\`
*   **Bytes (bytes):** ጥሬ ዳታ (Raw Data)። ለ Network Packets እና Encryption.
    *   *ይህ በጣም ወሳኝ ነው።* ኔትወርክ ላይ የሚሄደው String ሳይሆን Bytes ነው።
    *   \`payload = b"\\xde\\xad\\xbe\\xef"\` (ይህ Shellcode ሊሆን ይችላል)

### 2. f-Strings (The Weapon of Choice)
String መቀላቀል (Concatenation) ለሃከሮች ወሳኝ ነው። \`f-string\` በብዛት እንጠቀማለን።

\`\`\`python
target_ip = "10.10.10.5"
port = 4444
payload = "A" * 100  # 100 'A's (Buffer Overflow test)

# ቀጥታ ትዕዛዝ መፍጠር
command = f"nc -nv {target_ip} {port}"
print(f"[*] Attacking {target_ip} on port {port}")
print(f"[*] Sending payload length: {len(payload)}")
\`\`\`

### 3. Type Conversion (Casting)
አንዳንድ ጊዜ ቁጥርን ወደ ጽሁፍ፣ ጽሁፍን ወደ ቁጥር መቀየር ግዴታ ነው።
\`\`\`python
port = 80
# print("Port is " + port) <--- ይህ Error ያመጣል!

# ትክክለኛው መንገድ
print("Port is " + str(port))
\`\`\`
`,
    starterCode: "ip = '127.0.0.1'\nport = 80\n# Create a string that says 'Connecting to 127.0.0.1:80'\nprint(f'Connecting to {ip}:{port}')",
    quiz: [
        { id: "q1", question: "ኔትወርክ ላይ መረጃ ለመላክ ምርጡ Data Type የቱ ነው?", options: [{id: "a", text: "String"}, {id: "b", text: "Bytes"}, {id: "c", text: "Integer"}], correctOptionId: "b", explanation: "ኮምፒውተሮች የሚያወሩት በ Bytes ነው። String ለሰው እንዲመች የተሰራ ነው። ለው ሲልከው .encode() ማድረግ አለብህ።" },
        { id: "q2", question: "`payload = 'A' * 500` ምን ይሰራል?", options: [{id: "a", text: "Error ያመጣል"}, {id: "b", text: "500 'A' ፊደሎችን የያዘ String ይፈጥራል"}, {id: "c", text: "500 ጊዜ Aን print ያደርጋል"}], correctOptionId: "b", explanation: "Python ላይ ማባዛት (Multiply) ስትሪንግን ለመደጋግም ይጠቅማል። ይህ ለ Buffer Overflow ጥቃት ወሳኝ ነው።" }
    ]
  },
  {
    id: "b-04",
    category: "02. Python Core",
    title: "2.2 Inputs & interactive Tools",
    description: "Building interactive hacking tools.",
    level: "Beginner",
    content: `# Making Tools Interactive

ዝም ብሎ የሚሮጥ ስክሪፕት ሳይሆን፣ ተጠቃሚውን እየጠየቀ የሚሰራ "Tool" መስራት አለብን። ለዚህ \`input()\` እንጠቀማለን።

> **Hacker's Note:** ከ User የሚመጣ ማንኛውም መረጃ **አደገኛ** ነው (Untrusted Input)። ሁሌም ማጣራት (Validate) አለብን።

### 1. Basic Input
\`\`\`python
target = input("Enter Target IP: ")
print(f"Scanning {target}...")
\`\`\`

### 2. Handling Numbers
\`input()\` ሁሌም የሚመልሰው **String** ነው። ስለዚህ ወደ ቁጥር መቀየር አለብን።

\`\`\`python
# ፖርት ቁጥር ነው፣ ስለዚህ ወደ int መቀየር አለበት
port_str = input("Enter Port (e.g. 80): ")
port = int(port_str)

if port < 1 or port > 65535:
    print("Invalid Port Number!")
else:
    print(f"Port {port} set.")
\`\`\`

### 3. Command Line Arguments (sys.argv)
ፕሮፌሽናል Tools (እንደ Nmap) ጥያቄ አይጠይቁም። መረጃውን ከትዕዛዙ ጋር ነው የምንሰጠው።
Example: \`python3 exploit.py 192.168.1.1\`

\`\`\`python
import sys

# sys.argv[0] የፋይሉ ስም ነው።
# sys.argv[1] የመጀመሪያው መረጃ ነው።

if len(sys.argv) < 2:
    print("Usage: python3 exploit.py <IP_ADDRESS>")
else:
    target = sys.argv[1]
    print(f"Target locked: {target}")
\`\`\`
`,
    starterCode: "import sys\n# Try printing sys.argv to see inputs\nprint(sys.argv)",
    quiz: [
        {id:"q1", question:"`input()` function ሁሌም ምን አይነት Data ይመልሳል?", options:[{id:"a",text:"Integer"},{id:"b",text:"String"},{id:"c",text:"Boolean"}], correctOptionId:"b", explanation:"ምንም እንኳን ቁጥር ብታስገባ፣ input() እንደ ጽሁፍ (String) ነው የሚቀበለው።"},
        {id:"q2", question:"ከ Command Line ላይ መረጃ ለመቀበል የሚጠቅመው Library?", options:[{id:"a",text:"os"},{id:"b",text:"requests"},{id:"c",text:"sys"}], correctOptionId:"c", explanation:"sys.argv (Argument Vector) ኮማንድ ላይ የተጻፉትን ይቀበላል።"}
    ]
  },
  {
    id: "b-05",
    category: "02. Python Core",
    title: "2.3 Boolean Logic & Decision Making",
    description: "Programming the brain of your exploit.",
    level: "Beginner",
    content: `# Logic: The Brain of the Exploit

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
version = 2.3
is_open = True

# VSFTPD v2.3.4 Backdoor ታሪክ ላይ ያለ በጣም ታዋቂ ክፍተት ነው።

if service == "FTP":
    if is_open:
        if version == 2.34:
            print("[!!!] VULNERABLE: VSFTPD v2.3.4 Backdoor Found!")
            print("[*] Launching exploit...")
        elif version < 2.34:
            print("[*] Old version, might be vulnerable.")
        else:
            print("[-] Version seems patched.")
    else:
        print("[-] Service is closed.")
else:
    print("[-] Not an FTP service.")
\`\`\`

> **Pro Tip:** \`if\` statement ሲደራረብ (Nested) ኮዱን ለማንበብ ይከብዳል። \`and\` በመጠቀም ማሳጠር ይቻላል።

\`\`\`python
if service == "FTP" and is_open and version == 2.34:
    print("[!!!] VULNERABLE!")
\`\`\`
`,
    starterCode: "username = 'admin'\npassword = 'password123'\n\nif username == 'admin' and password == 'secret':\n    print('Access Granted')\nelse:\n    print('Access Denied')",
    quiz: [
        {id:"q1", question:"`if x == 5 and y == 10:` ይህ እውነት የሚሆነው መቼ ነው?", options:[{id:"a",text:"x=5 ሲሆን ብቻ"},{id:"b",text:"y=10 ሲሆን ብቻ"},{id:"c",text:"x=5 እና y=10 ሲሆኑ ብቻ"}], correctOptionId:"c", explanation:"AND ማለት ሁለቱም ግዴታ መሟላት አለባቸው ማለት ነው።"},
        {id:"q2", question:"ተቃራኒውን (Inverse) ለመግለጽ የምንጠቀመው?", options:[{id:"a",text:"not"},{id:"b",text:"invert"},{id:"c",text:"reverse"}], correctOptionId:"a", explanation:"`if not connected:` ማለት ካልተገናኘ ማለት ነው።"}
    ]
  },
  {
    id: "b-06",
    category: "02. Python Core",
    title: "2.4 Loops: Brute Force Automation",
    description: "Doing things 1,000,000 times without getting tired.",
    level: "Beginner",
    content: `# Loops: The Engine of Hacking Tools

ሃከር ማለት ሰነፍ ሰው ነው ብለናል። አንድን ፓስዎርድ ለመገመት 1000 ጊዜ በእጅ አይሞክርም። ስክሪፕት ጽፎ **Loop** ያደርጋል።

### 1. For Loop (Iterating over lists)
የታወቀ ብዛት ያላቸውን ነገሮች ለመስራት። ለምሳሌ IP List ወይም Wordlist።

\`\`\`python
# Port Scanning Logic
common_ports = [21, 22, 80, 443, 3306, 8080]

print("[*] Starting Quick Scan...")

for port in common_ports:
    # እዚህ ጋር የመገናኘት ኮድ ይኖራል
    print(f"Checking Port: {port}...")

print("[*] Scan Complete.")
\`\`\`

### 2. The \`range()\` Function
ቁጥሮችን ለመፍጠር። ለምሳሌ ከ Port 1 እስከ 1024 መፈተሽ ብንፈልግ።

\`\`\`python
# 1 እስከ 100
for i in range(1, 101):
    pass # Do something
\`\`\`

### 3. While Loop (Until condition met)
ይህ አደገኛ ሊሆን ይችላል። ሁኔታው እስኪቀየር ድረስ አይቆምም።
*   **Brute Force:** ፓስዎርዱ እስኪገኝ ድረስ ሞክር።
*   **Reverse Shell Listener:** ኮኔክሽን እስኪመጣ ጠብቅ።

\`\`\`python
import time

password_found = False
attempt = 0

while not password_found:
    attempt += 1
    print(f"Attempt {attempt}: Cracking...")
    
    # Simulation: 5ኛው ሙከራ ላይ ተገኘ እንበል
    if attempt == 5:
        print("[+] Password Found: 'admin123'")
        password_found = True # Loop stops here
        
    time.sleep(0.5) # ትንሽ እረፍት (To avoid crash)
\`\`\`

### 4. \`break\` and \`continue\`
*   **\`break\`**: ሉፑን አቋርጠህ ውጣ። (ፓስዎርዱ ከተገኘ በኋላ መቀጠል ትርጉም የለውም)።
*   **\`continue\`**: ይህንን ዝለልና ቀጣዩን ስራ። (አንድ ፖርት Error ካመጣ፣ ሙሉ ስካኑን አታቁም፣ ቀጣዩን ፖርት ሞክር)።
`,
    starterCode: "passwords = ['123456', 'password', 'admin', 'root']\n\nfor p in passwords:\n    if p == 'admin':\n        print('Found!')\n        break\n    print(f'Trying {p}...')",
    quiz: [
        {id: "q1", question: "ፓስዎርዱን ልክ እንዳገኘን ፍለጋውን ለማቆም ምን እንጠቀማለን?", options: [{id:"a", text:"stop"}, {id:"b", text:"exit"}, {id:"c", text:"break"}], correctOptionId: "c", explanation: "Break ወዲያውኑ ከ Loop ውስጥ ያስወጣል።"},
        {id: "q2", question: "የIP ዝርዝር (List) ላይ አንድ በአንድ ለመስራት የቱ Loop ይመረጣል?", options: [{id:"a", text:"For Loop"}, {id:"b", text:"While Loop"}], correctOptionId: "a", explanation: "For Loop የተወሰነ ብዛት ላለው ዝርዝር ተመራጭ ነው።"}
    ]
  },
  {
    id: "b-07",
    category: "02. Python Core",
    title: "2.5 Functions: Modular Exploits",
    description: "Writing clean, reusable attack modules.",
    level: "Beginner",
    content: `# Functions: Organize Your Code

ኮድ እየረዘመ ሲሄድ ውስብስብ ይሆናል። Functions ኮድን በትንንሽ "ሞጁል" ለመክፈል ይጠቅማሉ። ለምሳሌ Nmap የተለያዩ ሞጁሎች አሉት (Scan, NSE, OS Detect)።

### 1. Defining a Function
\`def\` የሚለውን ቃል እንጠቀማለን።

\`\`\`python
def check_port(ip, port):
    # እዚህ ጋር Socket connection ይኖራል
    print(f"[*] Checking {ip}:{port}...")
    # Simulation
    if port == 80:
        return True
    return False

# Function Calling
status = check_port("192.168.1.5", 80)

if status:
    print("[+] OPEN")
else:
    print("[-] CLOSED")
\`\`\`

### 2. Why use Functions?
1.  **Reusability:** አንድን ኮድ 10 ጊዜ ከመጻፍ አንዴ ጽፎ 10 ጊዜ መጥራት።
2.  **Clean Code:** ዋናው ኮድ (Main Loop) ንፁህ ይሆናል።
3.  **Debugging:** ስህተት ሲፈጠር የትኛው ክፍል እንደተበላሸ ማወቅ ቀላል ነው።

### 3. Practical Example: Hash Cracker Helper
አንድ ትልቅ Cracking Tool እየሰራን ቢሆን፣ Hash የሚሰራውን ክፍል ለብቻው ማድረግ አለብን።

\`\`\`python
import hashlib

def get_md5(text):
    return hashlib.md5(text.encode()).hexdigest()

wordlist = ["admin", "password", "123456"]
target_hash = "5f4dcc3b5aa765d61d8327deb882cf99" # 'password'

for word in wordlist:
    if get_md5(word) == target_hash:
        print(f"[+] CRACKED: {word}")
        break
\`\`\`
`,
    starterCode: "def attack(target):\n    return f'Attacking {target}'\n\nprint(attack('10.0.0.1'))",
    quiz: [
        {id:"q1", question:"Function አንድን ውጤት መልሶ ለጠሪው እንዲልክ የምንጠቀመው ቃል?", options:[{id:"a",text:"send"},{id:"b",text:"return"},{id:"c",text:"back"}], correctOptionId:"b", explanation:"return value ኮዱን የጠራው አካል ጋር ይላካል።"},
        {id:"q2", question:"Function ለምን ይጠቅማል?", options:[{id:"a",text:"ኮዱን ለማፍጠን"},{id:"b",text:"ኮዱን ለመድገም እና ለማፅዳት"},{id:"c",text:"Memory ለመቆጠብ"}], correctOptionId:"b", explanation:"Don't Repeat Yourself (DRY) የሚለውን ህግ ለመጠበቅ።"}
    ]
  },
  {
    id: "b-08",
    category: "02. Python Core",
    title: "2.6 Lists & Dictionaries: Handling Data",
    description: "Managing credentials, targets, and logs.",
    level: "Beginner",
    content: `# Data Structures: The Hacker's Database

ስክሪፕቶቻችን ብዙ መረጃ መያዝ አለባቸው። የተሰረቁ ፓስዎርዶች፣ የተገኙ IPዎች፣ ወዘተ።

### 1. Lists (Arrays)
ተመሳሳይ አይነት መረጃዎችን ቅደም ተከተል ይዞ ለማስቀመጥ።
\`\`\`python
# Target List
ips = ["10.0.0.1", "10.0.0.2", "10.0.0.3"]

print(ips[0]) # የመጀመሪያው
ips.append("10.0.0.4") # መጨመር
ips.remove("10.0.0.2") # ማስወገድ

if "10.0.0.1" in ips:
    print("Target 1 is enlisted.")
\`\`\`

### 2. Dictionaries (Key-Value Pairs)
ይህ በጣም ወሳኝ ነው። ስለ አንድ ነገር ዝርዝር መረጃ ለመያዝ። JSON ይመስላል።

\`\`\`python
# Storing Loot (Stolen Creds)
creds = {
    "url": "http://bank.com",
    "username": "admin",
    "password": "SuperSecretPassword",
    "is_admin": True
}

print(f"Cracking {creds['url']}...")
print(f"Found User: {creds['username']}")
\`\`\`

### 3. List of Dictionaries
ብዙ የተሰረቁ አካውንቶችን ለመያዝ።

\`\`\`python
database = [
    {"user": "alice", "pass": "123"},
    {"user": "bob", "pass": "qwerty"}
]

for account in database:
    print(f"Testing {account['user']}...")
\`\`\`
`,
    starterCode: "loot = {'id': 1, 'flag': 'CTF{Found}'}\nprint(loot['flag'])",
    quiz: [
        {id:"q1", question:"አንድን መረጃ በ ቁልፍ (Key) ለማግኘት የሚጠቅመው?", options:[{id:"a",text:"List"},{id:"b",text:"Dictionary"},{id:"c",text:"Tuple"}], correctOptionId:"b", explanation:"Dictionary (Hash Map) Key-Value pair ይጠቀማል።"},
        {id:"q2", question:"List ውስጥ አዲስ ነገር ለመጨመር?", options:[{id:"a",text:".add()"},{id:"b",text:".push()"},{id:"c",text:".append()"}], correctOptionId:"c", explanation:"Python ላይ .append() መጨረሻ ላይ ይጨምራል።"}
    ]
  },
  {
    id: "b-09",
    category: "02. Python Core",
    title: "2.7 Error Handling: Bulletproof Code",
    description: "Preventing crashes during long attacks.",
    level: "Beginner",
    content: `# Exception Handling

Hacking tools ለረጅም ሰዓት ነው የሚሰሩት። ለምሳሌ 10,000 IPዎች እየፈተሸን፣ 50ኛው ላይ "Connection Timeout" ቢፈጠር ስክሪፕቱ መቆም የለበትም። ስህተቱን ዘሎ መቀጠል አለበት።

### 1. The \`try-except\` Block
\`\`\`python
import socket

target = "10.0.0.5"
port = 80

try:
    # አደገኛ ሊሆን የሚችል ኮድ
    print(f"Connecting to {target}...")
    s = socket.socket()
    s.settimeout(2)
    s.connect((target, port))
    print("[+] Connection Successful!")
    s.close()

except ConnectionRefusedError:
    # ይህ ችግር ከተፈጠረ ይህን አድርግ
    print("[-] Connection Refused. Port closed.")

except socket.timeout:
    print("[-] Connection Timed out. Host might be down.")

except Exception as e:
    # ሌላ ያልታሰበ ችግር
    print(f"[-] Unknown Error: {e}")

finally:
    # ችግር ተፈጠረም አልተፈጠረም ይህ ይሮጣል
    print("[*] Scan attempt finished.")
\`\`\`

> **Hacker's Note:** ስክሪፕትህ ክራሽ ባደረገ ቁጥር፣ የጀመርከውን ጥቃት ታቋርጣለህ። በደንብ የተጻፈ Error Handling ያለው Tool "Bulletproof" ይባላል።
`,
    starterCode: "try:\n    x = 1 / 0\nexcept:\n    print('You cannot divide by zero!')",
    quiz: [
        {id:"q1", question:"በ try block ውስጥ ስህተት ከተፈጠረ ኮዱ ይቆማል?", options:[{id:"a",text:"አዎ ይቆማል"},{id:"b",text:"አይ፣ ወደ except ይዘላል"},{id:"c",text:"ኮምፒውተሩ ይዘጋል"}], correctOptionId:"b", explanation:"ፕሮግራሙ አይቆምም (Crash አያደርግም)፣ ወደ except block ሄዶ የተባለውን ያደርጋል።"},
        {id:"q2", question:"ስህተት ተፈጠረም አልተፈጠረም መጨረሻ ላይ የሚሰራው ክፍል?", options:[{id:"a",text:"finally"},{id:"b",text:"else"},{id:"c",text:"done"}], correctOptionId:"a", explanation:"Finally block ሁሌም ይሰራል። (Cleanup ለመስራት ይጠቅማል)"}
    ]
  },

  // --- MODULE 3: NETWORKING (The Highway) ---
  {
    id: "b-10",
    category: "03. Network Hacking",
    title: "3.1 Socket Programming: The Basics",
    description: "Building your own network tools from scratch.",
    level: "Beginner",
    content: `# Sockets: The Digital Handshake

ማንኛውም የኔትወርክ ግንኙነት (Web, SSH, FTP, Games) መሰረቱ **Socket** ነው። እንደ ሃከር፣ የሌሎችን Tool (Nmap, Netcat) ከመጠቀም በተጨማሪ የራሳችንን ግንኙነት በ Python መፍጠር አለብን።

### 1. Anatomy of a Socket
Socket ለመፍጠር ሁለት ዋና ነገሮች ያስፈልጋሉ፡
1.  **IP Address:** የት ነው የምደውለው?
2.  **Port Number:** ማንን ነው የምፈልገው? (80 ለ Web, 22 ለ SSH)

### 2. Creating a Client (Connecting)
ይህ ቀላል ስክሪፕት ከ Google ጋር ይገናኛል።

\`\`\`python
import socket

target_host = "google.com"
target_port = 80

# 1. Socket Object መፍጠር
# AF_INET = IPv4
# SOCK_STREAM = TCP ( አስተማማኝ ግንኙነት)
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # 2. መገናኘት (Connect)
    print(f"[*] Connecting to {target_host}...")
    client.connect((target_host, target_port))
    
    # 3. መረጃ መላክ (Send Data)
    # HTTP Request (GET /)
    request = b"GET / HTTP/1.1\\r\\nHost: google.com\\r\\n\\r\\n"
    client.send(request)
    
    # 4. መረጃ መቀበል (Receive Response)
    response = client.recv(4096) # 4KB buffer
    print("[*] Response Received:")
    print(response.decode())
    
finally:
    client.close()
\`\`\`

### 3. TCP vs UDP
*   **TCP (Transmission Control Protocol):** "ደርሷል? እሺ ደርሷል።" (Handshake አለው፣ አስተማማኝ ነው)። ለ HTTP, SSH, FTP።
*   **UDP (User Datagram Protocol):** "እንግዲህ ተቀበል!" (ዝም ብሎ መወርወር፣ ፍጥነት ይፈልጋል ግን አስተማማኝ አይደለም)። ለ DNS, Video Streaming.
`,
    starterCode: "import socket\n\n# Create a socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nprint('Socket created!')",
    quiz: [
        {id:"q1", question:"AF_INET ምንን ይወክላል?", options:[{id:"a",text:"IPv6"},{id:"b",text:"IPv4"},{id:"c",text:"Internet"}], correctOptionId:"b", explanation:"Address Family Internet (IPv4)."},
        {id:"q2", question:"ከ Google ጋር ለመገናኘት የቱ Protocol ይመረጣል?", options:[{id:"a",text:"UDP"},{id:"b",text:"TCP"},{id:"c",text:"ICMP"}], correctOptionId:"b", explanation:"ድህረ-ገጾች (HTTP) አስተማማኝ ግንኙነት ስለሚፈልጉ TCP ይጠቀማሉ።"}
    ]
  },
  {
    id: "b-11",
    category: "03. Network Hacking",
    title: "3.2 Building a Port Scanner",
    description: "Your first real security tool.",
    level: "Beginner",
    content: `# Building a Port Scanner

Nmap መጠቀም ጥሩ ነው፣ ግን የራስህን ስካነር መስራት አሰራሩን እንድትረዳ ያደርግሃል። Port Scanner ማለት "በሩ ተንኳኩቷል፣ መልስ አለ?" ማለት ነው።

### The Logic
1.  Socket ፍጠር።
2.  ከ Target IP እና Port ጋር ለመገናኘት ሞክር ('connect_ex').
3.  መልሱ 0 ከሆነ (Success)፣ ፖርቱ **OPEN** ነው ማለት ነው።
4.  Error ከመጣ **CLOSED** ወይም **FILTERED** ነው።

\`\`\`python
import socket
from datetime import datetime

target = "127.0.0.1" # Localhost for safety
ports_to_scan = [21, 22, 80, 443, 3306]

print("-" * 50)
print(f"Scanning Target: {target}")
print(f"Time started: {datetime.now()}")
print("-" * 50)

for port in ports_to_scan:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Timeout is CRITICAL. ካልተገናኘ ቶሎ እንዲተው (1 second)
        s.settimeout(1)
        
        # connect_ex returns 0 if success, Error Code if fail
        result = s.connect_ex((target, port))
        
        if result == 0:
            print(f"[+] Port {port}: OPEN")
        else:
            print(f"[-] Port {port}: CLOSED")
            
        s.close()
        
    except KeyboardInterrupt:
        print("\n Exiting Scan.")
        break
    except socket.error:
        print("Couldn't connect to server.")
        break
\`\`\`

> **Assignment:** ይህ ስካነር ቀርፋፋ ነው። ወደፊት **Threading** ተጠቅመን እንዴት እንደምናፈጥነው እናያለን።
`,
    starterCode: "import socket\n# Write a loop to scan ports 80 and 443",
    quiz: [
        {id:"q1", question:"`connect_ex` 0 ከመለሰ ምን ማለት ነው?", options:[{id:"a",text:"Error"},{id:"b",text:"Port Closed"},{id:"c",text:"Port Open"}], correctOptionId:"c", explanation:"በ C ደረጃ 0 ማለት Success (No Error) ማለት ነው።"},
        {id:"q2", question:"Scanner ላይ Timeout ባንጠቀም ምን ይፈጠራል?", options:[{id:"a",text:"በጣም ይፈጥናል"},{id:"b",text:"አንድ የተዘጋ ፖርት እስኪመልስ ደቂቃ ሊፈጅ ይችላል"},{id:"c",text:"ትክክል አይሰራም"}], correctOptionId:"b", explanation:"Default Timeout በጣም ረጅም ስለሆነ ስካነሩ ይቀዘቅዛል።"}
    ]
  },
  
  // --- BULK FILLER FOR BEGINNER (Will be expanded later) ---
  createPlaceholder("b-12", "03. Network Hacking", "3.3 Banner Grabbing", "Beginner", "Identifying services."),
  createPlaceholder("b-13", "03. Network Hacking", "3.4 Mac Address Changer", "Beginner", "Anonymity basics."),
  createPlaceholder("b-14", "04. Web Hacking", "4.1 HTTP Basics (Requests)", "Beginner", "Interacting with the web."),
  createPlaceholder("b-15", "04. Web Hacking", "4.2 Subdomain Enumeration", "Beginner", "Finding hidden parts of a site."),
  createPlaceholder("b-16", "04. Web Hacking", "4.3 Brute Forcing Logins", "Beginner", "Cracking passwords via HTTP."),
  createPlaceholder("b-17", "04. Web Hacking", "4.4 Web Crawler (Spider)", "Beginner", "Extracting all links."),
  createPlaceholder("b-18", "05. Cryptography", "5.1 Encoding vs Encryption", "Beginner", "Base64 is not encryption!"),
  createPlaceholder("b-19", "05. Cryptography", "5.2 Hashing (MD5/SHA)", "Beginner", "One-way functions."),
  createPlaceholder("b-20", "05. Cryptography", "5.3 Cracking Hashes", "Beginner", "Dictionary Attack logic."),
  // ... Keep expanding up to 60 using loop for now if needed, but manual entries are better
  ...Array.from({ length: 40 }, (_, i) => 
    createPlaceholder(`b-${21 + i}`, `Advanced Concepts`, `Module ${21 + i}: Deep Dive`, "Beginner", "Content coming in next update.")
  ),
];

// =====================================================================
// 2. ADVANCED TRACK (RED TEAM OPS)
// =====================================================================
const PYTHON_ADVANCED_LESSONS: Lesson[] = [
  // Placeholder for Advanced to save space for Beginner depth
  createPlaceholder("a-01", "01. Advanced Network", "1.1 Scapy: Packet Crafting", "Advanced"),
  createPlaceholder("a-02", "01. Advanced Network", "1.2 ARP Spoofing", "Advanced"),
  // ... Generate remaining
  ...Array.from({ length: 58 }, (_, i) => 
    createPlaceholder(`a-${3 + i}`, `Red Team Ops`, `Operation ${3 + i}`, "Advanced", "Classified Material.")
  ),
];

const CPP_LESSONS: Lesson[] = [
    { id: "cpp-1", category: "Memory", title: "1.1 Pointers", description: "Direct memory access", level: "Advanced", content: "# Pointers\nDirect memory manipulation.", starterCode: "int* p;", quiz: [] }
];

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

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
