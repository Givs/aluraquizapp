import React from 'react';
import db from '../db.json';
import styled from 'styled-components';



import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import GithubCorner from '../src/components/GithubCorner/index';
import QuizBackground from '../src/components/QuizBackground/index';
import AluraLogo from '../src/components/AluraLogo/index';
import Input from '../src/components/Input/index';
import Button from '../src/components/Button/index';
import QuizContainer from '../src/components/QuizContainer/index';


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

function QuestionWidget({questions, totalQuestions, questionIndex, onSubmit}) {

  const [selectedAlternative, setSelectedAlternative] = React.useState()
  const questionId = `question__${questionIndex}`
  const isCorret = selectedAlternative === questions.answer
  
  return (
    <Widget>
          <Widget.Header>
            <h3>{`Question ${questionIndex + 1} from ${totalQuestions}`}</h3>
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

            <form onSubmit={e => {
              e.preventDefault()
              onSubmit()
            }}>
              {questions.alternatives.map((alternative, alternativeIndex) => {
                const alternativeId = `alternative__${alternativeIndex}`
                return (
                  <Widget.Topic 
                    as="label" 
                    key={alternativeId} 
                    htmlFor={alternativeId} 
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

              <Button type="submit">Confirm</Button>
              {isCorret &&  <p>Right!</p>}
              {!isCorret && <p>Wrong!</p>}
            </form>
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
            />)}
        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULTS && <div>You got x questions</div>}
        </QuizContainer>
      <GithubCorner projectUrl="https://github.com/Givs" />
    </QuizBackground>
  );
}
