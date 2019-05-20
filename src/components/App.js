import React, { Component } from 'react';
import Start from './Start';
import Question from './Question';
import Answer from '../data/Answer';
import Finish from './Finish';
import ErrorWindow from './Error';
import getQuestions from '../data/http';
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: new Answer(),
      counter: 0,
      isFinish: false,
      error: null
    };
    this.startTest = this.startTest.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentWillMount() {
    getQuestions()
      .then(data => {
        let questions = data.map(q => {
          let answers = [].concat(q.correct_answer, q.incorrect_answers);
          answers.sort(() => Math.random() - 0.5);
          return {
            category: decodeURIComponent(q.category),
            correctAnswer: decodeURIComponent(q.correct_answer),
            difficulty: decodeURIComponent(q.difficulty),
            allAnswers: answers.map(item => decodeURIComponent(item)),
            question: decodeURIComponent(q.question),
            multiple: q.correct_answer instanceof Array ? true : false
          };
        });
        this.setState({ questions });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  startTest() {
    if (this.state.questions.length) this.setState({ counter: 1 });
  }

  addAnswer(isTrue, difficulty, number) {
    if (typeof isTrue === 'boolean' && typeof difficulty === 'string') {
      let answers = this.state.answers;
      answers.addAnswer(difficulty, isTrue, number);
      if (number !== this.state.questions.length) {
        this.setState({ answers: answers, counter: this.state.counter + 1 });
      } else {
        this.setState({ answers: answers, isFinish: true });
      }
    } else {
      this.setState({ error: 'Please, select an answer' });
    }
  }

  render() {
    return (
      <div className='App'>
        {!this.state.counter && !this.state.isFinish && (<Start onStart={() => this.startTest()}/>)}
        {this.state.counter && !this.state.isFinish && (<Question question={this.state.questions[this.state.counter - 1]} number={this.state.counter}
          onAnswer={(isTrue, diff, number) => this.addAnswer(isTrue, diff, number)}/>)}
        {this.state.isFinish && <Finish easy={this.state.answers.easy} medium={this.state.answers.medium}
          hard={this.state.answers.hard} trueCount={this.state.answers.getTrueAnswers()}
          onRepeat={() => this.setState({ answers: new Answer(), counter: 1, isFinish: false })}/>}
        {this.state.error && <ErrorWindow message={this.state.error} onClick={() => this.setState({ error: null })}/>}
      </div>
    );
  }
}

export default App;
