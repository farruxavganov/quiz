import React from 'react';

const QuizResult = ({ correctAnswersCount, wrongAnswersCount, handleShareResult }) => {
  return (
    <div className="quiz-result">
      <h3>Quiz Result</h3>
      <p>Correct Answers: {correctAnswersCount}</p>
      <p>Wrong Answers: {wrongAnswersCount}</p>
      <button className="share-result-button" onClick={handleShareResult}>
        Share Result
      </button>
    </div>
  );
};

export default QuizResult;
