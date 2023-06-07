import React, { useState, useEffect } from 'react';
import './QuizSetup.css';
import QuizForm from './QuizForm';
import QuizQuestions from './QuizQuestions';
import QuizResult from './QuizResult';
import SkipToQuestion from './SkipToQuestion';

const QuizSetup = () => {
  const [setupQuiz, setSetupQuiz] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [showSkipQuistion, setShowSkipQuistion] = useState(true);
  const [showQuistion, setShowQuistion] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skipToQuestion, setSkipToQuestion] = useState('');
  const [shareResultUrl, setShareResultUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories)
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNumberOfQuestionsChange = (event) => {
    setNumberOfQuestions(parseInt(event.target.value));
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
      setSelectedCategories(updatedCategories);
    }
  };

  const startQuiz = () => {
    const categoryIds = selectedCategories.join(',');
    const apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryIds}`;

    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setUserAnswers(Array(data.results.length).fill(''));
        setCorrectAnswersCount(0);
        setWrongAnswersCount(0);
        setShowQuizResult(false);
        setSetupQuiz(false)
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleAnswerChange = (event) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    let wrongCount = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer.toLowerCase() === question.correct_answer.toLowerCase()) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    setCorrectAnswersCount(correctCount);
    setWrongAnswersCount(wrongCount);
    setShowQuizResult(true);
    setShowSkipQuistion(false);
    setShowQuistion(false);

    // Generate shareable URL
    const resultUrl = `${window.location.origin}/quiz-result?correct=${correctCount}&wrong=${wrongCount}`;
    setShareResultUrl(resultUrl);
  };

  const handleShareResult = () => {
    // Check if the shareResultUrl is available
    if (shareResultUrl) {
      // Use the Web Share API to share the result URL
      if (navigator.share) {
        navigator
          .share({
            title: 'Quiz Result',
            text: `I scored ${correctAnswersCount} out of ${questions.length} on the quiz!`,
            url: shareResultUrl,
          })
          .catch((error) => console.log('Error sharing:', error));
      } else {
        // Fallback for browsers that do not support the Web Share API
        alert('Share this URL: ' + shareResultUrl);
      }
    }
  };

  const handleSkipToQuestion = (event) => {
    const skipQuestionNumber = parseInt(event.target.value);
    if (skipQuestionNumber >= 1 && skipQuestionNumber <= questions.length) {
      setCurrentQuestionIndex(skipQuestionNumber - 1);
    }
  };

  return (
    <>
      {loading ? <p>Loading...</p> : (
        <div className="quiz-setup-container">
          {setupQuiz && (
            <>
            <h2>Quiz Setup</h2>
            <QuizForm
              numberOfQuestions={numberOfQuestions}
              handleNumberOfQuestionsChange={handleNumberOfQuestionsChange}
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              startQuiz={startQuiz}
            />
            </>
          )}

          {questions.length > 0 && currentQuestionIndex < questions.length && showQuistion && (
            <QuizQuestions
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
              userAnswers={userAnswers}
              handleAnswerChange={handleAnswerChange}
              handlePreviousQuestion={handlePreviousQuestion}
              handleNextQuestion={handleNextQuestion}
              handleFinishQuiz={handleFinishQuiz}
            />
          )}

          {showQuizResult && (
            <QuizResult
              correctAnswersCount={correctAnswersCount}
              wrongAnswersCount={wrongAnswersCount}
              handleShareResult={handleShareResult}
            />
          )}

          {questions.length > 0 && showSkipQuistion &&  (
            <SkipToQuestion
              skipToQuestion={skipToQuestion}
              questionsLength={questions.length}
              handleSkipToQuestion={handleSkipToQuestion}
            />
          )}
        </div>
      )}
    </>
  );
};

export default QuizSetup;