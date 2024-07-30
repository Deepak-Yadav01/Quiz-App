import React, { useRef, useState } from 'react'
import './quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {

  let[index,setindex] = useState(0);
  let[question,setQuestion] = useState(data[index]);
  let[lock,setLock] =useState(false);
  let[score,setScore] =useState(0);
  let[result,setResult] =useState(false)

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array =[option1,option2,option3,option4];

  const checkAns = (element,ans) => {
    if (lock === false) {
      if (question.ans===ans) {
        element.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        element.target.classList.add("Incorrect");
        setLock(true);
        option_array[question.ans-1].current.classList.add("correct");
      }
    }
    
  }

    const next = ()=>{
          if (lock===true) {
            if (index === data.length-1) {
              setResult(true);
              return 0;
            }
            setindex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
              option.current.classList.remove("Incorrect");
              option.current.classList.remove("correct");
              return null;
            })
          }
    }

   const reset = ()=>{
    setindex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
   }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<>
        <h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={option1} onClick={(element)=>{checkAns(element,1)}}>{question.option2}</li>
        <li ref={option2} onClick={(element)=>{checkAns(element,2)}}>{question.option3}</li>
        <li ref={option3} onClick={(element)=>{checkAns(element,3)}}>{question.option1}</li>
        <li ref={option4} onClick={(element)=>{checkAns(element,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='index'>
        {index+1} of {data.length} quetions
      </div></>}
      {result?<>
      <h2>You Scored {score} out of{data.length}</h2>
      <button onClick={reset}>Reset</button>
      </>:<></>}
    </div>
  )
}

export default Quiz
