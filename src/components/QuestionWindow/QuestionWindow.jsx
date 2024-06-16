import React, { useEffect, useState } from 'react';
import {accessProblem, getBestQuestion, getAnswer, getUserArr} from '../../actions/posts';
import AnswerBox from "../AnswerBox/AnswerBox";
import './QuestionWindow.css';

const QuestionWindow = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [html, setHtml] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [loadProblem, setLoadProblem] = useState(true);
  // Function to toggle visibility of domain sections
  const handleCheckboxChange = (domain) => {
    if (Object.values(showDomains).filter((value) => value).length === 1 && showDomains[domain]) {
      // If there's only one checked box and it's the current one, don't uncheck it
      return;
    }
    setShowDomains(prevState => ({
        ...prevState,
        [domain]: !prevState[domain]
    }));
  };
  const [showDomains, setShowDomains] = useState({
    algebra: true,
    advancedMath: true,
    problemSolvingAndDataAnalysis : true,
    geometryTrigonometry: true
  });
  const handleNextQuestion = () => {
    setLoadProblem(true);
  };

  useEffect(() => {
    const seeProblem = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("profile"));
        const userTheta = parseFloat(user.result.theta.$numberDecimal);
        const userArr = await getUserArr(user.result._id);
        const questionId = await getBestQuestion(userTheta, userArr, showDomains);
        const response = await accessProblem(questionId.id);
        const response2 = await getAnswer(questionId.id);
        if (response) {
          // const div = document.createElement('div');
          // div.innerHTML = response.data;
          const text = response.text;
          const answers = response.answertext;
          const questionBox = document.querySelector('.question-prompt');
          questionBox.innerHTML = text;
          const answerChoiceBox = document.querySelector('.answer-choices');
          answerChoiceBox.innerHTML = answers;
          const correctAnswer = response2.correct_answer;
          const explanation = response2.text;
          const isMultipleChoice = ['A', 'B', 'C', 'D'].includes(correctAnswer);
          const isAnswerChoice = !isMultipleChoice;
          const id = questionId.id;
          const userId = user.result._id;
          const difficulty = response.difficulty;
          const arrLength = userArr.arr.length;
          setQuestionData({
            userId,
            id,
            userTheta,
            correctAnswer,
            difficulty,
            explanation,
            isMultipleChoice,
            isAnswerChoice,
            arrLength
          });
        }
      } catch (error) {
        console.log("Unable to see problem");
        console.log(error);
      }
    };

    if (user && loadProblem) {
      seeProblem();
      setLoadProblem(false);
    }
  }, [user, loadProblem]);

  return (
    user &&
    <div className='question_container'>
      <div className="question_header">Answer Questions</div>
      <div className="checkboxes">
          Chosen Topics: 
          <div className="checkBoxItem" onClick={() => handleCheckboxChange('algebra')}>
              <label>
                  <input type="checkbox" checked={showDomains.algebra} onChange={() => handleCheckboxChange('algebra')} /> Algebra
              </label>
          </div>
          <div className="checkBoxItem" onClick={() => handleCheckboxChange('advancedMath')}>
              <label>
                  <input type="checkbox" checked={showDomains.advancedMath} onChange={() => handleCheckboxChange('advancedMath')} /> Advanced Math
              </label>
          </div>
          <div className="checkBoxItem" onClick={() => handleCheckboxChange('problemSolvingAndDataAnalysis')}>
              <label>
                  <input type="checkbox" checked={showDomains.problemSolvingAndDataAnalysis} onChange={() => handleCheckboxChange('problemSolvingAndDataAnalysis')} /> Problem Solving and Data Analysis
              </label>
          </div>
          <div className="checkBoxItem" onClick={() => handleCheckboxChange('geometryTrigonometry')}>
              <label>
                  <input type="checkbox" checked={showDomains.geometryTrigonometry} onChange={() => handleCheckboxChange('geometryTrigonometry')} /> Geometry and Trigonometry
              </label>
          </div>
      </div>
      <div className="question_box">
        <div className="questionSide">
            <div className="question-prompt">{html}</div>
            <div className="answer-choices"></div>
        </div>
        <div className="answerSide">
          <div className="answer-box">
            {questionData && (
                <AnswerBox
                  userId={questionData.userId}
                  id={questionData.id}
                  theta={questionData.userTheta}
                  isMultipleChoice={questionData.isMultipleChoice}
                  isAnswerChoice={questionData.isAnswerChoice}
                  correctAnswer={questionData.correctAnswer}
                  difficulty={questionData.difficulty}
                  explanationText={questionData.explanation}
                  arrLength={questionData.arrLength}
                  onNextQuestion={handleNextQuestion}
                />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionWindow;