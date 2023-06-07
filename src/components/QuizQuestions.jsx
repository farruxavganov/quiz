import React from 'react';

const QuizQuestions = ({
  currentQuestionIndex,
  questions,
  userAnswers,
  handleAnswerChange,
  handlePreviousQuestion,
  handleNextQuestion,
  handleFinishQuiz
}) => {
  return (
    <div className="quiz-container">
      <h3>Question {currentQuestionIndex + 1} / {questions.length}</h3>
      <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }}></p>
      <div className="answer-options">
        {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question_${currentQuestionIndex}`}
              value={option}
              checked={userAnswers[currentQuestionIndex] === option}
              onChange={handleAnswerChange}
            />
            {String.fromCharCode(65 + index)}. {option}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name={`question_${currentQuestionIndex}`}
            value={questions[currentQuestionIndex].correct_answer}
            checked={userAnswers[currentQuestionIndex] === questions[currentQuestionIndex].correct_answer}
            onChange={handleAnswerChange}
          />
          {String.fromCharCode(65 + questions[currentQuestionIndex].incorrect_answers.length)}. {questions[currentQuestionIndex].correct_answer}
        </label>
      </div>
      <div className="btn-group">
        <div className="btn-group_left">
          {currentQuestionIndex > 0 && (
            <button className="quiz-button" onClick={handlePreviousQuestion}>
              Previous
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 && (
            <button className="quiz-button" onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
        <div className="btn-group_right">
          {questions.length > 0 && (
            <button className="quiz-button" onClick={handleFinishQuiz}>
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;