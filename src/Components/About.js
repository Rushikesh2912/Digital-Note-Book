import React from 'react'
import AddNote from './AddNote';
const About = (props) => {
  const { showAlert } = props;
  return (
    <div>
        <AddNote showAlert={showAlert} />
    </div>
  )
}

export default About
