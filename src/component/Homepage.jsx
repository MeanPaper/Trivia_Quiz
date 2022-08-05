import React from 'react'

//simple homepage
const Homepage = (props) => {
  return (
      <div className = 'homepage'>
        <h1 className = 'homepage-title'>Quizzical</h1>
        <p className = 'homepage-description'>Welcome To The Ultimate Trivia Quiz</p>
        <div className = 'question-num-control'>
          <button className = 'circle-toggle' onClick = {() => props.adjustQuestionNum(-1)}> - </button>
          <span className = 'question-number'>{props.numberOfQuestion}</span>
          <button className = 'circle-toggle' onClick = {() => props.adjustQuestionNum(1)}> + </button>  
        </div>
        <button className = 'start-button' onClick = {props.handleClick}> Start Quiz</button>
      </div>
  );
}

export default Homepage;
