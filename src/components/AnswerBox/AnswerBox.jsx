import React, { useState } from 'react';
import {accessParameters, getUpdatedParameters, postUpdatedParameters, updateMoney, removeOffList, clearList} from '../../actions/posts';
import {updateTheta} from '../../actions/auth';
import './AnswerBox.css';

const AnswerBox = ({ userId, id, theta, isMultipleChoice, isAnswerChoice, correctAnswer, difficulty, explanationText, arrLength, onNextQuestion }) => {
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

  const handleNextQuestion = async () => {
    setUserInput('');
    setSelectedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    isMultipleChoice = false;
    isAnswerChoice = false;
    onNextQuestion();
  }

  const handleSubmit = async () => {
    let answerToCheck = isMultipleChoice ? selectedAnswer : userInput;
    if (arrLength > 250) {
        await clearList(userId);
    }
    await removeOffList(userId, id);
    if (answerToCheck) {
      let cor = false;
      if (isMultipleChoice) {
        cor = (answerToCheck === correctAnswer);
      } else {
        let possibleAnswers = correctAnswer.split(',').map(answer => answer.trim());
        cor = possibleAnswers.includes(answerToCheck);
      }
      setIsCorrect(cor);
      setIsSubmitted(true);
      const response = await accessParameters(id);
      const newVals = await getUpdatedParameters(theta, response.a.$numberDecimal, response.b.$numberDecimal, response.c.$numberDecimal, cor);
      await postUpdatedParameters(id, newVals.new_a, newVals.new_b);
      await updateTheta(userId, newVals.new_theta);
      if (difficulty === "Easy") {
        if (cor) {
            await updateMoney(userId, 2);
        } else {
            await updateMoney(userId, -2);
        }
      } else if (difficulty === "Medium") {
        if (cor) {
            await updateMoney(userId, 3);
        } else {
            await updateMoney(userId, -2);
        }
      } else {
        if (cor) {
            await updateMoney(userId, 4);
        } else {
            await updateMoney(userId, -2);
        }
      }
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
                <button className="submitButton" onClick={handleNextQuestion}>Next Question</button>
            </div>
            )}
        </div>
        )}
    </div>
);
};

export default AnswerBox;