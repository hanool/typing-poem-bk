import React from 'react';
import Typer from './Typer';
import typerData from './typerData';
import EnKrSwitch from './EnKrSwitch';
import Wpms from './Wpms';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: 'kr',
      dataIndex: 0,
      passingData: typerData['kr'][0],
      startTimes: [],
      wpms: [],
    };
  }

  _countWordsInSentence = (sentence) => {
    let words = sentence.split(' ');
    return words.length;
  };

  handleSwitchChanged = (selectedLang) => {
    this.setState({
      selectedLang: selectedLang,
      dataIndex: 0,
      passingData: typerData[selectedLang][0],
    });
  };

  handleTypingStart = () => {
    this.setState({
      startTimes: [...this.state.startTimes, new Date().getTime()],
    });
  };

  handleTypingComplete = () => {
    let typingTime =
      new Date().getTime() - this.state.startTimes[this.state.dataIndex];
    let words = this._countWordsInSentence(this.state.passingData);
    let wpm = (words * 60000) / typingTime;
    this.setState(
      {
        dataIndex: this.state.dataIndex + 1,
        passingData:
          typerData[this.state.selectedLang][this.state.dataIndex + 1],
        wpms: [...this.state.wpms, wpm],
      },
      () => {
        console.log(this.state.wpms);
      }
    );
  };

  handleEnterDown = (e) => {
    if (e.key === 'Enter') {
      this.refreshPage();
    }
  };

  refreshPage = () => {
    this.setState({
      selectedLang: this.state.selectedLang,
      dataIndex: 0,
      passingData: typerData[this.state.selectedLang][0],
      startTimes: [],
      wpms: [],
    });
  };

  _getAvgWpm = (wpms) => {
    let sumWpm = 0;
    let avgWpm = 0;
    let count = 0;
    wpms.map((wpm) => {
      if (!isNaN(wpm) && wpm !== 0) {
        count++;
        sumWpm += wpm;
      }
    });
    console.log(sumWpm, count);
    avgWpm = sumWpm / count;
    avgWpm = avgWpm.toString();
    avgWpm = avgWpm.substr(0, avgWpm.indexOf('.'));
    return avgWpm;
  };

  render = () => {
    let renderingPage;
    if (this.state.passingData !== undefined) {
      renderingPage = (
        <div className="App">
          <Wpms wpms={this.state.wpms} />
          <EnKrSwitch
            selectedLang={this.state.selectedLang}
            onSwitchChange={this.handleSwitchChanged}
          />
          <Typer
            onTypingStart={this.handleTypingStart}
            onTypingComplete={this.handleTypingComplete}
            key={this.state.passingData}
            typerText={this.state.passingData}
          />
        </div>
      );
    } else {
      let avgWpm = this._getAvgWpm(this.state.wpms);
      renderingPage = (
        <div
          className="App"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>Avg wpm: {avgWpm}</p>
          <p>Well Done!</p>
          <input
            type="button"
            onClick={this.refreshPage}
            onKeyDown={this.handleEnterDown}
            style={{
              fontSize: '1rem',
              padding: '.3rem 1rem',
              display: 'block',
              margin: '1rem',
              border: '2px solid black',
              borderRadius: '2px',
            }}
            value="return"
          />
        </div>
      );
    }

    return <>{renderingPage}</>;
  };
}

export default App;
