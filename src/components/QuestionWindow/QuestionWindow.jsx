import React, { useEffect, useState } from 'react';
import {accessProblem, getBestQuestion, getAnswer} from '../../actions/posts';
import AnswerBox from "../AnswerBox/AnswerBox";
import './QuestionWindow.css';

const QuestionWindow = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [html, setHtml] = useState('');
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const seeProblem = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("profile"));
        const userTheta = parseFloat(user.result.theta.$numberDecimal);
        const questionId = await getBestQuestion(userTheta);
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
          setQuestionData({
            userId,
            id,
            userTheta,
            correctAnswer,
            explanation,
            isMultipleChoice,
            isAnswerChoice,
          });
        }
      } catch (error) {
        console.log("Unable to see problem");
        console.log(error);
      }
    };

    if (user) {
      seeProblem();
    }
  }, [user]);

  return (
    user &&
    <div className='question_container'>
      <div className="question_header">Answer Questions</div>
      <div className="question_box">
        <div className="questionSide">
            <div className="question-prompt">{html}</div>
            <div className="answer-choices"></div>
        </div>
        <div className="answer-box">
          {questionData && (
              <AnswerBox
                userId={questionData.userId}
                id={questionData.id}
                theta={questionData.userTheta}
                isMultipleChoice={questionData.isMultipleChoice}
                isAnswerChoice={questionData.isAnswerChoice}
                correctAnswer={questionData.correctAnswer}
                explanationText={questionData.explanation}
              />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionWindow;