import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import step0 from "./images/0.png";
import step1 from "./images/1.png";
import step2 from "./images/2.png";
import step3 from "./images/3.png";
import step4 from "./images/4.png";
import step5 from "./images/5.png";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 999,
    images: [step0, step1, step2, step3, step4, step5]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(["~"]),
      answer: "i~love~you"
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz~".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(["~"]),
      answer: "will~you~marry~me"
    });
  }

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!"
    }

    if (gameOver) {
      gameStat = "You Lost!!!"
    }

    return (
      <div className="Hangman container">
        <h1 className='text-center'>Hello Mizuka!</h1>
        
        <div className="text-center">
            <img src={this.props.images[(this.state.mistake > 5 ? 5 : this.state.mistake)]} alt=""/>
        </div>
        <div className="text-center">
          <p>Guess the sentence</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          { isWinner ? <button className='btn btn-info' onClick={this.resetButton}>Next</button> : <p></p>}
        </div>
      </div>
    )
  }
}

export default Hangman;
