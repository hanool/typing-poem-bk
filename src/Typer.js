import React, { Component } from 'react';
import './Typer.css';

class Typer extends Component {
  constructor(props) {
    super(props);
    this.typerInput = React.createRef();
    this.state = {
      placeholderText: this.props.typerText,
      overlapText: '',
      typingStarted: false,
    };
  }

  componentDidMount = () => {
    this.focusTyperInput();
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.typerInput.current.value.length >= this.props.typerText.length) {
        this.props.onTypingComplete();
      }
    }
  };

  handleTyperInputChange = (e) => {
    if (!this.state.typingStarted) {
      this.props.onTypingStart();
      this.setState({
        typingStarted: true,
      });
    }
    const inputText = e.target.value;
    if (inputText.length > this.props.typerText.length) {
      this.props.onTypingComplete();
    }
    const nextPlaceHolderText = this.mergeTypingChar(
      inputText,
      this.props.typerText
    );
    this.setState({ placeholderText: nextPlaceHolderText });
    this.setState({ overlapText: inputText });
  };

  mergeTypingChar = (inputText, originalText) => {
    const leftText = originalText.substring(0, inputText.length - 1);
    const inputingText = inputText ? inputText[inputText.length - 1] : '';
    const rightText = originalText.substring(
      inputText.length,
      originalText.length
    );

    return leftText + inputingText + rightText;
  };

  focusTyperInput = () => {
    this.typerInput.current.focus();
  };

  render() {
    const overlapChar = (key, charColor) => {
      return (
        <span key={key} style={{ color: charColor }}>
          {this.state.overlapText[key].replace(/ /g, '\u00a0')}
        </span>
      );
    };

    let overlapText = [];
    for (let i = 0; i < this.state.overlapText.length; i++) {
      if (i === this.state.overlapText.length - 1) {
        overlapText.push(overlapChar(i, `#003049`));
        continue;
      }
      if (this.state.placeholderText[i] === this.state.overlapText[i]) {
        overlapText.push(overlapChar(i, `#2a9d8f`));
      } else {
        overlapText.push(overlapChar(i, `#e76f51`));
      }
    }

    return (
      <div id="typer">
        <div className="typer typer-text">{this.props.typerText}</div>
        <div className="typer-wrap">
          <input
            type="text"
            className="typer typer-input"
            onChange={this.handleTyperInputChange}
            onKeyDown={this.handleKeyDown}
            ref={this.typerInput}
          />
          <div className="typer typer-text-placeholder">
            {this.state.placeholderText.replace(/ /g, '\u00a0')}
          </div>
          <div className="typer typer-text-overlap">{overlapText}</div>
        </div>
      </div>
    );
  }
}

export default Typer;
