import { useState } from 'react';
import quizQuestions from '../data/quizQuestions';
import '../styles/Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === '') return;

        if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer('');

        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setShowScore(false);
    };

    if (showScore) {
        return (
            <div className="quiz-container">
                <div className="quiz-card">
                    <h2>Quiz Completed! 🎉</h2>
                    <p className="score-text">
                        Your score: {score} out of {quizQuestions.length}
                    </p>
                    <p className="percentage">
                        {Math.round((score / quizQuestions.length) * 100)}%
                    </p>
                    <button className="restart-button" onClick={handleRestartQuiz}>
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-card">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                </div>
                <div className="question-number">
                    Question {currentQuestion + 1}/{quizQuestions.length}
                </div>
                <h2>{quizQuestions[currentQuestion].question}</h2>
                <div className="options">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    className="next-button"
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                >
                    {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

export default Quiz; 