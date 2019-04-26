import React, { Component } from 'react';
import './error-button.css';

export default class ErrorButton extends Component {

  state = {
    renderError: false
  };

  render() {
    if (this.state.renderError) {
      this.foo.bar = 0;//всякая чушь кторая провоцирует ошибку
    }

    return (
      <button
        className="error-button btn btn-danger btn-sm"
        onClick={() => this.setState({renderError: true})}>
        ОШИБКА
      </button>
    );
  }
}
