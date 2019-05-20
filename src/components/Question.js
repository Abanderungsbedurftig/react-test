import React, { Component } from 'react';
import Radio from './Radio';
import Check from './Check';
import PropTypes from 'prop-types';
import '../style/Question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.question.multiple ? new Set() : null
    };
    this.addCheckAnswer = this.addCheckAnswer.bind(this);
    this.deleteCheckAnswer = this.deleteCheckAnswer.bind(this);
    this.checkForAnswer = this.checkForAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ answer: nextProps.question.multiple ? new Set() : null });
  }

  addCheckAnswer(text) {
    let answer = this.state.answer;
    answer.add(text);
    this.setState({ answer });
  }

  deleteCheckAnswer(text) {
    let answer = this.state.answer;
    answer.delete(text);
    this.setState({ answer });
  }

  compareArrays(arrayA, arrayB) {
    if (arrayA instanceof Array && arrayB instanceof Array) {
      return arrayA.length === arrayB.length && arrayA.every(item => arrayB.indexOf(item) > -1);
    } return false;
  }

  checkForAnswer() {
    const question = this.props.question;
    const answer = this.state.answer;
    if (!answer || (answer instanceof Set && answer.size === 0)) this.props.onAnswer();
    else this.nextQuestion(question, answer);
  }

  nextQuestion(question, answer) {
    switch (question.multiple) {
      case false: if (question.correctAnswer === answer) {
        this.props.onAnswer(true, question.difficulty, this.props.number);
      } else this.props.onAnswer(false, question.difficulty, this.props.number);
        break;
      case true: if (this.compareArrays(question.correctAnswer, Array.from(answer))) {
        this.props.onAnswer(true, question.difficulty, this.props.number);
      } else this.props.onAnswer(false, question.difficulty, this.props.number);
        break;
      default: break;
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='question-body'>
          <h1>{this.props.question.category}</h1>
          <div className='question-text'>
            {this.props.question.question}
            <span>{this.props.number}</span>
          </div>
          <div className='question-answers'>
            <ul>
              {!this.props.question.multiple ? this.props.question.allAnswers.map((answer, i) => (<Radio text={answer} key={i}
                number={this.props.number} checked={this.state.answer}
                onSelectAnswer={text => this.setState({ answer: text })}/>))
                : this.props.question.allAnswers.map((answer, i) => (<Check text={answer} key={i}
                  number={this.props.number} onSelectAnswer={text => this.addCheckAnswer(text)}
                  checked={this.state.answer} onDeleteAnswer={text => this.deleteCheckAnswer(text)}/>))
              }
            </ul>
          </div>
          <div className='next-question'>
            <button className='next-btn' onClick={() => this.checkForAnswer()}>Next</button>
          </div>
        </div>
      </div>

    );
  }
}

Question.propTypes = {
  number: PropTypes.number,
  onAnswer: PropTypes.func,
  question: PropTypes.object
};

export default Question;
