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
  },
  {
    question: "Which country has the highest percentage of vegans?",
    options: ["United States", "United Kingdom", "Israel", "India"],
    correctAnswer: "Israel",
    explanation: "Israel has the highest percentage of vegans globally, with an estimated 5% of the population following a vegan diet."
  },
  {
    question: "What is the main ingredient in traditional Japanese miso?",
    options: ["Soybeans", "Rice", "Wheat", "Seaweed"],
    correctAnswer: "Soybeans",
    explanation: "Traditional miso is made primarily from fermented soybeans, although other ingredients may be added."
  },
  {
    question: "Which of these sweeteners is NOT vegan?",
    options: ["Agave nectar", "Maple syrup", "Honey", "Stevia"],
    correctAnswer: "Honey",
    explanation: "Honey is produced by bees and is therefore not considered vegan. The other options are plant-based sweeteners."
  },
  {
    question: "What is the primary ingredient in seitan?",
    options: ["Soy", "Wheat gluten", "Pea protein", "Mushrooms"],
    correctAnswer: "Wheat gluten",
    explanation: "Seitan is made from wheat gluten, the main protein in wheat, and is known for its meat-like texture."
  },
  {
    question: "Which of these cuisines is traditionally the most vegan-friendly?",
    options: ["French", "Ethiopian", "American", "Spanish"],
    correctAnswer: "Ethiopian",
    explanation: "Ethiopian cuisine includes many vegan dishes, with a variety of lentil, bean, and vegetable options often served with injera bread."
  },
  {
    question: "What percentage of greenhouse gas emissions is attributed to animal agriculture?",
    options: ["5%", "10%", "15%", "20%"],
    correctAnswer: "15%",
    explanation: "Animal agriculture is responsible for about 15% of global greenhouse gas emissions."
  },
  {
    question: "Which of these famous historical figures was vegetarian?",
    options: ["Leonardo da Vinci", "William Shakespeare", "Christopher Columbus", "Marco Polo"],
    correctAnswer: "Leonardo da Vinci",
    explanation: "Leonardo da Vinci was known to be vegetarian and had a deep respect for all forms of life."
  },
  {
    question: "What is the main ingredient in nutritional yeast?",
    options: ["Deactivated yeast", "Wheat germ", "Soy protein", "Algae"],
    correctAnswer: "Deactivated yeast",
    explanation: "Nutritional yeast is made from deactivated yeast and is popular among vegans for its cheesy flavor and nutritional content."
  },
  {
    question: "Which of these organizations certified the first vegan product?",
    options: ["PETA", "The Vegan Society", "Greenpeace", "WHO"],
    correctAnswer: "The Vegan Society",
    explanation: "The Vegan Society created the first vegan certification, the Vegan Trademark, in 1990."
  },
  {
    question: "What is the primary environmental benefit of a vegan diet?",
    options: ["Reduced water usage", "Lower carbon footprint", "Less deforestation", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "A vegan diet contributes to reduced water usage, lower carbon emissions, and less deforestation compared to diets that include animal products."
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
        <p>
          {score > 12 ? "Amazing! You're a vegan expert! 🏆" :
           score > 9 ? "Great job! You really know your vegan facts! 🌱" :
           score > 6 ? "Not bad! You're on your way to becoming a vegan pro. 📚" :
           "Keep learning! The vegan world has so much to offer. 🌍"}
        </p>
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
