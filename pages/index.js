import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import GithubCorner from '../src/components/GithubCorner/index';
import QuizBackground from '../src/components/QuizBackground/index';
import AluraLogo from '../src/components/AluraLogo/index';
import Input from '../src/components/Input/index';
import Button from '../src/components/Button/index';
import QuizContainer from '../src/components/QuizContainer/index';


export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    // eslint-disable-next-line react/jsx-filename-extension
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
            <form onSubmit={e => {
              router.push(`/quizes?name=${name}`);
              e.preventDefault();
              console.log('Submit');
            }}
            >
              <Input
                name="nomeDoUsuario"
                type="text"
                placeholder="Digite o seu nome para jogar"
                onChange={e => {
                  setName(e.target.value);
                }}
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}> Play </Button>
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
      <GithubCorner projectUrl="https://github.com/Givs" />
    </QuizBackground>
  );
}
