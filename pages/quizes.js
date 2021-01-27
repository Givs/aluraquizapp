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

function QuestionWidget({questions, totalQuestions, questionIndex}) {
  const questionId = `question__${questionIndex}`
  return (
    <Widget>
          <Widget.Header>
            <h3>{`Question ${questionIndex} from ${totalQuestions}`}</h3>
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

            <form>
              {questions.alternatives.map((alternative, alternativeIndex) => {
                const alternativeId = `alternative__${alternativeIndex}`
                return (
                  <Widget.Topic htmlFor={alternativeId } as="label">
                    <input id={alternativeId} name={questionId} type="radio"/>
                    {alternative}
                  </Widget.Topic>
                )
              })}

              <Button type="submit">Confirm</Button>
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
  const questionIndex = 1 
  const questions = db.questions[questionIndex]

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
  
    }, 1000)
  }, [])

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <AluraLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget 
              questions={questions} 
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
            />)}
        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULTS && <div>You got x questions</div>}
        </QuizContainer>
      <GithubCorner projectUrl="https://github.com/Givs" />
    </QuizBackground>
  );
}
