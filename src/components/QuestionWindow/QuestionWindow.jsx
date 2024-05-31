import React, { useEffect, useState } from 'react';
import {accessProblem} from '../../actions/posts';
import './QuestionWindow.css';

const seeProblem = async () => {
    try {
      const response = await accessProblem("Advanced Math", "Equivalent Expressions", "Easy", 1);
      if (response) {
        // const div = document.createElement('div');
        // div.innerHTML = response.data;
        const text = response.data;
        const questionBox = document.querySelector('.question-prompt');
        questionBox.innerHTML = text;
      }
    } catch (error) {
      console.log(error);
    }
  };

const QuestionWindow = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (user) {
      seeProblem(new XMLHttpRequest());
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
        <div className="answer-box"></div>
      </div>
    </div>
  );
}

export default QuestionWindow;