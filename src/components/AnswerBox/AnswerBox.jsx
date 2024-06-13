import React, { useState } from 'react';
import {accessParameters, getUpdatedParameters, postUpdatedParameters, updateMoney, updateTickets, removeOffList, clearList} from '../../actions/posts';
import {updateTheta} from '../../actions/auth';
import images from "../../constants/images";
import './AnswerBox.css';


const AnswerBox = ({ userId, id, theta, isMultipleChoice, isAnswerChoice, correctAnswer, difficulty, explanationText, arrLength, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mode, setMode] = useState('money'); // Default mode is money
  const [givenUp, setGivenUp] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleGiveUp = () => {
    setGivenUp(true);
    setIsSubmitted(true);
  };

  const handleNextQuestion = async () => {
    setUserInput('');
    setSelectedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    isMultipleChoice = false;
    isAnswerChoice = false;
    setGivenUp(false);
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
      if (!givenUp) {
        const response = await accessParameters(id);
        const newVals = await getUpdatedParameters(theta, response.a.$numberDecimal, response.b.$numberDecimal, response.c.$numberDecimal, cor);
        await postUpdatedParameters(id, newVals.new_a, newVals.new_b);
        await updateTheta(userId, newVals.new_theta);

        if (mode === 'money') {
          let amount = 0;
          if (difficulty === 'Easy') {
            amount = cor ? 2 : -2;
          } else if (difficulty === 'Medium') {
            amount = cor ? 3 : -2;
          } else {
            amount = cor ? 4 : -2;
          }
          await updateMoney(userId, amount);
        } else {
            let amount = 0;
            if (difficulty == 'Easy') {
                amount = cor ? 1 : -1;
            } else if (difficulty == 'Medium') {
                amount = cor ? 1 : -1;
            } else {
                amount = cor ? 2 : -1;
            }
            await updateTickets(userId, amount);
        }
      }
    } else {
      alert('Please select or enter an answer before submitting.');
    }
  };

  return (     
    <div>
        {givenUp && <div>You've given up on this question.</div>}
        {(isMultipleChoice || isAnswerChoice) && (
        <div>
            {!givenUp && (
            <div>
                <div className="betChoice">
                    <p>Choose to Solve for Hybux or Tickets</p>
                    <div className="mode-selection">
                        <button className={`modeButton ${mode === 'money' ? 'selected' : ''}`} onClick={() => setMode('money')}>
                        <img src = {images.coinIcon} width={28} height={28}/>
                        </button>
                        <button className={`modeButton ${mode === 'tickets' ? 'selected' : ''}`} onClick={() => setMode('tickets')}>
                        <img src = {images.ticketIcon} width={28} height={28}/>
                        </button>
                    </div>
                </div>
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
                        <button className="giveUpButton" onClick={handleGiveUp}>Give Up</button>
                    </div>
                )}
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