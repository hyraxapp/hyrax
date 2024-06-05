import React, { useState } from 'react';
import './AnswerBox.css';

const AnswerBox = ({ id, isMultipleChoice, isAnswerChoice, correctAnswer, explanationText }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    let answerToCheck = isMultipleChoice ? selectedAnswer : userInput;
    if (answerToCheck) {
      setIsCorrect(answerToCheck === correctAnswer);
      setIsSubmitted(true);
    } else {
      alert('Please select or enter an answer before submitting.');
    }
  };

  return (     
    <div>
        {(isMultipleChoice || isAnswerChoice) && (
        <div>
            <h1>Answer Question</h1>
            {isMultipleChoice ? (
            <div>
                <button onClick={() => handleAnswerClick('a')}>A</button>
                <button onClick={() => handleAnswerClick('b')}>B</button>
                <button onClick={() => handleAnswerClick('c')}>C</button>
                <button onClick={() => handleAnswerClick('d')}>D</button>
                <div>Selected Answer: {selectedAnswer}</div>
            </div>
            ) : (
            <div>
                <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your answer here"
                />
            </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
            {isSubmitted && (
            <div>
                {isCorrect ? 'Correct!' : 'Incorrect'}
                <div dangerouslySetInnerHTML={{ __html: explanationText }} />
            </div>
            )}
        </div>
        )}
    </div>
);
};

export default AnswerBox;