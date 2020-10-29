import React from 'react';
import Typer from './Typer';
import typerData from './typerData';
import EnKrSwitch from './EnKrSwitch';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: 'kr',
      dataIndex: 0,
      passingData: typerData['kr'][0],
    };
  }

  handleSwitchChanged = (selectedLang) => {
    this.setState({
      selectedLang: selectedLang,
      dataIndex: 0,
      passingData: typerData[selectedLang][0],
    });
  };

  handleTypingComplete = () => {
    this.setState({
      dataIndex: this.state.dataIndex + 1,
      passingData: typerData[this.state.selectedLang][this.state.dataIndex + 1],
    });
  };

  refreshPage = () => {
    this.setState({
      selectedLang: this.state.selectedLang,
      dataIndex: 0,
      passingData: typerData[this.state.selectedLang][0],
    });
  };

  render = () => {
    let renderingPage;
    if (this.state.passingData !== undefined) {
      renderingPage = (
        <div className="App">
          <EnKrSwitch
            selectedLang={this.state.selectedLang}
            onSwitchChange={this.handleSwitchChanged}
          />
          <Typer
            onTypingComplete={this.handleTypingComplete}
            key={this.state.passingData}
            typerText={this.state.passingData}
          />
        </div>
      );
    } else {
      renderingPage = (
        <div
          className="App"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Well Done!
          <input
            type="button"
            onClick={this.refreshPage}
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
