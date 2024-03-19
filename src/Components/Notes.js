import React, { useContext, useEffect, useRef } from 'react';
import noteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();
    const showAlert = props;
    
    useEffect(() => {
        console.log("Fetching notes...");
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate("/login")
        }
        //eslint-disable-next-line
    },[]);

    const updateNote = (CurrentNote) => {
        ref.current.click();
        setNote({ id: CurrentNote._id, etitle: CurrentNote.title, edescription: CurrentNote.description, etag: CurrentNote.tag });
    }

    const handleClick = (e) => {
        console.log("Updating note:", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Update Successfully", "success");
    }
    const handleChange = (e) => {
        console.log("Changing", e.target.name, "to", e.target.value);
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    console.log("Notes:", notes);
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary" id='modal-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" minLength={3} value={note.etitle} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} value={note.edescription} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled= {note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>You Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes Display...!"}
                </div>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />;
                })}
            </div>
        </>
    )
}

export default Notes
