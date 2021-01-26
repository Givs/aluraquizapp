import styled from 'styled-components'
import Head from 'next/head'
import {useRouter} from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer/index'
import GithubCorner from '../src/components/GithubCorner/index'
import QuizBackground from '../src/components/QuizBackground/index'
import AluraLogo from '../src/components/AluraLogo/index'



export const QuizContainer = styled.div `
  width: 100%;
  max-width:350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px
  }
`

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')


  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz</title>
      </Head>
      <QuizContainer>
        <AluraLogo />
        <Widget>
          <Widget.Header>
              <h1>The legend of Soccer</h1>
          </Widget.Header>
          <Widget.Content>
              <form  onSubmit={function(e) {
                router.push(`/quizes?name=${name}`)
                e.preventDefault()
                console.log("Submit")
              }}>
                <input 
                  type="text" 
                  placeholder="Digite o seu nome para jogar" 
                  onChange={function(e){
                    setName(e.target.value)   
                  }}
                />
                
                <button type="submit" disabled={name.length === 0}> Jogar </button>
              </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>The legend of Soccer</h1>

            <p>Lorem Impsum .....</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner  projectUrl="https://github.com/Givs"/>
    </QuizBackground>
  )
}
