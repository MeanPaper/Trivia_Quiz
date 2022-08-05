import React from 'react';
import { nanoid } from 'nanoid';
import Choice from './Choice'

function ChoiceSet ({choiceSet, setQuestionData, questionID, endQuiz, correctAns}){

    const gridStyle = {gridTemplate: `auto auto / repeat(${choiceSet.length}, auto)`};

    // a long and hard to understand select method
    // 1. get old state info
    // 2. compare choice and question ID
    // 3. only change the choice if step 2 is equal
    // 4. go to the choice set to find the choice that needs to be changed
    function selectChoice(choiceName){
        if (!endQuiz){ //unlock selection when quiz is still on
            setQuestionData(oldData => oldData.map(old => {
                return (old.questionID == questionID) 
                ? {...old, choiceSet: old.choiceSet.map(select => {
                        return {...select, 
                            isHeld: (select.choice == choiceName) ? (!select.isHeld) : false}
                    })}
                :{...old};
            }));
        }
    }
    
    // rendering all the choices
    const allChoices = choiceSet.map(ans =>
        <Choice 
            key = {nanoid()} 
            choice = {ans.choice} 
            isHeld = {ans.isHeld} 
            selectChoice = {selectChoice}
            endQuiz = {endQuiz}
            rightChoice = {ans.choice == correctAns}
        />
    );
    
    // return a set of choices
    return (<div className = 'choice-container' style = {gridStyle}>
        {allChoices}
    </div>);
}

export default ChoiceSet;
