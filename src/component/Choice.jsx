import React from 'react'

const Choice = (props) =>{
    
    // choice selecting style
    const choiceStyle = {
        background: props.isHeld ? '#D6DBF5': 'transparent' , 
        border: props.isHeld ? '1.75px solid transparent' : '1.75px solid #293264'
    };
    
    // winning style
    const correctStyle = {
        background: props.rightChoice ? '#94D7A2' : (props.isHeld ? '#F8BCBC' : 'transparent'),
        border: (props.rightChoice || props.isHeld) ? '1.75px solid transparent' : '1.75px solid #A9ADC1',
        color: props.rightChoice ? '#293264' : '#7E84A2'    
    }
    
    // choice element 
    return (
        <div className = 'choice' 
            style = {!props.endQuiz ? choiceStyle : correctStyle} 
            onClick = {() => props.selectChoice(props.choice)}>{props.choice}</div>
    );
}

export default Choice;
