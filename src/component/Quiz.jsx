import React from 'react'
import he from 'he' //an awesome lib that can change html entities (code) to a string
import {nanoid} from 'nanoid'
import ChoiceSet from './ChoiceSet'

function Quiz({number, loading, setLoading,setStartQuiz}){
    const [quizData, setQuizData] = React.useState([]); 
    const [questionData, setQuestionData] = React.useState([]);
    const [endQuiz, setEndQuiz] = React.useState(false);
    
    // fetch questions 
    React.useEffect(()=>{
        setLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${number}`)
            .then(response => {
                if (response.ok){
                    return response.json();
                }
                else{
                    throw new Error('Cannot fetch the data');
                }
            })
            .then(value => {
                setQuizData(value.results)
                setTimeout(() => {setLoading(false)}, 2000);
            })
            .catch(error => {
                console.log(error);
                return Promise.reject();
            });
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
        return{
            choice: data,
            isHeld: false
        };
    }
    
    function answerCheck(){
        setEndQuiz(true);
    }
    
    function playAgain(){
        setEndQuiz(false);
        setLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${number}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else{
                throw new Error('Cannot fetch the data');
            }
        })
        .then(value => {
            setQuizData(value.results);
            setTimeout(()=>{setLoading(false)},2000);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject();
        });
    }
    
    function backToHome(){
        setStartQuiz(false);
    }

    return (
        <div className = 'quiz-page'>
            {loading ? <div className = 'loading-dot'/>:
                <div className = 'quiz-content'>
                    <div className = 'quiz-panel'>
                        {(!loading) && allQuestions}
                    </div>
                    <div className = 'end-game-control'>
                        {endQuiz && <span className = 'game-result'>{`You Score ${score()}/${questionData.length} correct answers`}</span>}
                        {(!loading) && 
                            (endQuiz ? <span>
                                <button className = 'play-again-button' onClick = {()=>playAgain()}>Play Again</button>
                                <button className = 'home-button' onClick = {()=>backToHome()}> Home </button>
                            </span> : <button className = 'submit-button' onClick = {()=>answerCheck()}>Check Answers</button>)
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Quiz;
