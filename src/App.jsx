import React from 'react'
import Homepage from './component/Homepage';
import Quiz from './component/Quiz'

import blobLeft from './img/blob_left.png'
import blobRight from './img/blob_right.png'

function App() {
  
  //game start flag
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = React.useState(5);

  function clickToStart(){
    setStartQuiz(prev => !prev);
  }
  
  function adjustQuestionNum(value){
    if(numberOfQuestion + value >= 5 && numberOfQuestion + value <= 250){
      setNumberOfQuestion(oldNum => oldNum + value);
    }
  }

  return (
    <div className="App">
      <img className = 'bottom_blob' src = {blobLeft} alt = 'blob'/>
      {!startQuiz ? 
        <div>
          <Homepage handleClick = {clickToStart} 
            numberOfQuestion = {numberOfQuestion}
            adjustQuestionNum = {adjustQuestionNum}/>   
        </div> 
        : <Quiz number = {numberOfQuestion}/>}
      <img className = 'top_blob' src = {blobRight} alt = 'blob'/>
    </div>
  )
}

export default App;
