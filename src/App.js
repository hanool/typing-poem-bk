import React, { createRef } from 'react'
import TyperList from './TyperList'
import typerData from './typerData'
import EnKrSwitch from './EnKrSwitch'
import Wpms from './Wpms'
import './App.css'

class App extends React.Component {
  render() {
    console.log(typerData.kr[0])
    return (
      <div className="typer-app">
        <TyperList poem={typerData.kr[0]} />
      </div>
    )
  }
}

// typerWrap
//   ㄴ list of typers
// wpms
// enkrSwitches

export default App
