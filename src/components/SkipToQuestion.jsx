import React from 'react';

const SkipToQuestion = ({ skipToQuestion, questionsLength, handleSkipToQuestion }) => {
  return (
    <div className="skip-to-question">
      <label style={{display: "inline",}}>Skip to Question:</label>
      <input
        type="number"
        value={skipToQuestion}
        min={1}
        max={questionsLength}
        onChange={handleSkipToQuestion}
      />
    </div>
  );
};

export default SkipToQuestion;
