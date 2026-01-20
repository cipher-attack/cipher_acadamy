
import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Award, XCircle, Shuffle } from 'lucide-react';
import { updateUserProfile } from '../services/dbService';
import { UserProfile } from '../types';

interface Question {
  id: number;
  q: string;
  options: string[];
  answer: number; // Index of correct option
}

// Expanded Question Pool - Harder and More Comprehensive
const QUESTION_POOL: Question[] = [
  { id: 1, q: "What is the primary difference between Encoding and Encryption?", options: ["Encoding uses a key, Encryption does not", "Encryption uses a key and is intended for confidentiality", "They are the same", "Encoding is for binary data only"], answer: 1 },
  { id: 2, q: "In Python, which module is NOT secure for generating passwords/tokens?", options: ["secrets", "random", "os.urandom", "ssl"], answer: 1 },
  { id: 3, q: "Which attack involves injecting malicious SQL queries into user input?", options: ["XSS", "CSRF", "SQL Injection", "Buffer Overflow"], answer: 2 },
  { id: 4, q: "What does 'chmod 777' do in Linux?", options: ["Gives read/write/execute permission to everyone", "Deletes all files", "Locks the file", "Grants admin access only"], answer: 0 },
  { id: 5, q: "What is the result of `10 % 3` in Python?", options: ["3", "1", "0", "3.33"], answer: 1 },
  { id: 6, q: "Which HTTP method is used to send sensitive data like passwords?", options: ["GET", "POST", "HEAD", "OPTIONS"], answer: 1 },
  { id: 7, q: "What is Phishing?", options: ["Scanning ports", "Social engineering to steal credentials", "Fishing for data in a database", "Decrypting WiFi"], answer: 1 },
  { id: 8, q: "Which tool is commonly used for network scanning?", options: ["Wireshark", "Nmap", "Metasploit", "John the Ripper"], answer: 1 },
  { id: 9, q: "What does XSS stand for?", options: ["Extensible Security System", "Cross-Site Scripting", "XML Site Security", "X-rated Site Script"], answer: 1 },
  { id: 10, q: "In a 'While Loop', what happens if the condition never becomes False?", options: ["It crashes immediately", "It creates an Infinite Loop", "It stops automatically", "It returns None"], answer: 1 },
  { id: 11, q: "What is a 'Zero-Day' vulnerability?", options: ["A virus that lasts 0 days", "A vulnerability known to the vendor but not patched", "A vulnerability unknown to the vendor/public", "A hack that happens at midnight"], answer: 2 },
  { id: 12, q: "Which of these is a strong password hashing algorithm?", options: ["MD5", "Base64", "SHA-1", "Bcrypt"], answer: 3 },
  { id: 13, q: "What is the purpose of a Firewall?", options: ["To burn viruses", "To monitor and control network traffic", "To speed up the internet", "To hack other computers"], answer: 1 },
  { id: 14, q: "In Python, how do you handle exceptions to prevent crashes?", options: ["if/else", "try/except", "do/while", "catch/throw"], answer: 1 },
  { id: 15, q: "What is 'Social Engineering'?", options: ["Building social networks", "Manipulating people into divulging confidential info", "Programming robots", "Hacking social media APIs"], answer: 1 },
  { id: 16, q: "What does the CIA Triad stand for?", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Control, Intelligence, Access", "Computer Internet Access"], answer: 1 },
  { id: 17, q: "What is a Denial of Service (DoS) attack?", options: ["Stealing passwords", "Flooding a service to make it unavailable", "Deleting files", "Injecting malware"], answer: 1 },
  { id: 18, q: "Which Python library is best for making HTTP requests?", options: ["http.client", "socket", "requests", "urllib"], answer: 2 },
  { id: 19, q: "What is the port number for SSH?", options: ["80", "443", "21", "22"], answer: 3 },
  { id: 20, q: "What is 'Steganography'?", options: ["Hiding data within other files (like images)", "Encrypting data", "Deleting logs", "Cracking passwords"], answer: 0 },
  { id: 21, q: "Which of these IPs is a 'Loopback' address?", options: ["192.168.1.1", "10.0.0.1", "127.0.0.1", "255.255.255.0"], answer: 2 },
  { id: 22, q: "What is a 'Rainbow Table' used for?", options: ["Visualizing data", "Cracking hashes", "Designing UI", "Network mapping"], answer: 1 },
  { id: 23, q: "In Python `socket` programming, what does `.bind()` do?", options: ["Connects to a remote server", "Associates the socket with a specific IP and Port", "Sends data", "Closes the connection"], answer: 1 },
  { id: 24, q: "What is 'Salting' in password storage?", options: ["Adding random data to inputs before hashing", "Encrypting the database", "Using pepper", "Filtering special characters"], answer: 0 },
  { id: 25, q: "Which attack relies on a user clicking a link they are already authenticated for?", options: ["XSS", "CSRF (Cross-Site Request Forgery)", "SQLi", "Ransomware"], answer: 1 },
  { id: 26, q: "What is the default port for HTTPs?", options: ["80", "8080", "443", "21"], answer: 2 },
  { id: 27, q: "In Python, what is the output of `type([])`?", options: ["<class 'list'>", "<class 'array'>", "<class 'dict'>", "<class 'tuple'>"], answer: 0 },
  { id: 28, q: "What does 'Man-in-the-Middle' (MitM) mean?", options: ["Intercepting communication between two parties", "The server admin", "A middle manager hacking", "A firewall"], answer: 0 },
  { id: 29, q: "Which command shows running processes in Linux?", options: ["ls", "ps", "cd", "cp"], answer: 1 },
  { id: 30, q: "What is a 'Backdoor'?", options: ["A hardware port", "A hidden method for bypassing authentication", "The back of the computer", "A return statement"], answer: 1 },
  { id: 31, q: "What is Subnetting?", options: ["Connecting to the internet", "Dividing a network into smaller sub-networks", "Creating a new website", "Hacking a net"], answer: 1 },
  { id: 32, q: "Which flag in a TCP packet initiates a connection?", options: ["ACK", "FIN", "SYN", "RST"], answer: 2 },
  { id: 33, q: "What is 'Enumeration'?", options: ["Gathering information about a target (users, shares, etc.)", "Counting numbers", "Running an exploit", "Deleting logs"], answer: 0 },
  { id: 34, q: "Which Python function converts an integer to a character?", options: ["int()", "ord()", "chr()", "str()"], answer: 2 },
  { id: 35, q: "What is the difference between TCP and UDP?", options: ["TCP is connection-oriented, UDP is connectionless", "UDP is slower", "TCP is for videos only", "They are the same"], answer: 0 }
];

interface FinalExamProps {
  user: UserProfile;
  onPass: () => void;
}

const FinalExam: React.FC<FinalExamProps> = ({ user, onPass }) => {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize Exam with Random Questions
  useEffect(() => {
    startNewExam();
  }, []);

  const startNewExam = () => {
    // Shuffle and pick 30 questions
    const shuffled = [...QUESTION_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 30);
    setActiveQuestions(selected);
    setAnswers(new Array(selected.length).fill(-1));
    setCurrentQ(0);
    setSubmitted(false);
    setScore(0);
  };

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Calculate Score
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
        if (answers[idx] === q.answer) correctCount++;
    });
    
    const finalPercentage = Math.round((correctCount / activeQuestions.length) * 100);
    setScore(finalPercentage);
    setSubmitted(true);

    // High Pass Mark (85%)
    if (finalPercentage >= 85) {
        // Pass
        await updateUserProfile({
            isCertified: true,
            examScore: finalPercentage
        });
        setTimeout(() => {
            onPass();
        }, 3000);
    }
  };

  if (activeQuestions.length === 0) return <div>Loading Exam...</div>;

  if (submitted) {
    const passed = score >= 85;
    return (
        <div className="max-w-2xl mx-auto p-8 text-center animate-in zoom-in">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {passed ? <Award size={48} /> : <XCircle size={48} />}
            </div>
            <h2 className="text-3xl font-bold mb-2">{passed ? "EXAM PASSED" : "EXAM FAILED"}</h2>
            <div className="text-6xl font-black mb-4">{score}%</div>
            <p className="text-gray-600 mb-8 font-mono">
                PASS MARK: 85% <br/>
                {passed 
                    ? "Congratulations! You have demonstrated ELITE mastery of Ethical Hacking. Your certificate is ready." 
                    : "You did not meet the elite requirement. Study harder and try again."}
            </p>
            {!passed && (
                <button onClick={startNewExam} className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2 mx-auto">
                    <Shuffle size={18} /> Retry with New Questions
                </button>
            )}
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <ShieldCheck className="text-brand" size={32} />
              Final Certification Exam
          </h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 dark:text-gray-400">
                Question {currentQ + 1} of {activeQuestions.length}
            </p>
            <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded font-bold border border-red-500/20">Pass Mark: 85%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div className="bg-brand h-full rounded-full transition-all" style={{ width: `${((currentQ + 1) / activeQuestions.length) * 100}%` }}></div>
          </div>
      </div>

      <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
              {activeQuestions[currentQ].q}
          </h3>

          <div className="space-y-3 flex-1">
              {activeQuestions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between group ${
                        answers[currentQ] === idx 
                        ? 'border-brand bg-brand/10 text-brand font-bold' 
                        : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                      <span>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers[currentQ] === idx ? 'border-brand' : 'border-gray-300'}`}>
                          {answers[currentQ] === idx && <div className="w-2.5 h-2.5 rounded-full bg-brand"></div>}
                      </div>
                  </button>
              ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setCurrentQ(p => Math.max(0, p - 1))}
                disabled={currentQ === 0}
                className="text-gray-500 font-bold disabled:opacity-30 hover:text-gray-900"
              >
                  Previous
              </button>

              {currentQ < activeQuestions.length - 1 ? (
                  <button 
                    onClick={() => setCurrentQ(p => p + 1)}
                    className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all"
                  >
                      Next Question
                  </button>
              ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={answers.includes(-1)}
                    className="bg-brand text-white px-8 py-2 rounded-lg font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      Submit Exam
                  </button>
              )}
          </div>
      </div>
    </div>
  );
};

export default FinalExam;
