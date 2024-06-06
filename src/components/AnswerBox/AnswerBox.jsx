import React, { useState } from 'react';
import {accessParameters, getUpdatedParameters, postUpdatedParameters} from '../../actions/posts';
import {updateTheta} from '../../actions/auth';
import './AnswerBox.css';

const AnswerBox = ({ id, theta, isMultipleChoice, isAnswerChoice, correctAnswer, explanationText }) => {
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
      let cor = false;
      if (isMultipleChoice) {
        cor = (answerToCheck == correctAnswer);
      } else {
        possibleAnswers = correctAnswer.split(',').map(answer => answer.trim());
        cor = possibleAnswers.includes(answerToCheck);
      }

      setIsCorrect(cor);
      setIsSubmitted(true);
      const response = accessParameters(id);
      const newVals = getUpdatedParameters(theta, response.a, response.b, response.c, cor);
      postUpdatedParameters(id, newVals.new_a, newVals.new_b);
      updateTheta(id, newVals.theta);
    } else {
      alert('Please select or enter an answer before submitting.');
    }
  };

  return (     
    <div>
        {(isMultipleChoice || isAnswerChoice) && (
        <div>
            {isMultipleChoice ? (
            <div>
                {!isSubmitted && (
                    <div>
                        <h1>Answer Question</h1>
                        <button
                            className={`answerButton ${selectedAnswer === 'A' ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick('A')}
                        >
                            A
                        </button>
                        <button
                            className={`answerButton ${selectedAnswer === 'B' ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick('B')}
                        >
                            B
                        </button>
                        <button
                            className={`answerButton ${selectedAnswer === 'C' ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick('C')}
                        >
                            C
                        </button>
                        <button
                            className={`answerButton ${selectedAnswer === 'D' ? 'selected' : ''}`}
                            onClick={() => handleAnswerClick('D')}
                        >
                            D
                        </button>
                    </div>
                )}
                <div>Selected Answer: {selectedAnswer}</div>
            </div>
            ) : (
            <div>
                {!isSubmitted && (
                    <div>
                        <h1>Answer Question</h1>
                        <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your answer here"
                        />
                    </div>
                )}
                {isSubmitted && (
                    <div>Selected Answer: {userInput}</div>
                )}
            </div>
            )}
            {!isSubmitted && (
                <div>
                    <button className="submitButton" onClick={handleSubmit}>Submit</button>
                </div>
            )}
            {isSubmitted && (
            <div className="answer-explanation">
                <div className="answer_validity">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                <div dangerouslySetInnerHTML={{ __html: explanationText }} />
            </div>
            )}
        </div>
        )}
    </div>
);
};

export default AnswerBox;