import React from 'react'
import he from 'he' //an awesome lib that can change html entities (code) to a string
import {nanoid} from 'nanoid'
import ChoiceSet from './ChoiceSet'
import "../css/quiz.css"

function Quiz({number}){

    const [quizData, setQuizData] = React.useState([]); 
    const [questionData, setQuestionData] = React.useState([]);
    const [endQuiz, setEndQuiz] = React.useState(false);
    
    // fetch questions 
    React.useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=${number}`)
            .then(response => response.json())
            .then(value => setQuizData(value.results));
    },[]);

    // make the data easier to use
    React.useEffect(()=>{
        setQuestionData(quizData.map(d => {
            let q = he.decode(d.question);
            let a = he.decode(d.correct_answer);
            let i = d.incorrect_answers.map(incorrect => he.decode(incorrect));
            let choices = i.concat(a).map(c=>initialChoice(c)).sort(() => 0.5 - Math.random());
            let ID = nanoid();
            return {questionID: ID, question: q, correct: a, choiceSet: choices}    //the id here is the unique id for each question
        }));
    },[quizData]);
    
    // create choices elements
    const allQuestions = questionData.map(qd => {
        return (<div className = 'question' key = {nanoid()}>
            <div className='question-part'>{qd.question}</div>
            <ChoiceSet 
                key = {nanoid()} 
                questionID = {qd.questionID} 
                choiceSet = {qd.choiceSet} 
                correctAns = {qd.correct}
                setQuestionData = {setQuestionData}
                endQuiz = {endQuiz}
            />
            <hr className = 'question-divider'/>
        </div>)}
    );
    
    // get the score
    const score = () => {
        if(endQuiz){
            let count = 0;
            for(let i = 0; i < questionData.length; ++i) {
                let rightOne = questionData[i].choiceSet.filter(c => c.choice == questionData[i].correct);
                if(rightOne[0].isHeld){
                    ++count;
                }
            }
            return count;
        }
        return 0;
    }
    
    // initialized all the choice data
    function initialChoice(data){
        return {
            choice: data,
            isHeld: false
        };
    }
    
    function answerCheck(){
        setEndQuiz(true);
    }
    
    function playAgain(){
        setEndQuiz(false);
        fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
            .then(value => setQuizData(value.results));
    }
    return (
        <div className = 'quiz-content'>
            <div className = 'quiz-panel'>
                {allQuestions}
            </div>
            <div className = 'end-game-control'>
                {endQuiz && <span className = 'game-result'>{`You Score ${score()}/${questionData.length} correct answers`}</span>}
                {endQuiz ? <button className = 'play-again-button' onClick={()=>playAgain()}>Play Again</button>
                :<button className = 'submit-button' onClick={()=>answerCheck()}>Check Answers</button>}
            </div>
        </div>
    );
}

export default Quiz;
