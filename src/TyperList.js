import React from 'react'
import Typer from './Typer'

const TyperList = (props) => {
  const poem = props.poem

  return poem.map((lineText, i) => {
    return <Typer typerText={lineText} />
  })
}

export default TyperList
