import React from 'react';

const QuizForm = ({
  numberOfQuestions,
  handleNumberOfQuestionsChange,
  categories,
  selectedCategories,
  handleCategoryChange,
  startQuiz
}) => {
  return (
    <div className="quiz-form">
      <div className="quiz-input">
        <label htmlFor="numberOfQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numberOfQuestions"
          value={numberOfQuestions}
          min={1}
          max={20}
          onChange={handleNumberOfQuestionsChange}
        />
      </div>
      <div className="quiz-input">
        <label>Select Category:</label>
        <select
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="start-quiz-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizForm;
