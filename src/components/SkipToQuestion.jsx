import React, {useState} from 'react';

const SkipToQuestion = ({ skipToQuestion, questionsLength, handleSkipToQuestion }) => {
  const [val, setVal] = useState(0);

  const handleSkipToQu = (e) => {
    setVal(e.target.value)
  }
  return (
    <div className="skip-to-question">
      <label style={{display: "inline"}}>Skip to Question:</label>
      <input
        type="number"
        value={val}
        min={1}
        max={50}
        onChange={handleSkipToQu}
      />
      <button className="quiz-button" style={{margin: "0 0 0 5px"}} onClick={() => handleSkipToQuestion(val)}>Skip</button>
    </div>
  );
};

export default SkipToQuestion;
