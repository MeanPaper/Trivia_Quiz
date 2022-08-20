import React from 'react'
import Homepage from './component/Homepage';
import Quiz from './component/Quiz'

import blobLeft from './img/blob_left.png'
import blobRight from './img/blob_right.png'

function App() {
  
  //game start flag
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  function clickToStart(){
    setStartQuiz(true);
  }
  
  function adjustQuestionNum(value){
    if(numberOfQuestion + value >= 5 && numberOfQuestion + value <= 50){
      setNumberOfQuestion(oldNum => oldNum + value);
    }
    else if(numberOfQuestion + value < 5){
      setNumberOfQuestion(Math.max(5, numberOfQuestion + value));
    }
    else if(numberOfQuestion + value > 50){
      setNumberOfQuestion(Math.min(50, numberOfQuestion + value));
    }
  }

  return (
    <div className = "App">
      <img className = 'bottom_blob' src = {blobLeft} alt = 'blob'/>
      {!startQuiz ? <Homepage handleClick = {clickToStart} numberOfQuestion = {numberOfQuestion} adjustQuestionNum = {adjustQuestionNum}/>
        : <Quiz number = {numberOfQuestion} loading = {loading} setLoading = {setLoading} setStartQuiz = {setStartQuiz}/>}
      <img className = 'top_blob' src = {blobRight} alt = 'blob'/>
    </div>
  )
}

export default App;
