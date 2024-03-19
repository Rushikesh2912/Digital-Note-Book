import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    return (
        <div className='col-md-3 d-flex'>
            <div className="card my-3" style={{ width: "20rem" }}>
                <div className="card-body">
                    <div className="d-flex align-self-center">
                        <p className="card-text"><b>Title :</b> {note.title}</p>
                        <i className="fa fa-trash-o mx-2 my-2" onClick={()=>{deleteNote(note._id);props.showAlert("Delete Successfully", "success");}} style={{ fontSize: "20px" }}></i>
                        <i className='fas fa-edit mx-2 my-2' onClick={()=>{updateNote(note)}} style={{ fontSize: "20px" }}></i>
                    </div>
                    <h6><b>Tag :</b> {note.tag}</h6>
                    <p className="card-text"><b>Description : </b>{note.description}</p>
                    <p className="card-text"><small className="text-muted">{note.date}</small></p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
