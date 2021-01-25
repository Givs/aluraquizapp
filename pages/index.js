import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer/index'
import GithubCorner from '../src/components/GithubCorner/index'
import QuizBackground from '../src/components/QuizBackground/index'

/* const BackgroundImage = styled.div `
  background-image: url(${db.bg});
  flex:1;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 362px;
` */


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
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
              <h1>The legend of Soccer</h1>
          </Widget.Header>
          <Widget.Content>
            

            <p>Lorem Impsum .....</p>
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
