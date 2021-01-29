import React from 'react';
import db from '../db.json';
import styled from 'styled-components';



import Widget from '../src/components/Widget/index';
import GithubCorner from '../src/components/GithubCorner/index';
import QuizBackground from '../src/components/QuizBackground/index';
import AluraLogo from '../src/components/AluraLogo/index';
import Input from '../src/components/Input/index';
import Button from '../src/components/Button/index';
import QuizContainer from '../src/components/QuizContainer/index';
import AlternativeForm from '../src/components/AlternativeForm/index';


function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>

      <Widget.Header>
        [Loading Challenge]
      </Widget.Header>
    </Widget>
  )
}

function ResulScreen({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Your Results
      </Widget.Header>

      <Widget.Content>
        <p>Congrats! You have finished the challenge and you got:
          {' '}
          {results.filter((x) => x).length }
          {' '}
          right questions!</p>
        <p>Check out the details:</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              Question {index+1}: {result === true ? 'Right' : 'Wrong'}
            </li>
          ))}
          
        </ul>
      </Widget.Content  >
    </Widget>
  )
}

function QuestionWidget({questions, totalQuestions, questionIndex, onSubmit, addResult}) {

  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited, setisQuestionSubmited] = React.useState(false)
  const questionId = `question__${questionIndex}`
  const isCorret = selectedAlternative === questions.answer   //validation
  const isAlternativeSelected = selectedAlternative !== undefined
  
  return (
    <Widget>
          <Widget.Header>
            <h3>{`Question ${questionIndex + 1} of ${totalQuestions}`}</h3>
          </Widget.Header>

          <img   
            alt="Description"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover'
            }}
            src={questions.image}
          />


          <Widget.Content>
            <h2>
              {questions.title}
            </h2>
            <p>
              {questions.description}
            </p>

            <AlternativeForm onSubmit={e => {
              e.preventDefault()
              setisQuestionSubmited(true)
              setTimeout(() => {
                onSubmit()
                addResult(isCorret)
                setisQuestionSubmited(false)
                setSelectedAlternative(undefined)
              }, 4000)
            }}>
              {questions.alternatives.map((alternative, alternativeIndex) => {

                const AlternativeStatus = isCorret ? 'SUCCESS' : 'ERROR'
                const isSelected = selectedAlternative === alternativeIndex
                const alternativeId = `alternative__${alternativeIndex}`
                
                return (
                  <Widget.Topic 
                    as="label" 
                    key={alternativeId} 
                    htmlFor={alternativeId} 
                    data-selected={isSelected}
                    data-status={isQuestionSubmited && AlternativeStatus}
                  >
                    <input 
                      id={alternativeId} 
                      name={questionId} 
                      type="radio"
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                    />
                    {alternative}
                  </Widget.Topic>
                )
              })}

              <Button type="submit" disabled={!isAlternativeSelected}>Confirm</Button>
              {isQuestionSubmited &&  isCorret &&  <p>Right!</p>}
              {isQuestionSubmited &&  !isCorret && <p>Wrong!</p>}
            </AlternativeForm>
          </Widget.Content>
        </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULTS: 'RESULTS'
}


export default function QuizesPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING) 
  const totalQuestions = db.questions.length
  const [questionIndex, setQuestionIndex] = React.useState(0)
  const questions = db.questions[questionIndex]
  const [results, setResults] = React.useState([]) 

  function addResult(result){
    setResults ([
      ...results,
      result,
    ])
  }


  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
  
    }, 1000)
  }, [])

  function handleSubmit(){
    const nextQuestion = questionIndex + 1
    if(nextQuestion < totalQuestions){
      setQuestionIndex(questionIndex + 1)
    }else{
      setScreenState(screenStates.RESULTS)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <AluraLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget 
              questions={questions} 
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handleSubmit}
              addResult={addResult}
            />)}
        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULTS && <ResulScreen results={results}/>}
        </QuizContainer>
      <GithubCorner projectUrl="https://github.com/Givs" />
    </QuizBackground>
  );
}
