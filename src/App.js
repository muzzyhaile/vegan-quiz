import React, { useState, useEffect } from 'react';
import './App.css';

const quizData = [
  {
    question: "Which of these is NOT a common vegan protein source?",
    options: ["Tofu", "Lentils", "Seitan", "Salmon"],
    correctAnswer: "Salmon",
    explanation: "Salmon is a fish and not vegan. The other options are plant-based protein sources."
  },
  {
    question: "What percentage of the world's population is estimated to be vegan?",
    options: ["1%", "3%", "5%", "10%"],
    correctAnswer: "1%",
    explanation: "As of 2021, it's estimated that only about 1% of the global population follows a vegan diet."
  },
  {
    question: "Which vitamin might vegans need to supplement?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin K"],
    correctAnswer: "Vitamin B12",
    explanation: "Vitamin B12 is primarily found in animal products, so vegans often need to supplement it."
  },
  {
    question: "What year was the term 'vegan' coined?",
    options: ["1944", "1954", "1964", "1974"],
    correctAnswer: "1944",
    explanation: "The term 'vegan' was coined by Donald Watson when he co-founded the Vegan Society in England in 1944."
  },
  {
    question: "Which of these foods is surprisingly NOT always vegan?",
    options: ["Bread", "Pasta", "Rice", "All of these can be non-vegan"],
    correctAnswer: "All of these can be non-vegan",
    explanation: "Bread can contain milk or eggs, pasta might contain eggs, and rice can be processed with animal-derived additives."
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, selectedAnswer]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(15);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setTimeLeft(15);
  };

  if (showResult) {
    return (
      <div className="App">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score}/{quizData.length}</p>
        <p>{score > quizData.length / 2 ? "Great job!" : "Keep learning about veganism!"}</p>
        <button onClick={resetQuiz}>Play Again</button>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="App">
      <h2>Vegan Quiz</h2>
      <div className="progress-bar">
        <div style={{width: `${(timeLeft / 15) * 100}%`}}></div>
      </div>
      <p>Time left: {timeLeft} seconds</p>
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className={`option ${selectedAnswer === option 
            ? (option === question.correctAnswer ? 'correct' : 'incorrect')
            : ''}`}
          disabled={selectedAnswer !== null}
        >
          {option}
        </button>
      ))}
      {selectedAnswer && (
        <div className="feedback">
          <p><strong>{selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}</strong></p>
          <p>{question.explanation}</p>
        </div>
      )}
      <button
        onClick={handleNextQuestion}
        className="next-button"
        disabled={selectedAnswer === null}
      >
        {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
      </button>
    </div>
  );
}

export default App;
