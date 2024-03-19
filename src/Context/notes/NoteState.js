import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initaialNote = []

  const [notes, setNotes] = useState(initaialNote);


  //Fetch All Notes
  //Add a note
  const getNotes = async () => {
    //TODO APT Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO APT Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //Delete a note
  const deleteNote = async (id) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
    });

    console.log("Note Deleleting with id " + id);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);

    const json = await response.json();
    console.log(json);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    //Edit logic
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;