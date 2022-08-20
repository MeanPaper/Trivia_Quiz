import React from 'react'

//simple homepage
const Homepage = (props) => {

  function fixedNumberAdd(num, pos){
    const buttons = [];
    const baseNum = pos ? 10 : -10;
    for(let i = 1; i <= num; ++i){
      buttons.push(
        <button className = 'fixed-adjustment' onClick = {()=>props.adjustQuestionNum(baseNum*i)}>
          {pos ? `+${baseNum*i}` : baseNum*i}
        </button>
      )
    }
    return buttons;  
  }

  return (
      <div className = 'homepage'>
        <h1 className = 'homepage-title'>Quizzical</h1>
        <p className = 'homepage-description'>Welcome To The Ultimate Trivia Quiz</p>
        <div className = 'question-number-control'>
          <button className = 'circle-toggle' onClick = {() => props.adjustQuestionNum(-1)}> - </button>
          <span className = 'question-number'>{props.numberOfQuestion}</span>
          <button className = 'circle-toggle' onClick = {() => props.adjustQuestionNum(1)}> + </button>  
        </div>
        <div className = 'fixed-number-adjustment'>
          {fixedNumberAdd(3,false)}{fixedNumberAdd(3,true)}
        </div>
        <button className = 'start-button' onClick = {props.handleClick}> Start Quiz</button>
      </div>
  );
}

export default Homepage;
