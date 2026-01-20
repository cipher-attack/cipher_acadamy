
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle, Award, FastForward } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onSkip?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onSkip }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions && questions.length > 0 ? questions[currentQIndex] : null;

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption || !currentQ) return;
    setIsAnswered(true);
    if (selectedOption === currentQ.correctOptionId) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(p => p + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(score); 
    }
  };

  // Trigger completion on render if result shown
  React.useEffect(() => {
    if (showResult) {
       onComplete(score);
    }
  }, [showResult]);

  if (showResult) {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="bg-cyber-800 p-8 rounded-lg border border-cyber-700 text-center mt-6 animate-in fade-in zoom-in">
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-cyber-accent/10 rounded-full text-cyber-accent">
                <Award size={48} />
            </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
        <p className="text-gray-400 mb-6">You scored {score} out of {questions.length}</p>
        
        <div className="w-full bg-cyber-900 h-4 rounded-full overflow-hidden mb-6 relative">
          <div 
            className="bg-cyber-accent h-full transition-all duration-1000" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {percentage >= 50 ? (
            <div className="text-green-400 font-bold">Lesson Passed! +50 XP</div>
        ) : (
            <div className="text-red-400 font-bold">Review the lesson and try again.</div>
        )}
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="bg-cyber-800 border border-cyber-700 rounded-xl p-6 mt-8 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="text-cyber-accent" size={20} />
        <h3 className="font-bold text-lg text-white">Knowledge Check</h3>
        <span className="ml-auto text-xs text-gray-500">Question {currentQIndex + 1}/{questions.length}</span>
      </div>

      <p className="text-gray-200 mb-6 font-medium text-lg">{currentQ.question}</p>

      <div className="space-y-3">
        {currentQ.options.map((opt) => {
          let optionClass = "bg-cyber-900 border-cyber-700 hover:bg-cyber-700 text-gray-300";
          
          if (isAnswered) {
             if (opt.id === currentQ.correctOptionId) optionClass = "bg-green-500/20 border-green-500 text-green-200";
             else if (opt.id === selectedOption) optionClass = "bg-red-500/20 border-red-500 text-red-200";
             else optionClass = "bg-cyber-900 border-cyber-700 opacity-50";
          } else if (selectedOption === opt.id) {
            optionClass = "bg-cyber-accent/20 border-cyber-accent text-white";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${optionClass}`}
            >
              <span>{opt.text}</span>
              {isAnswered && opt.id === currentQ.correctOptionId && <CheckCircle size={18} className="text-green-400" />}
              {isAnswered && opt.id === selectedOption && opt.id !== currentQ.correctOptionId && <XCircle size={18} className="text-red-400" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-200">
          <strong>Explanation:</strong> {currentQ.explanation}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        {onSkip && !isAnswered && (
            <button 
                onClick={onSkip}
                className="text-gray-500 hover:text-white text-xs font-bold flex items-center gap-1"
            >
                <FastForward size={14} /> Skip Quiz
            </button>
        )}
        
        <div className="ml-auto">
            {!isAnswered ? (
            <button 
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="bg-cyber-accent text-cyber-900 font-bold px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-cyber-dim transition-colors"
            >
                Submit Answer
            </button>
            ) : (
            <button 
                onClick={handleNext}
                className="bg-cyber-700 text-white font-bold px-6 py-2 rounded-lg hover:bg-cyber-600 transition-colors"
            >
                {currentQIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
