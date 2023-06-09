import React from 'react';

const QuizResult = ({
  correctAnswersCount,
  wrongAnswersCount,
  questions,
  userAnswers,
  fullName
}) => {
  return (
    <div className="quiz-result">
      <h3>Quiz Result</h3>
      <h3>Quiz Result for {fullName}</h3>
      <p>Correct Answers: {correctAnswersCount}</p>
      <p>Wrong Answers: {wrongAnswersCount}</p>
      <h3>Answers:</h3>
      {questions.map((question, index) => (
        <div key={index} className="answer">
          <p>Question {index + 1}:</p>
          <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
          <p>Correct Answer: {question.correct_answer}</p>
          <p>Your Answer: {userAnswers[index]}</p>
          {userAnswers[index] === question.correct_answer ? (
            <p className="correct-answer">✅ Correct</p>
          ) : (
            <p className="wrong-answer">❌ Wrong</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizResult;
