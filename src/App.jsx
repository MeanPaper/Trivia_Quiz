import React from 'react'
import Homepage from './component/Homepage';
import Quiz from './component/Quiz'

import blobLeft from './img/blob_left.png'
import blobRight from './img/blob_right.png'

function App() {
  
  const [startQuiz, setStartQuiz] = React.useState(false);

  function clickToStart(){
    setStartQuiz(prev => !prev);
  }
  
  return (
    <div className="App">
      <img className = 'bottom_blob' src = {blobLeft} alt = 'blob'/>
      {!startQuiz ? <Homepage handleClick = {clickToStart}/> : <Quiz />}
      <img className = 'top_blob' src = {blobRight} alt = 'blob'/>
    </div>
  )
}

export default App;
